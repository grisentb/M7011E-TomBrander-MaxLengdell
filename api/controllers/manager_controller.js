

var mongoose = require('mongoose'),
  Prosumer = mongoose.model('prosumer'),
  Users = mongoose.model('users'),
  Consumer = mongoose.model('consumer'),
  Manager = mongoose.model('manager');


exports.prosumers = async function (req, res) {
  //Find all users and send their data + prosumption info
  let users = [];
  users = await Prosumer.find();
  //res.send(users);
  res.json(users);

  // await Users.find().stream()
  //   .on('data', async function (doc) {
  //     await Prosumer.findById(doc.house_id).then(async res => {
  //       const prosumerData = res;
  //       console.log("res from db; ",res);
  //       await users.push(prosumerData);
  //     }).catch(err => {
  //       console.log("error getting prosumer data for manager: ", err);
  //     })
  //   })
  // console.log("total returned: ", users);

  //res.json(users);
}
exports.deleteUser = async function(req,res){
  const user = req.body.user;
  const house_id = req.body.house_id;
  console.log(user +  " : " + house_id)
  Users.deleteOne({email: user}, function(err) {
    if(err) console.log(err);
  }).then(resp => {
    Prosumer.deleteOne({_id: house_id});
    res.status(200);
    console.log("Deleted user and household");
  })
}
exports.getUsers = async function(req, res) {
  Users.find({"email": {"$ne": "admin@admin.com"}}).then(resp => {
    //console.log(resp);
    res.json(resp);
  })
}
exports.verifyManager = async function (req, res) {
  let email = req.query.email;
  console.log("VERIFY MANAGER:", email)
  Users.find({email: email}).then(resp => {
    console.log("resp:", resp[0]);
    console.log("User house_ID", resp.house_id);
    Manager.find({_id: resp[0].house_id}).then(managerResp => {
      console.log("Manager response: ", managerResp);
      if(managerResp.length > 0){
        res.json('true')
      }else{
        res.json('false')
      }
    }).catch(err => {
      console.log(err);
    })
  })

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
  let manager = await Manager.findOne();
  res.json(manager);
}
exports.registerManager = async function () {
  var ID;
  console.log("register manager");
  const newHouse = new Manager();
  await newHouse.save()
    .then(house => {
      console.log("Manager: ", house);
      ID = JSON.stringify(house._id)
    })
    .catch(err => console.log("ERROR CREATING MANAGER: ", err));

  return ID;
}
exports.findManager = async function (house_id) {
  console.log("ID: ", house_id);
  var ret = await Manager.findOne({ _id: house_id }).then(res => {
    console.log(res);
    if (res) {
      console.log("true");

      return true;
    }
    console.log("false");
    return false;
  })
  return ret;
}
exports.bufferRatio = async function(req, res){
  console.log(req.body);
  id = req.body._id;
  bpr = req.body.value;
  await Manager.findOneAndUpdate({_id: id}, {buffer_to_prod: bpr});
  res.send(true)
}
exports.setProductionStatus = async function (req,res){
  id = req.body._id;
  var data;
  manager = await Manager.findOne({_id: id});
  if(manager.status == "stopped"){
    data = "starting"
  }else {
    data = "stopped"
  }
  console.log(data);
  await Manager.findOneAndUpdate({_id: id}, {status: data});
  res.send(true);
}