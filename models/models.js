var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var consumerSchema = new Schema({
    ID: {
        type: Number,
        required: 'Please enter your house ID'
    },
    Created_date:{
        type:Date,
        default: Date.now
    },
    Consumption:{
        type:Number,
        default: 0.0
    },
    status: {
        type: [{
            type: String,
            enum: ['running','idle']
        }],
        default: ['running']
    }
});

module.exports = mongoose.model('Consumer', consumerSchema);
