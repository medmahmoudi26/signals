var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name     : {type: String, required: true},
    surname  : {type: String, require: true},
    email    : {type: String, required: true, unique: true},
    password : {type: String, required: true},
    RH       : {type: String, required: true}
});

module.exports = mongoose.model("user", UserSchema);