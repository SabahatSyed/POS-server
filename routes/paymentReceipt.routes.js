const router = require("express").Router();
const paymentReceiptController = require("../controllers/paymentReceipt.controller");
const { validate } = require("../validations/validator");
const { check } = require("../validations/paymentReceipt.validation");

// Route to create a Payment Receipt
router.post(
  "/create",
  validate(check("create")),
  paymentReceiptController.create
);

// Route to get all Payment Receipts
router.get("/all", paymentReceiptController.getAll);

// Route to get a specific Payment Receipt by ID
router.get("/:id", paymentReceiptController.getById);

// Route to update a Payment Receipt by ID
router.put("/:id", validate(check("update")), paymentReceiptController.update);

// Route to delete a Payment Receipt by ID
router.delete("/:id", paymentReceiptController.delete);

module.exports = router;
