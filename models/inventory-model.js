const pool = require("../database/")

/* ***************************
 *  Get all classification data
 * ************************** */
async function getClassifications(){
  return await pool.query("SELECT * FROM public.classification ORDER BY classification_name")
  
}

async function checkExistingClassification(classification_name) {
  // try {
  //   const data = await pool.query(
  //     `SELECT * FROM public.classification WHERE classification_name = $1`,
  //     [classification_name]
  //   )

  //   return data.rows
  // } catch (error) {
  //   console.error("checkExistingClassification error " + error)
  // }
}
async function getInventoryByClassificationId(classification_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory AS i 
      JOIN public.classification AS c 
      ON i.classification_id = c.classification_id 
      WHERE i.classification_id = $1`,
      [classification_id]
    )

    return data.rows
  } catch (error) {
    console.error("getclassificationsbyid error " + error)
  }
}

async function getInventoryDetailByCarId(inv_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory AS i 
      JOIN public.classification AS c 
      ON i.classification_id = c.classification_id 
      WHERE i. inv_id = $1`,
      [inv_id]
    )

    return data.rows
  } catch (error) {
    console.error("getInventoryDetailByCarId error " + error)
  }
}

module.exports = {getClassifications, checkExistingClassification, getInventoryByClassificationId, getInventoryDetailByCarId};