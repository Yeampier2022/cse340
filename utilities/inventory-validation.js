const utilities = require(".")
const { body, validationResult } = require("express-validator")
const validate = {}
const managementModel = require("../models/management-model")

validate.inventoryRules = () => {
    return [
      // classification_id is required
      body("classification_id")
        .trim()
        .isLength({ min: 1 })
        .withMessage("Please select a classification."),
  
      // inv_make is required
      body("inv_make")
        .trim()
        .isLength({ min: 1 })
        .withMessage("Please provide a make."),
  
      // inv_model is required
      body("inv_model")
        .trim()
        .isLength({ min: 1 })
        .withMessage("Please provide a model."),
  
      // inv_description is required
      body("inv_description")
        .trim()
        .isLength({ min: 1 })
        .withMessage("Please provide a description."),
  
      // inv_image is required
      body("inv_image")
        .trim()
        .isLength({ min: 1 })
        .withMessage("Please provide an image."),
  
      // inv_thumball is required
      body("inv_thumbnail")
        .trim()
        .isLength({ min: 1 })
        .withMessage("Please provide a thumbnail."),
  
      // inv_price is required
      body("inv_price")
        .trim()
        .isLength({ min: 1 })
        .withMessage("Please provide a price."),
  
      // inv_year is required
      body("inv_year")
        .trim()
        .isLength({ min: 1 })
        .withMessage("Please provide a year."),
  
      // inv_miles is required
      body("inv_miles")
        .trim()
        .isLength({ min: 1 })
        .withMessage("Please provide mileage."),
  
      // inv_color is required
      body("inv_color")
        .trim()
        .isLength({ min: 1 })
        .withMessage("Please provide a color."),
    ]
  }
  
  validate.checkInventoryData = async (req, res, next) => {
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
      let nav = await utilities.getNav()
      res.render("inventory/add-inventory", {
        errors,
        title: "Add Car Inventory",
        nav,
      })
      return
    }
    next()
  }
  

  validate.checkInventoryDataEdit = async (req, res, next) => {
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
      let nav = await utilities.getNav()
      res.render("inventory/edit-inventory", {
        errors,
        title: "Edit Car Inventory",
        nav,
      })
      return
    }
    next()
  }

  
validate.addVehicleRules = ()=>{
  return [
    //classification_id, 
    body("classification_id")
    .isInt({min:1})
    .withMessage("Please select a valid classification."),
    //inv_make, 
    body("inv_make")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Please provide the make of the vehicle."),
    //inv_model, 
    body("inv_model")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Please provide the model of the vehicle."),
    //inv_year, 
    body("inv_year")
    .isInt({min:1900, max:2025})//(new Date).getFullYear +1})
    .withMessage("Please provide a four digit year."),
    //inv_description, 
    body("inv_description")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Please provide a description of the vehicle"),
    //inv_image, 
    //inv_thumbnail, 
    //inv_price, 
    body("inv_price")
    .isInt({min:4})
    .withMessage("Please provide a valid price for the vehicle."),
    //inv_miles, 
    body("inv_miles")
    .isInt({min:1})
    .withMessage("Please provide the milage from the vehicle's odometer"),
    //inv_color 
    body("inv_color")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Please provide the color of the vehicle."),
  ]
}


validate.checkUpdateVehicleData = async (req, res, next) => {
  const {  inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id, inv_id } = req.body
  let errors = []
  errors = validationResult(req)
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    const classificationSelect = await utilities.buildClassificationSelect(classification_id);
    res.render("./inventory/edit-inventory", {
      errors,
      title: "Add Vehicle",
      nav,
      classificationSelect,
      inv_make, 
      inv_model, 
      inv_year, 
      inv_description, 
      inv_image, 
      inv_thumbnail, 
      inv_price, 
      inv_miles, 
      inv_color,
      classification_id,
      inv_id
    })
    return
  }
  next()
}
  
  validate.classificationRules = () => {
    return [
      // classification_name is required
      body("classification_name")
        .trim()
        .isLength({ min: 1 })
        .withMessage("Please provide a classification name.")
        .custom(async (classification_name) => {
          const classificationExists = await managementModel.checkExistingClassification(classification_name)
          if (classificationExists) {
            throw new Error("Classification exists. Please use different classification")
          }
        })
    ]
  }
  
  validate.checkClassificationData = async (req, res, next) => {
    errors = validationResult(req)
    if (!errors.isEmpty()) {
      console.log("errors", errors.array());
      let nav = await utilities.getNav()
      res.render("inventory/add-classification", {
        errors,
        title: `Add Classification`,
        nav,
      })
      return
    }
    next()
  }
  

module.exports = validate
