const express = require("express");
const {
  wishList,
  wishListAll,
  wishListDelete,
} = require("../controllers/wishListController");
const wishListRouter = express.Router();

wishListRouter.post("/wishList/:id", wishList);
wishListRouter.post("/wishListDelete/:id", wishListDelete);
wishListRouter.get("/wishList/:id", wishListAll);

module.exports = wishListRouter;
