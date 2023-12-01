const express = require("express");
const { paymentDetails } = require("../controllers/paymentController");
const paymentRouter = express.Router();

paymentRouter.post("/payment/:id", paymentDetails);

module.exports = paymentRouter;
