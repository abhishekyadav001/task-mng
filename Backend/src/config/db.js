const { default: mongoose } = require("mongoose");
require("dotenv").config();
const url = process.env.DB_URL;
const connection = async () => {
  await mongoose.connect(url);
};

module.exports = { connection };
