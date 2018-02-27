
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = mongoose.SchemaTypes.ObjectId
var SchemaName = "Post";


var schema = new Schema({
title: {type: String, required: true},
body: {type: String, required: true},
date: {type: Date, required: true, default:Date.now()},
image: {type: String},
voteCount: {type: Number, default: 0},
creatorId: { type: ObjectId, ref: "User" }
// userId: {type: ObjectId, ref: "User", required: true}
});


module.exports = mongoose.model(SchemaName, schema);