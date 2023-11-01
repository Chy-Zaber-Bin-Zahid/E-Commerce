const { Schema, model } = require("mongoose");

const featureProductSchema = new Schema(
  {
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

const FeatureProduct = model("FeatureProduct", featureProductSchema);

module.exports = FeatureProduct;
