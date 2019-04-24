const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const config = require("config");
const jwt = require("jsonwebtoken");
//GETTING MOVIES
router.post("/", (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  User.findOne({ email }).then(user => {
    if (user) return res.status(400).json({ msg: "User already exists" });
    const newUser = new User({ username, email, password });
    // Create salt and hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then(user => {
          res.json({
            token,
            user: { id: user.id, name: user.username, email: user.email }
          });
        });
      });
    });
  });
});
router.post("/add", (req, res) => {});
module.exports = router;
