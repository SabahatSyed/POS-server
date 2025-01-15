const { check } = require("express-validator");

exports.check = (method) => {
  switch (method) {
    case "create":return [
        check("code")
          .notEmpty()
          .withMessage("Code is required.")
          .bail()
          .isString()
          .withMessage("Code must be a string.")
          .trim(),
        check("description")
          .notEmpty()
          .withMessage("Description is required.")
          .bail()
          .isString()
          .withMessage("Description must be a string.")
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
        check("description")
          .notEmpty()
          .withMessage("Description is required.")
          .bail()
          .isString()
          .withMessage("Description must be a string.")
          .trim(),
      ];
    default:
      return [];
  }
};
