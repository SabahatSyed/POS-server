const mongoose = require("mongoose");

const inventoryInfoSchema = new mongoose.Schema(
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
    name: {
      type: String,
      required: true,
      trim: true,
    },
    packPrice: {
      type: Number,
      required: true,
    },
    purchasePrice: {
      type: Number,
      required: true,
    },
    tradePrice: {
      type: Number,
      required: true,
    },
    inventoryGroup: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "InventoryGroup",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("InventoryInfo", inventoryInfoSchema);
