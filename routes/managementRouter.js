const express = require('express');
const router = express.Router();
const utilities = require('../utilities');
const managementController = require('../controllers/managementController');
const regValidate = require('../utilities/inventory-validation');
const invController = require('../controllers/invController');


// GET: /management

router.get('/management', utilities.handleError(managementController.buildManagement));

// add new classificaiton

router.get('/add-classification', utilities.handleError(managementController.buildAddClassification));

router.get("/getInventory/:classification_id", utilities.handleError(invController.getInventoryJSON))

// add new car inventory

router.get("/add-inventory", utilities.handleError(managementController.getClassifications),
utilities.handleError(managementController.buildAddInventory));


router.post(
  "/add-inventory",
  regValidate.inventoryRules(),
  regValidate.checkInventoryData,
  utilities.handleError(managementController.addInventory)
)

router.post(
  "/add-classification",
  regValidate.classificationRules(),
  regValidate.checkClassificationData,
  utilities.handleError(managementController.addClassification)
)


module.exports = router;
