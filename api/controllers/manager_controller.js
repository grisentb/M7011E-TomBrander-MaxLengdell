var mongoose = require('mongoose'),
  Prosumer = mongoose.model('prosumer'),
  Users = mongoose.model('users'),
  Consumer = mongoose.model('consumer');

  exports.prosumers = async function(req, res) {
    let users = [];
    users = await Users.find();
    res.send(users);
  }
  exports.totalConsumption = async function(req,res) {
      let prosumers = await Prosumer.find({Role: 'prosumer'});
      let consumers = await Consumer.find();
      let totalConsumption = 0.0;
      for(let prosumer in prosumers)
      {
        totalConsumption += prosumer.consumption;
      }
      for(let consumer in consumers)
      {
          totalConsumption += consumer.consumption;
      }
      res.send(totalConsumption);
  }
  exports.totalProduction = async function(req,res) {
      let prosumers = await Prosumer.find();
      let totalProduction = 0.0;
      for(let prosumer in prosumers)
      {
        totalProduction += prosumer.production;
      }
      res.send(totalProduction);
  }
  exports.manager = async function(req,res) {
      let manager = await Prosumer.findOne({Role: 'manager'});
      res.send(manager);
  }
  exports.registerManager = async function(){
    var ID;
    console.log("register manager");
    const newHouse = new Prosumer({
      role: 'manager'
    });
    await newHouse.save()
      .then(house => {
        //console.log(house);
        ID = JSON.stringify(house._id)
      })
      .catch(err => console.log("ERROR CREATING PROSUMER: ", err));
  
    return ID;
  }