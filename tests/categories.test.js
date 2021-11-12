/* eslint-disable no-undef */
import '../src/setup';
import supertest from 'supertest';
import app from '../src/app';
import connection from '../src/database/database';

describe('Categories test suit', () => {
  let productId;
  let categoriesIdList;

  beforeAll(async () => {
    await connection.query('DELETE FROM product_category;');
    await connection.query('DELETE FROM products;');
    await connection.query('DELETE FROM categories;');

    productId = await connection.query(
      `INSERT INTO products 
      ("value") 
      VALUES
      (129900),
      (857900)
      RETURNING id;`,
    );

    categoriesIdList = await connection.query(
      `INSERT INTO categories 
      ("name", "type") 
      VALUES 
      ('One Hyper', 'model'),
      ('Motorola', 'brand'),
      ('#E4BDC2', 'color'),
      ('128GB', 'capacity'),
      ('Galaxy Fold', 'model'),
      ('Samsung', 'brand'),
      ('#000000', 'color'),
      ('512GB', 'capacity'),
      ('#FFFFFF', 'color'),
      ('iPhone', 'brand'),
      ('Lenovo', 'brand'),
      ('8', 'model'),
      ('256GB', 'capacity')
      RETURNING id;`,
    );

    await connection.query(
      `INSERT INTO product_category 
      ("product_id", "category_id") 
      VALUES 
      (${productId.rows[0].id}, ${categoriesIdList.rows[0].id}),
      (${productId.rows[0].id}, ${categoriesIdList.rows[1].id}),
      (${productId.rows[0].id}, ${categoriesIdList.rows[2].id}),
      (${productId.rows[0].id}, ${categoriesIdList.rows[3].id}),
      (${productId.rows[1].id}, ${categoriesIdList.rows[4].id}),
      (${productId.rows[1].id}, ${categoriesIdList.rows[5].id}),
      (${productId.rows[1].id}, ${categoriesIdList.rows[6].id}),
      (${productId.rows[1].id}, ${categoriesIdList.rows[7].id})
      ;`,
    );

    await connection.query(
      `INSERT INTO product_image
      ("url","product_id", "perspective")
      VALUES
      ('image.jpg', ${productId.rows[0].id}, 'front'),
      ('image.jpg', ${productId.rows[1].id}, 'front')
      `,
    );
  });

  afterAll(async () => {
    await connection.query('DELETE FROM product_category;');
    await connection.query('DELETE FROM product_image;');
    await connection.query('DELETE FROM products;');
    await connection.query('DELETE FROM categories;');
  });

  it('returns 200 for get on /categories', async () => {
    const categories = await supertest(app).get('/categories');
    expect(categories.status).toEqual(200);
  });

  it('return only products from selected categorie', async () => {
    const products = await supertest(app).get('/products?brand=Samsung');
    console.log(products.body);
    expect(products.status).toEqual(200);
    expect(products.body.length).toEqual(1);
    expect(products.body[0].brand).toEqual('Samsung');
  });
});

afterAll(() => {
  connection.end();
});
