const router = require("express").Router();
const salesBillController = require("../controllers/salesBill.controller");
const { validate } = require("../validations/validator");
const { check } = require("../validations/salesBill.validation");

router.post("/", validate(check("create")), salesBillController.create);

router.get("/", salesBillController.getAll);

router.get("/:id", salesBillController.getById);

router.put("/:id", validate(check("update")), salesBillController.update);

router.delete("/:id", salesBillController.delete);

module.exports = router;
