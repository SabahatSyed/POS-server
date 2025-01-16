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
        check("date")
          .notEmpty()
          .withMessage("Date is required.")
          .bail()
          .isISO8601()
          .withMessage("Invalid date format."),
        check("supplierName")
          .notEmpty()
          .withMessage("Supplier Name is required.")
          .bail()
          .isString()
          .withMessage("Supplier Name must be a string.")
          .trim(),
        check("supplierCode")
          .notEmpty()
          .withMessage("Supplier Code is required.")
          .bail()
          .isString()
          .withMessage("Supplier Code must be a string.")
          .trim(),
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
        check("date")
          .notEmpty()
          .withMessage("Date is required.")
          .bail()
          .isISO8601()
          .withMessage("Invalid date format."),
        check("supplierName")
          .notEmpty()
          .withMessage("Supplier Name is required.")
          .bail()
          .isString()
          .withMessage("Supplier Name must be a string.")
          .trim(),
        check("supplierCode")
          .notEmpty()
          .withMessage("Supplier Code is required.")
          .bail()
          .isString()
          .withMessage("Supplier Code must be a string.")
          .trim(),
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
