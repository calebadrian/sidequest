
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var SchemaName = "Post";
var ObjectId = mongoose.SchemaTypes.ObjectId


var schema = new Schema({
title: {type: String, required: true},
body: {type: String, required: true},
date: {type: Date, required: true, default:Date.now()},
image: {type: String},
userId: {type: ObjectId, ref: "User", required: true}
});


module.exports = mongoose.model(SchemaName, schema);