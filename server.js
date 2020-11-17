var express = require('express'), 
app = express(), 
port = process.env.PORT || 3000,
mongoose = require('mongoose'),
schemas = require('./models/models'),
bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/M7011E');


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var routes = require('./routes/consumer_routes');
routes(app);

app.listen(port);

console.log('restful api server started on: ' + port);
