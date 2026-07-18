import { VehicleService } from '../../src/services/VehicleService.js';
import { IVehicleRepository } from '../../src/repositories/interfaces/IVehicleRepository.js';

class FakeVehicleRepository implements IVehicleRepository {
  private vehicles: any[] = [
    { _id: '1', make: 'Toyota', modelName: 'Corolla', category: 'Sedan', price: 20000, quantity: 3 },
  ];

  async create(data: any) {
    const v = { _id: String(this.vehicles.length + 1), ...data };
    this.vehicles.push(v);
    return v;
  }
  async findAll() { return this.vehicles; }
  async findById(id: string) { return this.vehicles.find((v) => v._id === id) || null; }
  async search() { return this.vehicles; }
  async update(id: string, data: any) {
    const v = this.vehicles.find((v) => v._id === id);
    if (!v) return null;
    Object.assign(v, data);
    return v;
  }
  async delete(id: string) {
    const idx = this.vehicles.findIndex((v) => v._id === id);
    if (idx === -1) return false;
    this.vehicles.splice(idx, 1);
    return true;
  }
}

describe('VehicleService', () => {
  let repo: FakeVehicleRepository;
  let service: VehicleService;

  beforeEach(() => {
    repo = new FakeVehicleRepository();
    service = new VehicleService(repo);
  });

  it('purchases a vehicle and decrements quantity', async () => {
    const updated = await service.purchase('1', 1);
    expect(updated.quantity).toBe(2);
  });

  it('throws when purchasing more than available stock', async () => {
    await expect(service.purchase('1', 10)).rejects.toThrow('Insufficient stock');
  });

  it('restocks a vehicle and increments quantity', async () => {
    const updated = await service.restock('1', 5);
    expect(updated.quantity).toBe(8);
  });

  it('throws when purchasing a non-existent vehicle', async () => {
    await expect(service.purchase('999', 1)).rejects.toThrow('Vehicle not found');
  });
});