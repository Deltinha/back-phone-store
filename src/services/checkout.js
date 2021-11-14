/* eslint-disable import/prefer-default-export */
import validadeCheckoutSyntax from '../schemas/checkoutSchema';
import validateBearerToken from '../schemas/authorizationSchema';
import * as checkoutRepository from '../repositories/checkout';
import * as productRepository from '../repositories/product';

export async function checkIsCartValid(cart) {
  const isSyntaxValid = validadeCheckoutSyntax(cart);
  let allProductsExist = true;

  await Promise.all(cart.map(async (item) => {
    const product = await productRepository.getProductInfoById(item.productId);
    if (product.length === 0) {
      allProductsExist = false;
    }
  }));

  if (isSyntaxValid && allProductsExist) return true;
  return false;
}

export async function checkIsAuthValid(bearerToken) {
  if (bearerToken === undefined) return false;
  const isAuthValid = validateBearerToken(bearerToken);
  return isAuthValid;
}

export async function insertPurcharse({ cart, userId }) {
  let value = 0;
  const productsRef = [];

  await Promise.all(cart.map(async (item) => {
    const product = await productRepository.getProductInfoById(item.productId);
    if (product[0]) {
      productsRef.push(product[0]);
    }
  }));

  cart.forEach((item, index) => {
    Object.assign(item, productsRef[index]);
  });

  cart.forEach((item) => {
    value += item.value * item.qty;
  });

  const purchases = await checkoutRepository.insertPurcharse({ cart, userId, value });
  return purchases;
}
