const MainGroup = require("../models/Main-Group");
const ChartOfAccount = require("../models/chart-Of-Account");

module.exports = {
  // Create a new Chart of Account
  create: async (req, res) => {
    try {
      const { mainGroup, ...otherData } = req.body;

      // Check if the provided mainGroup exists
      const existingMainGroup = await MainGroup.findById(mainGroup);
      if (!existingMainGroup) {
        return res.status(400).json({
          message: "Invalid mainGroup ID. The specified MainGroup does not exist.",
        });
      }

      // Proceed to create the ChartOfAccount entry
      const chartOfAccount = new ChartOfAccount({
        mainGroup,
        ...otherData,
      });

      const savedChartOfAccount = await chartOfAccount.save();

      return res.status(201).json({
        message: "Chart of Account created successfully.",
        data: savedChartOfAccount,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error creating Chart of Account.",
        error: error.message,
      });
    }
  },

  // Retrieve all Chart of Accounts
  getAll: async (req, res) => {
    try {
      const chartOfAccounts = await ChartOfAccount.find().populate("mainGroup");
      return res.status(200).json({
        message: "Chart of Accounts retrieved successfully.",
        data: chartOfAccounts,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error retrieving Chart of Accounts.",
        error: error.message,
      });
    }
  },

  // Retrieve a specific Chart of Account by ID
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const chartOfAccount = await ChartOfAccount.findById(id).populate("mainGroup");

      if (!chartOfAccount) {
        return res.status(404).json({ message: "Chart of Account not found." });
      }

      return res.status(200).json({
        message: "Chart of Account retrieved successfully.",
        data: chartOfAccount,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error retrieving Chart of Account.",
        error: error.message,
      });
    }
  },

  // Update a specific Chart of Account by ID
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { mainGroup, ...otherData } = req.body;

      // Check if the mainGroup is provided and exists
      if (mainGroup) {
        const existingMainGroup = await MainGroup.findById(mainGroup);
        if (!existingMainGroup) {
          return res.status(400).json({
            message: "Invalid mainGroup ID. The specified MainGroup does not exist.",
          });
        }
      }

      const updatedChartOfAccount = await ChartOfAccount.findByIdAndUpdate(
        id,
        { mainGroup, ...otherData },
        { new: true, runValidators: true }
      );

      if (!updatedChartOfAccount) {
        return res.status(404).json({ message: "Chart of Account not found." });
      }

      return res.status(200).json({
        message: "Chart of Account updated successfully.",
        data: updatedChartOfAccount,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error updating Chart of Account.",
        error: error.message,
      });
    }
  },

  // Delete a specific Chart of Account by ID
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedChartOfAccount = await ChartOfAccount.findByIdAndDelete(id);

      if (!deletedChartOfAccount) {
        return res.status(404).json({ message: "Chart of Account not found." });
      }

      return res.status(200).json({
        message: "Chart of Account deleted successfully.",
        data: deletedChartOfAccount,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error deleting Chart of Account.",
        error: error.message,
      });
    }
  },
};
