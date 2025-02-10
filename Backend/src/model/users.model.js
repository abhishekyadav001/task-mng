const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: [true, "please change email user already exist"], lowercase: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);
const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
