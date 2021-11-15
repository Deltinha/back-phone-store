import './setup.js';
import express from 'express';
import cors from 'cors';

import * as productController from './controllers/product';
import * as userController from './controllers/user';
import * as checkoutController from './controllers/checkout';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/products', productController.getAllProducts);

app.get('/products/:id', productController.getProductInfoById);

app.post('/register', userController.postNewUser);

app.post('/login', userController.login);

app.get('/categories', productController.getAllCategories);

app.post('/checkout', checkoutController.postCheckout);

app.get('/health', (req, res) => res.sendStatus(200));

// eslint-disable-next-line no-unused-vars
app.use((error, request, response, next) => {
  console.log({ error, request, response });
  return response.sendStatus(500);
});

export default app;
