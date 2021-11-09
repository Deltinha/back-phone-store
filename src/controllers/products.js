import connection from "../../database/database.js";

async function getProducts(req, res) {
  try {
    const result = await connection.query("SELECT * FROM products;");
    res.send(result.rows).status(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export { getProducts };
