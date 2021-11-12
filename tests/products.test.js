/* eslint-disable no-undef */
import '../src/setup';
import supertest from 'supertest';
import app from '../src/app';
import connection from '../src/database/database';

describe('List products test suit', () => {
  beforeEach(async () => {
    await connection.query(
      'INSERT INTO products ("model","brand","color","value","capacity") VALUES (\'One Hyper\', \'Motorola\', \'Blue\', 129900, \'128GB\');',
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
  beforeEach(async () => {
    await connection.query(
      'INSERT INTO products ("model","brand","color","value","capacity") VALUES (\'One Hyper\', \'Motorola\', \'Blue\', 129900, \'128GB\');',
    );
  });
  afterAll(async () => {
    await connection.query('DELETE FROM products;');
  });
  it("returns 200 for get on '/products/:id'", async () => {
    const result = await supertest(app).get('/products/1');
    expect(result.status).toEqual(200);
  });
});

afterAll(() => {
  connection.end();
});
