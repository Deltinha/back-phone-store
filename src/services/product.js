/* eslint-disable no-unused-vars */
import joi from 'joi';
import * as productRepository from '../repositories/product';

export async function getProductInfoById(id) {
  const productInfo = await productRepository.getProductInfoById(id);
  return productInfo;
}

export async function getAllProducts() {
  const productsData = await productRepository.getAllProducts();
  return productsData;
}
