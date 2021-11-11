/* eslint-disable no-undef */
import '../src/setup';
import supertest from 'supertest';
import app from '../src/app';
import connection from '../src/database/database';

describe('List products test suit', () => {
  beforeEach(async () => {
    await connection.query(
      `INSERT INTO products 
      ("model","brand","color","value","capacity") 
      VALUES ('One Hyper', 'Motorola', 'Blue', 129900, '128GB');`,
    );
  });
  afterAll(async () => {
    await connection.query('DELETE FROM product_image;');
    await connection.query('DELETE FROM products;');
  });
  it("returns 200 for get on '/product'", async () => {
    const result = await supertest(app).get('/products');
    expect(result.status).toEqual(200);
  });
});

describe('Get product by id test suit', () => {
  let productId;
  let categoriesIdList;

  beforeEach(async () => {
    productId = await connection.query(
      `INSERT INTO products 
      ("value") 
      VALUES (129900)
      RETURNING id;`,
    );
    productId = productId.rows[0].id;

    categoriesIdList = await connection.query(
      `INSERT INTO categories 
      ("name", "type") 
      VALUES 
      ('One Hyper', 'model'),
      ('Motorola', 'brand'),
      ('Blue', 'color'),
      ('128GB', 'capacity')
      RETURNING id;`,
    );

    await connection.query(
      `INSERT INTO product_category 
      ("product_id", "category_id") 
      VALUES 
      (${productId}, ${categoriesIdList.rows[0].id}),
      (${productId}, ${categoriesIdList.rows[1].id}),
      (${productId}, ${categoriesIdList.rows[2].id}),
      (${productId}, ${categoriesIdList.rows[3].id});`,
    );
  });

  afterAll(async () => {
    await connection.query('DELETE FROM products, categories, product_category;');
  });

  it("returns 200 for get on '/product/:id'", async () => {
    const result = await supertest(app).get(`/products/${productId}`);
    expect(result.status).toEqual(200);
  });
});

afterAll(() => {
  connection.end();
});
