var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CollabSchema = new Schema({
    name     : {type: String, required: true},
    surname  : {type: String, require: true},
    center   : {type: String, required: true},
    work     : {type: String, required: true},
    mark     : {type: String, required: true}
});

module.exports = mongoose.model("collab", CollabSchema);