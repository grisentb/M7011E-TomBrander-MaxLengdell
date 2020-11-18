function connectDatabase(){
    console.log("Trying to connect");
    schemas = require('./models');
    mongoose = require('mongoose');
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/M7011E');
    console.log("Connected");
}

connectDatabase();

var simulator = require('./simulator');
tick = 1000;
setInterval(() => {
    simulator.runSim();
}, tick);