const PurchaseBill = require("../models/purchaseBill.schema");
const ChartOfAccount = require("../models/chart-Of-Account");
const Salesman = require("../models/salesmen.schema");
const InventoryInformation = require("../models/inventoryInfo.schema");
const Batch = require("../models/batch.schema");

module.exports = {
  // Create a new Purchase Bill
  create: async (req, res) => {
    try {
      const { chartOfAccount, supplier, products, paymentType, quantity, balance, remarks, date } = req.body;

      // Validate Chart of Account
      const accountExists = await ChartOfAccount.findById(chartOfAccount);
      if (!accountExists) {
        return res.status(404).json({ message: "Chart of Account not found." });
      }

      // Validate Supplier (Salesman)
      const supplierExists = await Salesman.findById(supplier);
      if (!supplierExists) {
        return res.status(404).json({ message: "Supplier (Salesman) not found." });
      }

      let totalAmount = 0;
      let totalBalance = balance || 0;  // Assuming `balance` is passed from the frontend

      // Validate Products and Process Batch Quantities
      for (const product of products) {
        const inventoryExists = await InventoryInformation.findById(product.inventory);
        if (!inventoryExists) {
          return res.status(404).json({ message: "Inventory not found for a product." });
        }

        const batchExists = await Batch.findById(product.batch);
        if (!batchExists) {
          return res.status(404).json({ message: "Batch not found for a product." });
        }

        // Calculate Discount and Net Rate
        const discountValue = (product.purchaseRate * product.discount) / 100;
        const netRate = product.purchaseRate - discountValue;
        const amount = netRate * quantity;

        // Update Batch Quantity (purchase bill increases stock)
        batchExists.quantity += quantity;
        await batchExists.save();

        // Add to totalAmount
        totalAmount += amount;

        // Update product in the array
        product.discountValue = discountValue;
        product.netRate = netRate;
        product.amount = amount;
      }

      const purchaseBill = new PurchaseBill({
        chartOfAccount,
        supplier,
        products,
        paymentType,
        balance: totalBalance,
        remarks,
        date,
        amount: totalAmount, // Total amount calculated from products
      });

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
        .populate("supplier")
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
        .populate("supplier")
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
      const { chartOfAccount, supplier, products, paymentType,quantity, balance, remarks, date } = req.body;

      // Validate Chart of Account and Supplier
      if (chartOfAccount) {
        const accountExists = await ChartOfAccount.findById(chartOfAccount);
        if (!accountExists) {
          return res.status(404).json({ message: "Chart of Account not found." });
        }
      }

      if (supplier) {
        const supplierExists = await Salesman.findById(supplier);
        if (!supplierExists) {
          return res.status(404).json({ message: "Supplier not found." });
        }
      }

      // Process products and adjust batch quantities
      let totalAmount = 0;
      let totalBalance = balance || 0;

      for (const product of products) {
        const inventoryExists = await InventoryInformation.findById(product.inventory);
        if (!inventoryExists) {
          return res.status(404).json({ message: "Inventory not found for a product." });
        }

        const batchExists = await Batch.findById(product.batch);
        if (!batchExists) {
          return res.status(404).json({ message: "Batch not found for a product." });
        }

        const discountValue = (product.purchaseRate * product.discount) / 100;
        const netRate = product.purchaseRate - discountValue;
        const amount = netRate * quantity;

        batchExists.quantity += quantity;
        await batchExists.save();

        totalAmount += amount;

        // Update product in the array
        product.discountValue = discountValue;
        product.netRate = netRate;
        product.amount = amount;
      }

      const updatedBill = await PurchaseBill.findByIdAndUpdate(
        id,
        {
          chartOfAccount,
          supplier,
          products,
          paymentType,
          balance: totalBalance,
          remarks,
          date,
          amount: totalAmount,
        },
        { new: true, runValidators: true }
      );

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
    } catch (error)      {
      return res.status(500).json({
        message: "Error deleting Purchase Bill.",
        error: error.message,
      });
    }
  },
};
