const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');
const utilities = require('../utilities');
const regValidate = require('../utilities/account-validation')



router.get('/login', utilities.handleErrors(accountController.buildLogin));
router.get('/update/:account_id',   accountController.buildUpdateAccount)
router.get("/",   utilities.checkLogin,  utilities.handleErrors(accountController.accountManagement))
router.get('/register', utilities.handleErrors(accountController.buildRegister));
// Process the registration data
router.post(
  "/register",
  regValidate.registationRules(),
  regValidate.checkRegData,
  utilities.handleErrors(accountController.registerAccount)
)
router.post(
  "/login",
  regValidate.loginRules(),
  regValidate.checkLoginData,
  utilities.handleErrors(accountController.accountLogin)
)
router.post("/update", 
regValidate.updateRules(),
regValidate.checkUpdateData,
utilities.handleErrors(accountController.updateAccount))

router.post("/change-password",
regValidate.changePasswordRules(),
regValidate.checkChangePassword,
utilities.handleErrors(accountController.changePassword))


module.exports = router;
