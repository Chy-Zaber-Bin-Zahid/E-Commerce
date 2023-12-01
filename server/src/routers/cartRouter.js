const express = require("express");
const {
  cart,
  cartItem,
  cartItemDelete,
  cartTotal,
} = require("../controllers/cartController");
const cartRouter = express.Router();

cartRouter.post("/cart/:id", cart);
cartRouter.get("/cart/:id", cartItem);
cartRouter.get("/cart/total/:id", cartTotal);
cartRouter.delete("/cart/:id", cartItemDelete);

module.exports = cartRouter;
