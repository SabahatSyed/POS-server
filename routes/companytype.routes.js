const router = require("express").Router();
const CompanyTypeController = require('../controllers/companytype.controller');
const { validate } = require("../validations/validator");
const { check } = require("../validations/companytype.validation");


router.post(
    "/",
    validate(check("create")),
    CompanyTypeController.addCompanyType
);

  
  // Retrieve all
  router.get("/", CompanyTypeController.getAll);
  
  // Retrieve a specific of Account by ID
  router.get("/:id", CompanyTypeController.getById);
  
  // Update Account by ID
  router.put(
    "/:id",
    validate(check("updateChartOfAccount")),
    CompanyTypeController.update
  );
  
  // Delete Account by ID
  router.delete("/:id", CompanyTypeController.delete);
  
  module.exports = router;
