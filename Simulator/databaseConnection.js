
class databaseConnection{ 
    constructor(){
      
        this.mongoose = require('mongoose');
        
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
      this.Consumer.find({}, function(err, consumer){
        if(err){
          console.log(err);
          return err;
        }else{
          console.log(consumer)
          return json(consumer);
        }
      });
    }; 
}

function test(){
  console.log("running");
  var db = new databaseConnection();
  console.log(db.getList());
}
module.export = new databaseConnection();

test();
