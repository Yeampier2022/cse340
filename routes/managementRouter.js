const express = require('express');
const router = express.Router();
const utilities = require('../utilities');
const managementController = require('../controllers/managementController');


// GET: /management

router.get('/', utilities.handleError(managementController.buildManagement));

// add new classificaiton

router.get('/add-classification', utilities.handleError(managementController.buildAddClassification));

// add new car inventory

router.get("/add-inventory", utilities.handleError(managementController.buildAddInventory));


module.exports = router;
