var router = require("express").Router();
var Replies = require("../models/reply");

// GET ALL USERS
// router.get("/api/replies", (req, res, next) => {
//     Replies.find(req.query)
//         .then(posts => {
//             return res.send(posts);
//         })
//         .catch(next);
// })

// // CREATE USER
// router.post("/api/replies", (req, res, next) => {
//     Replies.create(req.body)
//         .then(post => {
//             res.send(post);
//         })
//         .catch(next);
// })

// router.delete("/api/replies/:replyid", (req, res, next) => {
//     Replies.findByIdAndRemove(req.params.replyid)
//         .then(comment => {
//             res.send({ message: "Successfully deleted comment" })
//         })
//         .catch(next)
// })

module.exports = { router };