
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
    getList(){
      console.log("printing");
      this.Consumer.find({}, function(err, data){
        console.log("test")

        if(err){
          console.log("faulty ", err);
          return err;
        }else{
          console.log("Everything from the db: ", data)
          return data;
        }
      });
    }    
    test(){
      console.log("running");
      this.getList();
    }
    print(){
      console.log("****** HALLÅÅÅ******");
    }
}
module.exports = new databaseConnection();

