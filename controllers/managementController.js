const utilities = require("../utilities");


const managementController = {}

managementController.buildManagement = async function buildManagement(req, res, next) {
    let nav = await utilities.getNav()
    const classificationSelect = await utilities.buildClassificationList()
    res.render("inventory/management", {
        title: "Management",
        nav,
        classificationSelect
    })
};
module.exports = managementController;


