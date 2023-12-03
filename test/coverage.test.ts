import { app } from '../src/server';
import supertest from 'supertest';

const token: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTY5Mjk1ZTkwZTJjNWUzYzk5NjI4NTAiLCJ1c2VybmFtZSI6Ik1hcmlvIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzAxNjI3NDgxLCJleHAiOjQ4NTczODc0ODF9.ZYMjH6WiAP793X_49I7kwXVsVPhv2c53DFiAh3FQg0s';
let coverageId: string = '';

describe('Coverage Routes', () => {
  it('Should create a new coverage', async () => {
    const response = await supertest(server)
      .post('/coverage')
      .send({
        name: "Coverage 1",
        description: "This is coverage 1",
        capital: '10000',
        premium: '500'
      })
      .set('Authorization', `Bearer ${token}`);
    
    coverageId = response.body.data.coverageId;
    expect(response.status).toBe(201);
  });

  it('Should fail to create a new coverage: Coverage already exists', async () => {
    const response = await supertest(server)
      .post('/coverage')
      .send({
        name: "Coverage 1",
        description: "This is coverage 1",
        capital: '10000',
        premium: '500'
      })
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: {
        code: "400",
        message: "Coverage name already exists"
      }
    });
  });

  it('Should fail to create a new coverage: Missing required fields', async () => {
    const response = await supertest(server)
      .post('/coverage')
      .send({})
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: {
        code: "400",
        message: "Missing required fields (name, description, capital, premium)"
      }
    });
  });

  it('Should get all coverages', async () => {
    const response = await supertest(server)
      .get('/coverage')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it('Should get a specific coverage', async () => {
    const response = await supertest(server)
      .get(`/coverage/${coverageId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it('Should fail to get a specific coverage: Invalid coverage ID', async () => {
    const response = await supertest(server)
      .get(`/coverage/123`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(400);
  });

  it('Should update a coverage', async () => {
    const response = await supertest(server)
      .patch(`/coverage/${coverageId}`)
      .send({
        description: "Updated coverage description"
      })
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it('Should fail to update a coverage: Invalid coverage ID', async () => {
    const response = await supertest(server)
      .patch(`/coverage/123`)
      .send({
        description: "Updated coverage description"
      })
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(400);
  });

  it('Should soft delete a coverage', async () => {
    const response = await supertest(server)
      .delete(`/coverage/${coverageId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it('Should delete a coverage', async () => {
    const response = await supertest(server)
      .delete(`/coverage/${coverageId}?hard=true`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it('Should fail to delete a coverage: Invalid coverage ID', async () => {
    const response = await supertest(server)
      .delete(`/coverage/123`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(400);
  });

  let server;

  beforeAll(() => {
    server = app.listen(3080);
  });

  afterAll(() => {
    server.close();
  });
});