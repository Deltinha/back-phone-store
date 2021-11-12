import connection from '../database/database';

export async function insertUser(userInfo) {
  const {
    firstName,
    lastName,
    email,
    hashedPass,
    cep,
    state,
    city,
    neighborhood,
    street,
    addressNumber,
    complement,
    cpf,
    phoneNumber,
  } = userInfo;
  connection.query(`
        INSERT INTO users
        (
            name, last_name, email, 
            password, cep, state, 
            city, neighborhood, street, 
            address_number, complement, cpf, phone_number
            )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
    `, [firstName, lastName, email,
    hashedPass, cep, state,
    city, neighborhood, street,
    addressNumber, complement, cpf, phoneNumber]);
}

export async function getUserByEmail(email) {
  const user = await connection.query(`
        SELECT * FROM users
        WHERE email=$1
    `, [email]);
  return user.rows.length;
}
