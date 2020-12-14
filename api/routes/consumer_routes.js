module.exports = function(app){
    var consumer = require('../controllers/consumer_controller');

    app.route('/consumer/consumption')
        .get(consumer.listAllClients)
        .post(consumer.createHousehold)
    app.route('/consumer/consumption/:house_id')
        .get(consumer.getConsumption)
    app.route('/consumer/consumption/:house_id/:consumption')
        .put(consumer.updateConsumption)
    app.route('/consumer/blackout')
        .get(consumer.blackouts)
    app.route('/consumer/prosumer')
        .get(consumer.getConsumerPerProsumer)

}