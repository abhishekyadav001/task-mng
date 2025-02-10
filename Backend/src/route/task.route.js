const express = require("express");
const taskController = require("../controller/task.controller");
const authMiddleware = require("../middleware/auth.middleware");

const taskRouter = express.Router();

taskRouter.post("/", authMiddleware, taskController.createTask);
taskRouter.get("/", authMiddleware, taskController.getTasks);
taskRouter.get("/:id", authMiddleware, taskController.getTaskById);
taskRouter.put("/:id", authMiddleware, taskController.updateTask);
taskRouter.delete("/:id", authMiddleware, taskController.deleteTask);
taskRouter.patch("/:id/toggle", authMiddleware, taskController.toggleTaskStatus);

module.exports = taskRouter;
