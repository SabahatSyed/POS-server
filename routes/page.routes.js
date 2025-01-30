const router = require("express").Router();
const PageController = require('../controllers/page.controller');
const { validate } = require("../validations/validator");
const { check } = require("../validations/page.validation");

router.post(
    "/",
    validate(check("create")), // Middleware to handle validation results
    PageController.createPages
  );
  
  // Retrieve all 
  router.get("/", PageController.getPages);
  
  // Retrieve a single by ID
  router.get("/:id", PageController.getPageById);
  
  // Update by ID
  router.put(
    "/:id",
    validate(check("update")), // Middleware to handle validation results
    PageController.updatePage
  );
  
  // Delete by ID
  router.delete("/:id", PageController.deletePage);

module.exports = router
