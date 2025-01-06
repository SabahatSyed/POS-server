const mongoose = require("mongoose");

const companyTypeSchema = new mongoose.Schema(
  {
    seqNumber: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);


module.exports = mongoose.model("CompanyType", companyTypeSchema);
