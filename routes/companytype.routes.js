const router = require("express").Router();
const CompanyTypeController = require('../controllers/companytype.controller');
const { validate } = require("../validations/validator");
const { check } = require("../validations/companytype.validation");


router.post(
    "/add-company",
    CompanyTypeController.addCompanyType
);




module.exports = router
