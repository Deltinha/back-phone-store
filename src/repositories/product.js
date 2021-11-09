import connection from "../../database/database.js";

export async function getAllProducts() {
  const products = await connection.query("SELECT * FROM products;");
  return products.rows;
}
