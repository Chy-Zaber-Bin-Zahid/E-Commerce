const express = require("express");
const { orderGet } = require("../controllers/orderController");
const orderRouter = express.Router();

orderRouter.get("/order/:id", orderGet);

module.exports = orderRouter;
