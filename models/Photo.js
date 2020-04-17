const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PhotoSchema = new Schema({
  imageName: {
    type: String,
    default: "none",
    required: true,
  },
  imageData: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Photo", PhotoSchema);
