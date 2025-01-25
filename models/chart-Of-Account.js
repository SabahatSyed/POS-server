const mongoose = require("mongoose");

const chartOfAccountSchema = new mongoose.Schema(
  {
    mainGroup: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MainGroup",
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    cnic: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    mobile: {
      type: String,
    },
    balanceBF: {
      type: Number,
      required: true,
      default: 0,
    },
    creditLimit: {
      type: Number,
      required: true,
      default: 0,
    },
    address: {
      type: String,
    },
    TPB: {
      type: String,
      required: true,
    },
    NTN: {
      type: String,
      required: true,
    },
    STRN: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ChartOfAccount", chartOfAccountSchema);
