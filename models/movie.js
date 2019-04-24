const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const movieSchema = new Schema({
  /*
{ id: null,
  title: '',
  description: '',
  year: '',
  keyword: '',
  link: '',
  posterImage: '',
  bannerImage: '',
  genre:[] }
  */
  title: { type: String, required: true },
  description: { type: String, required: true },
  year: String,
  keyword: { type: String, required: true },
  link: { type: String, required: true },
  posterImage: { type: String, required: true },
  bannerImage: { type: String, required: true },
  genre: { type: Array, require: true },
  date: {
    type: Date,
    default: new Date()
  }
});
const movie = mongoose.model("movie", movieSchema);
module.exports = movie;
