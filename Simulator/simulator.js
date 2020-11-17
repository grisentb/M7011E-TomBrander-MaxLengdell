
class simulator{
    constructor()
    {
        this.connection = require('./Simulator/databaseConnection');
    }
    runSim()
    {
        let wind = this.gaussian(3.6,1);
        let consumption = this.gaussian(70,1);
        //prosumtion = ...
        price = -1;

        let consumerCollection = [];//this.connectoin.getCollection();

        for(var consumer in consumerCollection)
        {
            wind = this.gaussian(3.6,1);
            consumption = this.gaussian(70,1);

            price = this.calcPrice(wind, consumption);

            this.connection();//.updateCollection(wind, consumption);
        }
    }
    gaussian(mean, stdev) {
        var y2;
        var use_last = false;
        
        var y1;
        if(use_last) {
            y1 = y2;
            use_last = false;
        }
        else {
            var x1, x2, w;
            do {
                    x1 = 2.0 * Math.random() - 1.0;
                    x2 = 2.0 * Math.random() - 1.0;
                    w  = x1 * x1 + x2 * x2;               
            } while( w >= 1.0);
            w = Math.sqrt((-2.0 * Math.log(w))/w);
            y1 = x1 * w;
            y2 = x2 * w;
            use_last = true;
        }

        var retval = mean + stdev * y1;
        if(retval > 0) 
            return retval;
        return -retval;
    }
    calcPrice(wind, currentConsumption)
    {
        let price = 1.5;
        return price;
    }
}

module.exports = new simulator();