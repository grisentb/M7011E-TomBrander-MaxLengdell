
class databaseConnection{ 
    constructor(){
        this.mongoose = require('mongoose');
        this.Consumer = mongoose.model('consumer');
        //Prosumer = mongoose.model('prosumer');
    }
    writePrice(price, id){
        exports.updateConsumption = function(req, res) {
        this.Consumer.findOneAndUpdate({_id: req.params.ID}, req.body, {new: true}, function(err, consumer) {
            if (err)
              res.send(err);
            res.json(consumer);
          });
    }
    }
    writeProduction(production){
    
    }
}
