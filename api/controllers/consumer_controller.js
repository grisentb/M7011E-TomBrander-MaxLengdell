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

exports.blackouts = async function(req, res) {
  var prosumerId = req.query._id;
  var netProduction = req.query.netProd;
  var consumers = await Consumer.find({prosumer: prosumerId});
  var blackouts = [];
  for(var i in consumers)
  {
    netProduction -= consumers[i].consumption;
    if(netProduction < 0)
    {
      Consumer.findOneAndUpdate({_id: consumers[i]._id}, {blackout: true});
      blackouts.push(consumers[i].ID);
    }else{
      Consumer.findOneAndUpdate({_id: consumers[i]._id}, {blackout: false});
    }
  }
  res.send(blackouts);
}
exports.createHousehold = async function(req, res) {
    var prosumer = req.body._id;
    let ID = await Consumer.countDocuments();
    ID += 1;
    console.log("CREATING WITH ID: " + ID + " and prosumer: " + prosumer);
    var new_House = new Consumer({ID: ID, prosumer: prosumer});
    new_House.prosumer = prosumer;
    new_House.save(function(err, consumer){
      if(err){
        console.log("something broke during saving " + err);
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
exports.getConsumerPerProsumer = function(req, res) {
    const belongsToProsumer = req.query._id;
    Consumer.find({prosumer: belongsToProsumer}).then(resp => {
      res.json(resp);
    }).catch(err => {
      console.log(err);
    })
}