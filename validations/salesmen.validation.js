const { check } = require("express-validator");

exports.check = (method) => {
  switch (method) {
    case "create":
      return [
        check("code")
          .notEmpty()
          .withMessage("Code is required.")
          .bail()
          .isString()
          .withMessage("Code must be a string.")
          .trim(),
        check("name")
          .notEmpty()
          .withMessage("Name is required.")
          .bail()
          .isString()
          .withMessage("Name must be a string.")
          .trim(),
        check("phone")
          .optional()
          .isString()
          .withMessage("Phone must be a string.")
          .trim(),
        check("mobile")
          .notEmpty()
          .withMessage("Mobile is required.")
          .bail()
          .isString()
          .withMessage("Mobile must be a string.")
          .trim(),
        check("cnic")
          .notEmpty()
          .withMessage("CNIC is required.")
          .bail()
          .isString()
          .withMessage("CNIC must be a string.")
          .trim(),
        check("commission")
          .notEmpty()
          .withMessage("Commission is required.")
          .bail()
          .isNumeric()
          .withMessage("Commission must be a number."),
        check("address")
          .optional()
          .isString()
          .withMessage("Address must be a string.")
          .trim(),
        check("accountHead")
          .notEmpty()
          .withMessage("Account Head is required.")
          .bail()
          .isString()
          .withMessage("Account Head must be a string.")
          .trim(),
      ];
    case "update":
      return [
        check("code")
          .notEmpty()
          .withMessage("Code is required.")
          .bail()
          .isString()
          .withMessage("Code must be a string.")
          .trim(),
        check("name")
          .notEmpty()
          .withMessage("Name is required.")
          .bail()
          .isString()
          .withMessage("Name must be a string.")
          .trim(),
        check("phone")
          .optional()
          .isString()
          .withMessage("Phone must be a string.")
          .trim(),
        check("mobile")
          .notEmpty()
          .withMessage("Mobile is required.")
          .bail()
          .isString()
          .withMessage("Mobile must be a string.")
          .trim(),
        check("cnic")
          .notEmpty()
          .withMessage("CNIC is required.")
          .bail()
          .isString()
          .withMessage("CNIC must be a string.")
          .trim(),
        check("commission")
          .notEmpty()
          .withMessage("Commission is required.")
          .bail()
          .isNumeric()
          .withMessage("Commission must be a number."),
        check("address")
          .optional()
          .isString()
          .withMessage("Address must be a string.")
          .trim(),
        check("accountHead")
          .notEmpty()
          .withMessage("Account Head is required.")
          .bail()
          .isString()
          .withMessage("Account Head must be a string.")
          .trim(),
      ];
    default:
      return [];
  }
};
