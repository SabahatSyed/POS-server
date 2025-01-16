const mongoose = require("mongoose");

const generalBillSchema = new mongoose.Schema(
  {
    salesBill: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SalesBill",
      required: true,
    },
    return: {
      type: Boolean,
      default: false,
    },
    balance: {
      type: Number,
      required: true,
      min: 0,
    },
    remarks: {
      type: String,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
      default: new Date(),
    },
    paymentType: {
      type: String,
      enum: ["Cash", "Credit"],
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    tradeRate: {
      type: Number,
      required: true,
      min: 0,
    },
    discount: {
      type: Number,
      default: 0,
      min: 0,
    },
    discountValue: {
      type: Number,
      default: 0,
      min: 0,
    },
    netRate: {
      type: Number,
      required: true,
      min: 0,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    products: [
      {
        inventory: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "InventoryInformation",
          required: true,
        },
        batch: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Batch",
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("GeneralBill", generalBillSchema);
