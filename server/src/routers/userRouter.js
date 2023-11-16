const express = require("express");
const {
  regUser,
  logUser,
  getUserById,
  changeUser,
  changePassUser,
} = require("../controllers/userController");
const userRouter = express.Router();

userRouter.post("/register", regUser);
userRouter.post("/login", logUser);
userRouter.post("/change", changeUser);
userRouter.post("/changePass", changePassUser);
userRouter.get("/profile/:id", getUserById);

module.exports = userRouter;
