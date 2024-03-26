const express = require('express');
const router = new express.Router();
const invController = require('../controllers/invController');
const utilities = require('../utilities/');
const accountController = require('../controllers/accountController');


router.get('/:carId', invController.buildDetailCarId);

router.post("/logout", utilities.handleErrors(accountController.logout));

module.exports = router;