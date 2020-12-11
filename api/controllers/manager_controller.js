var mongoose = require('mongoose'),
  Prosumer = mongoose.model('prosumer'),
  Users = mongoose.model('users'),
  Consumer = mongoose.model('consumer');

exports.prosumers = async function (req, res) {
  let users = [];
  users = await Users.find();
  //res.send(users);
  res.json(users);
}
exports.totalConsumption = async function (req, res) {
  let totalConsumption = 0.0;

  var prosumer_consump = await Prosumer.aggregate(
    [
      {
        $group:
        {
          _id: null,
          total: { $sum: "$consumption" }
        }
      }
    ]
  );

  var consumer_consump = await Consumer.aggregate(
    [
      {
        $group:
        {
          _id: null,
          total: { $sum: "$consumption" }
        }
      }
    ]
  );
  
  try {
    totalConsumption += prosumer_consump[0].total;
    totalConsumption += consumer[0].total;
  } catch (error) {
    //console.log(error);
    //console.log("probably no consumers exists");
  }


  //console.log("Total consumption: ", totalConsumption);
  res.json(totalConsumption);
}
exports.totalProduction = async function (req, res) {
  let prosumers = await Prosumer.find();
  var prosumer_consump = await Prosumer.aggregate(
    [
      {
        $group:
        {
          _id: null,
          total: { $sum: "$production" }
        }
      }
    ]
  );
  let totalProduction = prosumer_consump[0].total;

  //console.log("Total production: ", totalProduction);
  res.json(totalProduction.toString);
}
exports.manager = async function (req, res) {
  let manager = await Prosumer.findOne({ role: 'manager' });
  res.json(manager);
}
exports.registerManager = async function () {
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