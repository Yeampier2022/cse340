// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities/")
const regValidate = require("../utilities/inventory-validation")


router.get("/type/:classificationId", invController.buildByClassificationId);
router.get("/getInventory/:classification_id",
utilities.handleError(invController.getInventoryJSON));

router.get("/edit/:inv_id",  utilities.handleError(invController.editInventoryView), );

router.post(
    "/update", 
    regValidate.addVehicleRules(),
    regValidate.checkUpdateVehicleData,
    utilities.handleError(invController.updateInventory)
)

module.exports = router;