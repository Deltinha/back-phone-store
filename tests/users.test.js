/* eslint-disable no-undef */
import '../src/setup';
import supertest from 'supertest';
import app from '../src/app';
import connection from '../src/database/database';

describe('POST /user', () => {
  afterAll(async () => {
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

    const result = await supertest(app).post('/user').send(body);
    expect(result.status).toEqual(201);
  });

  it('returns 400 for invalid joi validation', async () => {
    const body = {
      firstName: 'user',
      lastName: 'da silva',
      email: 'user@gmail.com',
      password: '14536',
      cep: '44380000',
      state: 'BA',
      city: 'Cruz das Almas',
      neighborhood: 'Centro',
      street: 'Av. Belém',
      addressNumber: '52',
      complement: 'ap 24',
      cpf: '7898527391',
      phoneNumber: '78468152384',
    };

    const result = await supertest(app).post('/user').send(body);
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
        VALUES ('user', 'da silva', 'user@gmail.com', '145236', '44380000', 'BA', 'Cruz das Almas', 'Centro', 'Av. BH', '52', 'ap 24', '78541296583', '789458261432')
    `);

    const result = await supertest(app).post('/user').send(body);
    expect(result.status).toEqual(403);
  });
});

afterAll(() => {
  connection.end();
});
