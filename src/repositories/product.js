/* eslint-disable no-unused-vars */
import connection from '../database/database.js';

export async function getProductInfoById(id) {
  const product = await connection.query(
    `
  SELECT * FROM products
  WHERE id = $1;
  `,
    [id],
  );
  return product.rows;
}

export async function getAllProducts() {
  const products = await connection.query(`
  SELECT products.*, product_image.url as "imageUrl" FROM products JOIN product_image ON product_image."product_id"=products."id" WHERE "perspective"='front';
  `);
  return products.rows;
}
