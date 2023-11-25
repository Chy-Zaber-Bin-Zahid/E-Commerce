const express = require("express");
const { cart, cartItem } = require("../controllers/cartController");
const cartRoute = express.Router();

cartRoute.post("/cart/:id", cart);
cartRoute.get("/cart/:id", cartItem);

module.exports = cartRoute;
