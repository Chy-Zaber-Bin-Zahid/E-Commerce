const createError = require("http-errors");
const FeatureProduct = require("../models/featureProductModel");
const { successResponse } = require("./responseController");
const mongoose = require("mongoose");
const { findUserById } = require("../services/findUserById");

// Get feature product
const featureProduct = async (req, res, next) => {
  try {
    const allProduct = await FeatureProduct.find().exec();

    res.setHeader(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate"
    );
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");

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

module.exports = { featureProduct };
