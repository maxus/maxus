const express = require("express");
const router = express.Router();
const path = "./admin/public/uploads/";
// multer setup
const multer = require("multer");
const fs = require("fs");
const { promisify } = require("util");
const unlinkAsync = promisify(fs.unlink);
checkExtension = file => {
  // this function gets the filename extension by determining mimetype. To be exanded to support others, for example .jpeg or .tiff
  var res = "";
  if (file.mimetype === "image/jpeg") res = ".jpg";
  if (file.mimetype === "image/png") res = ".png";
  return res;
};
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path);
  },
  filename: (req, file, cb) => {
    //console.log(file.mimetype)
    cb(null, Date.now() + checkExtension(file));
  }
});
const upload = multer({
  storage: storage
  // limits: { fileSize: 1048576, files: 1 } // limit file size to 1048576 bytes or 1 MB
  //,fileFilter: // TODO limit types of files. currently can upload a .txt or any kind of file into uploads folder
}).fields([
  // fields to accept multiple types of uploads
  { name: "image", maxCount: 1 }
]);
// Routes
router.get("/remove/:filename", (req, res) => {
  const Imagepath = path + req.params.filename;
  console.log(Imagepath);
  if (req.params.filename) {
    unlinkAsync(Imagepath, err => {
      if (err) {
        return res.json({
          status: false,
          error: err
        });
      } else {
        return res.json({
          status: true
        });
      }
    });
  } else {
    return res.json({
      status: false
    });
  }
});
router.post("/upload", (req, res) => {
  upload(req, res, err => {
    if (err) {
      console.log(err);
      return res.json({
        status: false
      });
    } else {
      return res.json({
        path: req.files.image[0].filename,
        status: true
      });
    }
  });
});
module.exports = router;
