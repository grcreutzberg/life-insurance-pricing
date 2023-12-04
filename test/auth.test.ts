import { app } from '../src/server';
import supertest from 'supertest';

describe('Auth Routes', () => {
  let server;

  beforeAll(() => {
    server = app.listen(3070);
  });

  afterAll(() => {
    app.listen().close();
  });
  
  it('Should login successfully', async () => {
    const response = await supertest(server)
      .post('/auth')
      .send({
        username: "Mario",
        password: "Senha@Forte!123"
      });

    expect(response.status).toBe(200);
  });
  it('Should fail to login: Username and password are required', async () => {
    const response = await supertest(server)
      .post('/auth')
      .send({
        username: "",
        password: ""
      });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: {
        code: "400",
        message: "Username and password are required"
      }
    });
  });
  it('Should fail to login: Username does not exist', async () => {
    const response = await supertest(server)
      .post('/auth')
      .send({
        username: "Luigi",
        password: "Senha123"
      });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      error: {
        code: "401",
        message: "Username does not exist"
      }
    });
  });
  it('Should fail to login: Password does not match', async () => {
    const response = await supertest(server)
      .post('/auth')
      .send({
        username: "Mario",
        password: "Senha123"
      });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      error: {
        code: "401",
        message: "Password does not match"
      }
    });
  });
});