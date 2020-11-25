var mongoose = require('mongoose'),
  Prosumer = mongoose.model('prosumer');

exports.home = function (req, res) {
  console.log("home");
  res.send('Welcome!');
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
      console.log("House : " + ID );
      console.log("TYPE: ", typeof(ID));
    })
    .catch(err => console.log("ERROR CREATING PROSUMER: ", err));


  console.log("house " + ID + " created");
  return ID;
}