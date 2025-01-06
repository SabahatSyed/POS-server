const { check } = require("express-validator");

exports.check = (method) => {
  switch (method) {
    case "login": {
      return [
        check("email")
          .notEmpty()
          .withMessage("Email address cannot be empty")
          .bail()
          .isEmail()
          .withMessage("Invalid email address")
          .bail()
          .normalizeEmail(),
        check("password").notEmpty().withMessage("Password cannot be empty"),
      ];
    }
    case "register": {
      return [
        check("name").notEmpty().withMessage("Name cannot be empty."),
        check("email")
          .notEmpty()
          .withMessage("Email address cannot be empty")
          .bail()
          .isEmail()
          .withMessage("Invalid email address")
          .bail()
          .normalizeEmail(),
        check("password")
          .notEmpty()
          .withMessage("Password cannot be empty")
          .bail()
          .isLength({ min: 6 })
          .withMessage("Password length should be greater than 6"),
        check("confirmPassword")
          .notEmpty()
          .withMessage("Confirm Password cannot be empty"),
      ];
    }
    case "forgotAccount": {
      return [
        check("email")
          .notEmpty()
          .withMessage("Email address cannot be empty")
          .bail()
          .isEmail()
          .withMessage("Invalid email address")
          .bail()
          .normalizeEmail(),
      ];
    }
    case "changePassword": {
      return [
        check("oldPassword")
          .notEmpty()
          .withMessage("Old Password cannot be empty"),
        check("password")
          .notEmpty()
          .withMessage("Password cannot be empty")
          .bail()
          .isLength({ min: 6 })
          .withMessage("Password length should be greater than 6"),
        check("confirmPassword")
          .notEmpty()
          .withMessage("Confirm Password cannot be empty"),
      ];
    }
  }
};
