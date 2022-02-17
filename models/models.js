var mongoose = require("mongoose");

var Schema = mongoose.Schema;

// Record schema for raw response from database
var recordSchema = new Schema({
    
    key: {
        type: String
    },
    createdAt: {
        type: Date
    },
    counts: {
        type: [Number]
    }
        
});

module.exports = mongoose.model("record", recordSchema);