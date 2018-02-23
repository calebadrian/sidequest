var router = require("express").Router();
var Posts = require("../models/post");
var Comments = require("../models/comment");
var Replies = require("../models/post");

// GET ALL USERS
router.get("/api/posts", (req, res, next) => {
    Posts.find(req.query)
        .then(posts => {
            return res.send(posts);
        })
        .catch(next);
})

router.get("/api/posts/:postid/comments", (req, res, next) => {
    Comments.find({ postId: req.params.postid })
        .then(comments => {
            return res.send(comments)
        })
        .catch(next)
})

router.get("/api/posts/:postid/comments/:commentid/replies", (req, res, next) => {
    Replies.find({ commentId: req.params.commentid })
        .then(replies => {
            console.log(replies)
            return res.send(replies)
        })
        .catch(next)
})


// CREATE USER
router.post("/api/posts", (req, res, next) => {
    Posts.create(req.body)
        .then(post => {
            res.send(post);
        })
        .catch(next);
})

module.exports = { router };