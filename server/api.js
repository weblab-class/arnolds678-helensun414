/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");

const Herd = require("./models/herd");
const Tag = require("./models/tag");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});


router.get("/user", (req, res) => {
  User.findById(req.query.userid).then((user) => {
    res.send(user);
  });
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user) socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});


router.get("/herds", (req, res) => {
  Herd.find({}).then((herds) => res.send(herds));
});

router.post("/herd", auth.ensureLoggedIn, (req, res) => {
  const newHerd = new Herd({
    creator_id: req.user._id,
    creator_name: req.user.name,
    content: req.body.content,
  });

  newHerd.save().then((herd) => res.send(herd));
});

router.get("/tags", (req, res) => {
  Tag.find({ parent: req.query.parent }).then((tags) => {
    res.send(tags);
  });
});

router.post("/tags", auth.ensureLoggedIn, (req, res) => {
  const newTag = new Tag({
    creator_id: req.user._id,
    creator_name: req.user.name,
    parent: req.body.parent,
    content: req.body.content,
    completed: req.body.completed,
  });

  newTag.save().then((tag) => res.send(tag));
});


// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});


module.exports = router;
