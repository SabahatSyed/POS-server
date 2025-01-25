const bcrypt = require("bcrypt");
const Company = require("../models/Company"); // Adjust the path as per your project structure

exports.registerCompany = async (req, res) => {
  const {
    name,
    email,
    address,
    contact,
    logoURL,
    pagesAccess,
    status = "Active",
    companyType,
    theme,
  } = req.body;

  try {
    // Validate required fields
    if (!name || !email || !address || !contact || !companyType) {
      return res
        .status(400)
        .json({
          message:
            "Name, email, address, contact, and companyType are required",
        });
    }

    // Check if company already exists
    const existingCompany = await Company.findOne({ email });
    if (existingCompany) {
      return res.status(400).json({ message: "Company already exists" });
    }

    // Find the max seqNumber for the new company
    const maxSeqNumberDoc = await Company.findOne()
      .sort({ seqNumber: -1 })
      .select("seqNumber");
    const newSeqNumber = maxSeqNumberDoc ? maxSeqNumberDoc.seqNumber + 1 : 1;

    // Create the new company document
    const newCompany = new Company({
      seqNumber: newSeqNumber,
      name,
      email,
      address,
      contact,
      logoURL,
      pagesAccess,
      status,
      companyType,
      theme,
    });

    // Save the company
    await newCompany.save();

    res.status(201).json({
      message: "Company registered successfully",
      company: {
        id: newCompany._id,
        seqNumber: newCompany.seqNumber,
        name: newCompany.name,
        email: newCompany.email,
        address: newCompany.address,
        contact: newCompany.contact,
        logoURL: newCompany.logoURL,
        pagesAccess: newCompany.pagesAccess,
        status: newCompany.status,
        companyType: newCompany.companyType,
        theme: newCompany.theme,
      },
    });
  } catch (error) {
    console.error("Error registering company:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
