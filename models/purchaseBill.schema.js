const mongoose = require("mongoose");

const purchaseBillSchema = new mongoose.Schema(
  {
    chartOfAccount: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ChartOfAccount",
      required: true,
    },
    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ChartOfAccount", // Assuming suppliers are also stored in Chart of Account
      required: true,
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
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    purchaseRate: {
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("PurchaseBill", purchaseBillSchema);
