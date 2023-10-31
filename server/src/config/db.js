const mongoose = require("mongoose");
const { mongodbURL } = require("../secret");

const connectionDatabase = async (options = {}) => {
  try {
    await mongoose.connect(mongodbURL, options);
    console.log("Connection to DB is successfully established!");

    mongoose.connection.on("error", (err) => {
      console.error("DB connection error: ", err);
    });
  } catch (err) {
    console.error("Could not connect to DB: ", err.toString());
  }
};

module.exports = connectionDatabase;
