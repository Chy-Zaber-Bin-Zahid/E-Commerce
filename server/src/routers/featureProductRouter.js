const express = require("express");
const multer = require("multer");
const {
  featureProduct,
  productDetails,
  productAdd,
} = require("../controllers/featureProductController");
const featureProductRouter = express.Router();

const upload = multer({ dest: "public/images/products" });

featureProductRouter.get("/product", featureProduct);
featureProductRouter.get("/product/:id", productDetails);
featureProductRouter.post("/product", upload.single(), productAdd);

module.exports = featureProductRouter;
