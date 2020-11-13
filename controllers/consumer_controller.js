var mongoose = require('mongoose'),
    consumer = mongoose.model('consumer');

exports.updateConsumption = function(req, res) {
    consumer.findOneAndUpdate({_id: req.params.ID}, req.body, {new: true}, function(err, consumer) {
        if (err)
          res.send(err);
        res.json(consumer);
      });
}