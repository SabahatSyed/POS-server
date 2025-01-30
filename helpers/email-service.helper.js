const nodemailer = require("nodemailer");
const path = require("path");
const ejs = require("ejs");

const baseEmail = {
  from: process.env.EMAIL_MAIL,
  user: process.env.EMAIL_USER,
  pass: process.env.EMAIL_PASS,
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_SECURE == "true" ? true : false,
};
const transporter = nodemailer.createTransport({
  host: baseEmail.host,
  port: baseEmail.port,
  secure: baseEmail.secure,
  auth: {
    user: baseEmail.user,
    pass: baseEmail.pass,
  },
});
module.exports = {
  sendEmail: async (type, data) => {
    const emails = {
      "Reset Password": {
        subject: "Password Reset Request.",
        file: "../public/views/reset-email.ejs",
        data: {},
      },
    };

    transporter.verify(function (error, success) {
      if (error) {
        console.log(error);
      }
    });

    // Feed data to html file
    const email = emails[type];
    const file = path.join(__dirname, email.file);
    const html = await ejs.renderFile(file, { data: email.data });

    transporter.sendMail(
      {
        from: baseEmail.from,
        to: data.email,
        subject: email.subject,
        html,
      },
      function (err, info) {
        if (err) console.log(err.message);
        else console.log("Email Sent:", info.messageId);
      }
    );
  },

  registrationEmail: async (name,email, randomPassword) => {
    transporter.verify(function (error, success) {
      if (error) {
        console.log(error);
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_MAIL,
      to: email,
      subject: "Registration Successful",
      text: `Hello ${name},\n\nYou have been successfully registered. Your temporary password is: ${randomPassword}\n\nPlease change your password after logging in.\n\nThank you.`,
    };
    try {
      await transporter.sendMail(mailOptions);
      return res.success(
        "Registration Successful. An email has been sent with your login credentials."
      );
    } catch (error) {
      return res.error(
        "User registered, but email sending failed.",
        error.message
      );
    }
  },
};
