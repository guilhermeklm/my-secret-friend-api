import request from 'supertest';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from "../../../src/app";

beforeAll(async () => {
  dotenv.config({ path: '.env' });
  const mongoUri = process.env.MONGO_DB_URL as string;
  await mongoose.connect(mongoUri, {});
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('POST /login', () => {
  test('should login successfully with valid credentials', async () => {
    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'guilherme.klm22@gmail.com',
        password: 'senha123'
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('ts');
    expect(response.body).toHaveProperty('data.token');
    expect(response.body).toMatchObject(
      {
        "statusCode": 200,
        "message": "Login feito com sucesso!"
      }
    )
  });

  test('should fail to login with invalid credentials', async () => {
    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'invalidUser',
        password: 'invalidPassword'
      });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('ts');
    expect(response.body).toMatchObject({
      "messages": ["Email ou senha inválidos"],
      "statusCode": 401,
    });
  });

  test('should fail to login with missing credentials', async () => {
    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: '',
        password: ''
      });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('ts');
    expect(response.body).toMatchObject({
      "messages": ["Email ou senha inválidos"],
      "statusCode": 401,
    });
  });
});