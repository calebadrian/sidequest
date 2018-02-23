
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var SchemaName = "Comment";
var ObjectId = mongoose.SchemaTypes.ObjectId


var schema = new Schema({
body: {type: String, required: true},
date: {type: Date, required: true, default:Date.now()},
userId: {type: ObjectId, ref: "User", required: true},
postId: {type: ObjectId, ref: "Post", required: true}
});


module.exports = mongoose.model(SchemaName, schema);