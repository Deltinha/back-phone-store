/* eslint-disable no-unused-vars */
import joi from 'joi';
import * as productService from '../services/product';

export async function getProductInfoById(req, res) {
  try {
    const { id } = req.params;
    const productInfo = await productService.getProductInfoById(id);
    console.log(productInfo);
    res.send(productInfo).status(200);
  } catch (e) {
    console.log(e);
  }
}

export async function getAllProducts(req, res) {
  try {
    const productsData = await productService.getAllProducts();
    res.send(productsData).status(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}
