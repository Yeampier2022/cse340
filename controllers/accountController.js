const utilities = require("../utilities/")
const bcrypt = require("bcryptjs")

const accountModel = require("../models/accounts-model")
const jwt = require("jsonwebtoken")
require("dotenv").config()

async function accountManagement(req, res, next) {
  let nav = await utilities.getNav()
  res.render("account/management", {
    title: "Account Management",
    nav,
    errors: null,
    
  })
}

async function buildLogin(req, res, next) {
  let nav = await utilities.getNav()
  res.render("account/login", {
    title: "Login",
    nav,
  })
}

async function buildRegister(req, res, next) {
  let nav = await utilities.getNav()
  res.render("account/register", {
    title: "Register",
    nav,
    errors: null,
  })

}
async function registerAccount(req, res) {
  let nav = await utilities.getNav()
  const { account_firstname, account_lastname, account_email, account_password } = req.body



  let hasdhedPassword
  try {
    hasdhedPassword = await bcrypt.hash(account_password, 10)
  }
  catch (err) {
    req.flash("notice", "Sorry, the registration failed.")

    res.status(501).render("account/register"), {
      title: "Registration",
      nav,
    }
  }
  const regResult = await accountModel.registerAccount(
    account_firstname,
    account_lastname,
    account_email,
    hasdhedPassword
  )

  if (regResult) {

    req.flash(
      "notice",
      `Congratulations, you\'re registered ${account_firstname}. Please log in.`
    )
    res.status(201).render("account/login", {
      title: "Login",
      nav,
    })
  } else {
    req.flash("notice", "Sorry, the registration failed.")
    res.status(501).render("account/register", {
      title: "Registration",
      nav,
      errors: "Registration failed.",
    })
  }
}

async function changePassword(req, res) {
  let nav = await utilities.getNav()
  const { account_id, account_password } = req.body
  let hasdhedPassword
  try {
    hasdhedPassword = await bcrypt.hash(account_password, 10)
  }
  catch (err) {
    req.flash("notice", "Sorry, the password change failed.")
    res.status(501).render("account/change-password", {
      title: "Change Password",
      nav,
      errors: "Password change failed.",
    })
  }
  const changeResult = await accountModel.changePassword(account_id, hasdhedPassword)
  if (changeResult) {
    req.flash("notice", `The password was successfully changed.`)
    res.redirect("/account"), {
      title: "Account Management",
      nav,
      errors: null,
    }
  } else {
    req.flash("notice", "Sorry, the password change failed.")
    res.status(501).render("account/change-password", {
      title: "Change Password",
      nav,
      errors: "Password change failed.",
    })
  }
}
async function logout(req, res) {
  try {
    res.clearCookie("jwt")
    res.clearCookie("sessionId")
    req.flash("notice", "You are now logged out.")
    res.redirect("/") 
  } catch (error) {
    res.status(500).send("Internal server error")
  }
}

async function accountLogin(req, res) {
  let nav = await utilities.getNav()
  const { account_email, account_password } = req.body
  const accountData = await accountModel.getAccountByEmail(account_email)
  if (!accountData) {
   req.flash("notice", "Please check your credentials and try again.")
   res.status(400).render("account/login", {
    title: "Login",
    nav,
    errors: null,
    account_email,
   })
  return
  }
  try {
   if (await bcrypt.compare(account_password, accountData.account_password)) {
   delete accountData.account_password
   const accessToken = jwt.sign(accountData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 3600 })
   if(process.env.NODE_ENV === 'development') {
     res.cookie("jwt", accessToken, { httpOnly: true, maxAge: 3600 * 1000 })
     } else {
       res.cookie("jwt", accessToken, { httpOnly: true, secure: true, maxAge: 3600 * 1000 })
     }
   return res.redirect("/account/"), {
    title: "Account Management",
      nav,
      accountData: accountData.account_firstname,
    }
   }
  } catch (error) {
   return new Error('Access Forbidden')
  }
 }




 async function buildUpdateAccount(req, res, next) {
  let nav = await utilities.getNav()
  const account_id = parseInt(req.params.account_id)
  const invData = await accountModel.getAccountId(account_id)
  const itemName = invData.rows[0].account_firstname + " " + invData.rows[0].account_lastname
  res.render(`account/update`, {
    title: "Update Account " + itemName,
    nav,
    errors: null,
    account_id: invData.rows[0].account_id,
    account_firstname: invData.rows[0].account_firstname,
    account_lastname: invData.rows[0].account_lastname,
    account_email: invData.rows[0].account_email,
  })
}

 async function updateAccount(req, res) {
  let nav = await utilities.getNav()
  const { account_id, account_firstname, account_lastname, account_email } = req.body
  const updateResult = await accountModel.updateAccount(
    Number(account_id),
    String(account_firstname),
    String(account_lastname),
    String(account_email),
  )

  if (updateResult) {
    req.flash("notice", `The account was successfully updated.`)
    res.redirect("/account"), {
      title: "Account Management",
      errors: null,
    }
  } else {
    const itemName = `${account_firstname} ${account_lastname}`
    req.flash("notice", "Sorry, the update failed.")
    res.status(501).render("account/update", {
      title: "Update " + itemName,
      nav,
      errors: null,
      account_id,
      account_firstname,
      account_lastname,
      account_email,
    })
  }
}


module.exports = { buildLogin,updateAccount, logout,  changePassword, buildUpdateAccount, buildRegister, registerAccount, accountLogin, accountManagement }