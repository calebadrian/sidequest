var router = require("express").Router();
var Users = require("../models/user");
var Posts = require("../models/post");
var Comments = require("../models/comment");
var Replies = require("../models/reply");

// GET ONE USER
router.get("/api/users/:userid", (req, res, next) =>{
    Users.findById(req.params.userid)
        .then(user => {
            return res.send(user);
        })
        .catch(next);
})

router.get("/api/users/:userid/posts", (req, res, next) => {
    Posts.find(req.query)
        .then(posts => {
            return res.send(posts)
        })
        .catch(next);
})

// CREATE USER
router.post("/api/users", (req, res, next) => {
    Users.find({username: req.body})
        .then(user => {
            if (user){
                return res.send(user)
            } else {
                return res.status(404).send({error: "user not found!"})
            }
        })
        .catch(next)
    Users.create(req.body)
        .then(user => {
            res.send(user);
        })
        .catch(next);
 });

 router.post("/api/users/:userid/posts", (req, res, next) => {
     Posts.create(req.body)
        .then(post => {
            res.send(post)
        })
        .catch(next)
 })

 router.put("/api/users/:userid/posts/:postid", (req, res, next) => {
     Posts.findOneAndUpdate({userId: req.params.userid, _id: req.params.postid}, req.body, {new: true})
        .then(post => {
            if (post){
                res.send({message: "successfully updated post", data: post})
            } else {
                res.status(404).send({error: "Post not found"})
            }
        })
        .catch(next)
 })

 router.put("/api/users/:userid/posts/:postid/comments/:commentid", (req, res, next) => {
     Comments.findOneAndUpdate({userId: req.params.userid, _id: req.params.commentid}, req.body, {new: true})
        .then(comment => {
            if (comment) {
                res.send({message: "successfully updated comment", data: comment})
            } else {
                res.status(404).send({error: "Post not found"})
            }
        })
        .catch(next)
 })

 router.put("/api/users/:userid/posts/:postid/comments/:commentid/replies/:replyid", (req, res, next) => {
     Replies.findOneAndUpdate({userId: req.params.userid, _id: req.params.replyid}, req.body, {new: true})
        .then(reply => {
            if (reply) {
                res.send({message: "successfully updated reply", data: reply})
            } else {
                res.status(404).send({error: "Reply not found"})
            }
        })
        .catch(next)
 })

 router.delete("/api/users/:userid/posts/:postid", (req, res, next) => {
     Posts.findOneAndRemove({userId: req.params.userid, _id: req.params.postid})
        .then(post => {
            if (post) {
                res.send({message: "successfully removed post"})
            } else {
                res.status(404).send({error: "Post not found"})
            }
        })
        .catch(next)
 })

 router.delete("/api/users/:userid/posts/:postid/comments/:commentid", (req, res, next) => {
     Comments.findOneAndRemove({userId: req.params.userid, _id: req.params.commentid})
        .then(comment => {
            if (comment) {
                res.send({message: "successfully deleted comment"})
            } else {
                res.status(404).send({error: "Comment not found"})
            }
        })
        .catch(next)
 })

 router.delete("/api/users/:userid/posts/:postid/comments/:commentid/replies/:replyid", (req, res, next) => {
     Replies.findOneAndRemove({userId: req.params.userid, _id: req.params.replyid})
        .then(reply => {
            if (reply) {
                res.send({message: "successfully deleted reply"})
            } else {
                res.status(404).send({error: "Reply not found"})
            }
        })
        .catch(next)
 })

module.exports = { router };

///is it working?


