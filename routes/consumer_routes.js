module.exports = function(app){
    var consumer = require('../controllers/consumer_controller');

    app.route('/consumer/consumption')
        .put(consumer.updateConsumption)

}