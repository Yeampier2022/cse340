const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');
const utilities = require('../utilities');



router.get('/login',utilities.handleError(accountController.buildLogin));

router.get('/register',utilities.handleError(accountController.buildRegister));



module.exports = router;
