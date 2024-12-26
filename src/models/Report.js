const mongoose = require("mongoose");
const { v4 } =require("uuid")

const reportSchema = new mongoose.Schema(
  {
    _id: {
        type: String,
        default: v4,
      },
    name: {
      type: String,
    },
    role: {
      type: String,
    },
    description: {
      type: String,
    },
    date: {
      type: Date,
    
    },
    status: {
      type: String,
      default: "pending",
    },
  },
  { timestamps: true }
);

const Report = mongoose.model("report", reportSchema);

module.exports = Report;
