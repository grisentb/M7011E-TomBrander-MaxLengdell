module.exports = function(app){
    var consumer = require('../controllers/consumer_controller');

    app.route('/consumer/consumption')
        .get(consumer.listAllClients)
        .put(consumer.updateConsumption)
        .post(consumer.createHousehold)
}