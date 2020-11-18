var mongoose = require('mongoose'),
    Consumer = mongoose.model('consumer'),
    Prosumer = mongoose.model('prosumer');

exports.listAllClients = function(req, res) {
    Consumer.find({}, function(err, consumer){
      if(err)
        res.send(err);
      res.json(consumer);
    });
  }; 

exports.createHousehold = function(req, res) {
    //Todo
    var new_House = new Consumer(req.body);
    new_House.save(function(err, consumer){
      if(err){
      console.log("something broke during saving");
        res.send(err);
      res.json(consumer);
      }
    });
};
exports.getConsumption = function(req, res){
  //console.log("Requested parameter: ", req.params.house_id, "consumption: ", req.params.consumption);
  Consumer.find({ID: req.params.house_id}, function(err, consumer){
   if(err){
    console.log("someting broke during getConsumption");
    res.send(err);
   }else{    res.json(consumer);
   }
  });
};
exports.updateConsumption = function(req, res) {
  //console.log("Requested parameter: ", req.params.house_id, "consumption: ", req.params.consumption);
    Consumer.findOneAndUpdate({ID: req.params.house_id}, {Consumption: req.params.consumption}, {new: true}, function(err, consumer) {
        if (err)
          res.send(err);
        res.json(consumer);
      });
}
