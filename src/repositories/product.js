/* eslint-disable no-unused-vars */
import connection from '../database/database';

export async function getProductInfoById(id) {
  const product = await connection.query(`
  SELECT * FROM products
  WHERE id = $1;
  `, [id]);
  return product.rows;
}

export async function getAllProducts() {
  const products = await connection.query('SELECT * FROM products;');
  return products.rows;
}
