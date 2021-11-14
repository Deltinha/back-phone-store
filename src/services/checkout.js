/* eslint-disable import/prefer-default-export */
import validadeCheckout from '../schemas/checkoutSchema';

export async function checkIsCartValid(cart) {
  const isValidCart = validadeCheckout(cart);
  return isValidCart;
}
