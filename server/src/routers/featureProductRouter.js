const express = require("express");
const {
  featureProduct,
  productDetails,
} = require("../controllers/featureProductController");
const featureProductRouter = express.Router();

featureProductRouter.get("/product", featureProduct);
featureProductRouter.get("/product/:id", productDetails);

module.exports = featureProductRouter;
