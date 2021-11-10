/* eslint-disable no-unused-vars */
import joi from 'joi';
import * as productService from '../services/product.js';

export async function getProductInfoById(req, res) {
  const { id } = req.params;
  const productInfo = await productService.getProductInfoById(id);
  res.send(productInfo).status(200);
}

export async function getAllProducts(req, res) {
  const productsData = await productService.getAllProducts();
  res.send(productsData).status(200);
}
