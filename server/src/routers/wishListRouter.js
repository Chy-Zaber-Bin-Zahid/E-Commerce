const express = require("express");
const { wishList } = require("../controllers/wishListController");
const wishListRouter = express.Router();

wishListRouter.get("/wishList", wishList);

module.exports = wishListRouter;
