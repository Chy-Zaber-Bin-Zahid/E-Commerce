const express = require("express");
const {
  cart,
  cartItem,
  cartItemDelete,
} = require("../controllers/cartController");
const cartRoute = express.Router();

cartRoute.post("/cart/:id", cart);
cartRoute.get("/cart/:id", cartItem);
cartRoute.delete("/cart/:id", cartItemDelete);

module.exports = cartRoute;
