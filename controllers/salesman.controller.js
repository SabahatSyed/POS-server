const Salesman = require("../models/salesman.schema");

module.exports = {
  // Create a new Salesman
  create: async (req, res) => {
    try {
      const salesman = new Salesman(req.body);
      const savedSalesman = await salesman.save();

      return res.status(201).json({
        message: "Salesman created successfully.",
        data: savedSalesman,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error creating Salesman.",
        error: error.message,
      });
    }
  },

  // Retrieve all Salesmen
  getAll: async (req, res) => {
    try {
      const salesmen = await Salesman.find();
      return res.status(200).json({
        message: "Salesmen retrieved successfully.",
        data: salesmen,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error retrieving Salesmen.",
        error: error.message,
      });
    }
  },

  // Retrieve a specific Salesman by ID
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const salesman = await Salesman.findById(id);

      if (!salesman) {
        return res.status(404).json({ message: "Salesman not found." });
      }

      return res.status(200).json({
        message: "Salesman retrieved successfully.",
        data: salesman,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error retrieving Salesman.",
        error: error.message,
      });
    }
  },

  // Update a specific Salesman by ID
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const updatedSalesman = await Salesman.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });

      if (!updatedSalesman) {
        return res.status(404).json({ message: "Salesman not found." });
      }

      return res.status(200).json({
        message: "Salesman updated successfully.",
        data: updatedSalesman,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error updating Salesman.",
        error: error.message,
      });
    }
  },

  // Delete a specific Salesman by ID
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedSalesman = await Salesman.findByIdAndDelete(id);

      if (!deletedSalesman) {
        return res.status(404).json({ message: "Salesman not found." });
      }

      return res.status(200).json({
        message: "Salesman deleted successfully.",
        data: deletedSalesman,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error deleting Salesman.",
        error: error.message,
      });
    }
  },
};
