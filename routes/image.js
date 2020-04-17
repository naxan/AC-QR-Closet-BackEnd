const express = require("express");
const Image = require("../models/Image");
const ImageRouter = express.Router();
const multer = require("multer");
const db = require("../models");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    // rejects non image files
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

ImageRouter.post("/upload", upload.single("imageData"), (req, res, next) => {
  const newImage = new Image({
    imageName: req.body.imageName,
    imageData: req.file.path,
  });

  db.Image.create(newImage, (err, image) => {
    if (err)
      return res.status(400).json({
        status: 400,
        error: "Something went wrong, please try again.",
      });
    res.send(image);
  });
});

module.exports = ImageRouter;
