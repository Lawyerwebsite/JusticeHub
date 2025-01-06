const mongoose = require("mongoose");
const { v4 } = require("uuid");

const appointmentSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: v4,
    },
    userId: {
      type: String,
    },
    status: {
      type: String,
      default: "pending",
    },

    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    number: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    startDate: {
      type: String,
    },
    title: {
      type: String,
    },
    endDate: {
      type: String,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    discribe: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    lawyerName:{
      type:String,
    },
    lawyerId:{
      type:String,
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

    url: {
      type: String,
    },
    payment:{
      type: String,
    },
    status:{
      type:String,
      default: 'pending',
    }
  },
  { timestamps: true }
);

const appointmentmodel = mongoose.model("appointment", appointmentSchema);

module.exports = appointmentmodel;
