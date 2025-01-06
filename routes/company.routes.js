const router = require("express").Router();
const CompanyController = require('../controllers/company.controller');
const { validate } = require("../validations/validator");
const { check } = require("../validations/company.validation");

router.post(
  "/register",
  validate(check("register")),
  CompanyController.registerCompany
);


module.exports = router
