const router = require("express").Router();
const generalBillController = require("../controllers/generalBill.controller");
const { validate } = require("../validations/validator");
const { check } = require("../validations/generalBill.validation");

// Route to create a General Bill
router.post("/", validate(check("create")), generalBillController.create);

// Route to get all General Bills
router.get("/all", generalBillController.getAll);

// Route to get a specific General Bill by ID
router.get("/:id", generalBillController.getById);

// Route to update a General Bill by ID
router.put("/:id", validate(check("update")), generalBillController.update);

// Route to delete a General Bill by ID
router.delete("/:id", generalBillController.delete);

module.exports = router;
