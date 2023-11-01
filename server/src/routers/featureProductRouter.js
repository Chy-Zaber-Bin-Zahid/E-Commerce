const express = require("express");
const { featureProduct } = require("../controllers/featureProductController");
const featureProductRouter = express.Router();

featureProductRouter.get("/product", featureProduct);

module.exports = featureProductRouter;
