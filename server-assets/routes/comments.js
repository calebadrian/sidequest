var router = require("express").Router();
var Comments = require("../models/comment");
var Replies = require("../models/reply");

// GET ALL USERS
router.get("/api/comments", (req, res, next) => {
    Comments.find(req.query)
        .then(posts => {
            return res.send(posts);
        })
        .catch(next);
})

// CREATE USER
router.post("/api/comments", (req, res, next) => {
        Comments.create(req.body)
            .then(post => {
                res.send(post);
            })
            .catch(next);
    })

router.delete("/api/comments/:commentid", (req, res, next) => {
    Comments.findByIdAndRemove(req.params.commentid)
            .then(comment => {
                res.send({message: "Successfully deleted comment"})
            })
            .catch(next)
})

module.exports = { router };