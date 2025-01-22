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

      // Validate Sales Bill
      const salesBillExists = await SalesBill.findById(salesBill);
      if (!salesBillExists) {
        return res.status(404).json({ message: "Sales Bill not found." });
      }

      // Validate Products and Update Batch Quantities
      for (const product of products) {
        const inventoryExists = await InventoryInformation.findById(
          product.inventory
        );
        if (!inventoryExists) {
          return res
            .status(404)
            .json({ message: "Inventory not found for a product." });
        }

        const batch = await Batch.findById(product.batch);
        if (!batch) {
          return res
            .status(404)
            .json({ message: "Batch not found for a product." });
        }

        if (billReturn) {
          batch.quantity += quantity;
        } else if (batch.quantity < quantity) {
          return res.status(400).json({
            message: `Insufficient batch quantity for product: ${product.inventory}`,
          });
        } else {
          batch.quantity -= quantity;
        }

        await batch.save();
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
      const savedBill = await generalBill.save();

      return res.status(201).json({
        message: "General Bill created successfully.",
        data: savedBill,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error creating General Bill.",
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

      const existingBill = await GeneralBill.findById(id);
      if (!existingBill) {
        return res.status(404).json({ message: "General Bill not found." });
      }

      if (salesBill) {
        const salesBillExists = await SalesBill.findById(salesBill);
        if (!salesBillExists) {
          return res.status(404).json({ message: "Sales Bill not found." });
        }
      }

      if (products) {
        for (const product of products) {
          const batch = await Batch.findById(product.batch);
          if (!batch) {
            return res
              .status(404)
              .json({ message: "Batch not found for a product." });
          }

          const existingProduct = existingBill.products.find(
            (p) => p.batch.toString() === product.batch
          );

          if (billReturn) {
            batch.quantity += product.quantity;
            if (existingProduct) {
              existingProduct.quantity -= product.quantity;
              if (existingProduct.quantity < 0) {
                return res.status(400).json({
                  message: "Return quantity exceeds sold quantity.",
                });
              }
            }
          } else {
            if (batch.quantity < product.quantity) {
              return res.status(400).json({
                message: `Insufficient batch quantity for product: ${product.inventory}`,
              });
            }

            batch.quantity -= product.quantity;
          }

          await batch.save();
        }
      }

      const updatedBill = await GeneralBill.findByIdAndUpdate(
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

      return res.status(200).json({
        message: "General Bill updated successfully.",
        data: updatedBill,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error updating General Bill.",
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
