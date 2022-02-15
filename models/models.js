var mongoose = require("mongoose");

var Schema = mongoose.Schema;

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