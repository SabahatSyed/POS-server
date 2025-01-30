const { check } = require("express-validator");

exports.check = (method) => {
  switch (method) {
    case "create":
      return [
        check("chartOfAccount")
          .notEmpty()
          .withMessage("Chart of Account is required.")
          .bail()
          .isMongoId()
          .withMessage("Invalid Chart of Account ID."),
        check("salesmen")
          .notEmpty()
          .withMessage("salesmen is required.")
          .bail()
          .isMongoId()
          .withMessage("Invalid salesmen ID."),
        check("products").isArray().withMessage("Products must be an array."),
        check("products.*.inventoryInformation")
          .notEmpty()
          .withMessage("InventoryInformation is required.")
          .bail()
          .isMongoId()
          .withMessage("Invalid InventoryInformation ID."),
        check("products.*.batch")
          .notEmpty()
          .withMessage("Batch is required.")
          .bail()
          .isMongoId()
          .withMessage("Invalid Batch ID."),
        check("quantity")
          .notEmpty()
          .withMessage("Quantity is required.")
          .bail()
          .isNumeric()
          .withMessage("Quantity must be a number."),
        check("tradeRate")
          .notEmpty()
          .withMessage("Trade Rate is required.")
          .bail()
          .isNumeric()
          .withMessage("Trade Rate must be a number."),
        check("paymentType")
          .notEmpty()
          .withMessage("Payment Type is required.")
          .bail()
          .isIn(["cash", "credit"])
          .withMessage("Invalid Payment Type."),
      ];
    case "update":
      return [
        check("chartOfAccount")
          .notEmpty()
          .withMessage("Chart of Account is required.")
          .bail()
          .isMongoId()
          .withMessage("Invalid Chart of Account ID."),
        check("salesmen")
          .notEmpty()
          .withMessage("salesmen is required.")
          .bail()
          .isMongoId()
          .withMessage("Invalid salesmen ID."),
        check("products").isArray().withMessage("Products must be an array."),
        check("products.*.inventoryInformation")
          .notEmpty()
          .withMessage("InventoryInformation is required.")
          .bail()
          .isMongoId()
          .withMessage("Invalid InventoryInformation ID."),
        check("products.*.batch")
          .notEmpty()
          .withMessage("Batch is required.")
          .bail()
          .isMongoId()
          .withMessage("Invalid Batch ID."),
        check("quantity")
          .notEmpty()
          .withMessage("Quantity is required.")
          .bail()
          .isNumeric()
          .withMessage("Quantity must be a number."),
        check("tradeRate")
          .notEmpty()
          .withMessage("Trade Rate is required.")
          .bail()
          .isNumeric()
          .withMessage("Trade Rate must be a number."),
        check("paymentType")
          .notEmpty()
          .withMessage("Payment Type is required.")
          .bail()
          .isIn(["cash", "credit"])
          .withMessage("Invalid Payment Type."),
      ];
    default:
      return [];
  }
};
