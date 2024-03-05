const utilities = require("../utilities");

const managementModel = require("../models/management-model");


async function buildManagement(req, res, next) {
    let nav = await utilities.getNav()
    res.render("inventory/management", {
        title: "Management",
        nav,
    })
    }

async function buildAddClassification(req, res, next) {
    let nav = await utilities.getNav()
    res.render("inventory/add-classification", {
        title: "Add Classification",
        nav,
    })
}

async function buildAddInventory(req, res, next) {
    let nav = await utilities.getNav()
    res.render("inventory/add-inventory", {
        title: "Add Car Inventory",
        nav,
    })
}

module.exports = {
    buildManagement,
    buildAddClassification,
    buildAddInventory
}