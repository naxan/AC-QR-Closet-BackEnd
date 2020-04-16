const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PatternSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  textCode: String,
  description: String,
  image: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Pattern", PatternSchema);
