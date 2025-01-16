const GeneralBill = require("../models/generalBill.schema");
const SalesBill = require("../models/salesBill.schema");
const InventoryInformation = require("../models/inventoryInfo.schema");
const Batch = require("../models/batch.schema");

module.exports = {
  // Create a new General Bill
  create: async (req, res) => {
    try {
      const {
        salesBill,
        return: billReturn,
        balance,
        remarks,
        date,
        paymentType,
        quantity,
        tradeRate,
        discount,
        discountValue,
        netRate,
        amount,
        products,
      } = req.body;

      // Check if SalesBill exists
      const salesBillExists = await SalesBill.findById(salesBill);
      if (!salesBillExists) {
        return res.status(404).json({ message: "Sales Bill not found." });
      }

      // Check if all products exist
      for (let product of products) {
        const inventoryExists = await InventoryInformation.findById(product.inventory);
        const batchExists = await Batch.findById(product.batch);
        if (!inventoryExists || !batchExists) {
          return res.status(404).json({ message: "Inventory or Batch not found." });
        }
      }

      const generalBill = new GeneralBill({
        salesBill,
        return: billReturn,
        balance,
        remarks,
        date,
        paymentType,
        quantity,
        tradeRate,
        discount,
        discountValue,
        netRate,
        amount,
        products,
      });

      const savedGeneralBill = await generalBill.save();

      return res.status(201).json({
        message: "General Bill created successfully.",
        data: savedGeneralBill,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error creating General Bill.",
        error: error.message,
      });
    }
  },

  // Retrieve all General Bills
  getAll: async (req, res) => {
    try {
      const generalBills = await GeneralBill.find()
        .populate("salesBill")
        .populate("products.inventory")
        .populate("products.batch");

      return res.status(200).json({
        message: "General Bills retrieved successfully.",
        data: generalBills,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error retrieving General Bills.",
        error: error.message,
      });
    }
  },

  // Retrieve a specific General Bill by ID
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const generalBill = await GeneralBill.findById(id)
        .populate("salesBill")
        .populate("products.inventory")
        .populate("products.batch");

      if (!generalBill) {
        return res.status(404).json({ message: "General Bill not found." });
      }

      return res.status(200).json({
        message: "General Bill retrieved successfully.",
        data: generalBill,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error retrieving General Bill.",
        error: error.message,
      });
    }
  },

  // Update a General Bill
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const {
        salesBill,
        return: billReturn,
        balance,
        remarks,
        date,
        paymentType,
        quantity,
        tradeRate,
        discount,
        discountValue,
        netRate,
        amount,
        products,
      } = req.body;

      // Check if SalesBill exists
      const salesBillExists = await SalesBill.findById(salesBill);
      if (!salesBillExists) {
        return res.status(404).json({ message: "Sales Bill not found." });
      }

      // Check if all products exist
      for (let product of products) {
        const inventoryExists = await InventoryInformation.findById(product.inventory);
        const batchExists = await Batch.findById(product.batch);
        if (!inventoryExists || !batchExists) {
          return res.status(404).json({ message: "Inventory or Batch not found." });
        }
      }

      const updatedGeneralBill = await GeneralBill.findByIdAndUpdate(
        id,
        {
          salesBill,
          return: billReturn,
          balance,
          remarks,
          date,
          paymentType,
          quantity,
          tradeRate,
          discount,
          discountValue,
          netRate,
          amount,
          products,
        },
        { new: true, runValidators: true }
      );

      if (!updatedGeneralBill) {
        return res.status(404).json({ message: "General Bill not found." });
      }

      return res.status(200).json({
        message: "General Bill updated successfully.",
        data: updatedGeneralBill,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error updating General Bill.",
        error: error.message,
      });
    }
  },

  // Delete a General Bill
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedGeneralBill = await GeneralBill.findByIdAndDelete(id);

      if (!deletedGeneralBill) {
        return res.status(404).json({ message: "General Bill not found." });
      }

      return res.status(200).json({
        message: "General Bill deleted successfully.",
        data: deletedGeneralBill,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error deleting General Bill.",
        error: error.message,
      });
    }
  },
};
