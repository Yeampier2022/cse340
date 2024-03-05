const pool = require("../database/")

async function addClassification(classification_name){
    try {
      const sql = "INSERT INTO classification (classification_name) VALUES ($1) RETURNING *"
      return await pool.query(sql, [classification_name])
    } catch (error) {
      return error.message
    }
  }


async function addInventory(classification_id, inv_make, inv_model, inv_description, inv_image, inv_thumball, inv_price, inv_year, inv_miles, inv_color){
    try {
      const sql = "INSERT INTO inventory (classification_id, inv_make, inv_model, inv_description, inv_image, inv_thumball, inv_price, inv_year, inv_miles, inv_color) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *"
        return await pool.query(sql, [classification_id, inv_make, inv_model, inv_description, inv_image, inv_thumball, inv_price, inv_year, inv_miles, inv_color])
    } catch (error) {
      return error.message
    }
  }

module.exports = { addClassification, addInventory}