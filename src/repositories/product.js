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
  SELECT products.*, product_image.url as "imageUrl", categories."type", categories."name" FROM products JOIN product_image ON product_image."product_id"=products."id" JOIN product_category ON product_category."product_id"=products."id" JOIN categories ON categories."id"=product_category."category_id";
  `);
  return products.rows;
}
