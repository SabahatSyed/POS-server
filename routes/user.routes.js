const router = require("express").Router();
const UserController = require('../controllers/user.controller');
const { validate } = require("../validations/validator");
const { check } = require("../validations/user.validation");



router.post(
    "/add",
    validate(check("create")),
    UserController.addUser
  );




module.exports = router
