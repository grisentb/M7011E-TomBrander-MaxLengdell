var express = require('express'), 
https = require('https'),
session = require('express-session'),
uuid = require('uuid'),
app = express(), 
cors = require('cors'),
port = process.env.PORT || 4000,
schemas = require('./models/models');
var mongoose = require('mongoose');
var user_controller = require('./controllers/user_controller');
var manager_controller = require('./controllers/manager_controller');
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
    checkManager();
}
async function checkManager(){
    var Manager = mongoose.model('manager');

    await Manager.findOne().then(res => {
        if(!res){
            console.log("Manager does not exist");
            createManager();
        }else{
            console.log("Manager does exist");
        }
    }).catch(err => {
        console.log(err);
    })
}
async function createManager(){
    //Register manager
    const manager_id = await manager_controller.registerManager();
    user_controller.registerUser('admin', 'admin@admin.com',manager_id, 'admin');
    console.log("Manager with credentials: admin, admin was generated");
}
module.exports = connectDatabase;