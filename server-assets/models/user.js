var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var schemaName = "User";

var schema = new Schema({
 name: { type: String, required: true },
 avatar: {type: String},
 username: {type: String, required: true},
 //password: {type: Number}   optinoal to add later

});

module.exports = mongoose.model(schemaName, schema);