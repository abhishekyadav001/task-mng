const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const userModel = require("../model/users.model");
require("dotenv").config();

// secret key
const secretKey = process.env.SECRET_KEY;

// backlist
const backlist = [];

// used hash in our signup router
async function userSignupController(username, email, password) {
  // hash
  const findUser = await userModel.findOne({ email });
  if (!!findUser) {
    return {
      status: 400,
      payload: { msg: "User already exist" },
    };
  }
  const hash = await argon2.hash(password);

  try {
    const user = await userModel.create({ username, email, password: hash });

    return {
      status: 201,
      payload: { msg: "User Signup Successfuly" },
    };
  } catch (error) {
    if (error.code == 11000) {
      return {
        status: 400,
        payload: { msg: "Email already exists" },
      };
    } else {
      return {
        status: 403,
        payload: { msg: error.message },
      };
    }
  }
}

async function userLoginController(email, password) {
  try {
    const user = await userModel.findOne({ email });

    const hashPassword = user.password;

    const check = await argon2.verify(hashPassword, password);

    if (check) {
      const token = jwt.sign({ id: user._id, email: user.email }, secretKey, { expiresIn: "7d" });

      return {
        status: 201,
        payload: { msg: "Login Successfully", token },
      };
    } else {
      return {
        status: 401,
        payload: { msg: "Password Wrong" },
      };
    }
  } catch (error) {
    return {
      status: 401,
      payload: { msg: error.message },
    };
  }
}

function userLogoutController(token) {
  if (!token) {
    return {
      status: 404,
      payload: { msg: "Token Not Found" },
    };
  }
  backlist.push(token);

  return {
    status: 201,
    payload: { msg: "Logout Successfull" },
  };
}

module.exports = { userSignupController, userLoginController, userLogoutController };
