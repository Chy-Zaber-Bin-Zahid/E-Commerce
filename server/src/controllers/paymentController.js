const createError = require("http-errors");
const Payment = require("../models/paymentModel");
const Cart = require("../models/cartModel");
const { successResponse } = require("./responseController");
const mongoose = require("mongoose");
const { findUserById } = require("../services/findUserById");

// payment details post to db
const paymentDetails = async (req, res, next) => {
  try {
    const arr = [];
    // Checking telephone length
    if (req.body.telephone.length < 11) {
      arr.push("telephone");
    }

    // Sending error message to client (front-end)
    if (arr.length === 1) {
      return res.status(400).json({
        error: "Telephone is less than 11",
      });
    }

    const userId = req.params.id;
    const existingUser = await Cart.find({ userId: userId });
    const title = [];
    const productId = [];

    for (let i = 0; i < existingUser.length; i++) {
      title.push(existingUser[i].title);
      productId.push(existingUser[i].productId);
    }

    const payment = new Payment({
      name: req.body.name,
      email: req.body.email,
      address: req.body.address,
      telephone: req.body.telephone,
      comment: req.body.comment,
      delivery: req.body.delivery,
      payment: req.body.payment,
      userId,
      productId,
      title,
      totalCost: req.body.totalCost,
    });

    await payment.save();

    // Find the cart item by ID and delete it from the database
    await Cart.deleteMany({ userId: userId });

    return successResponse(res, {
      statusCode: 200,
      message: "payment added to db successfully",
      payload: {
        payment,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { paymentDetails };
