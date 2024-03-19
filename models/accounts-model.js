const pool = require("../database/")



async function registerAccount(account_firstname, account_lastname, account_email, account_password) {
  try {
    const sql = "INSERT INTO account (account_firstname, account_lastname, account_email, account_password, account_type) VALUES ($1, $2, $3, $4, 'Client') RETURNING *"
    return await pool.query(sql, [account_firstname, account_lastname, account_email, account_password])
  } catch (error) {
    return error.message
  }
}


/* **********************
*   Check for existing email
* ********************* */
async function checkExistingEmail(account_email) {
  try {
    const sql = "SELECT * FROM account WHERE account_email = $1"
    const email = await pool.query(sql, [account_email])
    return email.rowCount
  } catch (error) {
    return error.message
  }
}

/*
*
* check if account_email and account_password exists in the database 
* */

async function getAccountByEmail(account_email, account_password) {
  try {
    const result = await pool.query(
      'SELECT account_id, account_firstname, account_lastname, account_email, account_type, account_password FROM account WHERE account_email = $1',
      [account_email]
    );
    return result.rows[0];
  } catch (error) {
    return new Error("No matching email found");
  }
}

async function updateAccount(account_id, account_firstname, account_lastname, account_email, account_password) {
  try {
    const sql = "UPDATE account SET account_firstname = $1, account_lastname = $2, account_email = $3, account_password = 4$ WHERE account_id = $5"
    return await pool.query(sql, [account_firstname, account_lastname, account_email, account_password, account_id])
  } catch (error) {
    return error.message
  }
}

async function changePassword(account_id, account_password) {
  try {
    const sql = "UPDATE account SET account_password = $1 WHERE account_id = $2"
    return await pool.query(sql, [account_password, account_id])
  } catch (error) {
    return error.message
  }
}
module.exports = { registerAccount, updateAccount, changePassword, checkExistingEmail, getAccountByEmail };

