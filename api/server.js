var express = require('express'), 
session = require('express-session'),
uuid = require('uuid'),
app = express(), 
port = process.env.PORT || 80,
schemas = require('./models/models');
var mongoose = require('mongoose');

connectDatabase();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

var routes = require('./routes/consumer_routes');
var routes_prosumer = require('./routes/prosumer_routes');
var routes_user = require('./routes/user_routes');

routes(app);
routes_prosumer(app);
routes_user(app);

app.listen(port);

console.log('restful api server started on: ' + port);

function connectDatabase(){
    console.log("Trying to connect");
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/M7011E');
    console.log("Connected");
}
module.exports = connectDatabase;