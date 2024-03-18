// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities/")
const managementController = require('../controllers/managementController');
const invValidate = require("../utilities/inventory-validation")



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
  





module.exports = router;