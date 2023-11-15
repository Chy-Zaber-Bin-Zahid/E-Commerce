const createError = require("http-errors");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const { successResponse } = require("./responseController");
const mongoose = require("mongoose");
const { findUserById } = require("../services/findUserById");

// Register new user
const regUser = async (req, res, next) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    const arr = [];
    // Checking existing user by email
    if (existingUser) {
      arr.push("email");
    }

    // Checking telephone length
    if (req.body.telephone.length < 11) {
      arr.push("telephone");
    }

    // Sending error message to client (front-end)
    if (arr.length === 2) {
      return res.status(400).json({
        error:
          "User with this email already exists and telephone is less than 11",
      });
    } else if (arr.length === 1 && arr[0] === "email") {
      return res.status(400).json({
        error: "User with this email already exists",
      });
    } else if (arr.length === 1 && arr[0] === "telephone") {
      return res.status(400).json({
        error: "Telephone is less than 11",
      });
    }

    const createUser = await User.create(req.body);

    return successResponse(res, {
      statusCode: 200,
      message: "user account created successfully",
      payload: {
        user: createUser,
      },
    });
  } catch (err) {
    next(err);
  }
};

// Login user
const logUser = async (req, res, next) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    const enteredPassword = req.body.password;
    const arr = [];
    // Checking user existence by email
    if (!existingUser) {
      arr.push("email");
    }

    // Sending error message to client (front-end)
    if (arr.length === 1) {
      return res.status(400).json({
        error: "User with this email does not exists",
      });
    }

    const isPasswordValid = await bcrypt.compare(
      enteredPassword,
      existingUser.password
    );

    // Password checking
    if (!isPasswordValid) {
      return res.status(400).json({
        error: "Wrong password",
      });
    }

    return successResponse(res, {
      statusCode: 200,
      message: "user logged in successfully",
      payload: {
        user: existingUser,
      },
    });
  } catch (err) {
    next(err);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await findUserById(id);
    return successResponse(res, {
      statusCode: 200,
      message: "user were returned successfully",
      payload: {
        user,
      },
    });
  } catch (err) {
    next(err);
  }
};

// Login user
const changeUser = async (req, res, next) => {
  try {
    const existingUser = await User.findOne({ _id: req.body.userId });
    const arr = [];
    const existingEmail = await User.findOne({ email: req.body.email });
    // Checking user existence by email
    if (existingEmail) {
      if (existingUser.email !== req.body.email) arr.push("email");
    }

    // Checking telephone length
    if (req.body.telephone.length < 11) {
      arr.push("telephone");
    }

    // Sending error message to client (front-end)
    if (arr.length === 2) {
      return res.status(400).json({
        error:
          "User with this email already exists and telephone is less than 11",
      });
    } else if (arr.length === 1 && arr[0] === "email") {
      return res.status(400).json({
        error: "User with this email already exists",
      });
    } else if (arr.length === 1 && arr[0] === "telephone") {
      return res.status(400).json({
        error: "Telephone is less than 11",
      });
    }

    existingUser.name = req.body.name;
    existingUser.email = req.body.email;
    existingUser.telephone = req.body.telephone;

    // Save the updated user to the database
    await existingUser.save();

    return successResponse(res, {
      statusCode: 200,
      message: "user profile updated successfully",
      payload: {
        user: existingUser,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { regUser, logUser, getUserById, changeUser };
