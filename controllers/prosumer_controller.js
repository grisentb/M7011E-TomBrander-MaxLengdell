var mongoose = require('mongoose'),
    Prosumer = mongoose.model('prosumer');

exports.home = function(req, res){
    console.log("home");
    res.send('Welcome!');
}
exports.home_secret = function(req, res){
  res.send('The password is potato');
}