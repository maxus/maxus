const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const config = require("config");
const jwt = require("jsonwebtoken");
// @route       POST api/auth
// @desc        Auth user
// @access      Public
router.post("/", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  User.findOne({ email }).then(user => {
    if (!user) return res.status(400).json({ msg: "user Does not exits" });
    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) return res.status(400).json({ msg: "invalid credentials" });

      jwt.sign(
        { id: user.id },
        config.get("jwtSecret"),
        {
          expiresIn: 3600
        },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            user: { id: user.id, name: user.username, email: user.email }
          });
        }
      );
    });
  });
});
//ADDING MOVIE
router.post("/add", (req, res) => {});
module.exports = router;
