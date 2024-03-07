const utilities = require("../utilities");

const managementModel = require("../models/management-model");

const managementController = {}

managementController.buildManagement = async function buildManagement(req, res, next) {
    let nav = await utilities.getNav()
    res.render("inventory/management", {
        title: "Management",
        nav,
    })
};

managementController.getClassifications = async function (req, res, next) {
    const data = await managementModel.getClassifications()
    let nav = await utilities.getNav()
    res.render("inventory/add-inventory", {
        title: "Add Car Inventory",
        nav,
        classification_name: data.rows,
        errors: null,
    })
};

managementController.buildAddClassification = async function buildAddClassification(req, res, next) {
    let nav = await utilities.getNav()
    res.render("inventory/add-classification", {
        title: "Add Classification",
        nav,
        errors: null,

    })
}

managementController.buildAddInventory = async function buildAddInventory(req, res, next) {
    let nav = await utilities.getNav()
    res.render("inventory/add-inventory", {
        title: "Add Car Inventory",
        nav,
        errors: null,

    })


};


managementController.addClassification = async function addClassification(req, res, next) {
    console.log("Adding classification");
    let nav = await utilities.getNav()
    let classification_name = req.body.classification_name
    let result = await managementModel.addClassification(classification_name)


    if (result && result.rowCount > 0) {
        console.log("Classification added");
        req.flash("notice", "Classification added")
        res.status(201).render("inventory/management", {
            title: "Add Classification",
            nav,
            errors: null,
        })
    }
    else {
        req.flash("notice", "Error adding classification")
        res.status(501).render("inventory/add-classification", {
            title: "Add Classification",
            nav,
            errors: "Error adding classification",
        })
    }
};




managementController.addInventory = 
async function addInventory(req, res, next) {
    let nav = await utilities.getNav()
    let classification_id = req.body.classification_id
    let inv_make = req.body.inv_make
    let inv_model = req.body.inv_model
    let inv_description = req.body.inv_description
    let inv_image = req.body.inv_image
    let inv_thumbnail = req.body.inv_thumbnail
    let inv_price = req.body.inv_price
    let inv_year = req.body.inv_year
    let inv_miles = req.body.inv_miles
    let inv_color = req.body.inv_color
    let result = await managementModel.addInventory(classification_id, inv_make, inv_model, inv_description, inv_image, inv_thumbnail, inv_price, inv_year, inv_miles, inv_color)

    console.log(result);
    if (result && result.rowCount > 0) {
        console.log("Inventory added");
        req.flash("notice", "Inventory added")
        res.status(201).render("inventory/management", {
            title: "Add Car Inventory",
            nav,
            errors: null,
        })

    }

    else {
        req.flash("notice", "Error adding inventory")
        res.status(501).render("inventory/add-inventory", {
            title: "Add Car Inventory",
            nav,
            errors: "Error adding inventory",
        })
    }
};
module.exports = managementController;


