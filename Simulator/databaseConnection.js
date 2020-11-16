//const uri = "mongodb+srv://simulator_admin:admin@130.240.200.39/";



function dbConnectionSetup(){
    var mongoose = require('mongoose'),
    Consumer = require('./models/models'),
    bodyParser = require('body-parser');
    
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/M7011E');
    
}
function connectToDB(){

}

function writePrice(){

}
function writeProduction(){


}