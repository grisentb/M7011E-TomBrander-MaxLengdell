var mongoose = require('mongoose'),
  Prosumer = mongoose.model('prosumer'),
  Users = mongoose.model('users');

exports.home = async function (req, res) {
  let email = req.query.email;
  let user = await Users.findOne({email: email});
  let houseID = user.house_id;
  houseID = houseID.substring(1,houseID.length - 1);
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
    .then(house => {
      //console.log(house);
      ID = JSON.stringify(house._id)
    })
    .catch(err => console.log("ERROR CREATING PROSUMER: ", err));

  return ID;
}
exports.updateCapacity = async function (req, res) {
  console.log(req.body);
  await Prosumer.findOneAndUpdate({_id: req.body._id}, {production_capacity: req.body.value});
  res.send(req.body.value);
}