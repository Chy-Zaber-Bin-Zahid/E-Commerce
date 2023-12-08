const express = require("express");
const {
  regUser,
  logUser,
  getUserById,
  changeUser,
  changePassUser,
  paymentUpdate,
  paymentGet,
  getAllUser,
  statusUpdate,
} = require("../controllers/userController");
const userRouter = express.Router();



userRouter.post("/register", regUser);
userRouter.post("/login", logUser);
userRouter.post("/change", changeUser);
userRouter.post("/changePass", changePassUser);
userRouter.get("/profile/:id", getUserById);
userRouter.patch("/payment/:id", paymentUpdate);
userRouter.get("/payment/:id", paymentGet);
userRouter.get("/all", getAllUser);
userRouter.patch("/status", statusUpdate);

module.exports = userRouter;
