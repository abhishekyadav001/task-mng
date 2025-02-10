const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    userID: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: [true, "internal reference error"] },
    title: { type: String, required: [true, "Please enter title "] },
    description: { type: String },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);
const taskModel = mongoose.model("Task", taskSchema);
module.exports = taskModel;
