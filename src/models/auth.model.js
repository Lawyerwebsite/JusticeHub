const mongoose = require("mongoose");
const { v4 } = require("uuid");

const siginUpSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: v4,
    },
    fname: {
      type: String,
    },
    lname: {
      type: String,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    number: {
      type: Number,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      default: "SuperAdmin",
    },
    gender: {
      type: String,
    },
    address: {
      type: String,
    },
    country: {
      type: String,
    },
    photo:{
      type: String,
    }
  },
  { timestamps: true }
);

const superAdmin = mongoose.model("SuperAdmin", siginUpSchema);

module.exports = superAdmin;
