module.exports = function(app){
    var user = require('../controllers/user_controller');

    app.route('/login')
        .post(user.login)
    app.route('/register')
        .post(user.register)
    app.route('/login/verifyToken?')
        .get(user.verifyToken)
    app.route('user')
        .get(user.getUser)
    app.route('/user/newpwd')
        .post(user.updatePassword)
    app.route('/user/uploadImg')
        .post(user.uploadImage)
}