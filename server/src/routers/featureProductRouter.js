const express = require("express");

const {
  featureProduct,
  productDetails,
  productDelete,
} = require("../controllers/featureProductController");
const featureProductRouter = express.Router();

featureProductRouter.get("/product", featureProduct);
featureProductRouter.get("/product/:id", productDetails);
featureProductRouter.delete("/product/delete/:id", productDelete);

module.exports = featureProductRouter;
