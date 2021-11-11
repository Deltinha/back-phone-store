/* eslint-disable no-unused-vars */
import connection from '../database/database.js';

export async function getProductInfoById(id) {
  const product = await connection.query(
    `
    SELECT final_result.*, product_image.url, products.value FROM crosstab('SELECT product_category.product_id, categories.type, categories.name FROM product_category JOIN categories ON category_id=categories.id ORDER BY 1,2') AS final_result(id INTEGER, brand TEXT, capacity TEXT, color TEXT, model TEXT) JOIN product_image ON final_result.id=product_image.product_id JOIN products ON final_result.id=products.id WHERE product_image.perspective='front' AND final_result.id=$1;
  `,
    [id],
  );
  return product.rows;
}

export async function getAllProducts() {
  const products = await connection.query(`
  SELECT final_result.*, product_image.url, products.value FROM crosstab('SELECT product_category.product_id, categories.type, categories.name FROM product_category JOIN categories ON category_id=categories.id ORDER BY 1,2') AS final_result(id INTEGER, brand TEXT, capacity TEXT, color TEXT, model TEXT) JOIN product_image ON final_result.id=product_image.product_id JOIN products ON final_result.id=products.id WHERE product_image.perspective='front';
  `);
  return products.rows;
}
