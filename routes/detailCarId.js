const express = require('express');
const router = new express.Router();
const invController = require('../controllers/invController');
const utilities = require('../utilities/');


router.get('/:carId', invController.buildDetailCarId);


module.exports = router;