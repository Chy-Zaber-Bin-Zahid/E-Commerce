const { Schema, model } = require("mongoose");

const wishListSchema = new Schema(
  {
    userId: {
      type: String,
      required: [true, "User id is required!"],
      trim: true,
    },
    productId: {
      type: String,
      required: [true, "Product id is required!"],
      trim: true,
    },
    image: {
      type: String,
      required: [true, "FeatureProduct image is required!"],
      trim: true,
    },
    title: {
      type: String,
      required: [true, "FeatureProduct title is required!"],
      trim: true,
    },
    price: {
      type: String,
      required: [true, "FeatureProduct price is required!"],
      trim: true,
    },
  },
  { timestamps: true, collection: "wish-list" }
);

const WishList = model("WishList", wishListSchema);

module.exports = WishList;
