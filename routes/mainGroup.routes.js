const router = require("express").Router();
const mainGroupController = require("../controllers/mainGroup.controller");
const { validate } = require("../validations/validator");
const { check } = require("../validations/mainGroup.validation");

// Create a new MainGroup
router.post(
  "/",
  validate(check("createMainGroup")), // Middleware to handle validation results
  mainGroupController.create
);

// Retrieve all MainGroups
router.get("/", mainGroupController.getAll);

// Retrieve a single MainGroup by ID
router.get("/mainGroup/:id", mainGroupController.getById);

// Update a MainGroup by ID
router.put(
  "/:id",
  validate(check("updateMainGroup")), // Middleware to handle validation results
  mainGroupController.update
);

// Delete a MainGroup by ID
router.delete("/mainGroup/:id", mainGroupController.delete);

module.exports = router;
