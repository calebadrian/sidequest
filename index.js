var express = require('express');
var bp = require('body-parser');
var cors = require('cors');
var server = express();
require('./server-assets/db/mlab-config');
var port = 3000;
var userRoutes = require('./server-assets/routes/users');
// var postsRoutes = require('./server-assets/routes/posts');
// var repliesRoutes = require('./server-assets/routes/replies');
// var commentsRoutes = require('.server-assets/routes/users')

server.use(cors());
server.use(bp.json());
server.use(bp.urlencoded({extended: true}));
// server.use(userRoutes.router);
// server.use(postRoutes.router);
// server.use(commentRoutes.router);






server.use('*', (err,req,res,next) =>{
 res.status(400).send(err);
});

server.listen(port, ()=>{
 console.log("Server running on port: ", port);
});