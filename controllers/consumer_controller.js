var mongoose = require('mongoose'),
    Consumer = mongoose.model('consumer');

exports.updateConsumption = function(req, res) {
    console.log("put parameters: ", String(req.params['id']));
    Consumer.findOneAndUpdate({_id: req.params.ID}, req.body, {new: true}, function(err, consumer) {
        if (err)
          res.send(err);
        res.json(consumer);
      });
}

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
  Consumer.find({ID: '1337'},function(err, consumer){
    if(err)
      console.log("could not load specified consumption");
      res.send(err);
    res.send(consumer);
  }
    
    
    ).exec();
}