const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const createError = require("http-errors");
const rateLimit = require("express-rate-limit");
const userRouter = require("./routers/userRouter");
// const { seedRouter } = require("./routers/seedRouter");
const { errorResponse } = require("./controllers/responseController");
const cors = require("cors");

const app = express();

const rateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 5,
  message: "Too many request from this IP. Please try again later!",
});

app.use(cors());
app.use(rateLimiter);
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const isLoggedIn = (req, res, next) => {
  console.log("Logged!");
  next();
};

// Router
app.use("/api/user", userRouter);
// app.use("/api/seed", seedRouter);

// Client error handling
app.use((req, res, next) => {
  next(createError(404, "route not found!"));
});

// Server error handling
app.use((err, req, res, next) => {
  return errorResponse(res, {
    statusCode: err.status,
    message: err.message,
  });
});

module.exports = app;
