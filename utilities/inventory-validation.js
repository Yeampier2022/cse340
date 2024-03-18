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
  

  validate.deleteAccountRules = () => {
    return [
      // account_id is required
      body("account_id")
        .trim()
        .isLength({ min: 1 })
        .withMessage("Account ID is required."),
    ]
  }

  validate.checkDeleteAccountData = async (req, res, next) => {
    errors = validationResult(req)
    if (!errors.isEmpty()) {
      console.log("errors", errors.array());
      let nav = await utilities.getNav()
      res.render("inventory/management", {
        errors,
        title: `Management`,
        nav,
      })
      return
    }
    next()
  }

module.exports = validate
