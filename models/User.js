const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Image = require("./Image");

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  town: String,
  authorCode: String,
  profilePic: {
    type: Image.schema,
  },
  createdPatterns: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pattern",
    },
  ],
});

module.exports = mongoose.model("User", UserSchema);
