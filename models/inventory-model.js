const pool = require("../database/")

/* ***************************
 *  Get all classification data
 * ************************** */
async function getClassifications() {
  return await pool.query("SELECT * FROM public.classification ORDER BY classification_name")

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

async function getInventoryById(inv_id) {
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


async function updateInventory(inv_id, classification_id, inv_model, inv_make, inv_description, inv_image, inv_thumbnail, inv_price, inv_year, inv_miles, inv_color) {

  try {
    const sql =
     `UPDATE public.inventory 
      SET classification_id = $1, inv_model = $2, inv_make = $3, inv_description = $4, inv_image = $5, inv_thumbnail = $6, inv_price = $7, inv_year = $8, inv_miles = $9, inv_color = $10 WHERE inv_id = $11 RETURNING *`
      const data = await pool.query(sql, [classification_id, inv_model, inv_make, inv_description, inv_image, inv_thumbnail, inv_price, inv_year, inv_miles, inv_color, inv_id])
    return data.rows
  }
  catch (error) {
    console.error("updateInventory error " + error)
  }

}



module.exports = { getClassifications, updateInventory, getInventoryByClassificationId, getInventoryById, getInventoryDetailByCarId };