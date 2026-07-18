import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../src/app.js';
import { connectDB, disconnectDB } from '../../src/config/db.js';
import { User } from '../../src/models/User.js';

describe('Auth routes', () => {
  beforeAll(async () => {
    await connectDB();
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  afterAll(async () => {
    await disconnectDB();
  });

  it('registers a new user and returns a token', async () => {
    const res = await request(app).post('/api/auth/register').send({
      name: 'Krish Shah',
      email: 'krish@example.com',
      password: 'password123',
    });

    expect(res.status).toBe(201);
    expect(res.body.token).toBeDefined();
    expect(res.body.user.email).toBe('krish@example.com');
  });

  it('rejects duplicate email registration', async () => {
    await request(app).post('/api/auth/register').send({
      name: 'Akash', email: 'dup@example.com', password: 'password123',
    });
    const res = await request(app).post('/api/auth/register').send({
      name: 'Bob', email: 'dup@example.com', password: 'password456',
    });

    expect(res.status).toBe(409);
  });

  it('logs in with correct credentials', async () => {
    await request(app).post('/api/auth/register').send({
      name: 'Krish', email: 'login@example.com', password: 'password123',
    });
    const res = await request(app).post('/api/auth/login').send({
      email: 'login@example.com', password: 'password123',
    });

    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  it('rejects login with wrong password', async () => {
    await request(app).post('/api/auth/register').send({
      name: 'Krish', email: 'wrongpw@example.com', password: 'password123',
    });
    const res = await request(app).post('/api/auth/login').send({
      email: 'wrongpw@example.com', password: 'nopenope',
    });

    expect(res.status).toBe(401);
  });
});