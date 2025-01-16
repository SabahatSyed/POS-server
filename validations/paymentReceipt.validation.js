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
      ];
    }
  }
};
