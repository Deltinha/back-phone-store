/* eslint-disable no-unused-vars */
import * as productRepository from '../repositories/product.js';

export async function getProductInfoById(id) {
  const productInfo = await productRepository.getProductInfoById(id);
  return productInfo;
}

export async function getAllProducts() {
  const productsData = await productRepository.getAllProducts();
  return productsData;
}

export async function getAllCategories() {
  const categoriesData = await productRepository.getAllCategories();
  return categoriesData;
}

export async function getProductsFromCategorie(query) {
  const categorie = Object.keys(query)[0];
  const value = Object.values(query)[0];
  const productsData = await productRepository.getProductsFromCategorie({ categorie, value });
  return productsData;
}
