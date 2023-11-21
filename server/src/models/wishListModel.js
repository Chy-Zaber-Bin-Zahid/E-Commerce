const { Schema, model } = require("mongoose");

const wishListSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "User email is required!"],
      trim: true,
      unique: true,
      validate: {
        validator: function (v) {
          return /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(v);
        },
        message: "Please enter a valid email!",
      },
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
  { timestamps: true, collection: "feature-product" }
);

const WishList = model("WishList", wishListSchema);

module.exports = WishList;
