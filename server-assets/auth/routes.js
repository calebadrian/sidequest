var router = require("express").Router();
var Users = require("../models/user");

var errorMessage = { error: "Invalid Auth" };

router.post("/auth/register", (req, res) => {
  // @ts-ignore
  req.body.password = Users.generateHash(req.body.password);
  req.body.role = 'public'
  Users.create(req.body)
    .then(user => {
      if (!user) {
        return res.status(401).send(errorMessage);
      }
      user.password = null;
      delete user.password;
      req.session.uid = user._id
      res.send(user);
    })
    .catch(err => res.status(401).send(errorMessage));
});

router.post("/auth/login", (req, res) => {
  Users.findOne({ email: req.body.email }).then(user => {
    if (!user) {
      return res.status(401).send(errorMessage);
    }

    if (!user.validatePassword(req.body.password)) {
      return res.status(401).send(errorMessage);
    }
    user.password = null;
    delete user.password;
    req.session.uid = user._id
    res.send(user);
  });
});


router.put('/auth/user', (req, res) =>{
  
})




module.exports = router;