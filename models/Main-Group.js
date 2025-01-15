const mongoose = require("mongoose");

const mainGroupSchema = new mongoose.Schema(
  {
    seqNumber: {
      type: Number,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("MainGroup", mainGroupSchema);
