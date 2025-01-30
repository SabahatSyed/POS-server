const router = require("express").Router();
const batchController = require("../controllers/batch.controller");
const { validate } = require("../validations/validator");
const { check } = require("../validations/batch.validation");

router.post(
  "/",
  validate(check("create")),
  batchController.create
);

router.get("/", batchController.getAll);

router.get("/:id", batchController.getById);

router.put(
  "/:id",
  validate(check("update")),
  batchController.update
);

router.delete("/:id", batchController.delete);

module.exports = router;
