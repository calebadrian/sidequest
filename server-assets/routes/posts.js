var router = require("express").Router();
var Posts = require("../models/post");
var Comments = require("../models/comment");
var Replies = require("../models/reply");

// GET ALL USERS
router.get("/api/posts", (req, res, next) => {
    Posts.find(req.query)
        .then(posts => {
            return res.send(posts);
        })
        .catch(next);
})
//GET ONE POST
router.get("/api/posts/:postid", (req, res, next) => {
    Posts.findById(req.params.postid)
        .then(post => {
            return res.send(post)
        })
        .catch(next)
})
//Get all comments for post
router.get("/api/posts/:postid/comments", (req, res, next) => {
    Comments.find({ postId: req.params.postid })
        .then(comments => {
            console.log(comments)
            return res.send(comments)
        })
        .catch(next)
})
//Get all replies for comment
router.get("/api/posts/:postid/comments/:commentid/replies", (req, res, next) => {
    Replies.find({commentId: req.params.commentid})
        .then(replies => {
            return res.send(replies)
        })
        .catch(next)
})


// CREATE Post
router.post("/api/posts/", (req, res, next) => { 
    req.body.creatorId = req.session.uid;   
    
    Posts.create(req.body)
        .then(post => {
            res.send(post);
        })
        .catch(next);
})

//Delete Post
router.delete("/api/posts/:postid", (req, res, next) => {
    Posts.findOneAndRemove({creatorId: req.session.uid, _id: req.params.postid})
        .then(post => {
            if (!post){
                res.status(401).send({error: "Not authorized to remove post"})
            } else {
                res.send({message: "Successfully deleted post"})
            }
        })
        .catch(next)
})

//Put Post
router.put("/api/posts/:postid", (req, res, next) => {
    Posts.findByIdAndUpdate(req.params.postid, req.body, {new: true})
        .then(post => {
            res.send({message: "Successfully updated post", data: post})
        })
        .catch(next)
})

//Post Comment
router.post("/api/posts/:postid/comments", (req, res, next) => {
    Comments.create(req.body)
        .then(comment => {
            res.send(comment)
        })
        .catch(next)
})

//Delete Comment
router.delete("/api/posts/:postid/comments/:commentid", (req, res, next) => {
    Comments.findByIdAndRemove(req.params.commentid)
        .then(comment => {
            res.send({message: "Successfully deleted comment"})
        })
        .catch(next)
})

//Put Comment
router.put("/api/posts/:postid/comments/:commentid", (req, res, next) => {
    Comments.findByIdAndUpdate(req.params.commentid, req.body, {new: true})
        .then(comment => {
            res.send({message: "Succesfully updated comment", data: comment})
        })
        .catch(next)
})

//Post Reply
router.post("/api/posts/:postid/comments/:commentid/replies", (req, res, next) => {
    Replies.create(req.body)
        .then(reply => {
            res.send(reply)
        })
        .catch(next)
})

//Delete Reply
router.delete("/api/posts/:postid/comments/:commentid/replies/:replyid", (req, res, next) => {
    Replies.findByIdAndRemove(req.params.replyid)
        .then(reply => {
            res.send({message: "Successfully deleted reply"})
        })
        .catch(next)
})

//Put reply
router.put("/api/posts/:postid/comments/:commentid/replies/:replyid", (req, res, next) => {
    Replies.findByIdAndUpdate(req.params.replyid, req.body, {new: true})
        .then(reply => {
            res.send({message: "Successfully updated reply", data: reply})
        })
        .catch(next)
})

module.exports = { router };