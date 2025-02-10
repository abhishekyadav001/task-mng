const express = require("express");
const userRouter = express.Router();
const { userSignupController, userLoginController, userLogoutController } = require("../controller/user.controller");
const authMiddleware = require("../middleware/auth.middleware");
const userModel = require("../model/users.model");

userRouter.get("/", authMiddleware, async (req, res) => {
  try {
    const { userID } = req.body;
    console.log(userID);
    const user = await userModel.findById(userID);
    console.log(user);
    res.status(201).send({ message: "user balance is checked", balanceAmount: user.balance });
  } catch (error) {
    res.status(401).send(error.message);
  }
});

userRouter.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  // console.log(username, email, password);

  let data = await userSignupController(username, email, password);

  res.status(data.status).send(data.payload);
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  let data = await userLoginController(email, password);
  res.status(data.status).send(data.payload);
});

userRouter.post("/logout", (req, res) => {
  const { token } = req.headers;
  let data = userLogoutController(token);
  res.status(data.status).send(data.payload);
});

module.exports = { userRouter };
