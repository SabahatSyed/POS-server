const { check } = require("express-validator");

exports.check = (method) => {
  switch (method) {
    case "create":
      return [
        check("email")
          .notEmpty()
          .withMessage("email is required.")
          .bail()
          .isString()
          .withMessage("email must be a string.")
          .trim(),
        check("name")
          .notEmpty()
          .withMessage("Name is required.")
          .bail()
          .isString()
          .withMessage("Name must be a string.")
          .trim(),
        check("contact")
          .optional()
          .isString()
          .withMessage("contact must be a string.")
          .trim(),
        check("companyId")
          .notEmpty()
          .withMessage("companyId is required.")
          .bail()
          .isString()
          .withMessage("companyId must be a string.")
          .trim(),
        check("cnic")
          .notEmpty()
          .withMessage("CNIC is required.")
          .bail()
          .isString()
          .withMessage("CNIC must be a string.")
          .trim(),
        check("pagesAccess")
          .notEmpty()
          .withMessage("pagesAccess is required.")
          .bail()
          .withMessage("pagesAccess must be an array."),
      ];
    case "update":
      return [
        check("email")
          .notEmpty()
          .withMessage("email is required.")
          .bail()
          .isString()
          .withMessage("email must be a string.")
          .trim(),
        check("name")
          .notEmpty()
          .withMessage("Name is required.")
          .bail()
          .isString()
          .withMessage("Name must be a string.")
          .trim(),
        check("contact")
          .optional()
          .isString()
          .withMessage("contact must be a string.")
          .trim(),
        check("companyId")
          .notEmpty()
          .withMessage("companyId is required.")
          .bail()
          .isString()
          .withMessage("companyId must be a string.")
          .trim(),
        check("cnic")
          .notEmpty()
          .withMessage("CNIC is required.")
          .bail()
          .isString()
          .withMessage("CNIC must be a string.")
          .trim(),
        check("pagesAccess")
          .notEmpty()
          .withMessage("pagesAccess is required.")
          .bail()
          .withMessage("pagesAccess must be an array number."),
      ];
    default:
      return [];
  }
};
