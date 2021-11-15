/* eslint-disable import/prefer-default-export */
import * as checkoutService from '../services/checkout';
import * as userService from '../services/user';

export async function postCheckout(req, res) {
  const cart = req.body;
  const auth = req.headers.authorization;

  const isAuthValid = await checkoutService.checkIsAuthValid(auth);
  if (!isAuthValid) return res.sendStatus(401);

  const isCartValid = await checkoutService.checkIsCartValid(cart);
  if (!isCartValid) return res.sendStatus(400);

  const token = auth.replace('Bearer ', '');

  const isUserLoggedIn = await userService.checkUserLoggedIn(token);
  if (!isUserLoggedIn) return res.sendStatus(401);

  const userId = isUserLoggedIn.user_id;

  await checkoutService.insertPurcharse({ cart, userId });

  return res.sendStatus(201);
}
