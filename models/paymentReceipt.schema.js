const mongoose = require("mongoose");

const paymentReceiptSchema = new mongoose.Schema(
  {
    salesBill: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SalesBill",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PaymentReceipt", paymentReceiptSchema);
