import express from 'express';
import cors from 'cors';

import * as productController from './controllers/product';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/product/:id', productController.getProductInfoById);

// eslint-disable-next-line no-unused-vars
app.use((error, request, response, next) => {
  console.log({ error, request, response });
  return response.sendStatus(500);
});

export default app;
