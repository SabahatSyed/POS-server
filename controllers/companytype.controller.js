const CompanyType = require("../models/Company-Type");
const User = require("../models/User");

module.exports = {
  addCompanyType: async (req, res) => {
    const { name } = req.body;

    try {
      // Check if company type already exists
      const existingCompanyType = await CompanyType.findOne({ name });
      if (existingCompanyType) {
        return res.status(400).json({ message: "Company type already exists" });
      }
      const maxSeqNumber = await CompanyType.findOne()
        .sort({ seqNumber: -1 })
        .select("seqNumber");
      const newSeqNumber = maxSeqNumber ? maxSeqNumber.seqNumber + 1 : 1;
      // Create new company type
      const newCompanyType = new CompanyType({
        seqNumber: newSeqNumber,
        name,
      });

      // Save the company type
      await newCompanyType.save();

      res.status(201).json({
        message: "Company type added successfully",
        companyType: {
          id: newCompanyType._id,
          seqNumber: newCompanyType.seqNumber,
          name: newCompanyType.name,
        },
      });
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ message: "Server error", error });
    }
  },

  // Retrieve all
  getAll: async (req, res) => {
    try {
      const records = await CompanyType.find();
      return res.status(200).json({
        message: "companyTypes retrieved successfully.",
        data: records,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error retrieving companyTypes.",
        error: error.message,
      });
    }
  },

  // Retrieve a specific by ID
  getById: async (req, res) => {
    try {
      const { id } = req.query;
      const record = await CompanyType.findById(id);

      if (!record) {
        return res.status(404).json({ message: "CompanyType not found." });
      }

      return res.status(200).json({
        message: "CompanyType retrieved successfully.",
        data: record,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error retrieving Batch.",
        error: error.message,
      });
    }
  },

  // Update a specific  by ID
  update: async (req, res) => {
    try {
      const { id } = req.query;
      const { name } = req.body;

      if (name) {
        const recordExists = await CompanyType.findById(id);
        if (!recordExists) {
          return res.status(404).json({ message: "CompanyType not found." });
        }
      }

      const updatedCompanyType = await CompanyType.findByIdAndUpdate(
        id,
        { name },
        { new: true, runValidators: true }
      );

      if (!updatedCompanyType) {
        return res.status(404).json({ message: "CompanyType not found." });
      }

      return res.status(200).json({
        message: "CompanyType updated successfully.",
        data: updatedCompanyType,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error updating CompanyType.",
        error: error.message,
      });
    }
  },

  // Delete a specific by ID
  delete: async (req, res) => {
    try {
      const { id } = req.query;
      const deletedCompanyType = await CompanyType.findByIdAndDelete(id);

      if (!deletedCompanyType) {
        return res.status(404).json({ message: "CompanyType not found." });
      }

      return res.status(200).json({
        message: "CompanyType deleted successfully.",
        data: deletedCompanyType,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error deleting CompanyType.",
        error: error.message,
      });
    }
  },
};
