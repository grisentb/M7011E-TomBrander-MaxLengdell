
class simulator
{
    constructor()
    {
        this.mongoose = require('mongoose');
        this.consumer = mongoose.model('consumer');
    }
    
    runSim()
    {
        let consumers = this.consumer.find()
        let windFunc = gaussian(3.6, 1);
        let consumptionFunc = gaussian(70, 1); //Gaussian functions to predict next values of wind and consumptions

        let wind = 3.6;
        let consumption = 70;
        let price = -1;
        for(con in consumers)
        {
            console.log(con._id);
            wind = windFunc(wind);
            consumption = consumptionFunc(consumption);
            
            //this.consumer.findByIdAndUpdate(con._id);
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

    pushWindToDB()
    {

    }
}

let sim = new simulator();
sim.runSim();