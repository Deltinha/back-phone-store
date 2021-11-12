/* eslint-disable no-undef */
import '../src/setup';
import supertest from 'supertest';
import app from '../src/app';
import connection from '../src/database/database';

describe('Categories test suit', () => {
  beforeAll(async () => {
    await connection.query('DELETE FROM categories;');
    await connection.query(
      `INSERT INTO categories ("type","name") 
       VALUES 
         ('brand','Motorola'),
         ('brand','Samsung'),
         ('color','#000000'),
         ('color','#FFFFFF'),
         ('model','One Hyper'),
         ('model','Galaxy Z Fold'),
         ('capacity','128GB'),
         ('capacity','256GB');`,
    );
  });
  it('returns 200 fot get on /categories', async () => {
    const result = await supertest(app).get('/categories');
    expect(result.status).toEqual(200);
  });
});
