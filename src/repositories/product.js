/* eslint-disable no-unused-vars */
import connection from '../database/database';

export async function getProductInfoById(id) {
  const product = connection.query(`
  SELECT * FROM products
  WHERE id = $'
  `, [id]);
  return product.rows;
}

export async function product2() {
  //
}
