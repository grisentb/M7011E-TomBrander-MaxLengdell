var express = require('express'), 
app = express(), 
port = process.env.PORT || 3000,
bodyParser = require('body-parser'),
schemas = require('./models/models');
var mongoose;
connectDatabase();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var routes = require('./routes/consumer_routes');
routes(app);


var simulator = require('./Simulator/simulator');
tick = 1000;
setInterval(() => {
    simulator.runSim();
}, tick);


app.listen(port);

console.log('restful api server started on: ' + port);

function connectDatabase(){
    console.log("Trying to connect");
    mongoose = require('mongoose');
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/M7011E');
    console.log("Connected");
}
module.exports = connectDatabase;