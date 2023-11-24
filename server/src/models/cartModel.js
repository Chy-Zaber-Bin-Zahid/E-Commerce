const { Schema, model } = require("mongoose");

const cartSchema = new Schema(
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
      required: [true, "cart image is required!"],
      trim: true,
    },
    title: {
      type: String,
      required: [true, "cart title is required!"],
      trim: true,
    },
    price: {
      type: String,
      required: [true, "cart price is required!"],
      trim: true,
    },
    total: {
      type: String,
      required: [true, "cart total is required!"],
      trim: true,
    },
    totalCost: {
      type: String,
      required: [true, "cart total cost is required!"],
      trim: true,
    },
  },
  { timestamps: true, collection: "cart" }
);

const Cart = model("Cart", cartSchema);

module.exports = Cart;
