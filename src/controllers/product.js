import * as productService from '../services/product.js';

export async function getProductInfoById(req, res) {
  const { id } = req.params;
  const productInfo = await productService.getProductInfoById(id);
  res.send(productInfo).status(200);
}

export async function getAllProducts(req, res) {
  if (Object.keys(req.query).length > 0) {
    const category = Object.keys(req.query)[0];
    if (!productService.categoryIsKnown(category)) {
      return res.sendStatus(400);
    }
    const productsData = await productService.getProductsFromCategory(req.query);
    return res.send(productsData).status(200);
  }

  const productsData = await productService.getAllProducts();
  return res.send(productsData).status(200);
}

export async function getAllCategories(req, res) {
  const categoriesData = await productService.getAllCategories();
  res.send(categoriesData).status(200);
}
