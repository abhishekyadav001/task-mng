const express = require("express");
const { connection } = require("./config/db");
const cors = require("cors");
const transactionRouter = require("./route/task.route");
const taskRouter = require("./route/task.route");
const { userRouter } = require("./route/users.route");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 8080;
app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/users", userRouter);
app.use("/task", taskRouter);
app.get("/", (req, res) => {
  res.send("Hello This is Home Page");
});

app.listen(port, async () => {
  try {
    await connection();
    console.log("db connected");
    console.log("listeneing port", port);
  } catch (error) {
    console.log(error.message);
  }
});
