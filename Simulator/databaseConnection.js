var mongoose;
var Consumer;
var Prosumer;
class databaseConnection{ 
    constructor(){
        mongoose = require('mongoose');
        Consumer = mongoose.model('consumer');
        //Prosumer = mongoose.model('prosumer');
    }
    writePrice(price, id){
        exports.updateConsumption = function(req, res) {
        Consumer.findOneAndUpdate({_id: req.params.ID}, req.body, {new: true}, function(err, consumer) {
            if (err)
              res.send(err);
            res.json(consumer);
          });
    }
    }
    writeProduction(production){
    
    }
}
