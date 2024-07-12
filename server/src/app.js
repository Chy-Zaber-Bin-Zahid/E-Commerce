const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const createError = require("http-errors");
const multer = require("multer");
// const rateLimit = require("express-rate-limit");
const userRouter = require("./routers/userRouter");
// const { seedRouter } = require("./routers/seedRouter");
const {
  errorResponse,
  successResponse,
} = require("./controllers/responseController");
const cors = require("cors");
const featureProductRouter = require("./routers/featureProductRouter");
const wishListRouter = require("./routers/wishListRouter");
const cartRouter = require("./routers/cartRouter");
const paymentRouter = require("./routers/paymentRouter");
const orderRouter = require("./routers/orderRouter");
const FeatureProduct = require("./models/featureProductModel");

const app = express();

// const rateLimiter = rateLimit({
//   windowMs: 1 * 60 * 1000,
//   max: 5,
//   message: "Too many request from this IP. Please try again later!",
// });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/products");
  },
  filename: function (req, file, cb) {
    const newName = `${Date.now()}_${file.originalname}`;
    req.updatedFileName = newName; // Store the updated filename in a variable
    cb(null, newName);
  },
});

// Initialize Multer with the defined storage
const upload = multer({ storage });

app.use(cors());
// app.use(rateLimiter);
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const isLoggedIn = (req, res, next) => {
  console.log("Logged!");
  next();
};

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the API');
});

// Favicon route
app.get('/favicon.ico', (req, res) => res.status(204));

// Router
app.use("/api/user", userRouter);
app.use("/api/user", featureProductRouter);
app.use("/api/user", wishListRouter);
app.use("/api/user", cartRouter);
app.use("/api/user", paymentRouter);
app.use("/api/user", orderRouter);
//product add
app.post("/api/user/upload", upload.single("file"), async (req, res, next) => {
  try {
    const imageName = req.updatedFileName;
    console.log(imageName);
    const title = req.body.title;
    const priceInput = req.body.priceInput;
    const features = JSON.parse(req.body.features);
    const transformedData = features.reduce((acc, curr) => {
      acc[curr.name] = curr.description;
      return acc;
    }, {});

    const createProduct = new FeatureProduct({
      image: imageName,
      title: title,
      price: priceInput,
      keyFeature: transformedData,
    });

    await createProduct.save();

    return successResponse(res, {
      statusCode: 200,
      message: "Feature product added successfully",
      payload: {
        createProduct,
      },
    });
  } catch (err) {
    next(err);
  }
});

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
