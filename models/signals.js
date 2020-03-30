var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var SignalSchema = new Schema({
    collabID   : {type: String, required: true},
    detail     : {type: String, required: true}
});

module.exports = mongoose.model("signal", SignalSchema);