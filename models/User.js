const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdPatterns: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pattern",
    },
  ],
});

module.exports = mongoose.model("User", UserSchema);
