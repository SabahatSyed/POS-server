const crypto = require("crypto");
const User = require("../models/User");
const Company = require("../models/Company")

const { createToken } = require("../helpers/jwt.helper");
const { uniqueQuery } = require("../helpers/filter.helper");
const {
  sendEmail,
  registrationEmail,
} = require("../helpers/email-service.helper");
const { jwtVerify } = require("../middlewares/authentication/jwt.middleware");
const nodemailer = require("nodemailer");

module.exports = {
  profile: async (req, res) => {
    return res.success("Profile fetched successuflly", req.user);
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    // get user
    const user = await User.findOne({ email }).populate({
      path: "role",
      select: "name permissions",
      populate: {
        path: "permissions",
        select: "name actions",
        populate: {
          path: "permission",
          select: "name url",
        },
      },
    });
    if (!user) return res.forbidden("Invalid Email or Password");
    if (user.status != "Active")
      return res.forbidden("Your account has not been approved yet");

    try {
      // compare password
      await user.comparePassword(password);
    } catch (err) {
      return res.forbidden("Invalid Email or Password");
    }
    console.log("yser", user);
    const token = createToken({
      sub: user._id,
      name: user.name,
    });

    const company = await Company.findById(user.companyId);

    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    return res.success("Login successfull", {
      access_token: token,
      user: {
        role: user.role,
        name: user.name,
        email: user.email,
        pageAccess: user.pagesAccess,
        id: user._id,
        companyId: user.companyId,
        seqNumber: user.seqNumber,
        theme: company.theme
      },
    });
  },

  register: async (req, res) => {
    const { name, email, companyId, seqNumber } = req.body;

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

    // Generate a random password
    const randomPassword = crypto.randomBytes(8).toString("hex");

    // Create the user
    const user = new User({
      name,
      email,
      companyId,
      seqNumber,
      password: randomPassword, // Save the generated password
    });

    await user.save();

    await registrationEmail(name, randomPassword);

    return res.success("Registration successfull", user);
  },

  update: async (req, res) => {
    const { email, name } = req.body;

    const unique = [
      {
        field: "email",
        value: email,
      },
    ];

    const user = req.user;
    const uniqueResult = uniqueQuery(unique);

    const existing = await User.findOne({
      _id: { $ne: user.id },
      ...uniqueResult.query,
    });

    if (existing) return res.forbidden(uniqueResult.message);

    user.email = email ? email : user.email;
    user.name = name ? name : user.name;

    await user.save();

    return res.success("Profile updated successuflly", user);
  },

  forgot: async (req, res) => {
    const { email } = req.body;

    // check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.forbidden("No account found against this email");

    // generate reset token
    const resetToken = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    const days = 10;
    user.resetPasswordExpire = Date.now() + days * 60 * 1000;
    const url = `${process.env.CLIENT_ORIGIN}/reset?resetPasswordToken=${user.resetPasswordToken}`;
    await user.save({ validateBeforeSave: false });

    await sendEmail("Reset Password", {
      email,
      url,
    });

    res.success("Password reset link sent to email.");
  },

  reset: async (req, res) => {
    const { old_password, new_password, confirm_password, resetPasswordToken } =
      req.body;

    // validate inputs

    if (resetPasswordToken && old_password)
      return error(
        "resetPasswordToken and old_password can not come at the same time"
      );
    if (!new_password) return error("new_password is missing");
    if (!confirm_password) return error("confirm_password is missing");
    if (confirm_password != new_password)
      return error("confirm_password not same as new_password");

    // Normal Password Reset
    if (!resetPasswordToken) {
      if (!old_password) res.notFound("old_password is missing");
      const middleware = jwtVerify();
      return middleware(req, async () => {
        try {
          const user = await User.findById(req.user.id);
          await user.comparePassword(old_password);
          user.password = new_password;
          await user.save({ validateBeforeSave: false });
          res.success("Password changed successfully.", { changed: true });
        } catch (err) {
          res.forbidden("old_password is not same as current password");
        }
      });
    }

    // Forgot Password Reset
    if (!old_password) {
      if (!resetPasswordToken)
        return res.forbidden("resetPasswordToken is missing");
    }

    // check the resetPasswordToken
    const user = await User.findOne({ resetPasswordToken });
    if (!user) return res.notFound("Invalid reset token");

    // if the token is expired
    if (Date.now() > user.resetPasswordExpire)
      return res.forbidden("The token is expired");

    // update password and remove token
    user.password = new_password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });

    res.success("Password changed successfully.", { changed: true });
  },

  loginWithToken: async (req, res) => {
    const { access_token:accessToken } = req.body;

    if (!accessToken) {
      return res.status(400).json({ message: "Access token is required" });
    }

    try {
      // Verify the token
      const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);

      // Find the user by ID
      const user = await User.findById(decoded.sub);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (user.status !== "Approved") {
        return res
          .status(403)
          .json({ message: "Your account has not been approved yet" });
      }

      // Create a new token
      const token = createToken({
        sub: user._id,
        name: user.name,
      });

      const company = await Company.findById(user.companyId);

    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
      return res.status(200).json({
        message: "Login successful",
        access_token: token,
        user: {
          role: user.role,
          name: user.name,
          email: user.email,
          pageAccess: user.pagesAccess,
          id: user._id,
          companyId: user.companyId,
          seqNumber: user.seqNumber,
          theme: company.theme
        },
      });
    } catch (error) {
      return res
        .status(401)
        .json({ message: "Invalid or expired token", error });
    }
  },
};
