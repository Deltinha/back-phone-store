/* eslint-disable import/prefer-default-export */
import validadeCheckoutSyntax from '../schemas/checkoutSchema';
import validateBearerToken from '../schemas/authorizationSchema';
import * as checkoutRepository from '../repositories/checkout';
import * as productRepository from '../repositories/product';

export async function checkIsCartValid(cart) {
  const isSyntaxValid = validadeCheckoutSyntax(cart);
  const idArray = [];
  cart.forEach((product) => {
    idArray.push(product.productId);
  });

  const productsRef = await productRepository.getProductsByMultipleIds(idArray);
  console.log(productsRef);

  if (!isSyntaxValid || productsRef.length !== cart.length) return false;

  cart.forEach((item, index) => {
    Object.assign(item, productsRef[index]);
  });

  return cart;
}

export async function checkIsAuthValid(bearerToken) {
  if (bearerToken === undefined) return false;
  const isAuthValid = validateBearerToken(bearerToken);
  return isAuthValid;
}

export async function insertPurcharse({ cart, userId }) {
  let value = 0;

  cart.forEach((item) => {
    value += item.value * item.qty;
  });

  const purchases = await checkoutRepository.insertPurcharse({ cart, userId, value });
  return purchases;
}
