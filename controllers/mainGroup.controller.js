const MainGroup = require("../models/Main-Group");

module.exports = {
  // Create a new MainGroup
  create: async (req, res) => {
    try {
      const { seqNumber, code, description } = req.body;

      // Validate required fields
      if (!seqNumber || !code || !description) {
        return res.status(400).json({ message: "All fields are required." });
      }

      const mainGroup = new MainGroup({
        seqNumber,
        code,
        description,
      });

      const savedMainGroup = await mainGroup.save();
      return res.status(201).json({
        message: "MainGroup created successfully.",
        data: savedMainGroup,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error creating MainGroup.",
        error: error.message,
      });
    }
  },

  // Retrieve all MainGroups
  getAll: async (req, res) => {
    try {
      const mainGroups = await MainGroup.find();
      return res.status(200).json({
        message: "MainGroups retrieved successfully.",
        data: mainGroups,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error retrieving MainGroups.",
        error: error.message,
      });
    }
  },

  // Retrieve a single MainGroup by ID
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const mainGroup = await MainGroup.findById(id);

      if (!mainGroup) {
        return res.status(404).json({ message: "MainGroup not found." });
      }

      return res.status(200).json({
        message: "MainGroup retrieved successfully.",
        data: mainGroup,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error retrieving MainGroup.",
        error: error.message,
      });
    }
  },

  // Update a MainGroup by ID
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { seqNumber, code, description } = req.body;

      const updatedMainGroup = await MainGroup.findByIdAndUpdate(
        id,
        { seqNumber, code, description },
        { new: true, runValidators: true }
      );

      if (!updatedMainGroup) {
        return res.status(404).json({ message: "MainGroup not found." });
      }

      return res.status(200).json({
        message: "MainGroup updated successfully.",
        data: updatedMainGroup,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error updating MainGroup.",
        error: error.message,
      });
    }
  },

  // Delete a MainGroup by ID
  delete: async (req, res) => {
    try {
      const { id } = req.params;

      const deletedMainGroup = await MainGroup.findByIdAndDelete(id);

      if (!deletedMainGroup) {
        return res.status(404).json({ message: "MainGroup not found." });
      }

      return res.status(200).json({
        message: "MainGroup deleted successfully.",
        data: deletedMainGroup,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error deleting MainGroup.",
        error: error.message,
      });
    }
  },
};
