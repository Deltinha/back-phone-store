/* eslint-disable no-undef */
import '../src/setup';
import supertest from 'supertest';
import bcrypt from 'bcrypt';
import app from '../src/app';
import connection from '../src/database/database';

describe('POST /register', () => {
  afterEach(async () => {
    await connection.query('DELETE FROM users;');
  });

  it('returns 201 for valid params', async () => {
    const body = {
      firstName: 'user',
      lastName: 'da silva',
      email: 'user@gmail.com',
      password: '145236',
      cep: '44380000',
      state: 'BA',
      city: 'Cruz das Almas',
      neighborhood: 'Centro',
      street: 'Av. Belém',
      addressNumber: '52',
      complement: 'ap 24',
      cpf: '78985275391',
      phoneNumber: '78468152384',
    };

    const result = await supertest(app).post('/register').send(body);
    expect(result.status).toEqual(201);
  });

  it('returns 400 for invalid joi validation', async () => {
    const body = {
      firstName: 'user',
      lastName: 'da silva',
      email: 'user@gmail.com',
      password: '14536',
      cep: '44380-000',
      state: 'BA',
      city: 'Cruz das Almas',
      neighborhood: 'Centro',
      street: 'Av. Belém',
      addressNumber: '52',
      complement: 'ap 24',
      cpf: '7898527391',
      phoneNumber: '78468152384',
    };

    const result = await supertest(app).post('/register').send(body);
    expect(result.status).toEqual(400);
  });

  it('returns 403 for existent email', async () => {
    const body = {
      firstName: 'user',
      lastName: 'da silva',
      email: 'user@gmail.com',
      password: '145236',
      cep: '44380000',
      state: 'BA',
      city: 'Cruz das Almas',
      neighborhood: 'Centro',
      street: 'Av. Belém',
      addressNumber: '52',
      complement: 'ap 24',
      cpf: '78985275391',
      phoneNumber: '78468152384',
    };

    await connection.query(`
        INSERT INTO users
        (
            name, last_name, email, 
            password, cep, state, 
            city, neighborhood, street, 
            address_number, complement, cpf, phone_number
            )
        VALUES ('user', 'da silva', 'user@gmail.com', '145236', '44380-000', 'BA', 'Cruz das Almas', 'Centro', 'Av. BH', '52', 'ap 24', '78541296583', '789458261432')
    `);

    const result = await supertest(app).post('/register').send(body);
    expect(result.status).toEqual(403);
  });
});

describe('POST /login', () => {
  afterEach(async () => {
    await connection.query('DELETE FROM sessions;');
    await connection.query('DELETE FROM users;');
  });

  const hashedPass = bcrypt.hashSync('145236', 13);

  it('returns 200 for valid params', async () => {
    await connection.query(`
        INSERT INTO users
        (
            name, last_name, email, 
            password, cep, state, 
            city, neighborhood, street, 
            address_number, complement, cpf, phone_number
            )
        VALUES ('user', 'da silva', 'user@gmail.com', $1, '44380000', 'BA', 'Cruz das Almas', 'Centro', 'Av. BH', '52', 'ap 24', '78541296583', '789458261432')
    `, [hashedPass]);

    const result = await supertest(app).post('/login').send({
      email: 'user@gmail.com',
      password: '145236',
    });
    expect(result.status).toEqual(200);
  });

  it('returns 400 for invalid joi validation', async () => {
    const body = {
      email: 'user@gmail',
      password: '14536',
    };

    const result = await supertest(app).post('/login').send(body);
    expect(result.status).toEqual(400);
  });

  it('returns 403 for inexistent email or wrong password', async () => {
    const body = {
      email: 'user@gmail.com',
      password: '145236',
    };

    const result = await supertest(app).post('/login').send(body);
    expect(result.status).toEqual(401);
  });
});

afterAll(() => {
  connection.end();
});
