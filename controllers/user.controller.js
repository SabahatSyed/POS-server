const crypto = require("crypto");
const User = require("../models/User");

const { uniqueQuery } = require("../helpers/filter.helper");
const {
  sendEmail,
  registrationEmail,
} = require("../helpers/email-service.helper");

module.exports = {

    addUser: async (req, res) => {
        const {
          name,
          email,
          companyId,
          contact,
          cnic,
          photoURL,
          role,
          pagesAccess,
        } = req.body;
    
        // Check if the email is already registered
        const unique = [
          {
            field: "email",
            value: email,
          },
        ];
        const uniqueResult = uniqueQuery(unique);
        const existing = await User.findOne({ ...uniqueResult.query });
        if (existing) return res.forbidden(uniqueResult.message);
    
        // Find the max seqNumber for the new company
        const maxSeqNumberDoc = await User.findOne()
          .sort({ seqNumber: -1 })
          .select("seqNumber");
        const newSeqNumber = maxSeqNumberDoc ? maxSeqNumberDoc.seqNumber + 1 : 1;
    
        // Generate a random password
        const randomPassword = crypto.randomBytes(8).toString("hex");
    
        // Create the user
        const user = new User({
          name,
          email,
          companyId,
          contact,
          cnic,
          photoURL,
          role,
          pagesAccess,
          seqNumber: newSeqNumber,
          password: randomPassword, // Save the generated password
        });
    
        await user.save();
    
        await registrationEmail(name,email, randomPassword);
    
        return res.success("Registration successfull", user);
      },
}