const mongoose = require("mongoose");
const { v4 } = require("uuid");

const signUpSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: v4,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    mobile: {
      type: Number,
      required: true,
    },
    address:{
      type: String,
    },
    dist:{
      type:String,
    },
    pincode:{
      type:String
    },
    password: {
      type: String,
      required: true,
    },
    profileImage:{
      type:String
    }
  },
  { timestamps: true }
);

const authsignup = mongoose.model("user", signUpSchema);

module.exports = authsignup;
