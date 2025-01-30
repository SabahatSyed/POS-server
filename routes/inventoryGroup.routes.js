const router = require("express").Router();
const inventoryGroupController = require("../controllers/inventoryGroup.controller");
const { validate } = require("../validations/validator");
const { check } = require("../validations/inventoryGroup.validation");

router.post(
  "/",
  validate(check("create")),
  inventoryGroupController.create
);

router.get("/", inventoryGroupController.getAll);

router.get("/:id", inventoryGroupController.getById);

router.put(
  "/:id",
  validate(check("update")),
  inventoryGroupController.update
);

router.delete("/:id", inventoryGroupController.delete);

module.exports = router;
