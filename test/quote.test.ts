import { app } from '../src/server';
import supertest from 'supertest';

const token: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTY5Mjk1ZTkwZTJjNWUzYzk5NjI4NTAiLCJ1c2VybmFtZSI6Ik1hcmlvIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzAxNjI3NDgxLCJleHAiOjQ4NTczODc0ODF9.ZYMjH6WiAP793X_49I7kwXVsVPhv2c53DFiAh3FQg0s';

describe('Quote Routes', () => {
  let server;

  beforeAll(() => {
    server = app.listen(3090);
  });

  afterAll(() => {
    server.close();
  });

  it('Should calculate quote successfully', async () => {
    const response = await supertest(server)
      .post('/quote')
      .set('Authorization', `Bearer ${token}`)
      .send({
        age: "28",
        occupationCode: 223280,
        capital: "100000",
        coverages: [
          { name: 'Indenização Especial por Morte Acidental' },
          { name: 'Invalidez Funcional Permanente Total por Doença' }
        ]
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      ageFactor: expect.any(Number),
      occupationFactor: expect.any(Number),
      coverages: expect.arrayContaining([
        expect.objectContaining({
          coverageId: expect.any(String),
          premium: expect.any(Number)
        })
      ]),
      capital: expect.any(Number),
      premium: expect.any(Number)
    });
  });

  it('Should fail to calculate quote: Invalid token', async () => {
    const response = await supertest(server)
      .post('/quote')
      .set('Authorization', 'Bearer 123')
      .send({
        age: "28",
        occupationCode: '223280',
        capital: "100000",
        coverages: [
          { name: 'Indenização Especial por Morte Acidental' },
          { name: 'Invalidez Funcional Permanente Total por Doença' }
        ]
      });

    expect(response.status).toBe(401);
  });

  it('Should fail to calculate quote: Missing required filds', async () => {
    const response = await supertest(server)
      .post('/quote')
      .set('Authorization', `Bearer ${token}`)
      .send({});

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: {
        code: "400",
        message: "Missing required fields (age, occupationCode, capital, coverages)"
      }
    });
  });

  it('Should fail to calculate quote: Missing age', async () => {
    const response = await supertest(server)
      .post('/quote')
      .set('Authorization', `Bearer ${token}`)
      .send({
        occupationCode: '223280',
        capital: "100000",
        coverages: [
          { name: 'Indenização Especial por Morte Acidental' },
          { name: 'Invalidez Funcional Permanente Total por Doença' }
        ]
      });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: {
        code: "400",
        message: "Missing required fields (age)"
      }
    });
  });

  it('Should fail to calculate quote: Missing occupation code', async () => {
    const response = await supertest(server)
      .post('/quote')
      .set('Authorization', `Bearer ${token}`)
      .send({
        age: "28",
        capital: "100000",
        coverages: [
          { name: 'Indenização Especial por Morte Acidental' },
          { name: 'Invalidez Funcional Permanente Total por Doença' }
        ]
      });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: {
        code: "400",
        message: "Missing required fields (occupationCode)"
      }
    });
  });

  it('Should fail to calculate quote: Missing capital', async () => {
    const response = await supertest(server)
      .post('/quote')
      .set('Authorization', `Bearer ${token}`)
      .send({
        age: "28",
        occupationCode: '223280',
        coverages: [
          { name: 'Indenização Especial por Morte Acidental' },
          { name: 'Invalidez Funcional Permanente Total por Doença' }
        ]
      });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: {
        code: "400",
        message: "Missing required fields (capital)"
      }
    });
  });

  it('Should fail to calculate quote: Missing coverages', async () => {
    const response = await supertest(server)
      .post('/quote')
      .set('Authorization', `Bearer ${token}`)
      .send({
        age: "28",
        occupationCode: '223280',
        capital: "100000",
      });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: {
        code: "400",
        message: "Missing required fields (coverages)"
      }
    });
  });
});