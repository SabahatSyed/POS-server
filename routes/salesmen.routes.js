const router = require("express").Router();
const salesmenController = require("../controllers/salesmen.controller");
const { validate } = require("../validations/validator");
const { check } = require("../validations/salesmen.validation");

router.post(
  "/",
  validate(check("create")),
  salesmenController.create
);

router.get("/", salesmenController.getAll);

router.get("/:id", salesmenController.getById);

router.put(
  "/:id",
  validate(check("update")),
  salesmenController.update
);

router.delete("/:id", salesmenController.delete);

module.exports = router;
