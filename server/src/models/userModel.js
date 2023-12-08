const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "User name is required!"],
      trim: true,
      maxlength: [30, "The length of user name can be maximum 31 characters"],
    },
    email: {
      type: String,
      required: [true, "User email is required!"],
      trim: true,
      unique: true,
      validate: {
        validator: function (v) {
          return /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(v);
        },
        message: "Please enter a valid email!",
      },
    },
    password: {
      type: String,
      required: [true, "User password is required!"],
      minlength: [6, "The length of user password can be minimum 6 characters"],
      set: (v) => bcrypt.hashSync(v, bcrypt.genSaltSync(10)),
    },
    telephone: {
      type: String,
      required: [true, "User phone is required!"],
      minlength: [
        11,
        "The length of user telephone can be minimum 11 characters",
      ],
      maxlength: [
        11,
        "The length of user telephone can be maximum 11 characters",
      ],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isBanned: {
      type: Boolean,
      default: false,
    },
    payment: {
      type: String,
      default: "cash",
    },
  },
  { timestamps: true }
);

const User = model("User", userSchema);

module.exports = User;
