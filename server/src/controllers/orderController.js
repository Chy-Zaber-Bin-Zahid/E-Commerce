const createError = require("http-errors");
const Payment = require("../models/paymentModel");
const { successResponse } = require("./responseController");
const mongoose = require("mongoose");
const { findUserById } = require("../services/findUserById");

// Get feature product
const orderGet = async (req, res, next) => {
  try {
    const order = await Payment.find().exec();
    return successResponse(res, {
      statusCode: 200,
      message: "payment status got successfully",
      payload: {
        order,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { orderGet };
