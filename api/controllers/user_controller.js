var mongoose = require('mongoose'),
    User = mongoose.model('users'),
    bcrypt = require('bcryptjs'),
    jwtStrategy = require('passport-jwt').Strategy,
    extractJwt = require('passport-jwt').ExtractJwt,
    keys = require('../config/keys'),
    jwt = require('jsonwebtoken'),
    path = require('path'),
    prosumer_controller = require('./prosumer_controller');

exports.verifyToken = function (req, res) {
    var token = req.query.token;
    if(!token){
        return res.status(400).json({
            error: true,
            message: "Token is required."
        });
    }else {
        //Verify token. If it returns expired or 
        //incorrect it will cast a error and return 401
        jwt.verify(token, keys.secretOrKey, function (err, user) {
            if(err){
                res.status(401).json({
                    error: true,
                    message: "Incorrect token"
                });
            }else {
                return res.json({token: token, user: user})
            }            
            // if(user.email !== req.body.email){
            //     console.log("not the same user");
            //     res.status(401).json({
            //         error: true,
            //         message: "Incorrect user"
            //     });
            // }
            
        });

    }
}

exports.login = function (req, res) {

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email }).then(user => {
        //Check if user exists
        if (user == null) {
            console.log("user not found");
            //console.log(res.status(404).json({ emailnotfound: "Email not found" }));
            //res.send(res.status(404).json({ emailnotfound: "Email not found" }));
            res.status(404).send({error: "incorrect email"});
        }
        else {
            console.log("user found!");
            //Check password
            bcrypt.compare(password, user.password).then(isMatch => {
                if (isMatch) {
                    //Correct pwd. Create tokens & all that
                    console.log("correct password");
                    const payload = {
                        email: email
                    };

                    //Signing token
                    jwt.sign(
                        payload,
                        keys.secretOrKey,
                        {
                            expiresIn: 1800 //30 minutes
                        },
                        (err, token) => {
                            res.json({
                                success: true,
                                token: token,
                                email: email
                            });
                        }
                    );
                } else {
                    console.log("password did not match");
                    res.status(404).send({error: "incorrect password"});
                }
            });
        }
    });

}

exports.register = function (req, res) {
    /**
     * Check if user exists, if he does -> return
     * else:
     *      create a house and attach that house_id to the user we're about to create
     * If creation of either house or user failed, they should be deleted
     */

    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            console.log("Email already exists");
            res.send(res.status(400).json({ email: "Email already exists" }));
        } else {
            //Register a house
            prosumer_controller.registerProsumer().then(house_id =>{
                registerUser(req.body.name, req.body.email, house_id, req.body.password);
            })
            
        }
    });
}


 function registerUser(name, email, house_id, password) {

    //Register household and then user
    var ret_user;
    const newUser = new User({
        name: name,
        email: email,
        house_id: house_id,
        password: password
    });
    console.log("saving");
    //Hashing password
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) =>  {
            if (err) throw err;
            newUser.password = hash;
            newUser.save()
                .then(user => {ret_user = user})
                .catch(err => console.log(err));
        });
    });
    return ret_user;

}