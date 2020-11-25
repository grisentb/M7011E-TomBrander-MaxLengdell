var mongoose = require('mongoose'),
    User = mongoose.model('users');

const bcrypt = require('bcryptjs'),
    jwtStrategy = require('passport-jwt').Strategy,
    extractJwt = require('passport-jwt').ExtractJwt,
    keys = require('../config/keys'),
    jwt = require('jsonwebtoken'),
    path = require('path');

exports.login_test = function (req, res) {
    console.log(req.body);

}
exports.login = function (req, res) {

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email }).then(user => {
        //Check if user exists
        if (user == null) {
            console.log("user not found");
            res.send(res.status(404).json({ emailnotfound: "Email not found" }));
        }
        else {
            console.log("user found!");
            //Check password
            bcrypt.compare(password, user.password).then(isMatch => {
                if (isMatch) {
                    //Correct pwd. Create tokens & all that
                    console.log("correct password");
                    const payload = {
                        id: user.id,
                        name: user.name
                    };

                    //Signing token
                    jwt.sign(
                        payload,
                        keys.secretOrKey,
                        {
                            expiresIn: 20
                        },
                        (err, token) => {
                            res.json({
                                success: true,
                                token: "Bearer" + token,
                                user: email
                            });
                        }
                    );
                } else {
                    console.log("password did not match");
                    return res.status(400).json({ passwordincorrect: "Password incorrect" });
                }
            });
        }
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

    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            console.log("Email already exists");
            res.send(res.status(400).json({ email: "Email already exists" }));
        }
        else {
            //Register household and then user
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                house_id: req.body.house_id,
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


function registerHouse(consumption, production, wind, buffer){
    const newHouse = new prosumer
}