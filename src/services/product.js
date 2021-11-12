// import joi from 'joi';
import * as productRepository from '../repositories/product.js';

export async function getProductInfoById(id) {
  const productInfo = await productRepository.getProductInfoById(id);
  let productCategories = await productRepository.getProductCategoriesById(id);

  const { description, value } = productInfo[0];

  productCategories = productCategories.map((c) => ({ [c.type]: c.name }));
  productCategories = Object.assign({}, ...productCategories);

  const product = {
    id,
    description,
    value,
    ...productCategories,
  };

  return product;
}

export async function getAllProducts() {
  const productsData = await productRepository.getAllProducts();
  return productsData;
}
