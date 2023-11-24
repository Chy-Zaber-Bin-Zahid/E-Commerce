const express = require("express");
const { cart } = require("../controllers/cartController");
const cartRoute = express.Router();

cartRoute.post("/cart/:id", cart);

module.exports = cartRoute;
