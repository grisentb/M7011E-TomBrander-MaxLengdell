const { calcConsumerPrice } = require('../../Simulator/simulator');

var mongoose = require('mongoose'),
  Prosumer = mongoose.model('prosumer'),
  Users = mongoose.model('users'),
  Managers = mongoose.model('manager'),
  Consumer = mongoose.model('consumer');

exports.home = async function (req, res) {
  let email = req.query.email;
  let user = await Users.findOne({email: email});
  let houseID = user.house_id;
  //houseID = houseID.substring(1,houseID.length - 1);
  //console.log(houseID);
  let correspondingProsumer = await Prosumer.findOne({_id: houseID});
  //console.log(correspondingProsumer);
  res.send(correspondingProsumer);
}

exports.registerProsumer = async function () {
  var ID;
  console.log("register house");
  const newHouse = new Prosumer();
  await newHouse.save()
    .then(async house => {
      //console.log(house + "###########################");
      ID = await JSON.stringify(house._id)
    })
    .catch(err => console.log("ERROR CREATING PROSUMER: ", err));

  return ID;
}
exports.updateCapacity = async function (req, res) {
  console.log(req.body);
  await Prosumer.findOneAndUpdate({_id: req.body._id}, {production_capacity: req.body.value});
  res.send(req.body.value);
}
exports.getPrice = async function(req, res){
  let totalConsum = 0;
  let totalNetProd = 0;
  let totalBuffer = 0;
  let price = 0;

  let manager = await Managers.findOne();
  if(manager.manager_price != 0){
    price = manager.manager_price;
    res.send(price.toString());
    return;
  }
  let consumers = await Consumer.find();
  for(let i in consumers)
  {
    totalConsum += consumers[i].consumption;
  }

  let prosumers = await Prosumer.find();
  for(let i in prosumers)
  {
    totalNetProd += prosumers[i].production - prosumers[i].consumption;
    totalBuffer += prosumers[i].buffer;
  }

  price = calcPrice(totalConsum, totalNetProd, totalBuffer)

  res.send(price.toString());
}
function calcPrice(totalConsum, totalNetProd, totalBuffer){
  
  if(totalConsum > totalNetProd+(0.1*totalBuffer)){
    return 4.5
  }else if(totalConsum > totalNetProd){
    return 3.0
  }else{
    return 1.5
  }
}
exports.updateRatio = async function(req, res){
  let prosumer = await Prosumer.findOne({_id: req.body._id});
  if(prosumer.buffer <= 0)
  {
    res.send(false);
  }else{
    let change = await Prosumer.updateOne({_id: req.body._id}, {$set:{buffer_prod_ratio: req.body.value}});
    res.send(true);
  }
}
exports.getRole = async function(house_id){
  console.log("ID: " + house_id);
  var role;
  await Prosumer.findOne({_id: house_id}).then(res => {
    role = res.role[0];
  })
  return role;
}
exports.setLoggedIn = function(house_id){
  console.log("logged in: ", house_id);
  const today = Date();
  console.log(today);
  Users.findByIdAndUpdate({_id: house_id}, {logged_in: (Date())}).then(resp => {
    console.log(resp);
  }).catch(err =>{
    console.log(err);
  })
  Prosumer.findByIdAndUpdate({_id: house_id}, {logged_in: (Date())}).then(resp => {
    console.log(resp);
  }).catch(err =>{
    console.log(err);
  })
}
