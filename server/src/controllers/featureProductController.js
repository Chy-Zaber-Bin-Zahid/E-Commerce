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

// Get one product details
const productDetails = async (req, res, next) => {
  try {
    const productId = req.params.id; // Extract the productId from the request parameters

    const product = await FeatureProduct.findById(productId).exec(); // Find product by ID

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.setHeader(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate"
    );
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
 
    return successResponse(res, {
      statusCode: 200,
      message: "Feature product fetched successfully",
      payload: {
        product,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { featureProduct, productDetails };
