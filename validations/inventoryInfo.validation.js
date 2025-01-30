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
        check("name")
          .notEmpty()
          .withMessage("Name is required.")
          .bail()
          .isString()
          .withMessage("Name must be a string.")
          .trim(),
        check("packPrice")
          .notEmpty()
          .withMessage("Pack Price is required.")
          .bail()
          .isNumeric()
          .withMessage("Pack Price must be a number."),
        check("purchasePrice")
          .notEmpty()
          .withMessage("Purchase Price is required.")
          .bail()
          .isNumeric()
          .withMessage("Purchase Price must be a number."),
        check("tradePrice")
          .notEmpty()
          .withMessage("Trade Price is required.")
          .bail()
          .isNumeric()
          .withMessage("Trade Price must be a number."),
        check("inventoryGroup")
          .notEmpty()
          .withMessage("Inventory Group is required.")
          .bail()
          .isMongoId()
          .withMessage("Inventory Group must be a valid MongoDB ID."),
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
        check("name")
          .notEmpty()
          .withMessage("Name is required.")
          .bail()
          .isString()
          .withMessage("Name must be a string.")
          .trim(),
        check("packPrice")
          .notEmpty()
          .withMessage("Pack Price is required.")
          .bail()
          .isNumeric()
          .withMessage("Pack Price must be a number."),
        check("purchasePrice")
          .notEmpty()
          .withMessage("Purchase Price is required.")
          .bail()
          .isNumeric()
          .withMessage("Purchase Price must be a number."),
        check("tradePrice")
          .notEmpty()
          .withMessage("Trade Price is required.")
          .bail()
          .isNumeric()
          .withMessage("Trade Price must be a number."),
        check("inventoryGroup")
          .notEmpty()
          .withMessage("Inventory Group is required.")
          .bail()
          .isMongoId()
          .withMessage("Inventory Group must be a valid MongoDB ID."),
      ];
    default:
      return [];
  }
};
