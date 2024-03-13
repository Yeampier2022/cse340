const invModel = require("../models/inventory-model")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const Util = {}

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */



Util.getNav = async function (req, res, next) {

  let data = await invModel.getClassifications()

  let list = `<ul class="li-navigation">`
  list += '<li class="li-a"><a href="/" title="Home page">Home</a></li>'
  list += '<li> <a href="/inventory/management">NewCar</a></li>'
  data.rows.forEach((row) => {
    list += "<li>"
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>"
    list += "</li>"
  })

  list += "</ul>"
  return list
}

Util.buildClassificationGrid = async function (data) {
  let grid
  if (data.length > 0) {
    grid = '<ul id="inv-display">'
    data.forEach(vehicle => {
      grid += '<li class="card-info">'
      grid += '<a href="../../detail/' + vehicle.inv_id
        + '" title="View ' + vehicle.inv_make + ' ' + vehicle.inv_model
        + 'details"><img class="img-inventory" src="' + vehicle.inv_thumbnail
        + '" alt="Image of ' + vehicle.inv_make + ' ' + vehicle.inv_model
        + ' on CSE Motors" /></a>'
      grid += '<div class="namePrice">'
      grid += '<hr />'
      grid += '<h2>'
      grid += '<a href="../../detail/' + vehicle.inv_id + '" title="View '
        + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">'
        + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
      grid += '</h2>'
      grid += '<span class="car-price" >$'
        + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
      grid += '</div>'
      grid += '</li>'
    })
    grid += '</ul>'
  } else {
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return grid
}

Util.buildDetailGrid = async function (data) {
  let grid = '<ul class="detail-container">'
  data.forEach(vehicle => {
    grid += '<li class="ditail-card">'
    grid += '<div class="card-image">'
    grid += '<img  src="' + vehicle.inv_image
      + '" alt="Image of ' + vehicle.inv_make + ' ' + vehicle.inv_model
      + ' on CSE Motors" />'
    grid += '</div>'
    grid += '<div class="detail-card-two" >'
    grid += '<h1>' + vehicle.inv_make + ' ' + vehicle.inv_model + '</h1>'
    grid += '<h2>Price: $' + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</h2>'
    grid += '<p class="description-p"><strong class="description-s">Description:</strong> ' + vehicle.inv_description + '</p>'
    grid += '<p class="description-p"><strong class="description-s">Color:</strong> ' + vehicle.inv_color + '</p>'
    grid += '<p class="description-p"><strong class="description-s">Miles:</strong> ' + new Intl.NumberFormat('en-US').format(vehicle.inv_miles) + '</p>'
    grid += '</div>'
    grid += '</li>'
    grid += '</ul>'

    
  })
  return grid
}

Util.handleError = function (fn) {
  return function (req, res, next) {
    fn(req, res, next).catch(next)
  }
}
Util.checkJWTToken = (req, res, next) => {
  if (req.cookies.jwt) {
   jwt.verify(
    req.cookies.jwt,
    process.env.ACCESS_TOKEN_SECRET,
    function (err, accountData) {
     if (err) {
      req.flash("Please log in")
      res.clearCookie("jwt")
      return res.redirect("/account/login")
     }
     res.locals.accountData = accountData
     res.locals.loggedin = 1
     next()
    })
  } else {
   next()
  }
 }
 /* ****************************************
 *  Check Login
 * ************************************ */
 Util.checkLogin = (req, res, next) => {
  if (res.locals.loggedin) {
    next()
  } else {
    req.flash("notice", "Please log in.")
    return res.redirect("/account/login")
  }
 }
 


 Util.buildByClassificationList = async function () {
  let data = await invModel.getClassifications()
  console.log(data.rows[0].classification_id)
  console.log("fdshdfs")
  let list = '<select name="classificationList" class="classificationList" required>'
  list += '<option value="">Select a classification</option>'
  data.rows.forEach((row) => {
    list += '<option value="' + row.classification_id + '">' + row.classification_name + '</option>'
  })
  list += '</select>'
  return list
}
Util.checkAccountType = async function (req, res, next) {
  if (res.locals.accountData.account_type === "Admin" || res.locals.accountData.account_type === "Employee") {
    next()
  } else {
    res.status(403).send("Access Denied")
  }
}


module.exports = Util