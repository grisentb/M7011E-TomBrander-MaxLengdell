module.exports = function(app){
    var user = require('../controllers/user_controller');

    app.route('/login')
        .post(user.login)
    app.route('/register')
        .post(user.register)
    app.route('/login/verifyToken?')
        .get(user.verifyToken)
    app.route('user/newpwd')
        .push(user.updatePassword)
}