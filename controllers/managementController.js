const utilities = require("../utilities");

const managementModel = require("../models/management-model");


async function buildManagement(req, res, next) {
    let nav = await utilities.getNav()
    res.render("inventory/management", {
        title: "Management",
        nav,
        errors: null,

    })
}

async function buildAddClassification(req, res, next) {
    let nav = await utilities.getNav()
    res.render("inventory/add-classification", {
        title: "Add Classification",
        nav,
        errors: null,

    })
}

async function buildAddInventory(req, res, next) {
    let nav = await utilities.getNav()
    res.render("inventory/add-inventory", {
        title: "Add Car Inventory",
        nav,
        errors: null,

    })


}

async function addClassification(req, res, next) {
    console.log("Adding classification");
    let classification_name = req.body.classification_name
    let result = await managementModel.addClassification(classification_name)


    if (result.rowCount != 0) {
        console.log("Classification added");
        req.flash("notice", "Classification added")
        res.status(201).render("inventory/add-classification"), {
            title: "Add Classification",
            nav,
            errors: null,

        }
    }
    else {
        req.flash("notice", "Error adding classification")
        res.status(501).render("inventory/add-classification", {
            title: "Add Classification",
            nav,
            errors: null,
        })
    }
}


async function addInventory(req, res, next) {
    let classification_id = req.body.classification_id
    let inv_make = req.body.inv_make
    let inv_model = req.body.inv_model
    let inv_description = req.body.inv_description
    let inv_image = req.body.inv_image
    let inv_thumball = req.body.inv_thumball
    let inv_price = req.body.inv_price
    let inv_year = req.body.inv_year
    let inv_miles = req.body.inv_miles
    let inv_color = req.body.inv_color
    let result = await managementModel.addInventory(classification_id, inv_make, inv_model, inv_description, inv_image, inv_thumball, inv_price, inv_year, inv_miles, inv_color)
   

    if(result.rowCount != 0){
        console.log("Inventory added");
        req.flash("notice", "Inventory added")
        res.status(201).render("inventory/add-inventory"), {
            title: "Add Car Inventory",
            nav,
            errors: null,

        }

    }

    else {
        req.flash("notice", "Error adding inventory")
        res.status(501).render("inventory/add-inventory", {
            title: "Add Car Inventory",
            nav,
            errors: null,
        })
    }
}

module.exports = {
    buildManagement,
    buildAddClassification,
    buildAddInventory,
    addClassification,
    addInventory

}