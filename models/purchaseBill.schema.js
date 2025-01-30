const mongoose = require("mongoose");

const purchaseBillSchema = new mongoose.Schema(
  {
    chartOfAccount: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ChartOfAccount",
      required: true,
    },
    salesmen: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "salesmen",
      required: true,
    },
    products: [
      {
        inventoryInformation: {
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
      type: String,
      required: true,
    },
    purchaseRate: {
      type: String,
      required: true,
    },
    discount: {
      type: String,
      default: 0,
    },
    discountValue: {
      type: String,
      default: 0,
    },
    netRate: {
      type: String,
      required: true,
    },
    amount: {
      type: String,
      required: true,
    },
    balance: {
      type: String,
      required: true,
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
      enum: ["cash", "credit"],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PurchaseBill", purchaseBillSchema);
