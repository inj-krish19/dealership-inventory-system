import mongoose from 'mongoose';
import { User } from '../../src/models/User.js';
import { connectDB, disconnectDB } from '../../src/config/db.js';

describe('User model', () => {
  beforeAll(async () => { await connectDB(); });
  afterEach(async () => { await User.deleteMany({}); });
  afterAll(async () => { await disconnectDB(); });

  it('rejects a user with no email', async () => {
    const user = new User({ name: 'Test', password: 'hashed123' });
    await expect(user.validate()).rejects.toThrow();
  });

  it('rejects a malformed email', async () => {
    const user = new User({ name: 'Test', email: 'not-an-email', password: 'hashed123' });
    await expect(user.validate()).rejects.toThrow();
  });

  it('defaults role to "user" when not specified', async () => {
    const user = await User.create({ name: 'Test', email: 'default@example.com', password: 'hashed123' });
    expect(user.role).toBe('user');
  });

  it('rejects duplicate emails', async () => {
    await User.create({ name: 'A', email: 'dup@example.com', password: 'hashed123' });
    await expect(
      User.create({ name: 'B', email: 'dup@example.com', password: 'hashed456' })
    ).rejects.toThrow();
  });

  it('excludes password from default query results', async () => {
    await User.create({ name: 'Test', email: 'nopw@example.com', password: 'hashed123' });
    const found = await User.findOne({ email: 'nopw@example.com' });
    expect(found?.password).toBeUndefined();
  });
});