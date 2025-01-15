const { check } = require("express-validator");

exports.check = (method) => {
  switch (method) {
    case "createChartOfAccount":
      return [
        check("mainGroup").notEmpty().withMessage("MainGroup ID is required."),
        check("code").notEmpty().withMessage("Code is required."),
        check("description").notEmpty().withMessage("Description is required."),
        check("cnic")
          .optional()
          .isLength({ min: 13, max: 13 })
          .withMessage("CNIC must be 13 digits."),
        check("phone")
          .optional()
          .isLength({ min: 10, max: 15 })
          .withMessage("Phone must be between 10 and 15 digits."),
        check("mobile")
          .optional()
          .isLength({ min: 10, max: 15 })
          .withMessage("Mobile must be between 10 and 15 digits."),
        check("balanceBF")
          .optional()
          .isNumeric()
          .withMessage("BalanceBF must be a number."),
        check("creditLimit")
          .optional()
          .isNumeric()
          .withMessage("CreditLimit must be a number."),
        check("address").optional(),
        check("TPB").optional(),
        check("NTN").optional(),
        check("STRN").optional(),
      ];
    case "updateChartOfAccount":
      return [
        check("mainGroup").optional(),
        check("code").optional(),
        check("description").optional(),
        check("cnic")
          .optional()
          .isLength({ min: 13, max: 13 })
          .withMessage("CNIC must be 13 digits."),
        check("phone")
          .optional()
          .isLength({ min: 10, max: 15 })
          .withMessage("Phone must be between 10 and 15 digits."),
        check("mobile")
          .optional()
          .isLength({ min: 10, max: 15 })
          .withMessage("Mobile must be between 10 and 15 digits."),
        check("balanceBF")
          .optional()
          .isNumeric()
          .withMessage("BalanceBF must be a number."),
        check("creditLimit")
          .optional()
          .isNumeric()
          .withMessage("CreditLimit must be a number."),
        check("address").optional(),
        check("TPB").optional(),
        check("NTN").optional(),
        check("STRN").optional(),
      ];
  }
};
