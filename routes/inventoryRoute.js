// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities/")
const managementController = require('../controllers/managementController');
const invValidate = require("../utilities/inventory-validation")


router.get('/add-classification', utilities.handleErrors(invController.buildAddClassification));


// add new car inventory

router.get("/add-inventory", utilities.handleErrors(invController.getClassifications),
utilities.handleErrors(invController.buildAddInventory));



router.get('/', utilities.checkLogin, utilities.checkAccountType, utilities.handleErrors(managementController.buildManagement));
router.get("/type/:classificationId", invController.buildByClassificationId);
router.get("/getInventory/:classification_id", utilities.handleErrors(invController.getInventoryJSON))
router.get("/edit/:inv_id", utilities.checkLogin, utilities.handleErrors(invController.editInventoryView))
router.get("/delete/:inv_id", utilities.checkAccountType, utilities.checkLogin, utilities.handleErrors(invController.buildDeleteInventory))
router.get("/delete-classification", utilities.handleErrors(invController.buildDeleteClassification))

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
    utilities.handleErrors(invController.deleteInventory)
  );
  
  router.post(
    "/add-inventory",
    invValidate.inventoryRules(),
    invValidate.checkInventoryData,
    utilities.handleErrors(invController.addInventory)
  )
  
  router.post(
    "/add-classification",
    invValidate.classificationRules(),
    invValidate.checkClassificationData,
    utilities.handleErrors(invController.addClassification)
  )

  router.post(
    "/delete-classification",
    utilities.checkLogin,
    utilities.checkAccountType,
    utilities.checkAccountType,
    invValidate.checkDeleteAccountData,
    utilities.handleErrors(invController.deleteClassification)
  );




module.exports = router;