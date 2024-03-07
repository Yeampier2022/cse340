const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');
const utilities = require('../utilities');
const regValidate = require('../utilities/account-validation')
const jwt = require("jsonwebtoken")
require("dotenv").config()

router.get("/", utilities.checkLogin, utilities.handleError(accountController.buildManagement))

router.get('/login', utilities.handleError(accountController.buildLogin));

router.get('/register', utilities.handleError(accountController.buildRegister));
// Process the registration data
router.post(
  "/register",
  regValidate.registationRules(),
  regValidate.checkRegData,
  utilities.handleError(accountController.registerAccount)
)


router.post(
  "/login",
  regValidate.loginRules(),
  regValidate.checkLoginData,
  utilities.handleError(accountController.loginAccount)
)


module.exports = router;
