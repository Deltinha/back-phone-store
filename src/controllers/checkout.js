/* eslint-disable import/prefer-default-export */
import * as checkoutService from '../services/checkout';

export async function postCheckout(req, res) {
  const cart = req.body;
  const auth = req.headers.authorization;

  const isAuthValid = await checkoutService.checkIsAuthValid(auth);
  if (!isAuthValid) return res.sendStatus(401);

  const isCartValid = await checkoutService.checkIsCartValid(cart);
  if (!isCartValid) return res.sendStatus(400);

  return res.send(req.headers).status(200);
}
