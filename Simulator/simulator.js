
class simulator {
    constructor() {
        this.connection = require('./databaseConnection');
        this.avgWind = 3.6;
        this.avgPrice = 1.5;
    }
    runSim() {
        let wind = this.gaussian(this.avgWind, 1);
        let consumption = this.gaussian(70, 1);
        //prosumtion = ...
        let price = this.avgPrice;

        let consumerCollection = this.connection.getCollection();

        for (var consumer in consumerCollection) {
            wind = this.gaussian(3.6, 1);
            consumption = this.gaussian(70, 1);

            price = this.calcConsumerPrice(wind, consumption);

            //this.connection();//.updateCollection(wind, consumption);
        }
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