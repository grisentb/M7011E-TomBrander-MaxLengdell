
class databaseConnection{ 
    constructor(){
      
        this.mongoose = require('mongoose');
        this.schemas = require('./../models/models');
        this.Consumer = this.mongoose.model('consumer');
        this.Prosumer = this.mongoose.model('prosumer');
    }
    updatePrice(price, id){
      Consumer.findOneAndUpdate({ID: req.params.house_id}, {Consumption: req.params.consumption}, {new: true}, function(err, consumer) {
        if (err)
          res.send(err);
        res.json(consumer);
      });
    }
    getCollection(){
      var ret;
      this.Consumer.find({}, function(err, data){
        if(err){
          console.log("faulty ", err);
          return err;
        }else{
          ret = data
          //console.log(ret);
          return data;
        }
      });
      console.log(ret);
    }    
}
module.exports = new databaseConnection();

