import * as productRepository from "../repositories/product.js";

export async function getAllProducts() {
  const productsData = await productRepository.getAllProducts();
  return productsData;
}
