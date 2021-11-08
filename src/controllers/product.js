/* eslint-disable no-unused-vars */
import joi from 'joi';
import * as productService from '../services/product';

export async function getProductInfoById(req, res) {
  try {
    const { id } = req.params;
    const productInfo = productService.getProductInfoById(id);
    console.log(productInfo);
    res.status(200).send(productInfo);
  } catch (e) {
    console.log(e);
  }
}

export async function product2() {
//
}
