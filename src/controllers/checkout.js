/* eslint-disable import/prefer-default-export */
import * as checkoutService from '../services/checkout';

export async function postCheckout(req, res) {
  const cart = req.body;
  const isCartValid = checkoutService.checkIsCartValid(cart);
  if (isCartValid) return res.sendStatus(422);
  res.sendStatus(201);
}
