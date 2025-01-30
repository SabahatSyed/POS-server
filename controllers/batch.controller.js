const { aggregate, mongoID } = require("../helpers/filter.helper");
const Batch = require("../models/batch.schema");
const InventoryInformation = require("../models/inventoryInfo.schema");

module.exports = {
  // Create a new Batch
  create: async (req, res) => {
    try {
      const { inventoryInformation, ...batchData } = req.body;

      // Check if the referenced inventory exists
      const inventoryExists = await InventoryInformation.findById(inventoryInformation);
      if (!inventoryExists) {
        return res.status(404).json({ message: "Inventory not found." });
      }

      const batch = new Batch({ ...batchData, inventoryInformation });
      const savedBatch = await batch.save();

      return res.status(201).json({
        message: "Batch created successfully.",
        data: savedBatch,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error creating Batch.",
        error: error.message,
      });
    }
  },

  // Retrieve all Batches
  getAll: async (req, res) => {
    try {
      const { id, text } = req.query;

      const batches = await aggregate(Batch, {
          pagination: req.query,
          filter: {
              _id: mongoID(id),
              search: {
                  value: text,
                  fields: ['code','description','supplierName','supplierCode']
              }
          },
          pipeline: []
      });
      return res.status(200).json({
        message: "Batches retrieved successfully.",
        data: batches,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error retrieving Batches.",
        error: error.message,
      });
    }
  },

  // Retrieve a specific Batch by ID
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const batch = await Batch.findById(id).populate("inventory");

      if (!batch) {
        return res.status(404).json({ message: "Batch not found." });
      }

      return res.status(200).json({
        message: "Batch retrieved successfully.",
        data: batch,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error retrieving Batch.",
        error: error.message,
      });
    }
  },

  // Update a specific Batch by ID
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { inventoryInformation, ...batchData } = req.body;

      if (inventoryInformation) {
        const inventoryExists = await InventoryInformation.findById(inventoryInformation);
        if (!inventoryExists) {
          return res.status(404).json({ message: "Inventory not found." });
        }
      }

      const updatedBatch = await Batch.findByIdAndUpdate(
        id,
        { ...batchData, inventoryInformation },
        { new: true, runValidators: true }
      );

      if (!updatedBatch) {
        return res.status(404).json({ message: "Batch not found." });
      }

      return res.status(200).json({
        message: "Batch updated successfully.",
        data: updatedBatch,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error updating Batch.",
        error: error.message,
      });
    }
  },

  // Delete a specific Batch by ID
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedBatch = await Batch.findByIdAndDelete(id);

      if (!deletedBatch) {
        return res.status(404).json({ message: "Batch not found." });
      }

      return res.status(200).json({
        message: "Batch deleted successfully.",
        data: deletedBatch,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error deleting Batch.",
        error: error.message,
      });
    }
  },
};
