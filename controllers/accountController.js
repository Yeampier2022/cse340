const utilities = require("../utilities/")
const bcrypt = require("bcryptjs")

const accountModel = require("../models/accounts-model")

async function buildLogin(req, res, next) {
  let nav = await utilities.getNav()
  res.render("account/login", {
    title: "Login",
    nav,
  })
}

async function buildManagement() {
  let nav = await utilities.getNav()
  res.render("inventory/management", {
    title: "Management Account",
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



  let hasdhedPassword = await bcrypt.hash(account_password, 10)

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
    account_password
  )

  if (regResult) {

    console.log(regResult.rows[0]);
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


async function loginAccount(req, res) {
  let nav = await utilities.getNav()
  const { account_email, account_password } = req.body

  const loginResult = await accountModel.loginAccount(account_email, account_password)
  if (loginResult && loginResult.rowCount > 0) {
    req.session.account = loginResult
    req.flash("notice", `Welcome New, ${loginResult.rows[0].account_firstname}.`)
    res.status(200).render("account/management", {
      title: "Management Account",
      nav,
    })
  } else {
    console.log(
      "Sorry, the login failed. Please check your email and password."
    );
    req.flash("notice", "Sorry, the login failed.")
    res.status(501).render("account/login", {
      title: "Login",
      nav,
      errors: "Login failed.",
    })
  }

  try {
    if (await bcrypt.compare(account_password, accountData.account_password)) {
    delete accountData.account_password
    const accessToken = jwt.sign(accountData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 3600 * 1000 })
    res.cookie("jwt", accessToken, { httpOnly: true, maxAge: 3600 * 1000 })
    return res.redirect("/account/")
    }
   } catch (error) {
    return new Error('Access Forbidden')
   }
}


module.exports = { buildLogin, buildRegister, registerAccount, buildManagement, loginAccount }