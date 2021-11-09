import * as productService from "../services/product.js";

export async function getAllProducts(req, res) {
  try {
    const productsData = await productService.getAllProducts();
    res.send(productsData).status(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}
