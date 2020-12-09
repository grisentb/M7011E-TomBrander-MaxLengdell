var express = require('express'), 
session = require('express-session'),
uuid = require('uuid'),
app = express(), 
cors = require('cors'),
port = process.env.PORT || 4000,
schemas = require('./models/models');
var mongoose = require('mongoose');


app.use(cors());
connectDatabase();

app.use(express.urlencoded({extended: true}));
app.use(express.json());


var routes = require('./routes/consumer_routes');
var routes_prosumer = require('./routes/prosumer_routes');
var routes_user = require('./routes/user_routes');
var routes_manager = require('./routes/manager_routes');

routes(app);
routes_prosumer(app);
routes_user(app);
routes_manager(app);

app.listen(port);

console.log('restful api server started on: ' + port);

function connectDatabase(){
    console.log("Trying to connect");
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/M7011E');
    console.log("Connected");
}
module.exports = connectDatabase;