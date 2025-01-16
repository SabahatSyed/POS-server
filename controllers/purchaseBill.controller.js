const PurchaseBill = require("../models/purchaseBill.schema");
const ChartOfAccount = require("../models/chart-Of-Account");
const Salesman = require("../models/salesman.schema");
const InventoryInformation = require("../models/inventoryInfo.schema");
const Batch = require("../models/batch.schema");

module.exports = {
  // Create a new Purchase Bill
  create: async (req, res) => {
    try {
      const { chartOfAccount, salesman, products } = req.body;

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

      const purchaseBill = new PurchaseBill(req.body);
      const savedBill = await purchaseBill.save();

      return res.status(201).json({
        message: "Purchase Bill created successfully.",
        data: savedBill,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error creating Purchase Bill.",
        error: error.message,
      });
    }
  },

  // Retrieve all Purchase Bills
  getAll: async (req, res) => {
    try {
      const purchaseBills = await PurchaseBill.find()
        .populate("chartOfAccount")
        .populate("salesman")
        .populate("products.inventory")
        .populate("products.batch");

      return res.status(200).json({
        message: "Purchase Bills retrieved successfully.",
        data: purchaseBills,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error retrieving Purchase Bills.",
        error: error.message,
      });
    }
  },

  // Retrieve a specific Purchase Bill by ID
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const purchaseBill = await PurchaseBill.findById(id)
        .populate("chartOfAccount")
        .populate("salesman")
        .populate("products.inventory")
        .populate("products.batch");

      if (!purchaseBill) {
        return res.status(404).json({ message: "Purchase Bill not found." });
      }

      return res.status(200).json({
        message: "Purchase Bill retrieved successfully.",
        data: purchaseBill,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error retrieving Purchase Bill.",
        error: error.message,
      });
    }
  },

  // Update a Purchase Bill
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { chartOfAccount, salesman, products } = req.body;

      // Validate Chart of Account
      if (chartOfAccount) {
        const accountExists = await ChartOfAccount.findById(chartOfAccount);
        if (!accountExists) {
          return res.status(404).json({ message: "Chart of Account not found." });
        }
      }

      // Validate Salesman
      if (salesman) {
        const salesmanExists = await Salesman.findById(salesman);
        if (!salesmanExists) {
          return res.status(404).json({ message: "Salesman not found." });
        }
      }

      // Validate Products
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

      const updatedBill = await PurchaseBill.findByIdAndUpdate(
        id,
        req.body,
        { new: true, runValidators: true }
      );

      if (!updatedBill) {
        return res.status(404).json({ message: "Purchase Bill not found." });
      }

      return res.status(200).json({
        message: "Purchase Bill updated successfully.",
        data: updatedBill,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error updating Purchase Bill.",
        error: error.message,
      });
    }
  },

  // Delete a Purchase Bill
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedBill = await PurchaseBill.findByIdAndDelete(id);

      if (!deletedBill) {
        return res.status(404).json({ message: "Purchase Bill not found." });
      }

      return res.status(200).json({
        message: "Purchase Bill deleted successfully.",
        data: deletedBill,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error deleting Purchase Bill.",
        error: error.message,
      });
    }
  },
};
