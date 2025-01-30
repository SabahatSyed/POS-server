const { check } = require("express-validator");

exports.check = (method) => {
    switch (method) {
        case "create":
      return [
        check("companyType")
          .notEmpty()
          .withMessage("companyType is required.")
          .bail()
          .isString()
          .withMessage("companyType must be a string.")
          .trim(),
      ];
    case "update":
      return [
        check("companyType")
          .notEmpty()
          .withMessage("companyType is required.")
          .bail()
          .isString()
          .withMessage("companyType must be a string.")
          .trim(),
      ];
    default:
      return [];
    }
}