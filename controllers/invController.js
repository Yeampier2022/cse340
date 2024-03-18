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

invCont.getInventoryJSON = async (req, res, next) => {
  const classification_id = parseInt(req.params.classification_id)
  const invData = await invModel.getInventoryByClassificationId(classification_id)
  if (invData[0].inv_id) {
    return res.json(invData)
  } else {
    next(new Error("No data returned"))
  }
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
    res.redirect("/inv")
  } else {
    const classificationSelect = await utilities.buildClassificationList(classification_id)
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
    inv_id: itemData[0].inv_id,
    inv_make: itemData[0].inv_make,
    inv_model: itemData[0].inv_model,
    inv_year: itemData[0].inv_year,
    inv_description: itemData[0].inv_description,
    inv_image: itemData[0].inv_image,
    inv_thumbnail: itemData[0].inv_thumbnail,
    inv_price: itemData[0].inv_price,
    inv_miles: itemData[0].inv_miles,
    inv_color: itemData[0].inv_color,
    classification_id: itemData[0].classification_id
  })
}

invCont.buildDeleteInventory = async function(req, res, next){
  const inv_id = parseInt(req.params.inv_id)
  const classificationSelect = await utilities.buildClassificationList(classification_id)
  let nav = await utilities.getNav()
  console.log("inv_id", inv_id);
  const data = await invModel.getInventoryByInvId(inv_id)
  console.log(data);
  const itemData = data[0]
  const itemName = itemData.inv_make + " " + itemData.inv_model
  res.render("./inventory/delete-confirm", {
    title: "Delete " + itemName,
    nav,
    errors: null,
    inv_id: itemData.inv_id,
    inv_make: itemData.inv_make,
    inv_model: itemData.inv_model,
    inv_year: itemData.inv_year,
    inv_price: itemData.inv_price,
    classificationSelect: classificationSelect,
    classification_id: itemData.classification_id
    
    
  })
}

invCont.deleteInventory = async function(req, res, next){
  const {
    inv_id,
  } = req.body
  console.log("inv_id", inv_id);
  let nav = await utilities.getNav()
  const data = await invModel.deleteInventory(inv_id)
  console.log("data", data);
  const itemData = data[0]
  const itemName = itemData.inv_make + " " + itemData.inv_model
  const deleteResult = await invModel.deleteInventory(
    inv_id,  
  )
  if (deleteResult) {
  const classificationSelect  = await utilities.buildClassificationList(itemData.classification_id)
    console.log("deleteResult", deleteResult);

    req.flash("notice", `The ${itemName} was successfully delted.`)
    res.render("/inv"), {
      title: "Delete " + itemName,
      nav,
      errors: null,
      classificationSelect:  classificationSelect,
      classification_id: itemData.classification_id,


      inv_id,
    }
  } else {
    req.flash("notice", "Sorry, the delete failed.")
    res.status(501).render("./inventory/delete-inventory", {
    title: "Delete " + itemName,
    nav,
    errors: null,
    classificationSelect: classificationSelect,
    inv_id,
    })
  }
}

module.exports = invCont
