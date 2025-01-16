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
        check("description")
          .notEmpty()
          .withMessage("Description is required.")
          .bail()
          .isString()
          .withMessage("Description must be a string.")
          .trim(),
        check("quantity")
          .notEmpty()
          .withMessage("Quantity is required.")
          .bail()
          .isNumeric()
          .withMessage("Quantity must be a number.")
          .isFloat({ min: 0 })
          .withMessage("Quantity cannot be negative."),
        check("batch")
          .notEmpty()
          .withMessage("Batch is required.")
          .bail()
          .isMongoId()
          .withMessage("Invalid Batch ID."),
        check("inventory")
          .notEmpty()
          .withMessage("Inventory is required.")
          .bail()
          .isMongoId()
          .withMessage("Invalid Inventory ID."),
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
        check("quantity")
          .notEmpty()
          .withMessage("Quantity is required.")
          .bail()
          .isNumeric()
          .withMessage("Quantity must be a number.")
          .isFloat({ min: 0 })
          .withMessage("Quantity cannot be negative."),
        check("batch")
          .notEmpty()
          .withMessage("Batch is required.")
          .bail()
          .isMongoId()
          .withMessage("Invalid Batch ID."),
        check("inventory")
          .notEmpty()
          .withMessage("Inventory is required.")
          .bail()
          .isMongoId()
          .withMessage("Invalid Inventory ID."),
      ];
    default:
      return [];
  }
};
