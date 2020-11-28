const { Collection } = require('mongoose');

class simulator{
    constructor()
    {
        this.mongoose = require('mongoose');
        this.consumerCollection = this.mongoose.model('consumer');
        this.prosumerCollection = this.mongoose.model('prosumer');
        //this.connection = require('./databaseConnection');
        this.avgWind = 3.6;
        this.avgPrice = 1.5;
    }
    runSim()
    {
		let price = -1;
		//Simulating consumption for every consumer in database
        //this.updateConsumption(this.consumerCollection, 70, 10);
        this.updateConsumption(this.prosumerCollection, 70, 10);
        //Updating wind and production for the prosumers
        this.updateWind(this.prosumerCollection, 3.6, 0.5);
        this.updateProduction(this.prosumerCollection);
        
        
		//Simulating prosumption for every prosumer in database
    }

    // async updateConsumption(Collection, mean, deviation)
    // {
    //     let content = await Collection.find();
    //     content = this.collectionContentToArray(content);
    //     let i = 0;
    //     while(i < content.length)
    //     {
    //         //console.log(content[i].Consumption);
    //         let newConsumption = this.gaussian(mean, deviation);
    //         Collection.findByIdAndUpdate(content[i]._id, {Consumption: newConsumption}, function(err,docs){
    //             if(err){console.log(err)}
    //             else{}//console.log("Updated consumer : ", docs);}
    //         });
    //         i++;
    //     }
    // }
    async updateConsumption(Collection, mean, deviation){
        var gauss = this.gaussian;
        Collection.find().stream()
            .on('data', function(doc){
                let newConsumption = gauss(mean, deviation);

                Collection.findByIdAndUpdate(doc._id, {consumption: newConsumption}, function(err, result){
                    if(err){
                        console.log("Error in update: ",err);
                    }
                })

            });
    }

    async updateWind(Collection, mean, deviation)
    {
        // let content = await Collection.find();
        // content = this.collectionContentToArray(content);
        // let i = 0;
        // while(i < content.length)
        // {
        //     console.log(content[i].Wind);
        //     let newWind = this.gaussian(mean, deviation);
        //     Collection.findByIdAndUpdate(content[i]._id, {wind: newWind}, function(err,docs){
        //         if(err){console.log(err)}
        //         else{}//console.log("Updated consumer : ", docs);}
        //     });
        //     i++;
        // }
        var gauss = this.gaussian;
        Collection.find().stream()
            .on('data', function(doc){
                let newWind = gauss(mean, deviation);

                Collection.findByIdAndUpdate(doc._id, {wind: newWind}, function(err, result){
                    if(err){
                        console.log("Error in update: ",err);
                    }
                })

            });
    }

    async updateProduction(Collection)
    {
        // let content = await Collection.find();
        // content = this.collectionContentToArray(content);
        // let i = 0;
        // while(i<content.length)
        // {
        //     let wind = content[i].wind;
        //     let capacity = content[i].capacity;
        //     let production = this.calculateProduction(wind, capacity);
        //     Collection.findByIdAndUpdate(content[i]._id, {production: production},  function(err,docs){
        //         if(err){console.log(err)}
        //         else{}//console.log("Updated consumer : ", docs);}
        //     });

        //     i++;
        // }
        var productionFunc = this.calculateProduction;
        Collection.find().stream()
            .on('data', function(doc){
                let wind = doc.wind;
                let capacity = doc.production_capacity;
                let production = productionFunc(wind, capacity);

                Collection.findByIdAndUpdate(doc._id, {production: production}, function(err, result){
                    if(err){
                        console.log("Error in update: ",err);
                    }
                })

            });
    }

    //Helper methods
    calculateProduction(wind, prosumerCapacity)
    {
        return wind*prosumerCapacity;
    }
    calcBlackout(totalConsumption, currentConsumption, production){
        /**
         * Should enable blackout for individual house holds. 
         */
        if(totalConsumption>production){
            return true;
        }
        return false;
    }
    calcConsumerPrice(wind, currentConsumption) {
    /**
     * High wind will decerease the price. 
     * High consumption will increase the price. 
     * 
     * 0<wind≤1.5 = 3kr
     * 1.5<wind≤3.6 = 2kr
     * 3.6<wind<5 = 1.5kr
     * 5<wind = 0.5 kr
     * 
     * 
     */
        let price;
        if (wind < 1.5) {
            price = 3;
        }
        else if (wind < this.avgPrice && wind >= 1.5) {
            price = 2;
        }
        else if (wind < 5 && wind >= this.avgPrice) {
            price = 1.5;
        } else {
            price = 0.5;
        }

        if(currentConsumption<50)
            price = price*0.7;
        else if(currentConsumption<60 && currentConsumption>=50)
            price = price *0.8;
        else if(currentConsumption<70 && currentConsumption>=60)
            price = price *0.95;
        else if(currentConsumption<80 && currentConsumption>=70)
            price = price*1.05;
        else 
            price = price*1.30;

        return price;
    }
    collectionContentToArray(content)
    {
        content = JSON.stringify(content);
        content = JSON.parse(content);
        return content;
    }
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
        if (retval > 0)
            return retval;
        return -retval;
    }
}

module.exports = new simulator();