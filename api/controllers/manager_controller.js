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
      let prosumers = await Prosumer.find({role: 'prosumer'});
      let consumers = await Consumer.find();
      let totalConsumption = 0.0;
      //Below this does not work :(
      for(let prosumer in prosumers)
      {
        console.log(prosumer);
        totalConsumption += prosumer.consumption;
      }
      for(let consumer in consumers)
      {
          totalConsumption += consumer.consumption;
      }
      //************* */
      console.log("Total consumption: ", totalConsumption);
      res.send(totalConsumption.toString);
  }
  exports.totalProduction = async function(req,res) {
      let prosumers = await Prosumer.find();
      let totalProduction = 0.0;
      for(let prosumer in prosumers)
      {
        totalProduction += prosumer.production;
      }
      console.log("Total production: ", totalProduction);
      res.send(totalProduction.toString);
  }
  exports.manager = async function(req,res) {
      let manager = await Prosumer.findOne({role: 'manager'});
      console.log("Manager doc: ", manager);
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