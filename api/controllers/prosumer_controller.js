var mongoose = require('mongoose'),
  Prosumer = mongoose.model('prosumer'),
  Users = mongoose.model('users');

exports.home = async function (req, res) {
  let user = await Users.findOne({email: "tom@123.se"});
  let houseID = user.house_id.substring(1, user.house_id.length - 1);
  let correspondingProsumer = await Prosumer.findOne({_id: houseID});
  res.send(correspondingProsumer);
}
exports.home_secret = function (req, res) {
  res.send('The password is potato');
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
  console.log("Takes this long time...");
  res.send(req.body.value);
}