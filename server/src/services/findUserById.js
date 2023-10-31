const createHttpError = require("http-errors");
const User = require("../models/userModel");
const { default: mongoose } = require("mongoose");

const findUserById = async (id) => {
  try {
    const options = { password: 0 }; // password will not be return

    const user = await User.findById(id, options);

    if (!user) {
      throw createHttpError(404, "user does not exist with this id!");
    }
    return user;
    
  } catch (err) {
    if (err instanceof mongoose.Error) {
      throw createError(400, "Invalid User Id");
      return;
    }
    throw err;
  }
};

module.exports = { findUserById };
