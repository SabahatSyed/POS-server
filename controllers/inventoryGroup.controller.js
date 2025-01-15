const InventoryGroup = require("../models/inventoryGroup.schema");

module.exports = {
  // Create a new Inventory Group
  create: async (req, res) => {
    try {
      const { code, description } = req.body;

      // Check if code already exists
      const existingInventoryGroup = await InventoryGroup.findOne({ code });
      if (existingInventoryGroup) {
        return res.status(400).json({
          message: "Inventory Group with this code already exists.",
        });
      }

      const inventoryGroup = new InventoryGroup({ code, description });
      const savedInventoryGroup = await inventoryGroup.save();

      return res.status(201).json({
        message: "Inventory Group created successfully.",
        data: savedInventoryGroup,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error creating Inventory Group.",
        error: error.message,
      });
    }
  },

  // Retrieve all Inventory Groups
  getAll: async (req, res) => {
    try {
      const inventoryGroups = await InventoryGroup.find();
      return res.status(200).json({
        message: "Inventory Groups retrieved successfully.",
        data: inventoryGroups,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error retrieving Inventory Groups.",
        error: error.message,
      });
    }
  },

  // Retrieve a specific Inventory Group by ID
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const inventoryGroup = await InventoryGroup.findById(id);

      if (!inventoryGroup) {
        return res.status(404).json({ message: "Inventory Group not found." });
      }

      return res.status(200).json({
        message: "Inventory Group retrieved successfully.",
        data: inventoryGroup,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error retrieving Inventory Group.",
        error: error.message,
      });
    }
  },

  // Update a specific Inventory Group by ID
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { code, description } = req.body;

      // Check if the code is being updated to an existing one
      const existingInventoryGroup = await InventoryGroup.findOne({ code, _id: { $ne: id } });
      if (existingInventoryGroup) {
        return res.status(400).json({
          message: "Another Inventory Group with this code already exists.",
        });
      }

      const updatedInventoryGroup = await InventoryGroup.findByIdAndUpdate(
        id,
        { code, description },
        { new: true, runValidators: true }
      );

      if (!updatedInventoryGroup) {
        return res.status(404).json({ message: "Inventory Group not found." });
      }

      return res.status(200).json({
        message: "Inventory Group updated successfully.",
        data: updatedInventoryGroup,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error updating Inventory Group.",
        error: error.message,
      });
    }
  },

  // Delete a specific Inventory Group by ID
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedInventoryGroup = await InventoryGroup.findByIdAndDelete(id);

      if (!deletedInventoryGroup) {
        return res.status(404).json({ message: "Inventory Group not found." });
      }

      return res.status(200).json({
        message: "Inventory Group deleted successfully.",
        data: deletedInventoryGroup,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error deleting Inventory Group.",
        error: error.message,
      });
    }
  },
};
