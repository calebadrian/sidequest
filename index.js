var express = require('express');
var bp = require('body-parser');
var cors = require('cors');
var server = express();
require('./server-assets/db/mlab-config');
var port = 3000;
var session = require("./server-assets/auth/session");
var authRoutes = require("./server-assets/auth/routes");
//var userRoutes = require('./server-assets/routes/users');
var postsRoutes = require('./server-assets/routes/posts');
var repliesRoutes = require('./server-assets/routes/replies'); 
var commentsRoutes = require('./server-assets/routes/comments');

server.use(cors());
server.use(session);
server.use(bp.json());
server.use(bp.urlencoded({extended: true}));

server.use(authRoutes);



server.use("/api/*", (req, res, next) => {
    if (req.method.toLowerCase() != "get" && !req.session.uid) {
        return res.status(401).send({ error: "PLEASE LOGIN TO CONTINUE" });
    }
    
    next();
});

//server.use(userRoutes.router);
server.use(postsRoutes.router);
server.use(repliesRoutes.router);
server.use(commentsRoutes.router);


server.use('*', (err,req,res,next) =>{
 res.status(400).send(err);
});

server.listen(port, ()=>{
 console.log("Server running on port: ", port);
});