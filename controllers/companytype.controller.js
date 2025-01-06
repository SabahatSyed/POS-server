const CompanyType = require("../models/Company-Type");
const User = require("../models/User");

exports.addCompanyType = async (req, res) => {
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
    console.log("error",error)
    res.status(500).json({ message: "Server error", error });
  }
};
