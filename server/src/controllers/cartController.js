const createError = require("http-errors");
const Cart = require("../models/cartModel");
const { successResponse } = require("./responseController");
const mongoose = require("mongoose");
const { findUserById } = require("../services/findUserById");

// Post to cart db
const cart = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const { image, title, price, number, accountId } = req.body;

    // Convert 'price' and 'number' to numbers for calculations
    const parsedPrice = Number(price.replace(/,/g, "")); // Convert 'price' to a number
    const parsedNumber = Number(number); // Convert 'number' to a number

    // Check if the product already exists in the cart
    const existingProduct = await Cart.findOne({
      userId: accountId,
      productId,
    });

    if (existingProduct) {
      const previousTotal = Number(existingProduct.total);
      const newTotal = previousTotal + parsedNumber;

      existingProduct.total = newTotal;
      existingProduct.totalCost = (parsedPrice * newTotal).toString();
      await existingProduct.save();

      return successResponse(res, {
        statusCode: 200,
        message: "Product total updated in the cart",
        payload: {
          cart: existingProduct,
        },
      });
    }

    const newProduct = new Cart({
      productId,
      image,
      title,
      price: parsedPrice.toString(),
      total: parsedNumber.toString(),
      totalCost: (parsedPrice * parsedNumber).toString(),
      userId: accountId,
    });

    await newProduct.save();

    return successResponse(res, {
      statusCode: 200,
      message: "Product added to cart successfully",
      payload: {
        cart: newProduct,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { cart };
