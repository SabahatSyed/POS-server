const router = require("express").Router();
const salesmanController = require("../controllers/salesmen.controller");
const { validate } = require("../validations/validator");
const { check } = require("../validations/salesman.validation");

router.post(
  "/",
  validate(check("create")),
  salesmanController.create
);

router.get("/", salesmanController.getAll);

router.get("/:id", salesmanController.getById);

router.put(
  "/:id",
  validate(check("update")),
  salesmanController.update
);

router.delete("/:id", salesmanController.delete);

module.exports = router;
