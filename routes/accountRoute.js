const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');
const utilities = require('../utilities');
const regValidate = require('../utilities/account-validation')



router.get('/login', utilities.handleError(accountController.buildLogin));
router.get('/update',   accountController.buildUpdateAccount)
router.get("/",   utilities.checkLogin,  utilities.handleError(accountController.accountManagement))
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
  utilities.handleError(accountController.accountLogin)
)
router.post("/update", 
regValidate.updateRules(),
regValidate.checkUpdateData,
utilities.handleError(accountController.updateAccount))


module.exports = router;
