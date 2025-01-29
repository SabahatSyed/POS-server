const SalesBill = require("../models/salesBill.schema");
const ChartOfAccount = require("../models/chart-Of-Account");
const Salesmen = require("../models/salesmen.schema");
const InventoryInformation = require("../models/inventoryInfo.schema");
const Batch = require("../models/batch.schema");
const { aggregate, mongoID } = require("../helpers/filter.helper");

module.exports = {
  // Create a new Sales Bill
  create: async (req, res) => {
    try {
      const { chartOfAccount, salesmen, products, ...data } = req.body;

      // Validate Chart of Account
      const accountExists = await ChartOfAccount.findById(chartOfAccount);
      if (!accountExists) {
        return res.status(404).json({ message: "Chart of Account not found." });
      }

      // Validate salesmen
      const salesmenExists = await Salesmen.findById(salesmen);
      if (!salesmenExists) {
        return res.status(404).json({ message: "salesmen not found." });
      }

      // Validate Products and Update Batch Quantities
      let processedProducts = [];
      for (const product of products) {
        const inventoryExists = await InventoryInformation.findById(
          product.inventoryInformation
        );
        if (!inventoryExists) {
          return res
            .status(404)
            .json({ message: "InventoryInformation not found for a product." });
        }

        const batch = await Batch.findById(product.batch);
        if (!batch) {
          return res
            .status(404)
            .json({ message: "Batch not found for a product." });
        }

        if (batch.quantity < data.quantity) {
          return res.status(400).json({
            message: `Insufficient batch quantity for product: ${product.inventoryInformation}`,
          });
        }
        if (data.return) {
          const BatchQuantity = data.quantity + batch.quantity;
          batch.quantity = BatchQuantity;
        } else {
          const BatchQuantity = batch.quantity - data.quantity;
          batch.quantity = BatchQuantity;
        }
        await batch.save();

        processedProducts.push({
          inventoryInformation: {
            inventoryId: inventoryExists._id,
            name: inventoryExists.name,
            code: inventoryExists.code,
          },
          batch: {
            batchId: batch._id,
            code: batch.code,
            description: batch.description,
          },
        });
      }

      const salesBill = new SalesBill({
        ...data,
        chartOfAccount,
        salesmen,
        products: processedProducts,
      });
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

  // Update a Sales Bill
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const {
        chartOfAccount,
        salesmen,
        products,
        return: isReturn,
        ...data
      } = req.body;

      const existingBill = await SalesBill.findById(id);
      if (!existingBill) {
        return res.status(404).json({ message: "Sales Bill not found." });
      }

      if (chartOfAccount) {
        const accountExists = await ChartOfAccount.findById(chartOfAccount);
        if (!accountExists) {
          return res
            .status(404)
            .json({ message: "Chart of Account not found." });
        }
      }

      if (salesmen) {
        const salesmenExists = await salesmen.findById(salesmen);
        if (!salesmenExists) {
          return res.status(404).json({ message: "salesmen not found." });
        }
      }
      let updatedProducts = [];
      if (products) {
        for (const product of products) {
          const batch = await Batch.findById(product.batch);
          if (!batch) {
            return res
              .status(404)
              .json({ message: "Batch not found for a product." });
          }

          if (isReturn) {
            batch.quantity += data.quantity;
            const existingProduct = existingBill.products.find(
              (p) => p.batch.toString() === product.batch
            );
            if (existingProduct) {
              existingProduct.quantity -= data.quantity;
              if (existingProduct.quantity < 0) {
                return res.status(400).json({
                  message: "Return quantity exceeds sold quantity.",
                });
              }
            }
          } else {
            if (batch.quantity < data.quantity) {
              return res.status(400).json({
                message: `Insufficient batch quantity for product: ${product.inventory}`,
              });
            }

            batch.quantity -= data.quantity;
          }

          await batch.save();

          updatedProducts.push({
            inventoryInformation: {
              inventoryId: inventoryExists._id,
              name: inventoryExists.name,
              code: inventoryExists.code,
            },
            batch: {
              batchId: batch._id,
              code: batch.code,
              description: batch.description,
            },
          });
        }
      }

      const updatedBill = await SalesBill.findByIdAndUpdate(
        id,
        { ...data, chartOfAccount, salesmen, products: updatedProducts },
        { new: true, runValidators: true }
      );

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

  // Retrieve all Sales Bills
  getAll: async (req, res) => {
    try {
      const { id, text } = req.query;

      const salesBills = await aggregate(SalesBill, {
        pagination: req.query,
        filter: {
          _id: mongoID(id),
          search: {
            value: text,
            fields: ["balance", "salesmen", "inventoryInformation", "batch"],
          },
        },
        pipeline: [],
      });

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
        .populate("salesmen")
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
