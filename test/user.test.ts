import { app } from '../src/server';
import supertest from 'supertest';

const token: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTY5Mjk1ZTkwZTJjNWUzYzk5NjI4NTAiLCJ1c2VybmFtZSI6Ik1hcmlvIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzAxNjI3NDgxLCJleHAiOjQ4NTczODc0ODF9.ZYMjH6WiAP793X_49I7kwXVsVPhv2c53DFiAh3FQg0s';
let userId: string = '';

describe('User Routes', () => {
  let server;

  beforeAll(() => {
    server = app.listen(3060);
  });

  afterAll(() => {
    server.close();
  });

  it('Should fail get user: Token not provided', async () => {
    const response = await supertest(server)
    .get('/users');

    expect(response.status).toBe(401);
  });
  it('Should fail get user: Token not valid', async () => {
    const response = await supertest(server)
    .get('/users')
    .set('Authorization', `Bearer 123`);

    expect(response.status).toBe(401);
  });
  it('Should fail get user: Not authorized', async () => {
    const response = await supertest(server)
    .get('/users')
    .set('Authorization', `Bearer `);

    expect(response.status).toBe(401);
  });
  it('Should fail to create a new user: Username and password are required', async () => {
    const response = await supertest(server)
      .post('/users')
      .send({
        username: "",
        password: ""
      })
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(400);
  });
  it('Should fail to create a new user: Password not valid format', async () => {
    const response = await supertest(server)
      .post('/users')
      .send({
        username: "Toad",
        password: "Senha"
      })
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(400);
  });
  it('Should create a new user', async () => {
    const response = await supertest(server)
      .post('/users')
      .send({
        username: "Toad",
        password: "Senha@Forte!123"
      })
      .set('Authorization', `Bearer ${token}`);

    userId = response.body.data.userId;
    expect(response.status).toBe(201);
  });
  it('Should fail to create a new user: Username already exists', async () => {
    const response = await supertest(server)
      .post('/users')
      .send({
        username: "Toad",
        password: "Senha@Forte!123"
      })
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(400);
  });
  it('Should get all users', async () => {
    const response = await supertest(server)
      .get('/users')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });
  it('Should get a specific user', async () => {
    const response = await supertest(server)
      .get(`/users/${userId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });
  it('Should fail to get a specific user: Id must be a valid MongoDB UserId', async () => {
    const response = await supertest(server)
      .get(`/users/123`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(400);
  });
  it('Should update a user', async () => {
    const response = await supertest(server)
      .patch(`/users/${userId}`)
      .send({
        role: "user"
      })
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });
  it('Should fail to update a user: Role must be admin or user', async () => {
    const response = await supertest(server)
      .patch(`/users/${userId}`)
      .send({
        role: "bot"
      })
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(400);
  });
  it('Should delete a user', async () => {
    const response = await supertest(server)
      .delete(`/users/${userId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });
});