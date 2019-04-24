const express = require("express");
const mongoose = require("mongoose");
const app = express();

const config = require("config");
// DB config
const db = config.get("mongoURI");
//mongodb://127.0.0.1:27017/maxus"
// connect to mongodb
mongoose
  .connect(db, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log(err));

app.use(express.json());

app.use("/api/genre", require("./routes/genre"));
app.use("/api/movie", require("./routes/movie"));
app.use("/api/image", require("./routes/image"));
app.use("/api/user", require("./routes/user"));
app.use("/api/auth", require("./routes/auth"));

//app.use(express.static("public"));

app.listen(process.env.PORT || 5000, () => {
  console.log("Servers listening on port 5000");
});
