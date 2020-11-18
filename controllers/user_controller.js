var mongoose = require('mongoose'),
    User = mongoose.model('users');
const validateRegisterInput = require('../Frontend/validation/register'),
    validateLoginInput = require('../Frontend/validation/login'),
    bcrypt = require('bcryptjs'),
    jwtStrategy = require('passport-jwt').Strategy,
    extractJwt = require('passport-jwt').ExtractJwt,
    keys = require('../config/keys'),
    jwt = require('jsonwebtoken');




exports.login = function (req, res) {
    const { errors, isValid } = validateLoginInput(req.body);

    //Validate
    if (!isValid)
        res.send(res.status(400).json(errors));
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email }).then(user => {
        //Check if user exists
        if (!user) {
            res.send(res.status(404).json({ emailnotfound: "Email not found" }));
        }
        //Check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                //Correct pwd. Create tokens & all that
                const payload = {
                    id: user.id,
                    name: user.name
                };

                //Signing token
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: 30000000
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer" + token
                        });
                    }
                );
            } else {
                return res.status(400).json({ passwordincorrect:"Password incorrect"});
            }
        });
    });
}
exports.getRegistered = function (req, res) {
    User.find({}, function (err, consumer) {
        if (err)
            res.send(err);
        res.json(consumer);
    });
};


exports.register = function (req, res) {
    const { errors, isValid } = validateRegisterInput(req.body);
    if (!isValid) {
        res.send(res.status(400).json(errors));
    }
    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            console.log("Email already exists");
            res.send(res.status(400).json({ email: "Email already exists" }));
        }
        else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });
            console.log("saving");
            //Hashing password
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            });
        }
    });
};

