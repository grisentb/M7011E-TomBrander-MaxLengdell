var mongoose = require('mongoose'),
uuid = require('uuid-v4'),
UUID = mongoose.Types.uuid;

var Schema = mongoose.Schema;

var consumerSchema = new Schema({
    ID: {
        type: Number,
        required: 'Please enter your house ID',
        unique: true
    },
    created_date:{
        type:Date,
        default: Date.now
    },
    consumption:{
        type:Number,
        default: 0.0
    },
    prosumer:{
        type: String,
        required: 'Need prosumerId'
    },
    blackout:{
        type: Boolean,
        default: false
    }

});
var prosumerSchema = new Schema({
    created_date:{
        type:Date,
        default: Date.now
    },
    consumption:{
        type:Number,
        default: 0.0
    },
    production: {
        type: Number,
        default: 0.0
    },
    production_capacity: {
        type: Number,
        default: 0.0
    },
    wind: {
        type: Number,
        default: 0.0
    },
    buffer: {
        type: Number,
        default: 0.0
    },
    buffer_prod_ratio: {
        type: Number,
        default: 0.0
    },
    blocked: {
        type: Boolean,
        default: false
    }
});
var managerSchema = new Schema({
    production: {
        type: Number,
        default: 0.0
    },
    status: {
        type: String,
        default: 'stopped'
    },
    buffer: {
        type: Number,
        default: 0.0
    },
    buffer_to_prod: {
        type: Number,
        default: 0.0
    },
    manager_price: {
        type: Number,
        default: 0.0
    }
});
var userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    house_id: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    }, 
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    image: {
        type: String
    },
    logged_in: {
        type: Date,
        default: Date.now
    },
    logged_in_bool: {
        type: String,
        default: "false"
    }
});
module.exports = mongoose.model('consumer', consumerSchema);
module.exports = mongoose.model('prosumer', prosumerSchema);
module.exports = mongoose.model('manager', managerSchema);
module.exports = mongoose.model('users', userSchema);
