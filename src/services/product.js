/* eslint-disable no-unused-vars */
import joi from 'joi';
import * as productRepository from '../repositories/product';

export async function getProductInfoById(id) {
  const productInfo = productRepository.getProductInfoById(id);
  return productInfo;
}

export async function product2() {
  //
}
