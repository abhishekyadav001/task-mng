const { default: mongoose } = require("mongoose");
const taskModel = require("../model/task.model");
const userModel = require("../model/users.model");

exports.createTask = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.body.userID)) {
      return res.status(400).json({ error: "Invalid userID" });
    }

    const user = await userModel.findById(req.body.userID);
    if (!user) return res.status(400).json({ error: "User not found" });

    const task = new taskModel(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const { search, completed, page = 1, limit = 10 } = req.query;
    const filter = {};

    if (search) {
      filter.$or = [{ title: { $regex: search, $options: "i" } }, { description: { $regex: search, $options: "i" } }];
    }
    console.log(filter);
    if (completed !== undefined) {
      filter.completed = completed === "true";
    }

    const tasks = await taskModel
      .find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await taskModel.countDocuments(filter);

    res.json({ tasks, total, page: Number(page), limit: Number(limit) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const task = await taskModel.findById(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await taskModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await taskModel.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.toggleTaskStatus = async (req, res) => {
  try {
    const task = await taskModel.findById(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    task.completed = !task.completed;
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
