const { check } = require("express-validator");

exports.check = (method) => {
  switch (method) {
    case "create": {
      return [
        check("salesBill")
          .notEmpty()
          .withMessage("Sales Bill ID is required")
          .bail()
          .isMongoId()
          .withMessage("Invalid Sales Bill ID"),
        check("balance")
          .notEmpty()
          .withMessage("Balance is required")
          .bail()
          .isNumeric()
          .withMessage("Balance must be a number"),
        check("quantity")
          .notEmpty()
          .withMessage("Quantity is required")
          .bail()
          .isNumeric()
          .withMessage("Quantity must be a number"),
        check("tradeRate")
          .notEmpty()
          .withMessage("Trade rate is required")
          .bail()
          .isNumeric()
          .withMessage("Trade rate must be a number"),
        check("amount")
          .notEmpty()
          .withMessage("Amount is required")
          .bail()
          .isNumeric()
          .withMessage("Amount must be a number"),
      ];
    }
    case "update": {
      return [
        check("salesBill")
          .notEmpty()
          .withMessage("Sales Bill ID is required")
          .bail()
          .isMongoId()
          .withMessage("Invalid Sales Bill ID"),
        check("balance")
          .notEmpty()
          .withMessage("Balance is required")
          .bail()
          .isNumeric()
          .withMessage("Balance must be a number"),
        check("quantity")
          .notEmpty()
          .withMessage("Quantity is required")
          .bail()
          .isNumeric()
          .withMessage("Quantity must be a number"),
        check("tradeRate")
          .notEmpty()
          .withMessage("Trade rate is required")
          .bail()
          .isNumeric()
          .withMessage("Trade rate must be a number"),
        check("amount")
          .notEmpty()
          .withMessage("Amount is required")
          .bail()
          .isNumeric()
          .withMessage("Amount must be a number"),
      ];
    }
  }
};
