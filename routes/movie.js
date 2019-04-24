const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const movie = require("../models/movie");
const auth = require("../middleware/auth");
//GETTING MOVIES
router.get("/", (req, res) => {
  movie
    .find()
    .sort({ _id: -1 })
    .then(doc => res.json(doc));
});
router.get("/:id", (req, res) => {
  const movieId = req.params.id;
  movie.find({ _id: mongoose.Types.ObjectId(movieId) }).then(result => {
    res.json({ result });
  });
});
router.get("/remove/:id", (req, res) => {
  const movieId = req.params.id;
  movie.deleteOne({ _id: mongoose.Types.ObjectId(movieId) }).then(() => {
    res.json({
      status: true,
      msg: "Movie was removed"
    });
  });
});
// @route       POST api/movie/auth
// @desc        Auth user
// @access      Private
//ADDING MOVIE
router.post("/add", (req, res) => {
  const {
    title,
    description,
    year,
    keyword,
    link,
    posterImage,
    bannerImage,
    genre
  } = req.body;
  movie
    .create({
      title: title,
      description: description,
      year: year,
      keyword: keyword,
      link: link,
      posterImage: posterImage,
      bannerImage: bannerImage,
      genre: genre,
      date: new Date()
    })
    .then(() => {
      res.json({ status: true, msg: `Movie was added` });
    });
});
router.post("/update", (req, res) => {
  const {
    title,
    description,
    year,
    keyword,
    link,
    posterImage,
    bannerImage,
    genre
  } = req.body;
  movie
    .update(
      { _id: req.body._id },
      {
        title: title,
        description: description,
        year: year,
        keyword: keyword,
        link: link,
        posterImage: posterImage,
        bannerImage: bannerImage,
        genre: genre
      },
      { upsert: true }
    )
    .then(() => {
      res.json({ status: true, msg: "Movie was updated" });
    });
});
module.exports = router;
