// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities/")
const managementController = require('../controllers/managementController');
const invValidate = require("../utilities/inventory-validation")


router.get('/add-classification', utilities.handleError(invController.buildAddClassification));


// add new car inventory

router.get("/add-inventory", utilities.handleError(invController.getClassifications),
utilities.handleError(invController.buildAddInventory));



router.get('/', utilities.checkLogin, utilities.checkAccountType, utilities.handleError(managementController.buildManagement));

router.get("/type/:classificationId", invController.buildByClassificationId);
router.get("/getInventory/:classification_id", utilities.handleError(invController.getInventoryJSON))
router.get("/edit/:inv_id", utilities.checkLogin, utilities.handleError(invController.editInventoryView))
router.get("/delete/:inv_id", utilities.checkAccountType, utilities.checkLogin, utilities.handleError(invController.buildDeleteInventory))

router.post("/update", invController.updateInventory,
utilities.checkLogin,
invValidate.inventoryRules(),
)
router.post(
    "/delete",
    utilities.checkLogin, 
    utilities.checkAccountType,
    invValidate.deleteAccountRules(),
    invValidate.checkDeleteAccountData,
    utilities.handleError(invController.deleteInventory)
  );
  
  router.post(
    "/add-inventory",
    invValidate.inventoryRules(),
    invValidate.checkInventoryData,
    utilities.handleError(invController.addInventory)
  )
  
  router.post(
    "/add-classification",
    invValidate.classificationRules(),
    invValidate.checkClassificationData,
    utilities.handleError(invController.addClassification)
  )




module.exports = router;