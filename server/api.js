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
const FollowedHerd = require("./models/followedHerd");
const Achievement = require("./models/achievement");

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

router.get("/herd", (req, res) => {
  Herd.findById(req.query._id).then((herd) => {
    res.send(herd);
  });
});


router.get("/herds", (req, res) => {
  Herd.find({}).then((herds) => res.send(herds));
});

router.post("/herd", auth.ensureLoggedIn, (req, res) => {
  Herd.findOne({
    content: req.body.content
  }).then((obj) => {
    if(obj === null){
      const newHerd = new Herd({
        creator_id: req.user._id,
        creator_name: req.user.name,
        content: req.body.content,
      });
    
      newHerd.save().then((herd) => res.send(herd));

    }
    else{
      res.send({content: "herd already exists"});
    }
  })

  // const newHerd = new Herd({
  //   creator_id: req.user._id,
  //   creator_name: req.user.name,
  //   content: req.body.content,
  // });

  // newHerd.save().then((herd) => res.send(herd));
});

router.get("/tags", (req, res) => {
  Tag.find({ parent: req.query.parent }).then((tags) => {
    res.send(tags);
  });
});

router.post("/tags", auth.ensureLoggedIn, (req, res) => {
  Tag.findOne({
    parent: req.body.parent,
    content: req.body.content,
  }).then((obj) => {
    if(obj === null){
      const newTag = new Tag({
        creator_id: req.user._id,
        creator_name: req.user.name,
        parent: req.body.parent,
        content: req.body.content,
      });
    
      newTag.save().then((tag) => res.send(tag));

    }
    else{
      res.send({content: "tag already exists"});
    }
  })

  // const newTag = new Tag({
  //   creator_id: req.user._id,
  //   creator_name: req.user.name,
  //   parent: req.body.parent,
  //   content: req.body.content,
  // });

  // newTag.save().then((tag) => res.send(tag));
});

router.get("/followedHerds", auth.ensureLoggedIn, (req, res) => {
  FollowedHerd.find({userId: req.user._id}).then((herds) => res.send(herds));
});

router.post("/followedHerds", auth.ensureLoggedIn, (req, res) => {

  FollowedHerd.findOne({
    creator_id: req.body.creator_id,
    creator_name: req.body.creator_name,
    content: req.body.content,
    userId: req.body.userId
  }).then((obj) => {
    if (obj === null){
      const newFollowedHerd = new FollowedHerd({
        creator_id: req.body.creator_id,
        creator_name: req.body.creator_name,
        content: req.body.content,
        userId: req.body.userId,
      });
  
      newFollowedHerd.save().then((herds) => res.send(herds));
    }
    else{
      res.send({content: "already following"});
    }
  });
  
});

router.get("/achievements", auth.ensureLoggedIn, (req, res) => {
  Achievement.find({userId: req.user._id}).then((achievements) => res.send(achievements));
});

// router.get("/achievements", auth.ensureLoggedIn, (req, res) => {
//   Achievement.find({userId: req.user._id}).then((achievements) => res.send(achievements));
// });

router.post("/achievements", auth.ensureLoggedIn, (req, res) => {
  Achievement.findOne({
    userId: req.body.userId,
    creator_id: req.body.creator_id,
    creator_name: req.body.creator_name,
    parent: req.body.parent,
    content: req.body.content
  }).then((obj) => {
    if (obj === null){
      const newAchievement = new Achievement({
        userId: req.body.userId,
        creator_id: req.body.creator_id,
        creator_name: req.body.creator_name,
        parent: req.body.parent,
        content: req.body.content,
      });
    
      newAchievement.save().then((achievement) => res.send(achievement));
    }
    else{
      console.log("already achieved");
      res.send({content: "already achieved"});
    }
  });




  // const newAchievement = new Achievement({
  //   userId: req.body.userId,
  //   creator_id: req.body.creator_id,
  //   creator_name: req.body.creator_name,
  //   parent: req.body.parent,
  //   content: req.body.content,
  // });

  // newAchievement.save().then((achievement) => res.send(achievement));
});


// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});


module.exports = router;
