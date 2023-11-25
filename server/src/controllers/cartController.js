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

      //find all cart from user
      let sum = 0;
      const cartNumber = await Cart.find({ userId: accountId });
      const store = cartNumber.map((item) => Number(item.total));
      sum = store.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
      }, 0);

      return successResponse(res, {
        statusCode: 200,
        message: "Product total updated in the cart",
        payload: {
          cart: sum,
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

    //find all cart from user
    let sum = 0;
    const cartNumber = await Cart.find({ userId: accountId });
    console.log(cartNumber);
    const store = cartNumber.map((item) => Number(item.total));
    sum = store.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);

    return successResponse(res, {
      statusCode: 200,
      message: "Product added to cart successfully",
      payload: {
        cart: sum,
      },
    });
  } catch (err) {
    next(err);
  }
};

// get all cart items
const cartItem = async (req, res, next) => {
  try {
    const accountId = req.params.id;
    // check if user has any item in cart db
    const allCartItems = await Cart.find({ userId: accountId }).exec();
    console.log(allCartItems);
    if (allCartItems) {
      res.setHeader(
        "Cache-Control",
        "no-store, no-cache, must-revalidate, proxy-revalidate"
      );
      res.setHeader("Pragma", "no-cache");
      res.setHeader("Expires", "0");

      return successResponse(res, {
        statusCode: 200,
        message: "all cart items fetch successfully",
        payload: {
          allCartItems,
        },
      });
    }
    
    return res.status(404).json({ message: "No items found in the cart" });
  } catch (err) {
    next(err);
  }
};

module.exports = { cart, cartItem };
