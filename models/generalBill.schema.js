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
    remarks: {
      type: String,
      trim: true,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    paymentType: {
      type: String,
      enum: ["cash", "credit"],
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    tradeRate: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    discountValue: {
      type: Number,
      required: true,
    },
    netRate: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("GeneralBill", generalBillSchema);
