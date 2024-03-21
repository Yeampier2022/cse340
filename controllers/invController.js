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

invCont.buildAddClassification = async function buildAddClassification(req, res, next) {
  let nav = await utilities.getNav()
  res.render("inventory/add-classification", {
      title: "Add Classification",
      nav,
      errors: null,

  })
}
invCont.addClassification = async function addClassification(req, res, next) {
  let nav = await utilities.getNav()
  let classification_name = req.body.classification_name
  let result = await invModel.addClassification(classification_name)
  const classificationSelect = await utilities.buildClassificationList()



  if (result && result.rowCount > 0) {
      req.flash(`notice`, `the ${classification_name} was successfully added.`)
      res.status(201).render("inventory/management", {
          title: "Add Classification",
          nav,
          errors: null,
          classificationSelect
      })
  }
  else {
      req.flash("notice", "Error adding classification")
      res.status(501).render("inv/add-classification", {
          title: "Add Classification",
          nav,
          errors: "Error adding classification",
      })
  }
};

invCont.getClassifications = async function (req, res, next) {
  const data = await invModel.getClassifications()
  let nav = await utilities.getNav()
  res.render("inventory/add-inventory", {
      title: "Add Car Inventory",
      nav,
      classification_name: data.rows,
      errors: null,
  })
};
invCont.buildAddInventory = async function buildAddInventory(req, res, next) {
  let nav = await utilities.getNav()
  res.render("inventory/add-inventory", {
      title: "Add Car Inventory",
      nav,
      errors: null,

  })


};

invCont.addInventory = async function addInventory(req, res, next) {
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
    let result = await invModel.addInventory(classification_id, inv_make, inv_model, inv_description, inv_image, inv_thumbnail, inv_price, inv_year, inv_miles, inv_color)
    const classificationSelect = await utilities.buildClassificationList()

    console.log(result);
    if (result && result.rowCount > 0) {
        req.flash(`notice`, `The  ${inv_make} ${inv_model} was successfully added.`)
        res.status(201).render("inventory/management", {
            title: "Add Car Inventory",
            nav,
            errors: null,
            classificationSelect
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
invCont.editInventoryView = async function (req, res, next) {
  const inv_id = parseInt(req.params.inv_id)
  let nav = await utilities.getNav()
  const itemData = await invModel.getInventoryById(inv_id)
  const classificationSelect = await utilities.buildClassificationList(itemData.classification_id)
  const itemName = `${itemData[0].inv_make}`
  res.render("inventory/edit-inventory", {
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
  let nav = await utilities.getNav()
  const itemData = await invModel.getInventoryByInvId(inv_id)
  const itemName = itemData[0]?.inv_make + " " + itemData[0]?.inv_model
  res.render("inventory/delete-confirm", {
    title: "Delete " + itemName,
    nav,
    errors: null,
    inv_id: itemData[0].inv_id,
    inv_make: itemData[0].inv_make,
    inv_model: itemData[0].inv_model,
    inv_year: itemData[0].inv_year,
    inv_price: itemData[0].inv_price,
  })
}

invCont.deleteInventory = async function(req, res, next){
  const inv_id = parseInt(req.body.inv_id)
  const deleteResult = await invModel.deleteInventory(inv_id)
  if (deleteResult) {
    req.flash("notice", `The delted was successfully .`)
    res.redirect("/inv")
  } else {
    req.flash("notice", "Sorry, the delete failed.")
    res.redirect(501)(`/inv/delete/${inv_id}`)
  }
}

module.exports = invCont
