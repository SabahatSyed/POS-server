const Company = require('../models/Company');

const bcrypt = require('bcrypt');

exports.registerCompany = async (req, res) => {
    const { name, email, address, contact, logoURL, pagesAccess, status, companyType, theme, password } = req.body;

    try {
        console.log("name")
        // Check if company already exists
        const existingCompany = await Company.findOne({ email });
        if (existingCompany) {
            return res.status(400).json({ message: 'Company already exists' });
        }

        const maxSeqNumber = await Company.findOne()
              .sort({ seqNumber: -1 })
              .select("seqNumber");
        const newSeqNumber = maxSeqNumber ? maxSeqNumber.seqNumber + 1 : 1;
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new company
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
          password: hashedPassword,
        });

        // Save the company
        await newCompany.save();

        res.status(201).json({
            message: 'Company registered successfully',
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
                theme: newCompany.theme
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
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