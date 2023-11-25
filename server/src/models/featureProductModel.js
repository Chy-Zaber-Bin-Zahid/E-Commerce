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
    keyFeature: {
      model: {
        type: String,
        required: [true, "FeatureProduct model is required!"],
        trim: true,
      },
      resolution: {
        type: String,
        required: [true, "FeatureProduct resolution is required!"],
        trim: true,
      },
      display: {
        type: String,
        required: [true, "FeatureProduct display is required!"],
        trim: true,
      },
      ports: {
        type: String,
        required: [true, "FeatureProduct ports is required!"],
        trim: true,
      },
      features: {
        type: String,
        required: [true, "FeatureProduct features is required!"],
        trim: true,
      },
    },
  },
  { timestamps: true, collection: "feature-product" }
);

const FeatureProduct = model("FeatureProduct", featureProductSchema);

module.exports = FeatureProduct;
