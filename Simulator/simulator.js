class simulator{
    constructor()
    {
        this.mongoose = require('mongoose');
        this.consumerCollection = this.mongoose.model('consumer');
        this.prosumerCollection = this.mongoose.model('prosumer');
        //this.connection = require('./databaseConnection');
    }
    runSim()
    {
        let tick = 1000; // 1 second
        let wind = this.gaussian(3.6,1);
        let consumption = this.gaussian(70,1);
        //prosumtion = ...
		let price = -1;
		//console.log("1");
		this.updateCollection(this.consumerCollection, this.gaussian, 70, 1, 'Consumption');
    }

    updateCollection(Collection, gaussianFunction,median, deviation, variableToChange)
    {
		//console.log(updateData);
		Collection.find().lean().exec(function (err, res) {
			if(err){
				console.log(err);
			} else {
				console.log(gaussianFunction(median,deviation).toString());
				var stringify_res = JSON.stringify(res);
				var parsed_res = JSON.parse(stringify_res);
				let i = 0;
				while(i<parsed_res.length)
				{
					console.log(parsed_res[i].Consumption);
					Collection.findByIdAndUpdate(parsed_res[i]._id, {Consumption: gaussianFunction(median, deviation)}, function(err,docs){
						if(err){console.log(err)}
						else{}//console.log("Updated consumer : ", docs);}
					});
					console.log("******************************");
					i++;
				}

			}
		});
		//setInterval(this.test(Collection, updateData), tick);
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