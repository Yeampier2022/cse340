const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")


const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0]?.classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}

/* ***************************
 *  Build inventory detail view
 * ************************** */

invCont.buildDetailCarId = async function (req, res, next) {
  const inv_id = req.params.carId
  const data = await invModel.getInventoryDetailByCarId(inv_id)
  console.log(data);
  const grid = await utilities.buildDetailGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].inv_year + " " + data[0].inv_make + " " + data[0].inv_model

  res.render("./inventory/detail", {
    title: className,
    nav,
    grid,
  } )

  
 
}

/* ***************************
build vichicle add view
  * ************************** */

invCont.buildManagementView = async function (req, res, next) {
  let nav = await utilities.getNav()
  const classification_select = await utilities.buildByClassificationList()
  res.render("./inventory/management", {
    title: "vichicle management",
    nav,
    errors: null,
    classification_select
  })
}

invCont.getInventoryJSON = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const invData = await invModel.getInventoryByClassificationId(classification_id)
  console.log(invData);
  (classification_id)
  if (invData[0].inv_id) {
    res.json(invData)
  }
  else {
    res.json({ "error": "No data" })
  }
}


module.exports = invCont
