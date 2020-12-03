module.exports = function(app){
    var prosumer = require('../controllers/prosumer_controller');
    app.route('/home')
        .get(prosumer.home)
    app.route('/home/capacity')
        .post(prosumer.updateCapacity)
    app.route('/home/price')
        .get(prosumer.getPrice)
    app.route('/home/ratio')
        .post(prosumer.updateRatio)
}