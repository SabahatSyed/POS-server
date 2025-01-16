const { check } = require("express-validator");

exports.check = (method) => {
  switch (method) {
    case "create": {
      return [
        check("chartOfAccount")
          .notEmpty()
          .withMessage("Chart of Account is required")
          .bail()
          .isMongoId()
          .withMessage("Invalid Chart of Account ID"),

        check("salesman")
          .notEmpty()
          .withMessage("Salesman is required")
          .bail()
          .isMongoId()
          .withMessage("Invalid Salesman ID"),

        check("products")
          .isArray()
          .withMessage("Products should be an array")
          .bail()
          .notEmpty()
          .withMessage("Products cannot be empty")
          .bail()
          .custom((value) => {
            // Validate each product's inventory and batch
            value.forEach((product) => {
              if (!product.inventory || !product.batch) {
                throw new Error(
                  "Each product must have inventory and batch information"
                );
              }
            });
            return true;
          }),

        check("quantity")
          .notEmpty()
          .withMessage("Quantity is required")
          .bail()
          .isNumeric()
          .withMessage("Quantity should be a number")
          .bail()
          .isInt({ min: 1 })
          .withMessage("Quantity must be at least 1"),

        check("tradeRate")
          .notEmpty()
          .withMessage("Trade Rate is required")
          .bail()
          .isNumeric()
          .withMessage("Trade Rate should be a number"),

        check("discount")
          .optional()
          .isNumeric()
          .withMessage("Discount should be a number"),

        check("discountValue")
          .optional()
          .isNumeric()
          .withMessage("Discount Value should be a number"),

        check("netRate")
          .notEmpty()
          .withMessage("Net Rate is required")
          .bail()
          .isNumeric()
          .withMessage("Net Rate should be a number"),

        check("amount")
          .notEmpty()
          .withMessage("Amount is required")
          .bail()
          .isNumeric()
          .withMessage("Amount should be a number"),

        check("return")
          .optional()
          .isBoolean()
          .withMessage("Return should be a boolean value"),

        check("balance")
          .notEmpty()
          .withMessage("Balance is required")
          .bail()
          .isNumeric()
          .withMessage("Balance should be a number"),

        check("remarks")
          .optional()
          .isString()
          .withMessage("Remarks should be a string"),

        check("date")
          .notEmpty()
          .withMessage("Date is required")
          .bail()
          .isDate()
          .withMessage("Invalid Date format"),

        check("paymentType")
          .notEmpty()
          .withMessage("Payment Type is required")
          .bail()
          .isIn(["Cash", "Credit"])
          .withMessage("Payment Type should be either 'Cash' or 'Credit'"),
      ];
    }
    case "update": {
      return [
        check("chartOfAccount")
          .notEmpty()
          .withMessage("Chart of Account is required")
          .bail()
          .isMongoId()
          .withMessage("Invalid Chart of Account ID"),

        check("salesman")
          .notEmpty()
          .withMessage("Salesman is required")
          .bail()
          .isMongoId()
          .withMessage("Invalid Salesman ID"),

        check("products")
          .isArray()
          .withMessage("Products should be an array")
          .bail()
          .notEmpty()
          .withMessage("Products cannot be empty")
          .bail()
          .custom((value) => {
            // Validate each product's inventory and batch
            value.forEach((product) => {
              if (!product.inventory || !product.batch) {
                throw new Error(
                  "Each product must have inventory and batch information"
                );
              }
            });
            return true;
          }),

        check("quantity")
          .notEmpty()
          .withMessage("Quantity is required")
          .bail()
          .isNumeric()
          .withMessage("Quantity should be a number")
          .bail()
          .isInt({ min: 1 })
          .withMessage("Quantity must be at least 1"),

        check("tradeRate")
          .notEmpty()
          .withMessage("Trade Rate is required")
          .bail()
          .isNumeric()
          .withMessage("Trade Rate should be a number"),

        check("discount")
          .optional()
          .isNumeric()
          .withMessage("Discount should be a number"),

        check("discountValue")
          .optional()
          .isNumeric()
          .withMessage("Discount Value should be a number"),

        check("netRate")
          .notEmpty()
          .withMessage("Net Rate is required")
          .bail()
          .isNumeric()
          .withMessage("Net Rate should be a number"),

        check("amount")
          .notEmpty()
          .withMessage("Amount is required")
          .bail()
          .isNumeric()
          .withMessage("Amount should be a number"),

        check("return")
          .optional()
          .isBoolean()
          .withMessage("Return should be a boolean value"),

        check("balance")
          .notEmpty()
          .withMessage("Balance is required")
          .bail()
          .isNumeric()
          .withMessage("Balance should be a number"),

        check("remarks")
          .optional()
          .isString()
          .withMessage("Remarks should be a string"),

        check("date")
          .notEmpty()
          .withMessage("Date is required")
          .bail()
          .isDate()
          .withMessage("Invalid Date format"),

        check("paymentType")
          .notEmpty()
          .withMessage("Payment Type is required")
          .bail()
          .isIn(["Cash", "Credit"])
          .withMessage("Payment Type should be either 'Cash' or 'Credit'"),
      ];
    }

    default: {
      return [];
    }
  }
};
