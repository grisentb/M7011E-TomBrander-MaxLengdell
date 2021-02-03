const { Collection } = require('mongoose');

class simulator {
    constructor() {
        this.mongoose = require('mongoose');
        this.consumerCollection = this.mongoose.model('consumer');
        this.prosumerCollection = this.mongoose.model('prosumer');
        this.managerCollection = this.mongoose.model('manager');
        //this.connection = require('./databaseConnection');
        this.avgWind = 3.6;
        this.avgPrice = 1.5;

        this.coalProduction = 1000000.0;
        this.coalPowerPlantTimeDelay = 10000;
        this.coalPowerChangeingState = false;
    }
    runSim() {
        let price = -1;
        //Simulating consumption for every consumer in database
        this.updateConsumption(this.consumerCollection, 70, 10);
        this.updateConsumption(this.prosumerCollection, 70, 10);
        //Updating wind, buffer and production for the prosumers
        this.updateWind(this.prosumerCollection, 3.6, 0.5);
        this.updateProduction(this.prosumerCollection);

        //Managers updates
        this.updateManagerPowerplant();

        this.updatePowerNetwork();

        this.check_consumer_blackout();
        //Simulating prosumption for every prosumer in database
    }
    async check_consumer_blackout() {
        var consumer = this.consumerCollection;
        var prosumer = this.prosumerCollection;
        await prosumer.find().stream()
            .on('data', async function (doc) {
                var blackouts = "false";
                //console.log("Blacked out house hold: ", typeof(doc._id));
                await consumer.find({ prosumer: doc._id.toString() }).stream()
                    .on('data', await function (cons) {

                        if (cons.blackout === true) {
                            blackouts = "true";
                        }
                        prosumer.findOneAndUpdate({ _id: doc._id }, { has_blackouts: blackouts }, function (err, res) {
                            if (err) {
                                //console.log(err);
                            }
        
                        });
                    })

            });

    }
    //Gaussian simulations
    async updateConsumption(Collection, mean, deviation) {
        var gauss = this.gaussian;
        Collection.find().stream()
            .on('data', function (doc) {
                let newConsumption = gauss(mean, deviation);

                Collection.findByIdAndUpdate(doc._id, { consumption: newConsumption }, function (err, result) {
                    if (err) {
                        console.log("Error in update: ", err);
                    }
                })

            });
    }
    async updateWind(Collection, mean, deviation) {
        var gauss = this.gaussian;
        Collection.find().stream()
            .on('data', function (doc) {
                let newWind = gauss(mean, deviation);
                Collection.findByIdAndUpdate(doc._id, { wind: newWind }, function (err, result) {
                    if (err) {
                        console.log("Error in update: ", err);
                    }
                })

            });
    }
    //Prosumer updates
    async updateProduction(Collection) {
        var productionFunc = this.calculateProduction;
        Collection.find().stream()
            .on('data', function (doc) {
                let blocked = doc.blocked;
                let wind = doc.wind;
                let capacity = doc.production_capacity;
                let production = productionFunc(wind, capacity);

                if (!blocked) {
                    Collection.findByIdAndUpdate(doc._id, { production: production }, function (err, result) {
                        if (err) {
                            console.log("Error in update: ", err);
                        }
                    })
                }

            });
    }
    async updateProsumerBuffer() {
        let prosumers = await this.prosumerCollection.find();
        let consumers = await this.consumerCollection.find();
        //console.log(consumers); 

        for (let i in prosumers) {
            let consumerConsumption = 0;
            for (let j in consumers) {
                if (consumers[j].prosumer == prosumers[i]._id) {
                    consumerConsumption += consumers[j].consumption;
                }
            }
            let netProduction = prosumers[i].production
                - (prosumers[i].consumption + consumerConsumption) * (1 - prosumers[i].buffer_prod_ratio);
            let newBuffer = prosumers[i].buffer
                + Math.max(0, netProduction)
                - Math.min(prosumers[i].buffer, (consumerConsumption * (prosumers[i].buffer_prod_ratio)));

            await this.prosumerCollection.updateOne(
                { _id: prosumers[i]._id },
                { $set: { buffer: newBuffer } });
        }
    }

    //Manager updates
    async updateManagerPowerplant() {
        //Update Coal powerplant status and production
        var manager = await this.managerCollection.findOne();
        if (manager.status == 'starting' && !this.coalPowerChangeingState) {
            this.coalPowerChangeingState = true;
            setTimeout(() => {
                if (manager.status == 'starting') {
                    this.managerCollection.findOneAndUpdate({ _id: manager._id }, { production: this.coalProduction, status: "Running" }).then(resp => {
                        console.log("PRODUCING NOW FROM COAL");
                        this.coalPowerChangeingState = false;
                    });
                }
            }, this.coalPowerPlantTimeDelay)
        } else if (manager.status == 'stopped') {
            this.managerCollection.findOneAndUpdate({ _id: manager._id }, { production: 0 }).then(resp => {
            })
        }
    }
    async updateManagerBuffer() {
        var prosumers = await this.prosumerCollection.find();
        var consumers = await this.consumerCollection.find();
        var manager = await this.managerCollection.findOne();

        var totalNet = manager.production;
        for (let i in prosumers) {
            totalNet += prosumers[i].production - prosumers[i].consumption;
        }
        for (let i in consumers) {
            totalNet -= consumers[i].consumption;
        }
        console.log(totalNet);
        var newBuffer = manager.buffer + totalNet;
        newBuffer = Math.max(0, newBuffer);
        await this.managerCollection.updateOne({ _id: manager._id }, { buffer: newBuffer }).catch(err => { console.log("Error saving manager buffer") });
    }

    async updatePowerNetwork() {
        let consumers = await this.consumerCollection.find();
        let prosumers = await this.prosumerCollection.find();
        let manager = await this.managerCollection.findOne();

        let managerProduction = manager.production;
        let managerBuffer = manager.buffer;
        //Inital increase from the production
        managerBuffer += managerProduction;
        let managerRatio = manager.buffer_to_prod;
        for (let i in prosumers) {
            let prosumerBuffer = prosumers[i].buffer;
            let prosumerRatio = prosumers[i].buffer_prod_ratio;
            let prosumerProduction = prosumers[i].production;
            let prosumerConsumers = [];
            //Calculations for every prosumer
            //Total consumption for prosumer and it's consumers
            let totalProsumerConsumption = prosumers[i].consumption;
            for (let j in consumers) {
                if (consumers[j].prosumer == prosumers[i]._id) {
                    totalProsumerConsumption += consumers[j].consumption;
                    prosumerConsumers.push(consumers[j]);
                }
            }
            //Variable if prosumer need power
            let prosumerNetPower = 0;
            //Prosumers buffer and production values updated
            let prosumersBufferConsumption = prosumerRatio * totalProsumerConsumption;
            prosumerBuffer -= prosumersBufferConsumption;
            let prosumersProductionConsumption = (1 - prosumerRatio) * totalProsumerConsumption;
            prosumerProduction -= prosumersProductionConsumption;
            prosumerBuffer += Math.max(0, prosumerProduction);
            //Does prosumer need energy from manager or not?
            //Prosumer need more power
            if (prosumerBuffer <= 0 || prosumerProduction < 0) {
                //Prosumer can't make use of battery
                prosumerRatio = 0;
                //How much do I need
                prosumerNetPower = prosumerBuffer < 0 ? prosumerNetPower + prosumerBuffer : prosumerNetPower;
                prosumerNetPower = prosumerProduction < 0 ? prosumerNetPower + prosumerProduction : prosumerNetPower;

                let prosumerManagerBufferNeed = managerRatio * prosumerNetPower;
                let prosumerManagerProductionNeed = (1 - managerRatio) * prosumerNetPower;

                managerProduction += prosumerManagerProductionNeed;
                managerBuffer += prosumerManagerBufferNeed;
            }
            //Check for blackouts
            for (let j in consumers) {
                //console.log("PROSUMER NET: " + prosumerNetPower.toString());
                if (consumers[j].prosumer == prosumers[i]._id) {
                    //console.log("CHECKING FOR BLACKOUTS: ManagerBuffer: " + managerBuffer.toString() + " ManagerProduction: " + managerProduction.toString() + " and prosumerNetPower: " + prosumerNetPower.toString());
                    if ((managerBuffer < 0 || managerProduction < 0) && prosumerNetPower < 0) {
                        prosumerNetPower += consumers[j].consumption;
                        await this.consumerCollection.updateOne({ _id: consumers[j]._id }, { blackout: true });
                    } else {
                        await this.consumerCollection.updateOne({ _id: consumers[j]._id }, { blackout: false });
                    }
                }
            }
            //Update prosumer in database
            await this.prosumerCollection.updateOne({ _id: prosumers[i]._id }, { buffer: prosumerBuffer, buffer_prod_ratio: prosumerRatio });
        }
        //update manager in database
        await this.managerCollection.updateOne({ _id: manager._id }, { buffer: managerBuffer });
    }
    //Helper method
    calculateProduction(wind, prosumerCapacity) {
        return wind * prosumerCapacity;
    }
    //Calculate consumer blackouts
    calcBlackout(totalConsumption, currentConsumption, production) {
        /**
         * Should enable blackout for individual house holds. 
         */
        if (totalConsumption > production) {
            return true;
        }
        return false;
    }
    // calcConsumerPrice(wind, currentConsumption) {
    //     //This function is not used anymore
    //     /**
    //      * High wind will decerease the price. 
    //      * High consumption will increase the price. 
    //      * 
    //      * 0<wind≤1.5 = 3kr
    //      * 1.5<wind≤3.6 = 2kr
    //      * 3.6<wind<5 = 1.5kr
    //      * 5<wind = 0.5 kr
    //      * 
    //      * 
    //      */
    //     let price;
    //     if (wind < 1.5) {
    //         price = 3;
    //     }
    //     else if (wind < this.avgPrice && wind >= 1.5) {
    //         price = 2;
    //     }
    //     else if (wind < 5 && wind >= this.avgPrice) {
    //         price = 1.5;
    //     } else {
    //         price = 0.5;
    //     }

    //     if (currentConsumption < 50)
    //         price = price * 0.7;
    //     else if (currentConsumption < 60 && currentConsumption >= 50)
    //         price = price * 0.8;
    //     else if (currentConsumption < 70 && currentConsumption >= 60)
    //         price = price * 0.95;
    //     else if (currentConsumption < 80 && currentConsumption >= 70)
    //         price = price * 1.05;
    //     else
    //         price = price * 1.30;

    //     return price;
    // }
    //Gaussian function
    gaussian(mean, stdev) {
        var y2;
        var use_last = false;

        var y1;
        if (use_last) {
            y1 = y2;
            use_last = false;
        }
        else {
            var x1, x2, w;
            do {
                x1 = 2.0 * Math.random() - 1.0;
                x2 = 2.0 * Math.random() - 1.0;
                w = x1 * x1 + x2 * x2;
            } while (w >= 1.0);
            w = Math.sqrt((-2.0 * Math.log(w)) / w);
            y1 = x1 * w;
            y2 = x2 * w;
            use_last = true;
        }

        var retval = mean + stdev * y1;
        retval = Math.round(retval * 100) / 100;
        if (retval > 0)
            return retval;

        return -retval;
    }
}

module.exports = new simulator();