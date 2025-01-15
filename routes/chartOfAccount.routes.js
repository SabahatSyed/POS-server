const router = require("express").Router();
const chartOfAccountController = require("../controllers/chartOfAccount.controller");
const { validate } = require("../validations/validator");
const { check } = require("../validations/chartOfAccount.validation");

// Create a new Chart of Account
router.post(
  "/chart-of-account",
  validate(check("createChartOfAccount")),
  chartOfAccountController.create
);

// Retrieve all Chart of Accounts
router.get("/chart-of-account", chartOfAccountController.getAll);

// Retrieve a specific Chart of Account by ID
router.get("/chart-of-account/:id", chartOfAccountController.getById);

// Update a Chart of Account by ID
router.put(
  "/chart-of-account/:id",
  validate(check("updateChartOfAccount")),
  chartOfAccountController.update
);

// Delete a Chart of Account by ID
router.delete("/chart-of-account/:id", chartOfAccountController.delete);

module.exports = router;
