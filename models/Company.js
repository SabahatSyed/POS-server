const mongoose = require("mongoose");

const PageAccessSchema = new mongoose.Schema({
  read: { type: Boolean, default: false },
  add: { type: Boolean, default: false },
  update: { type: Boolean, default: false },
  delete: { type: Boolean, default: false },
});

const companySchema = new mongoose.Schema(
  {
    seqNumber: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    logoURL: {
      type: String,
    },
    pagesAccess: {
      type: Map,
      of: PageAccessSchema,
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    companyType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CompanyType",
      required: true,
    },
    theme: {
      primary: {
        type: String,
        required: true,
      },
      secondary: {
        type: String,
        required: true,
      },
      background: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Company", companySchema);
