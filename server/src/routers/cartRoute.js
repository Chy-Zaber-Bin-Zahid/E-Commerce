const express = require("express");
const {
  cart,
  cartItem,
  cartItemDelete,
  cartTotal,
} = require("../controllers/cartController");
const cartRoute = express.Router();

cartRoute.post("/cart/:id", cart);
cartRoute.get("/cart/:id", cartItem);
cartRoute.get("/cart/total/:id", cartTotal);
cartRoute.delete("/cart/:id", cartItemDelete);

module.exports = cartRoute;
