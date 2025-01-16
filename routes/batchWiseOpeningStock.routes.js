const router = require("express").Router();
const batchWiseOpeningStockController = require("../controllers/batchWiseOpeningStock.controller");
const { validate } = require("../validations/validator");
const { check } = require("../validations/batchWiseOpeningStock.validation");

router.post(
  "/",
  validate(check("create")),
  batchWiseOpeningStockController.create
);

router.get("/", batchWiseOpeningStockController.getAll);

router.get("/:id", batchWiseOpeningStockController.getById);

router.put(
  "/:id",
  validate(check("update")),
  batchWiseOpeningStockController.update
);

router.delete("/:id", batchWiseOpeningStockController.delete);

module.exports = router;
