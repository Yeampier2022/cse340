// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities/")


router.get("/type/:classificationId", invController.buildByClassificationId);
router.get("/getInventory/:classification_id", utilities.handleError(invController.getInventoryJSON))

module.exports = router;