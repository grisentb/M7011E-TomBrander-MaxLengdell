var mongoose = require('mongoose');
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
    },
    Role: {
        type: [{
            type: String,
            enum: ['maintainer','prosumer']
        }],
        default: ['prosumer']
    },
    Production: {
        type: Number,
        default: 0.0
    }
});
var userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }, 
    password: {
        type: String,
        required: true
    },
    data: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('consumer', consumerSchema);
module.exports = mongoose.model('prosumer', prosumerSchema);
module.exports = mongoose.model('users', userSchema);
