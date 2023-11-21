const createError = require("http-errors");
const WishList = require("../models/wishListModel");
const { successResponse } = require("./responseController");
const mongoose = require("mongoose");
const { findUserById } = require("../services/findUserById");

// Store wish list to database
const wishList = async (req, res, next) => {
  try {

    return successResponse(res, {
      statusCode: 200,
      message: "all feature product fetch successfully",
      payload: {
        allProduct,
      },
    });
  } catch (err) {
    next(err);
  }
};



module.exports = { wishList };
