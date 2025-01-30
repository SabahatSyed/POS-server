const BatchWiseOpeningStock = require("../models/batchWiseOpeningStock.schema");
const Batch = require("../models/batch.schema");
const InventoryInformation = require("../models/inventoryInfo.schema");
const { aggregate, mongoID } = require("../helpers/filter.helper");

module.exports = {
  // Create a new Batch Wise Opening Stock entry
  create: async (req, res) => {
    try {
      const { batch, inventoryInformation, ...data } = req.body;

      // Check if the referenced Batch exists
      const batchExists = await Batch.findById(batch);
      if (!batchExists) {
        return res.status(404).json({ message: "Batch not found." });
      }

      // Check if the referenced Inventory exists
      const inventoryInformationExists = await InventoryInformation.findById(inventoryInformation);
      if (!inventoryInformationExists) {
        return res.status(404).json({ message: "Inventory not found." });
      }

      const openingStock = new BatchWiseOpeningStock({ ...data, batch, inventoryInformation });
      const savedStock = await openingStock.save();

      return res.status(201).json({
        message: "Batch Wise Opening Stock created successfully.",
        data: savedStock,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error creating Batch Wise Opening Stock.",
        error: error.message,
      });
    }
  },

  // Retrieve all Batch Wise Opening Stocks
  getAll: async (req, res) => {
    try {
      const { id, text } = req.query;

      const stocks = await aggregate(BatchWiseOpeningStock, {
          pagination: req.query,
          filter: {
              _id: mongoID(id),
              search: {
                  value: text,
                  fields: ['code','description']
              }
          },
          pipeline: []
      });
      return res.status(200).json({
        message: "Batch Wise Opening Stocks retrieved successfully.",
        data: stocks,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error retrieving Batch Wise Opening Stocks.",
        error: error.message,
      });
    }
  },

  // Retrieve a specific Batch Wise Opening Stock by ID
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const stock = await BatchWiseOpeningStock.findById(id)
        .populate("batch")
        .populate("inventoryInformation");

      if (!stock) {
        return res.status(404).json({ message: "Batch Wise Opening Stock not found." });
      }

      return res.status(200).json({
        message: "Batch Wise Opening Stock retrieved successfully.",
        data: stock,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error retrieving Batch Wise Opening Stock.",
        error: error.message,
      });
    }
  },

  // Update a specific Batch Wise Opening Stock by ID
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { batch, inventoryInformation, ...data } = req.body;

      if (batch) {
        const batchExists = await Batch.findById(batch);
        if (!batchExists) {
          return res.status(404).json({ message: "Batch not found." });
        }
      }

      if (inventoryInformation) {
        const inventoryInformationExists = await InventoryInformation.findById(inventoryInformation);
        if (!inventoryInformationExists) {
          return res.status(404).json({ message: "Inventory not found." });
        }
      }

      const updatedStock = await BatchWiseOpeningStock.findByIdAndUpdate(
        id,
        { ...data, batch, inventoryInformation },
        { new: true, runValidators: true }
      );

      if (!updatedStock) {
        return res.status(404).json({ message: "Batch Wise Opening Stock not found." });
      }

      return res.status(200).json({
        message: "Batch Wise Opening Stock updated successfully.",
        data: updatedStock,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error updating Batch Wise Opening Stock.",
        error: error.message,
      });
    }
  },

  // Delete a specific Batch Wise Opening Stock by ID
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedStock = await BatchWiseOpeningStock.findByIdAndDelete(id);

      if (!deletedStock) {
        return res.status(404).json({ message: "Batch Wise Opening Stock not found." });
      }

      return res.status(200).json({
        message: "Batch Wise Opening Stock deleted successfully.",
        data: deletedStock,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error deleting Batch Wise Opening Stock.",
        error: error.message,
      });
    }
  },
};
