import mongoose from 'mongoose';
import { connectDB, disconnectDB } from '../../src/config/db.js';

describe('Database connection', () => {
  afterAll(async () => {
    await disconnectDB();
  });

  it('connects to MongoDB successfully', async () => {
    await connectDB();
    expect(mongoose.connection.readyState).toBe(1);
  });
});