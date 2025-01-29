const router = require("express").Router();
const purchaseBillController = require("../controllers/purchaseBill.controller");
const { validate } = require("../validations/validator");
const { check } = require("../validations/purchaseBill.validation");

// Route to create a new purchase bill
router.post(
  "/",
  validate(check("create")),
  purchaseBillController.create
);

// Route to retrieve all purchase bills
router.get("/", purchaseBillController.getAll);

// Route to retrieve a specific purchase bill by ID
router.get("/:id", purchaseBillController.getById);

// Route to update an existing purchase bill
router.put(
  "/:id",
  validate(check("update")),
  purchaseBillController.update
);

// Route to delete a purchase bill
router.delete("/:id", purchaseBillController.delete);

module.exports = router;
