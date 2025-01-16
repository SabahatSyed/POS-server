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
        check("salesman")
          .notEmpty()
          .withMessage("Salesman is required.")
          .bail()
          .isMongoId()
          .withMessage("Invalid Salesman ID."),
        check("products").isArray().withMessage("Products must be an array."),
        check("products.*.inventory")
          .notEmpty()
          .withMessage("Inventory is required.")
          .bail()
          .isMongoId()
          .withMessage("Invalid Inventory ID."),
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
          .isIn(["Cash", "Credit"])
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
        check("salesman")
          .notEmpty()
          .withMessage("Salesman is required.")
          .bail()
          .isMongoId()
          .withMessage("Invalid Salesman ID."),
        check("products").isArray().withMessage("Products must be an array."),
        check("products.*.inventory")
          .notEmpty()
          .withMessage("Inventory is required.")
          .bail()
          .isMongoId()
          .withMessage("Invalid Inventory ID."),
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
          .isIn(["Cash", "Credit"])
          .withMessage("Invalid Payment Type."),
      ];
    default:
      return [];
  }
};
