const { check } = require("express-validator");

exports.check = (method) => {
  switch (method) {
    case "create":
      return [
        check("name")
          .notEmpty()
          .withMessage("name is required.")
          .bail()
          .isString()
          .withMessage("name must be a string.")
          .trim(),
      ];
    case "update":
      return [
        check("name")
          .notEmpty()
          .withMessage("name is required.")
          .bail()
          .isString()
          .withMessage("name must be a string.")
          .trim(),
      ];
    default:
      [];
  }
};
