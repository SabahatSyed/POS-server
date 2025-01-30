const { mongoID, aggregate } = require("../helpers/filter.helper");
const Salesmen = require("../models/salesmen.schema");

module.exports = {
  // Create a new Salesmen
  create: async (req, res) => {
    try {
      const salesmen = new Salesmen(req.body);
      const savedSalesmen = await salesmen.save();

      return res.status(201).json({
        message: "Salesmen created successfully.",
        data: savedSalesmen,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error creating Salesmen.",
        error: error.message,
      });
    }
  },

  // Retrieve all Salesmen
  getAll: async (req, res) => {
    try {
      const { id, text } = req.query;

      const salesmen = await aggregate(Salesmen, {
          pagination: req.query,
          filter: {
              _id: mongoID(id),
              search: {
                  value: text,
                  fields: ['code','cnic','name','address','accountHead','mobile','phone']
              }
          },
          pipeline: []
      });
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

  // Retrieve a specific Salesmen by ID
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const salesmen = await Salesmen.findById(id);

      if (!salesmen) {
        return res.status(404).json({ message: "Salesmen not found." });
      }

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

  // Update a specific Salesmen by ID
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const updatedSalesmen = await Salesmen.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });

      if (!updatedSalesmen) {
        return res.status(404).json({ message: "Salesmen not found." });
      }

      return res.status(200).json({
        message: "Salesmen updated successfully.",
        data: updatedSalesmen,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error updating Salesmen.",
        error: error.message,
      });
    }
  },

  // Delete a specific Salesmen by ID
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedSalesmen = await Salesmen.findByIdAndDelete(id);

      if (!deletedSalesmen) {
        return res.status(404).json({ message: "Salesmen not found." });
      }

      return res.status(200).json({
        message: "Salesmen deleted successfully.",
        data: deletedSalesmen,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error deleting Salesmen.",
        error: error.message,
      });
    }
  },
};
