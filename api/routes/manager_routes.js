module.exports = function(app){
    var manager = require('../controllers/manager_controller');

    app.route('/manager/users')
        .get(manager.prosumers)
    app.route('/manager')
        .get(manager.manager)
    app.route('/manager/consumption')
        .get(manager.totalConsumption)
    app.route('/manager/production')
        .post(manager.setProductionStatus)
        .get(manager.totalProduction)
    app.route('/manager/buffer')
        .post(manager.bufferRatio)
    app.route('/manager/verify')
        .get(manager.verifyManager)
    app.route('/manager/setPrice')
        .post(manager.setManagerPrice)
    app.route('/manager/profile/getuser')
        .get(manager.getUsers)
    app.route('/manager/profile/delete')
        .delete(manager.deleteUser)
    app.route('/manager/blockuser')
        .post(manager.blockUser)


}
