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

invCont.updateInventory = async function (req, res, next) {
  let nav = await utilities.getNav()
  const {
    inv_id,
    classification_id,
    inv_make,
    inv_model,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_year,
    inv_miles,
    inv_color
  } = req.body
  const updateResult = await invModel.updateInventory(
    Number(inv_id),
    Number(classification_id),
    String(inv_make),
    String(inv_model),
    String(inv_description),
    String(inv_image),
    String(inv_thumbnail),
    Number(inv_price),
    Number(inv_year),
    Number(inv_miles),
    String(inv_color)
  )

  if (updateResult) {
    console.log("updateResult", updateResult);
    const itemName = updateResult[0].inv_make + " " + updateResult[0].inv_model
    req.flash("notice", `The ${itemName} was successfully updated.`)
    res.status(201).render("inventory/edit-inventory"), {
      title: "Edit " + itemName,
      nav,
      errors: null,
    
    }
  } else {
    const classificationSelect = await utilities.buildClassificationSelect(classification_id)
    const itemName = `${inv_make} ${inv_model}`
    req.flash("notice", "Sorry, the update failed.")
    res.status(501).render("inventory/edit-inventory", {
    title: "Edit " + itemName,
    nav,
    errors: null,
    classificationSelect: classificationSelect,
    inv_id,
    classification_id,
    inv_make,
    inv_model,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_year,
    inv_miles,
    inv_color

  }
    )
  }
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
  const classificationList = await utilities.buildByClassificationList()
  res.render("./inventory/management", {
    title: "vichicle management",
    nav,
    classificationList,
    errors: null
  })
}

invCont.getInventoryJSON = async function (req, res, next) {
  const classification_id = req.params.classification_id
  const invData = await invModel.getInventoryByClassificationId(classification_id)
  console.log("classification_id", classification_id);
  console.log("invData", invData);  (classification_id)
  if (invData[0].inv_id) {
    res.json(invData)
  }
  else {
    res.json({ "error": "No data" })
  }
}


/* ***************************
 *  Build edit inventory view
 * ************************** */
invCont.editInventoryView = async function (req, res, next) {
  const inv_id = parseInt(req.params.inv_id)
  let nav = await utilities.getNav()
  const itemData = await invModel.getInventoryById(inv_id)
  const classificationSelect = await utilities.buildClassificationList(itemData.classification_id)
  const itemName = `${itemData[0].inv_make}`
  res.render("./inventory/edit-inventory", {
    title: "Edit " + itemName,
    nav,
    classificationSelect: classificationSelect,
    errors: null,
    inv_id: itemData.inv_id,
    inv_make: itemData.inv_make,
    inv_model: itemData.inv_model,
    inv_year: itemData.inv_year,
    inv_description: itemData.inv_description,
    inv_image: itemData.inv_image,
    inv_thumbnail: itemData.inv_thumbnail,
    inv_price: itemData.inv_price,
    inv_miles: itemData.inv_miles,
    inv_color: itemData.inv_color,
    classification_id: itemData.classification_id
  })
}

module.exports = invCont
