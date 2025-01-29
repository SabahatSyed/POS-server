const mongoose = require("mongoose");

const salesBillSchema = new mongoose.Schema(
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
          inventoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "InventoryInformation",
            required: true,
          },
          name: { type: String, required: true },
          code: { type: String, required: true },
        },
        batch: {
          batchId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Batch",
            required: true,
          },
          description: { type: String, required: true },
          code: { type: String, required: true },
        },
      },
    ],
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
      enum: ["cash", "credit"],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SalesBill", salesBillSchema);
