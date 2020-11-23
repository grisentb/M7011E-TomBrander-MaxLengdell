var mongoose = require('mongoose'),
uuid = require('uuid'),
UUID = mongoose.Types.UUID;

var Schema = mongoose.Schema;

var consumerSchema = new Schema({
    ID: {
        type: Number,
        required: 'Please enter your house ID',
        unique: true
    },
    Created_date:{
        type:Date,
        default: Date.now
    },
    Consumption:{
        type:Number,
        default: 0.0
    }
});
var prosumerSchema = new Schema({
    _id: {
        type: UUID,
        default: uuid
    },
    created_date:{
        type:Date,
        default: Date.now
    },
    consumption:{
        type:Number,
        default: 0.0
    },
    role: {
        type: [{
            type: String,
            enum: ['maintainer','prosumer']
        }],
        default: ['prosumer']
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
    }
},{id: false});
var userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    house_id: {
        type: Number,
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
    }
});
module.exports = mongoose.model('consumer', consumerSchema);
module.exports = mongoose.model('prosumer', prosumerSchema);
module.exports = mongoose.model('users', userSchema);
