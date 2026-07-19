import { Vehicle } from '../../src/models/Vehicle.js';
import { connectDB, disconnectDB } from '../../src/config/db.js';

describe('Vehicle model', () => {
  beforeAll(async () => { await connectDB(); });
  afterEach(async () => { await Vehicle.deleteMany({}); });
  afterAll(async () => { await disconnectDB(); });

  it('rejects a negative price', async () => {
    const vehicle = new Vehicle({ make: 'Toyota', modelName: 'Corolla', category: 'Sedan', price: -500, quantity: 5 });
    await expect(vehicle.validate()).rejects.toThrow();
  });

  it('rejects a negative quantity', async () => {
    const vehicle = new Vehicle({ make: 'Toyota', modelName: 'Corolla', category: 'Sedan', price: 20000, quantity: -1 });
    await expect(vehicle.validate()).rejects.toThrow();
  });

  it('defaults quantity to 0 when not specified', async () => {
    const vehicle = await Vehicle.create({ make: 'Toyota', modelName: 'Corolla', category: 'Sedan', price: 20000 });
    expect(vehicle.quantity).toBe(0);
  });

  it('requires make, modelName, and category', async () => {
    const vehicle = new Vehicle({ price: 20000, quantity: 5 });
    await expect(vehicle.validate()).rejects.toThrow();
  });
});