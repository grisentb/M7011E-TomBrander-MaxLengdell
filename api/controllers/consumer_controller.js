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

exports.blackouts = async function(req,res) {
  var prosumerId = req.query._id;
  var netProduction = req.query.prod;
  var consumers = await Consumer.find({prosumer: query_id});

  var blackouts = []
  for(var consumer in consumers)
  {
    netProd -= consumer.consumption;
    if(netProduction < 0)
    {
      blackouts.push(consumer);
    }
  }
  res.send(blackouts);
}
exports.createHousehold = async function(req, res) {
    var prosumer = req.query._id;
    var new_House = new Consumer(req.body);
    let prosumers = await Prosumer.find();
    let id = prosumers[Math.random(0,len(random) - 1)]
    new_House._id = id;
    new_House.prosumer = prosumer;
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
