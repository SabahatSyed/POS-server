const InventoryInfo = require("../models/inventoryInfo.schema");
const InventoryGroup = require("../models/inventoryGroup.schema");

module.exports = {
  // Create a new Inventory Information entry
  create: async (req, res) => {
    try {
      const { inventoryGroup, ...otherData } = req.body;

      // Check if the provided Inventory Group exists
      const existingInventoryGroup = await InventoryGroup.findById(inventoryGroup);
      if (!existingInventoryGroup) {
        return res.status(400).json({
          message: "Invalid Inventory Group ID. The specified Inventory Group does not exist.",
        });
      }

      const inventoryInfo = new InventoryInfo({ inventoryGroup, ...otherData });
      const savedInventoryInfo = await inventoryInfo.save();

      return res.status(201).json({
        message: "Inventory Information created successfully.",
        data: savedInventoryInfo,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error creating Inventory Information.",
        error: error.message,
      });
    }
  },

  // Retrieve all Inventory Information entries
  getAll: async (req, res) => {
    try {
      const inventoryInfos = await InventoryInfo.find().populate("inventoryGroup");
      return res.status(200).json({
        message: "Inventory Information retrieved successfully.",
        data: inventoryInfos,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error retrieving Inventory Information.",
        error: error.message,
      });
    }
  },

  // Retrieve a specific Inventory Information entry by ID
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const inventoryInfo = await InventoryInfo.findById(id).populate("inventoryGroup");

      if (!inventoryInfo) {
        return res.status(404).json({ message: "Inventory Information not found." });
      }

      return res.status(200).json({
        message: "Inventory Information retrieved successfully.",
        data: inventoryInfo,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error retrieving Inventory Information.",
        error: error.message,
      });
    }
  },

  // Update a specific Inventory Information entry by ID
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { inventoryGroup, ...otherData } = req.body;

      // Check if the provided Inventory Group exists (if provided)
      if (inventoryGroup) {
        const existingInventoryGroup = await InventoryGroup.findById(inventoryGroup);
        if (!existingInventoryGroup) {
          return res.status(400).json({
            message: "Invalid Inventory Group ID. The specified Inventory Group does not exist.",
          });
        }
      }

      const updatedInventoryInfo = await InventoryInfo.findByIdAndUpdate(
        id,
        { inventoryGroup, ...otherData },
        { new: true, runValidators: true }
      );

      if (!updatedInventoryInfo) {
        return res.status(404).json({ message: "Inventory Information not found." });
      }

      return res.status(200).json({
        message: "Inventory Information updated successfully.",
        data: updatedInventoryInfo,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error updating Inventory Information.",
        error: error.message,
      });
    }
  },

  // Delete a specific Inventory Information entry by ID
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedInventoryInfo = await InventoryInfo.findByIdAndDelete(id);

      if (!deletedInventoryInfo) {
        return res.status(404).json({ message: "Inventory Information not found." });
      }

      return res.status(200).json({
        message: "Inventory Information deleted successfully.",
        data: deletedInventoryInfo,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error deleting Inventory Information.",
        error: error.message,
      });
    }
  },
};
