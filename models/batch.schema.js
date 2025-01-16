const mongoose = require("mongoose");

const batchSchema = new mongoose.Schema(
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
    date: {
      type: Date,
      required: true,
    },
    supplierName: {
      type: String,
      required: true,
      trim: true,
    },
    supplierCode: {
      type: String,
      required: true,
      trim: true,
    },
    inventory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "InventoryInformation",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Batch", batchSchema);
