/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import '../src/setup';
import supertest from 'supertest';
import { v4 as uuid } from 'uuid';
import bcrypt from 'bcrypt';
import app from '../src/app';
import connection from '../src/database/database';

let userId;
let productId;
let categoriesIdList;
const token = uuid();

beforeAll(async () => {
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
      ('512GB', 'capacity')
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
      ;`,
  );

  const hashedPass = bcrypt.hashSync('145236', 13);

  userId = await connection.query(`
    INSERT INTO users
    (
        name, last_name, email, 
        password, cep, state, 
        city, neighborhood, street, 
        address_number, complement, cpf, phone_number
        )
    VALUES ('user', 'da silva', 'user@gmail.com', $1, '44380000', 'BA', 'Cruz das Almas', 'Centro', 'Av. BH', '52', 'ap 24', '78541296583', '789458261432')
    RETURNING id;
  ;`, [hashedPass]);

  await connection.query(`
    INSERT INTO sessions
    (
      user_id, token
    )
    VALUES
    (
      ${userId.rows[0].id}, '${token}'
    )
  `);
});

describe('Checkout test suit', () => {
  it('returns 201 for valid params', async () => {
    const body = [
      {
        productId: productId.rows[0].id,
        qty: 1,
      },
      {
        productId: productId.rows[1].id,
        qty: 2,
      },
    ];

    const result = await supertest(app).post('/checkout').send(body).set('Authorization', `Bearer ${token}`);
    expect(result.status).toEqual(201);
  });

  it('returns 400 for invalid product', async () => {
    const body = [
      {
        productId: 1337,
        qty: 1,
      },
    ];

    const result = await supertest(app).post('/checkout').send(body).set('Authorization', `Bearer ${token}`);
    expect(result.status).toEqual(400);
  });

  it('returns 400 for invalid params', async () => {
    const firstBody = [
      {
        qty: 1,
      },
    ];
    const secondBody = [
      {
        productId: productId.rows[0].id,
      },
    ];

    let result = await supertest(app).post('/checkout').send(firstBody).set('Authorization', `Bearer ${token}`);
    expect(result.status).toEqual(400);

    result = await supertest(app).post('/checkout').send(secondBody).set('Authorization', `Bearer ${token}`);
    expect(result.status).toEqual(400);
  });

  it('returns 401 for invalid headers', async () => {
    const body = [
      {
        productId: productId.rows[0].id,
        qty: 1,
      },
    ];

    let result = await supertest(app).post('/checkout').send(body).set('Authorization', `Bearer token123`);
    expect(result.status).toEqual(401);

    result = await supertest(app).post('/checkout').send(body).set('Authorization', `${token}`);
    expect(result.status).toEqual(401);

    result = await supertest(app).post('/checkout').send(body).set('Authorization', `Super ${token}`);
    expect(result.status).toEqual(401);

    result = await supertest(app).post('/checkout').send(body).set('Authorization', `${uuid()}`);
    expect(result.status).toEqual(401);
  });

  it('returns 401 fpr user not logged in', async () => {
    const body = [
      {
        productId: productId.rows[0].id,
        qty: 1,
      },
      {
        productId: productId.rows[1].id,
        qty: 2,
      },
    ];

    const result = await supertest(app).post('/checkout').send(body).set('Authorization', `Bearer ${uuid()}`);
    expect(result.status).toEqual(401);
  });
});

afterAll(async () => {
  await connection.query('DELETE FROM product_category;');
  await connection.query('DELETE FROM product_image;');
  await connection.query('DELETE FROM product_purchase;');
  await connection.query('DELETE FROM purchases;');
  await connection.query('DELETE FROM products;');
  await connection.query('DELETE FROM categories;');
  await connection.query('DELETE FROM sessions;');
  await connection.query('DELETE FROM users;');
  connection.end();
});
