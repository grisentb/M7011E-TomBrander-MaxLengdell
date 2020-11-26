var mongoose = require('mongoose'),
    Prosumer = mongoose.model('prosumer');

exports.home = function(req, res){
    console.log(req.query._id);
    Prosumer.findOne({_id: 1}, function (err, prosumer){
      if(err){res.send(err);}
      else{
        console.log(prosumer);
        res.json(prosumer);
      }
    });
};
exports.home_secret = function(req, res){
  res.send('The password is potato');
};