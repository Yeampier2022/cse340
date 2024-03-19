const pool = require("../database/")

async function addClassification(classification_name){
    try {
      const sql = "INSERT INTO classification (classification_name) VALUES ($1) RETURNING *"
      return await pool.query(sql, [classification_name])
    } catch (error) {
      return error.message
    }
  }

  async function checkExistingClassification(classification_name){
    try {
      const sql = "SELECT * FROM classification WHERE classification_name = $1"
      const classification = await pool.query(sql, [classification_name])
      return classification.rowCount
    } catch (error) {
      return error.message
    }
  }
  async function getClassifications() {
    try {
      const sql = "SELECT classification_id, classification_name FROM classification"
      return await pool.query(sql)
    } catch (error) {
      return error.message
    }
  }



module.exports = { addClassification, getClassifications,  checkExistingClassification}