var mongoose = require('mongoose'),
    Consumer = mongoose.model('consumer');

exports.updateConsumption = function(req, res) {
    Consumer.findOneAndUpdate({_id: req.params.ID}, req.body, {new: true}, function(err, consumer) {
        if (err)
          res.send(err);
        res.json(consumer);
      });
}

exports.createHousehold = function(req, res) {
    //Todo
}