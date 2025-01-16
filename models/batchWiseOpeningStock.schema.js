const mongoose = require("mongoose");

const batchWiseOpeningStockSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    batch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Batch",
      required: true,
    },
    inventory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "InventoryInformation",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BatchWiseOpeningStock", batchWiseOpeningStockSchema);
