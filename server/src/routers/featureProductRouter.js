const express = require("express");
<<<<<<< HEAD

const {
  featureProduct,
  productDetails,
  productDelete,
=======
const multer = require("multer");
const {
  featureProduct,
  productDetails,
  productAdd,
>>>>>>> 7d478a564480f9f44a393ccb7524e8b1dac40c89
} = require("../controllers/featureProductController");
const featureProductRouter = express.Router();

const upload = multer({ dest: "public/images/products" });

featureProductRouter.get("/product", featureProduct);
featureProductRouter.get("/product/:id", productDetails);
<<<<<<< HEAD
featureProductRouter.delete("/product/delete/:id", productDelete);
=======
featureProductRouter.post("/product", upload.single(), productAdd);
>>>>>>> 7d478a564480f9f44a393ccb7524e8b1dac40c89

module.exports = featureProductRouter;
