module.exports = function(app){
    var prosumer = require('../controllers/prosumer_controller');
    app.route('/home')
        .get(prosumer.home)
    app.route('/home/capacity')
        .post(prosumer.updateCapacity)

}