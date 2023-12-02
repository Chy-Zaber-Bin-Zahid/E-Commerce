require("dotenv").config();

const serverPort = process.env.SERVER_PORT || 3002;
const mongodbURL =
  process.env.MONGODB_ATLAS_URL || "mongodb://localhost:27017/ecommerce";
const defaultImagePath =
  process.env.DEFAULT_USER_IMAGE_PATH || "public/images/users/default.png";

const smtpUsername = process.env.SMTP_USERNAME || "";

const smtpPassword = process.env.SMTP_PASSWORD || "";

module.exports = {
  smtpUsername,
  smtpPassword,
  serverPort,
  mongodbURL,
  defaultImagePath,
};
