const createError = require("http-errors");
const WishList = require("../models/wishListModel");
const User = require("../models/userModel");
const { successResponse } = require("./responseController");
const mongoose = require("mongoose");
const { findUserById } = require("../services/findUserById");

// Store wish list to database
const wishList = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const { title, price, image } = req.body;
    const productId = req.body.userId;

    // Check if a wishlist item with the same userId and productId already exists
    const existingWishlistItem = await WishList.findOne({
      userId,
      productId,
    });

    if (existingWishlistItem) {
      return res.status(400).json({
        error: "Already in wish list",
      });
    }

    // Create a new wishlist item
    const newWishlistItem = new WishList({
      userId,
      title,
      price,
      image,
      productId,
    });

    const savedWishlistItem = await newWishlistItem.save();

    return successResponse(res, {
      statusCode: 200,
      message: "Product added to wishlist successfully",
      payload: {
        wishList: newWishlistItem,
      },
    });
  } catch (err) {
    next(err);
  }
};

// Get feature product
const wishListAll = async (req, res, next) => {
  try {
    const userId = req.params.id;

    // Fetch wish list for a specific user ID
    const wishList = await WishList.find({ userId }).exec();
    res.setHeader(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate"
    );
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");

    return successResponse(res, {
      statusCode: 200,
      message: "all wish list fetch successfully",
      payload: {
        wishList,
      },
    });
  } catch (err) {
    next(err);
  }
};

// Remove wish list
const wishListDelete = async (req, res, next) => {
  try {
    const userId = req.body.userId;
    const wishListId = req.params.id;

    // Remove the wishlist item by its _id
    const result = await WishList.deleteOne({ _id: wishListId });

    return successResponse(res, {
      statusCode: 200,
      message: "Wish list item removed successfully",
      payload: {
        deletedWishListId: wishListId,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { wishList, wishListAll, wishListDelete };
