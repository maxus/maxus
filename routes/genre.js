const express = require("express");
const router = express.Router();
const genre = require("../models/genre");
// @route       GET api/genre/movie
// @desc        Get movie genres
// @access      Public
router.get("/movie", (req, res) => {
  genre.find({"type":"movie"},{"type":0}).then(doc => {
    res.json(doc);
  }); 
});
//ADDING GENRES
router.post("/add", (req, res) => {
  genre.create({ name: req.body.name }).then(doc => {
    res.json(doc);
  });
});
module.exports = router;
