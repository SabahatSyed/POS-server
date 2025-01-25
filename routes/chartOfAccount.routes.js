const router = require("express").Router();
const chartOfAccountController = require("../controllers/chartOfAccount.controller");
const { validate } = require("../validations/validator");
const { check } = require("../validations/chartOfAccount.validation");

// Create a new Chart of Account
router.post(
  "/",
  validate(check("createChartOfAccount")),
  chartOfAccountController.create
);

// Retrieve all Chart of Accounts
router.get("/", chartOfAccountController.getAll);

// Retrieve a specific Chart of Account by ID
router.get("/:id", chartOfAccountController.getById);

// Update a Chart of Account by ID
router.put(
  "/:id",
  validate(check("updateChartOfAccount")),
  chartOfAccountController.update
);

// Delete a Chart of Account by ID
router.delete("/:id", chartOfAccountController.delete);

module.exports = router;
