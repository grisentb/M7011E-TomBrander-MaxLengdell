module.exports = function(app){
    var user = require('../controllers/user_controller');

    app.route('/login')
        .post(user.login)
        .get(user.loginPage)
    app.route('/register')
        .post(user.register)
        .get(user.getRegistered)
}