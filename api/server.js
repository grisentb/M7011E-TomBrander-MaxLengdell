var express = require('express'), 
http = require('http'),
https = require('https'),
fs = require ('fs'),
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

var privateKey = fs.readFileSync('keys/server.key', 'utf8')
var certificate = fs.readFileSync('keys/server.cert', 'utf8')

//app.listen(port);
var credentials = {key: privateKey, cert: certificate};

app.use(function(req, res, next) {
    // if(req.secure){
    //     next();
    // }else {
    //     console.log(req.headers.host + " ---- " +  req.url);
    //     res.redirect('https://' + req.headers.host + req.url, 4500)
    // }
})


var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);


app.get('*', function(req, res) {
    console.log("redirect");
    res.redirect('https://' + req.headers.host + req.url);
})

//httpServer.listen(4000)
httpsServer.listen(4000)



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