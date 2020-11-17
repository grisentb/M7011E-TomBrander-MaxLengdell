module.exports = function(app){
    var consumer = require('../controllers/consumer_controller');

    app.route('/consumer/consumption')
        .get(consumer.listAllClients)
        .post(consumer.createHousehold)
    app.route('/consumer/consumption/:house_id')
        .put(consumer.updateConsumption)
        .get(consumer.getConsumption)
}