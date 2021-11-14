/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/prefer-default-export */
import connection from '../database/database';

export async function insertPurcharse({ cart, userId, value }) {
  let purchaseId = 0;
  const purchase = await connection.query(`
    INSERT INTO purchases
      (user_id, value)
    VALUES
      (${userId}, ${value})
    RETURNING
      id;
  `);

  purchaseId = purchase.rows[0].id;

  for (const item of cart) {
    await connection.query(`
      INSERT INTO product_purchase
       (product_id, purchase_id, quantity, value)
      VALUES
       ($1, ${purchaseId}, $2, ${value});
    `, [item.productId, item.qty]);
  }
  return cart;
}
