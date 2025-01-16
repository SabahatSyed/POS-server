const SalesBill = require("../models/salesBill.schema");
const ChartOfAccount = require("../models/chart-Of-Account");
const Salesman = require("../models/salesman.schema");
const InventoryInformation = require("../models/inventoryInfo.schema");
const Batch = require("../models/batch.schema");

module.exports = {
  // Create a new Sales Bill
  create: async (req, res) => {
    try {
      const { chartOfAccount, salesman, products, ...data } = req.body;

      // Validate Chart of Account
      const accountExists = await ChartOfAccount.findById(chartOfAccount);
      if (!accountExists) {
        return res.status(404).json({ message: "Chart of Account not found." });
      }

      // Validate Salesman
      const salesmanExists = await Salesman.findById(salesman);
      if (!salesmanExists) {
        return res.status(404).json({ message: "Salesman not found." });
      }

      // Validate Products
      for (const product of products) {
        const inventoryExists = await InventoryInformation.findById(product.inventory);
        if (!inventoryExists) {
          return res.status(404).json({ message: "Inventory not found for a product." });
        }

        const batchExists = await Batch.findById(product.batch);
        if (!batchExists) {
          return res.status(404).json({ message: "Batch not found for a product." });
        }
      }

      const salesBill = new SalesBill({ ...data, chartOfAccount, salesman, products });
      const savedBill = await salesBill.save();

      return res.status(201).json({
        message: "Sales Bill created successfully.",
        data: savedBill,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error creating Sales Bill.",
        error: error.message,
      });
    }
  },

  // Retrieve all Sales Bills
  getAll: async (req, res) => {
    try {
      const salesBills = await SalesBill.find()
        .populate("chartOfAccount")
        .populate("salesman")
        .populate("products.inventory")
        .populate("products.batch");

      return res.status(200).json({
        message: "Sales Bills retrieved successfully.",
        data: salesBills,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error retrieving Sales Bills.",
        error: error.message,
      });
    }
  },

  // Retrieve a specific Sales Bill by ID
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const salesBill = await SalesBill.findById(id)
        .populate("chartOfAccount")
        .populate("salesman")
        .populate("products.inventory")
        .populate("products.batch");

      if (!salesBill) {
        return res.status(404).json({ message: "Sales Bill not found." });
      }

      return res.status(200).json({
        message: "Sales Bill retrieved successfully.",
        data: salesBill,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error retrieving Sales Bill.",
        error: error.message,
      });
    }
  },

  // Update a Sales Bill
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { chartOfAccount, salesman, products, ...data } = req.body;

      if (chartOfAccount) {
        const accountExists = await ChartOfAccount.findById(chartOfAccount);
        if (!accountExists) {
          return res.status(404).json({ message: "Chart of Account not found." });
        }
      }

      if (salesman) {
        const salesmanExists = await Salesman.findById(salesman);
        if (!salesmanExists) {
          return res.status(404).json({ message: "Salesman not found." });
        }
      }

      if (products) {
        for (const product of products) {
          const inventoryExists = await InventoryInformation.findById(product.inventory);
          if (!inventoryExists) {
            return res.status(404).json({ message: "Inventory not found for a product." });
          }

          const batchExists = await Batch.findById(product.batch);
          if (!batchExists) {
            return res.status(404).json({ message: "Batch not found for a product." });
          }
        }
      }

      const updatedBill = await SalesBill.findByIdAndUpdate(
        id,
        { ...data, chartOfAccount, salesman, products },
        { new: true, runValidators: true }
      );

      if (!updatedBill) {
        return res.status(404).json({ message: "Sales Bill not found." });
      }

      return res.status(200).json({
        message: "Sales Bill updated successfully.",
        data: updatedBill,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error updating Sales Bill.",
        error: error.message,
      });
    }
  },

  // Delete a Sales Bill
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedBill = await SalesBill.findByIdAndDelete(id);

      if (!deletedBill) {
        return res.status(404).json({ message: "Sales Bill not found." });
      }

      return res.status(200).json({
        message: "Sales Bill deleted successfully.",
        data: deletedBill,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error deleting Sales Bill.",
        error: error.message,
      });
    }
  },
};
