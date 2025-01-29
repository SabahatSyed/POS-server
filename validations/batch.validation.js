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
          .withMessage("quantity is required.")
          .bail()
          .isString()
          .withMessage("quantity must be a string.")
          .trim(),
        check("date")
          .notEmpty()
          .withMessage("Date is required.")
          .bail()
          .isString()
          .withMessage("Invalid date format.")
          .trim(),,
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
        check("inventoryInformation")
          .notEmpty()
          .withMessage("inventoryInformation is required.")
          .bail()
          .isMongoId()
          .withMessage("Invalid inventoryInformation ID."),
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
          .withMessage("quantity is required.")
          .bail()
          .isString()
          .withMessage("quantity must be a string.")
          .trim(),
          check("date")
          .notEmpty()
          .withMessage("Date is required.")
          .bail()
          .isString()
          .withMessage("Invalid date format.")
          .trim(),,
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
        check("inventoryInformation")
          .notEmpty()
          .withMessage("inventoryInformation is required.")
          .bail()
          .isMongoId()
          .withMessage("Invalid inventoryInformation ID."),
      ];
    default:
      return [];
  }
};
