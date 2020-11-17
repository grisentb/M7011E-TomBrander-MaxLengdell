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
    },
    Role: {
        type: [{
            type: String,
            enum: ['maintainer','prosumer','consumer']
        }],
        default: ['consumer']
    },
    Production: {
        type: Number,
        default: 0.0
    }
});

module.exports = mongoose.model('consumer', consumerSchema);
