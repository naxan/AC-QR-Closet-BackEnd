const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Image = require("./Image");

const PatternSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  textCode: String,
  description: String,
  image: {
    type: Image.schema,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

// PatternSchema.pre("remove", function (next) {
//   db.Image.remove({ _id: this.image._id }).exec();
//   next();
// });

module.exports = mongoose.model("Pattern", PatternSchema);
