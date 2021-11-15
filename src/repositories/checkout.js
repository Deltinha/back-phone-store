/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/prefer-default-export */
import connection from '../database/database';

export async function insertPurcharse({ cart, userId, value }) {
  let purchaseId = 0;
  let insertQuery = `
    INSERT INTO product_purchase
     (product_id, purchase_id, quantity, value)
    VALUES
  `;

  const purchase = await connection.query(`
    INSERT INTO purchases
      (user_id, value)
    VALUES
      (${userId}, ${value})
    RETURNING
      id;
  `);

  purchaseId = purchase.rows[0].id;

  cart.forEach((item) => {
    insertQuery += `(
      ${item.productId},
      ${purchaseId},
      ${item.qty},
      ${item.value}
    ),`;
  });

  insertQuery = insertQuery.slice(0, -1);

  await connection.query(insertQuery);
}
