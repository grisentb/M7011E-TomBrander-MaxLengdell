var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var consumer = new Schema({
    ID: {
        type: int,
        required: 'Please enter your house ID'
    },
    Created_date:{
        type:Date,
        default: Date.now
    },
    Consumption:{
        type:float,
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

module.exports = mongoose.model('Consumer', consumer);
