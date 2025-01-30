const PaymentReceipt = require("../models/paymentReceipt.schema");
const SalesBill = require("../models/salesBill.schema");

module.exports = {
  // Create a new Payment Receipt
  create: async (req, res) => {
    try {
      const { salesBill } = req.body;

      // Check if the SalesBill exists
      const salesBillExists = await SalesBill.findById(salesBill);
      if (!salesBillExists) {
        return res.status(404).json({ message: "Sales Bill not found." });
      }

      const paymentReceipt = new PaymentReceipt({
        salesBill,
      });

      const savedReceipt = await paymentReceipt.save();

      return res.status(201).json({
        message: "Payment Receipt created successfully.",
        data: savedReceipt,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error creating Payment Receipt.",
        error: error.message,
      });
    }
  },

  // Retrieve all Payment Receipts
  getAll: async (req, res) => {
    try {
      const paymentReceipts = await PaymentReceipt.find().populate("salesBill");

      return res.status(200).json({
        message: "Payment Receipts retrieved successfully.",
        data: paymentReceipts,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error retrieving Payment Receipts.",
        error: error.message,
      });
    }
  },

  // Retrieve a specific Payment Receipt by ID
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const paymentReceipt = await PaymentReceipt.findById(id).populate("salesBill");

      if (!paymentReceipt) {
        return res.status(404).json({ message: "Payment Receipt not found." });
      }

      return res.status(200).json({
        message: "Payment Receipt retrieved successfully.",
        data: paymentReceipt,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error retrieving Payment Receipt.",
        error: error.message,
      });
    }
  },

  // Update a Payment Receipt
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { salesBill } = req.body;

      // Check if the SalesBill exists
      const salesBillExists = await SalesBill.findById(salesBill);
      if (!salesBillExists) {
        return res.status(404).json({ message: "Sales Bill not found." });
      }

      const updatedReceipt = await PaymentReceipt.findByIdAndUpdate(
        id,
        { salesBill },
        { new: true, runValidators: true }
      );

      if (!updatedReceipt) {
        return res.status(404).json({ message: "Payment Receipt not found." });
      }

      return res.status(200).json({
        message: "Payment Receipt updated successfully.",
        data: updatedReceipt,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error updating Payment Receipt.",
        error: error.message,
      });
    }
  },

  // Delete a Payment Receipt
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedReceipt = await PaymentReceipt.findByIdAndDelete(id);

      if (!deletedReceipt) {
        return res.status(404).json({ message: "Payment Receipt not found." });
      }

      return res.status(200).json({
        message: "Payment Receipt deleted successfully.",
        data: deletedReceipt,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error deleting Payment Receipt.",
        error: error.message,
      });
    }
  },
};
