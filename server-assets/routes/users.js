var router = require("express").Router();
var Users = require("../models/user");
// var Posts = require("../models/post");
// var Comments = require("../comments/post");
// var Replies = require("../replies/post");

// GET ALL USERS
router.get("/api/users", (req, res, next) =>{
    Users.find(req.query)
        .then(users => {
            return res.send(users);
        })
        .catch(next);
})


module.exports = { router };


