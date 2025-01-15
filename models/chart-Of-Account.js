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
      validate: {
        validator: function (v) {
          return /\d{13}/.test(v); // 13-digit CNIC
        },
        message: (props) => `${props.value} is not a valid CNIC!`,
      },
    },
    phone: {
      type: String,
      validate: {
        validator: function (v) {
          return /\d{10,15}/.test(v); // 10-15 digits
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    mobile: {
      type: String,
      validate: {
        validator: function (v) {
          return /\d{10,15}/.test(v); // 10-15 digits
        },
        message: (props) => `${props.value} is not a valid mobile number!`,
      },
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
