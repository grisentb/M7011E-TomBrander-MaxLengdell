var mongoose = require('mongoose');
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
    prosumer: {
        type: String,
        default: "0"
    }
});
var prosumerSchema = new Schema({
    created_date:{
        type:Date,
        default: Date.now
    },
    role: {
        type: [{
            type: String,
            enum: ['maintainer','prosumer']
        }],
        default: ['prosumer']
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
        default: 1.0
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
    }
},{id: false});
module.exports = mongoose.model('consumer', consumerSchema);
module.exports = mongoose.model('prosumer', prosumerSchema);
