module.exports = function(app){
    var user = require('../controllers/user_controller');

    app.route('/login')
        .post(user.login)
    app.route('/register')
        .post(user.register)
        .get(user.getRegistered)
    //app.route('/verify:') verifying token with email...
}