const { check } = require("express-validator");

exports.check = (method) => {
    switch (method) {
        case "createMainGroup": {
            return [
              check("seqNumber")
                .notEmpty()
                .withMessage("Sequence Number cannot be empty")
                .bail()
                .isInt({ min: 1 })
                .withMessage("Sequence Number must be a positive integer"),
              check("code")
                .notEmpty()
                .withMessage("Code cannot be empty")
                .bail()
                .isLength({ max: 10 })
                .withMessage("Code cannot exceed 10 characters"),
              check("description")
                .notEmpty()
                .withMessage("Description cannot be empty")
                .bail()
                .isLength({ max: 255 })
                .withMessage("Description cannot exceed 255 characters"),
            ];
          }
          case "updateMainGroup": {
            return [
              check("seqNumber")
                .optional()
                .isInt({ min: 1 })
                .withMessage("Sequence Number must be a positive integer"),
              check("code")
                .optional()
                .isLength({ max: 10 })
                .withMessage("Code cannot exceed 10 characters"),
              check("description")
                .optional()
                .isLength({ max: 255 })
                .withMessage("Description cannot exceed 255 characters"),
            ];
          }
    }
}