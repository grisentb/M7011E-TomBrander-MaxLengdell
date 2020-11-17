var express = require('express'), 
app = express(), 
port = process.env.PORT || 3000,
mongoose = require('mongoose'),
bodyParser = require('body-parser');
schemas = require('./models/models');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/M7011E');


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var routes = require('./routes/consumer_routes');
routes(app);


var simulator = require('./Simulator/simulator');
simulator.runSim();


app.listen(port);

console.log('restful api server started on: ' + port);
