/* eslint-disable no-unused-vars */
import connection from '../database/database.js';

export async function getProductInfoById(id) {
  const product = await connection.query(`
    SELECT * FROM products
    WHERE id = $1;
  `, [id]);
  return product.rows;
}

export async function getProductsByMultipleIds(idArray) {
  let searchQuery = `
  SELECT * FROM products
    WHERE
  `;

  idArray.forEach((productId) => {
    searchQuery += ` id=${productId} OR`;
  });

  searchQuery = searchQuery.slice(0, -2);
  const products = await connection.query(searchQuery);
  return products.rows;
}

export async function getProductCategoriesById(id) {
  const categories = await connection.query(`
    SELECT categories.name, categories.type
    FROM categories
    JOIN product_category
    ON categories.id = product_category."category_id"
    JOIN products
    ON products.id = product_category."product_id"
    WHERE products.id=$1;
  `, [id]);

  return categories.rows;
}

export async function getProductImagesById(id) {
  const images = await connection.query(`
    SELECT product_image.perspective, product_image.url
    FROM product_image
    JOIN products
    ON product_image.product_id=products.id
    WHERE products.id=$1;
  `, [id]);

  return images.rows;
}

export async function getAllProducts({ category, value }) {
  const params = [];
  let query = `
  SELECT final_result.*, 
  product_image.url, products.value FROM crosstab(
    'SELECT product_category.product_id, categories.type, categories.name 
    FROM product_category 
    JOIN categories ON category_id=categories.id 
    ORDER BY 1,2'
  ) 
  AS final_result(
    id INTEGER, brand TEXT, capacity TEXT, color TEXT, model TEXT
  ) 
  JOIN product_image 
  ON final_result.id=product_image.product_id 
  JOIN products 
  ON final_result.id=products.id 
  WHERE product_image.perspective='front'
  `;
  if (category) {
    query += `AND (${category}) LIKE ('%' || $1);`;
    params.push(value);
  }
  const products = await connection.query(`${query};`, params);
  return products.rows;
}

export async function getAllCategories() {
  const categories = await connection.query(`
    SELECT 
      categories.type AS "type",
      array_agg(categories.name) AS "names"
    FROM 
      categories
    GROUP BY 
      categories.type;
  `);
  return categories.rows;
}
