const createError = require("http-errors");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const Cart = require("../models/cartModel");
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

    //find all cart from user
    let sum = 0;
    const cartNumber = await Cart.find({ userId: existingUser._id });
    if (cartNumber) {
      const store = cartNumber.map((item) => Number(item.total));
      sum = store.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
      }, 0);
      return successResponse(res, {
        statusCode: 200,
        message: "user logged in successfully",
        payload: {
          user: existingUser,
          sum,
        },
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

// Change Profile Info User
const changeUser = async (req, res, next) => {
  try {
    const existingUser = await User.findOne({ _id: req.body.userId });
    const arr = [];
    console.log(req.body.email);
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

// Change Profile Password User
const changePassUser = async (req, res, next) => {
  try {
    const existingUser = await User.findOne({ _id: req.body.userId });
    const enteredOldPassword = req.body.oldPassword;
    const enteredNewPassword = req.body.newPassword;
    const enteredConfirmPassword = req.body.confirmPassword;
    const isPasswordValid = await bcrypt.compare(
      enteredOldPassword,
      existingUser.password
    );
    // Password checking
    if (!isPasswordValid) {
      return res.status(400).json({
        error: "Wrong password",
      });
    } else if (enteredNewPassword === enteredOldPassword) {
      return res.status(400).json({
        error: "Same password",
      });
    } else if (enteredNewPassword !== enteredConfirmPassword) {
      return res.status(400).json({
        error: "Passwords do not match",
      });
    }
    // New hashed password
    existingUser.password = enteredNewPassword;
    // Save the updated user pass to the database
    await existingUser.save();
    return successResponse(res, {
      statusCode: 200,
      message: "user password updated successfully",
      payload: {
        user: existingUser,
      },
    });
  } catch (err) {
    next(err);
  }
};

// Payment update
const paymentUpdate = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await findUserById(id);
    console.log(req.body.payment);
    user.payment = req.body.payment;

    await user.save();

    return successResponse(res, {
      statusCode: 200,
      message: "payment updated successfully",
      payload: {
        user,
      },
    });
  } catch (err) {
    next(err);
  }
};

// Payment update
const paymentGet = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await findUserById(id);

    return successResponse(res, {
      statusCode: 200,
      message: "payment status got successfully",
      payload: {
        user,
      },
    });
  } catch (err) {
    next(err);
  }
};

// Fetch all user
const getAllUser = async (req, res, next) => {
  try {
    const user = await User.find().exec();
    return successResponse(res, {
      statusCode: 200,
      message: "all user fetch successfully",
      payload: {
        user,
      },
    });
  } catch (err) {
    next(err);
  }
};

// User status update
const statusUpdate = async (req, res, next) => {
  try {
    const id = req.body.userId;
    const status = req.body.status;
    const user = await findUserById(id);

    if (status === "Ban") {
      user.isBanned = true;
    } else if (status === "Unban") {
      user.isBanned = false;
    } else if (status === "Unauthorize") {
      user.isAdmin = false;
    } else {
      user.isAdmin = true;
    }

    await user.save();

    return successResponse(res, {
      statusCode: 200,
      message: "payment updated successfully",
      payload: {
        user,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  regUser,
  logUser,
  getUserById,
  changeUser,
  changePassUser,
  paymentUpdate,
  paymentGet,
  getAllUser,
  statusUpdate,
};
