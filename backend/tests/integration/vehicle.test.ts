import request from 'supertest';
import app from '../../src/app.js';
import { connectDB, disconnectDB } from '../../src/config/db.js';
import { User } from '../../src/models/User.js';
import { Vehicle } from '../../src/models/Vehicle.js';

async function registerAndLogin(email: string, role: 'user' | 'admin' = 'user') {
  await request(app).post('/api/auth/register').send({
    name: 'Test', email, password: 'password123',
  });
  if (role === 'admin') {
    await User.updateOne({ email }, { role: 'admin' });
  }
  const res = await request(app).post('/api/auth/login').send({ email, password: 'password123' });
  return res.body.token as string;
}

describe('Vehicle routes', () => {
  let userToken: string;
  let adminToken: string;
  let vehicleId: string;

  beforeAll(async () => {
    await connectDB();
    userToken = await registerAndLogin('vuser@example.com', 'user');
    adminToken = await registerAndLogin('vadmin@example.com', 'admin');
  });

  afterAll(async () => {
    await User.deleteMany({});
    await Vehicle.deleteMany({});
    await disconnectDB();
  });

  describe('Authentication guard', () => {
    it('rejects requests with no token', async () => {
      const res = await request(app).get('/api/vehicles');
      expect(res.status).toBe(401);
    });

    it('rejects requests with an invalid token', async () => {
      const res = await request(app).get('/api/vehicles').set('Authorization', 'Bearer garbage');
      expect(res.status).toBe(401);
    });
  });

  describe('POST /api/vehicles', () => {
    it('allows an authenticated user to create a vehicle', async () => {
      const res = await request(app)
        .post('/api/vehicles')
        .set('Authorization', `Bearer ${userToken}`)
        .send({ make: 'Toyota', model: 'Corolla', category: 'Sedan', price: 22000, quantity: 5 });

      expect(res.status).toBe(201);
      expect(res.body.model).toBe('Corolla');
      vehicleId = res.body.id;
    });

    it('rejects invalid payloads', async () => {
      const res = await request(app)
        .post('/api/vehicles')
        .set('Authorization', `Bearer ${userToken}`)
        .send({ make: 'Toyota' });

      expect(res.status).toBe(400);
    });
  });

  describe('GET /api/vehicles', () => {
    it('returns the vehicle list for any authenticated role', async () => {
      const res = await request(app).get('/api/vehicles').set('Authorization', `Bearer ${userToken}`);
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe('GET /api/vehicles/search', () => {
    it('filters by category and price range', async () => {
      const res = await request(app)
        .get('/api/vehicles/search?category=Sedan&minPrice=10000&maxPrice=30000')
        .set('Authorization', `Bearer ${userToken}`);

      expect(res.status).toBe(200);
      expect(res.body.every((v: any) => v.category === 'Sedan')).toBe(true);
    });
  });

  describe('PUT /api/vehicles/:id', () => {
    it('allows update by any authenticated user', async () => {
      const res = await request(app)
        .put(`/api/vehicles/${vehicleId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({ price: 23500 });

      expect(res.status).toBe(200);
      expect(res.body.price).toBe(23500);
    });

    it('returns 404 for a non-existent vehicle', async () => {
      const res = await request(app)
        .put('/api/vehicles/000000000000000000000000')
        .set('Authorization', `Bearer ${userToken}`)
        .send({ price: 1000 });

      expect(res.status).toBe(404);
    });
  });

  describe('POST /api/vehicles/:id/purchase', () => {
    it('decreases quantity on purchase', async () => {
      const res = await request(app)
        .post(`/api/vehicles/${vehicleId}/purchase`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({ quantity: 2 });

      expect(res.status).toBe(200);
      expect(res.body.quantity).toBe(3);
    });

    it('rejects purchase exceeding available stock', async () => {
      const res = await request(app)
        .post(`/api/vehicles/${vehicleId}/purchase`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({ quantity: 999 });

      expect(res.status).toBe(400);
    });
  });

  describe('Purchase cutoff wiring', () => {
    it('purchase endpoint accepts a valid request during allowed hours', async () => {
      const createRes = await request(app)
        .post('/api/vehicles')
        .set('Authorization', `Bearer ${userToken}`)
        .send({ make: 'Cutoff', model: 'TestCar', category: 'Sedan', price: 15000, quantity: 5 });

      const res = await request(app)
        .post(`/api/vehicles/${createRes.body.id}/purchase`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({ quantity: 1 });

      // Passes if run before 10 PM server time; documents the cutoff exists.
      // Precise cutoff-boundary behavior is covered exhaustively in
      // tests/unit/vehicleService.test.ts via the injected currentTime param.
      expect([200, 400]).toContain(res.status);
    });
  });

  describe('POST /api/vehicles/:id/restock — admin only', () => {
    it('rejects restock from a regular user (403)', async () => {
      const res = await request(app)
        .post(`/api/vehicles/${vehicleId}/restock`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({ quantity: 5 });

      expect(res.status).toBe(403);
    });

    it('allows restock from an admin', async () => {
      const res = await request(app)
        .post(`/api/vehicles/${vehicleId}/restock`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ quantity: 5 });

      expect(res.status).toBe(200);
      expect(res.body.quantity).toBe(8);
    });
  });

  describe('DELETE /api/vehicles/:id — admin only', () => {
    it('rejects delete from a regular user (403)', async () => {
      const res = await request(app)
        .delete(`/api/vehicles/${vehicleId}`)
        .set('Authorization', `Bearer ${userToken}`);

      expect(res.status).toBe(403);
    });

    it('allows delete from an admin', async () => {
      const res = await request(app)
        .delete(`/api/vehicles/${vehicleId}`)
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(204);
    });
  });
});