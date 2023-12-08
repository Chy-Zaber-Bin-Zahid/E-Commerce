const { Schema, model } = require("mongoose");

const paymentSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "User name is required!"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "User email is required!"],
      trim: true,
    },
    address: {
      type: String,
      required: [true, "User address is required!"],
      trim: true,
    },
    telephone: {
      type: String,
      required: [true, "User telephone is required!"],
      trim: true,
    },
    comment: {
      type: String,
      required: [true, "comment id is required!"],
      trim: true,
    },
    delivery: {
      type: String,
      required: [true, "User delivery is required!"],
      trim: true,
    },
    payment: {
      type: String,
      required: [true, "User payment is required!"],
      trim: true,
    },
    userId: {
      type: String,
      required: [true, "User id is required!"],
      trim: true,
    },
    productId: {
      type: [String],
      required: [true, "Product id is required!"],
      trim: true,
    },
    title: {
      type: [String],
      required: [true, "Product title is required!"],
      trim: true,
    },
    totalCost: {
      type: String,
      required: [true, "Product total cost is required!"],
      trim: true,
    },
  },
  { timestamps: true, collection: "payment" }
);

const payment = model("payment", paymentSchema);

module.exports = payment;
