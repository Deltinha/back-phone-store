import * as productRepository from '../repositories/product.js';

export async function getProductInfoById(id) {
  const productInfo = await productRepository.getProductInfoById(id);
  let productCategories = await productRepository.getProductCategoriesById(id);
  const productImages = await productRepository.getProductImagesById(id);

  const { description, value } = productInfo[0];

  productCategories = productCategories.map((c) => ({ [c.type]: c.name }));
  productCategories = Object.assign({}, ...productCategories);

  const product = {
    id,
    description,
    value,
    ...productCategories,
    productImages,
  };

  return product;
}

export async function getAllProducts() {
  const productsData = await productRepository.getAllProducts();
  return productsData;
}

export async function getAllCategories() {
  const categoriesData = await productRepository.getAllCategories();
  return categoriesData;
}

export async function getProductsFromCategory(query) {
  const category = Object.keys(query)[0];
  const value = Object.values(query)[0];
  const productsData = await productRepository.getProductsFromCategorie({ category, value });
  return productsData;
}
