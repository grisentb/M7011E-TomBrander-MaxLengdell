

module.exports = function (app) {
    var multer = require('multer');
    var user = require('../controllers/user_controller');
    // SET STORAGE
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, __dirname + './../public/images/')
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + req.query.user+'.jpg');
        }
    });
    var upload = multer({ storage: storage });
    app.route('/user/profile')
        .get(user.getProfile);
    app.route('/login')
        .post(user.login);
    app.route('/register')
        .post(user.register);
    app.route('/login/verifyToken?')
        .get(user.verifyToken);
    app.route('/user?')
        .get(user.getImage);
    app.route('/user/newpwd')
        .post(user.updatePassword);
    app.route('/user/uploadImg?')
        .post(upload.single('image'), user.uploadImage);


}