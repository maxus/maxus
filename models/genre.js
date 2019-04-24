const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const genreSchema = new Schema({
  name: { type: String, required: [true, "Genre Name is required"] }
});
const genre = mongoose.model("genre", genreSchema);
module.exports = genre;
