const router = require("express").Router();
const inventoryInfoController = require("../controllers/inventoryInfo.controller");
const { validate } = require("../validations/validator");
const { check } = require("../validations/inventoryInfo.validation");

router.post(
  "/",
  validate(check("create")),
  inventoryInfoController.create
);

router.get("/", inventoryInfoController.getAll);

router.get("/:id", inventoryInfoController.getById);

router.put(
  "/:id",
  validate(check("update")),
  inventoryInfoController.update
);

router.delete("/:id", inventoryInfoController.delete);

module.exports = router;
