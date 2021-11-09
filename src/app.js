import "../src/setup.js";
import express from "express";
import cors from "cors";

import * as productController from "./controllers/product.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/product", productController.getAllProducts);

export default app;
