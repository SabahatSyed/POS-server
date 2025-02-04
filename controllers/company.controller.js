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

exports.getCompanyById = async (req, res) => {
  const { id } = req.params; // Extract company ID from URL params
  console.log("id", req.params);
  try {
    // Find the company by ID
    const company = await Company.findById(id);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    // Return the company data
    res.status(200).json({
      message: "Company fetched successfully",
      company: {
        id: company._id,
        seqNumber: company.seqNumber,
        name: company.name,
        email: company.email,
        address: company.address,
        contact: company.contact,
        logoURL: company.logoURL,
        pagesAccess: company.pagesAccess,
        status: company.status,
        companyType: company.companyType,
        theme: company.theme,
      },
    });
  } catch (error) {
    console.error("Error fetching company by ID:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.updateCompany = async (req, res) => {
  const { id } = req.params; // Company ID from URL params
  const {
    name,
    email,
    address,
    contact,
    logoURL,
    pagesAccess,
    status,
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

    // Find the company by ID
    const company = await Company.findById(id);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    // Update the company fields
    company.name = name;
    company.email = email;
    company.address = address;
    company.contact = contact;
    company.logoURL = logoURL || company.logoURL; // Keep existing logoURL if not provided
    company.pagesAccess = pagesAccess || company.pagesAccess; // Keep existing pagesAccess if not provided
    company.status = status || company.status; // Keep existing status if not provided
    company.companyType = companyType;
    company.theme = theme || company.theme; // Keep existing theme if not provided

    // Save the updated company
    await company.save();

    res.status(200).json({
      message: "Company updated successfully",
      company: {
        id: company._id,
        seqNumber: company.seqNumber,
        name: company.name,
        email: company.email,
        address: company.address,
        contact: company.contact,
        logoURL: company.logoURL,
        pagesAccess: company.pagesAccess,
        status: company.status,
        companyType: company.companyType,
        theme: company.theme,
      },
    });
  } catch (error) {
    console.error("Error updating company:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};