const mongoose = require("mongoose");
const { v4 } = require("uuid");

const lawyerSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: v4,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  number: {
    type: String,
  },
  dob: {
    type: Date,
  },
  category: {
    type: String,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
  },
  address: {
    type: String,
  },
  state: {
    type: String,
  },
  city: {
    type: String,
  },
  pincode: {
    type: String,
  },
  bio: {
    type: String,
  },
  fileName: {
    type: String,
  },
  filePath: {
    type: String,
  },
  fileType: {
    type: String,
  },
  fileOriginalName: {
    type: String,
  },
  qualification: {
    type: String,
  },

  url: {
    type: String,
  },
  experience: {
    type: String,
  },
  workplace: {
    type: String,
  },
  enrollmentnumber:{
    type:String,
  },
  registernumber:{
    type:String,
  },

  status: {
    type: String,
    enum: ["Active", "Inactive"],
    default: "Active",
  },
  
});

const Lawyer = mongoose.model("lawyer", lawyerSchema);

module.exports = Lawyer;
