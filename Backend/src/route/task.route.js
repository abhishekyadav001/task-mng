const express = require("express");
const taskController = require("../controller/task.controller");

const taskRouter = express.Router();

taskRouter.post("/", taskController.createTask);
taskRouter.get("/", taskController.getTasks);
taskRouter.get("/:id", taskController.getTaskById);
taskRouter.put("/:id", taskController.updateTask);
taskRouter.delete("/:id", taskController.deleteTask);
taskRouter.patch("/:id/toggle", taskController.toggleTaskStatus);

module.exports = taskRouter;
