/* eslint-disable import/prefer-default-export */
import validadeCheckout from '../schemas/checkoutSchema';
import validateBearerToken from '../schemas/authorizationSchema';

export async function checkIsCartValid(cart) {
  const isCartValid = validadeCheckout(cart);
  return isCartValid;
}

export async function checkIsAuthValid(bearerToken) {
  if (bearerToken === undefined) return false;
  const isAuthValid = validateBearerToken(bearerToken);
  return isAuthValid;
}

export async function insertPurcharse(cart) {
  const {
    userId,
    products,
  } = cart;
  return true;
}
