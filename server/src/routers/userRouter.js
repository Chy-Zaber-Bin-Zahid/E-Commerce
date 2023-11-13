const express = require("express");
const { regUser,logUser, getUserById } = require("../controllers/userController");
const userRouter = express.Router();

userRouter.post("/register", regUser);
userRouter.post("/login", logUser);
userRouter.get("/profile/:id", getUserById);

module.exports = userRouter;
