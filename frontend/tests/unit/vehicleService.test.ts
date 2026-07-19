import { describe, expect, it, vi, beforeEach } from 'vitest';
import api from '../../src/services/api';
import {
  getVehicles, searchVehicles, createVehicle,
  updateVehicle, deleteVehicle, purchaseVehicle, restockVehicle,
} from '../../src/services/vehicleService';

vi.mock('../../src/services/api', () => ({
  default: { get: vi.fn(), post: vi.fn(), put: vi.fn(), delete: vi.fn() },
}));

const mockVehicle = { id: '1', make: 'Toyota', model: 'Corolla', category: 'Sedan', price: 22000, quantity: 5 };

describe('vehicleService', () => {
  beforeEach(() => vi.clearAllMocks());

  it('getVehicles calls GET /vehicles', async () => {
    vi.mocked(api.get).mockResolvedValueOnce({ data: [mockVehicle] });
    const result = await getVehicles();
    expect(api.get).toHaveBeenCalledWith('/vehicles');
    expect(result).toEqual([mockVehicle]);
  });

  it('searchVehicles calls GET /vehicles/search with params', async () => {
    vi.mocked(api.get).mockResolvedValueOnce({ data: [mockVehicle] });
    await searchVehicles({ category: 'Sedan', minPrice: 10000 });
    expect(api.get).toHaveBeenCalledWith('/vehicles/search', { params: { category: 'Sedan', minPrice: 10000 } });
  });

  it('createVehicle calls POST /vehicles with payload', async () => {
    vi.mocked(api.post).mockResolvedValueOnce({ data: mockVehicle });
    const result = await createVehicle({ make: 'Toyota', model: 'Corolla', category: 'Sedan', price: 22000, quantity: 5 });
    expect(api.post).toHaveBeenCalledWith('/vehicles', { make: 'Toyota', model: 'Corolla', category: 'Sedan', price: 22000, quantity: 5 });
    expect(result).toEqual(mockVehicle);
  });

  it('updateVehicle calls PUT /vehicles/:id', async () => {
    vi.mocked(api.put).mockResolvedValueOnce({ data: { ...mockVehicle, price: 20000 } });
    const result = await updateVehicle('1', { price: 20000 });
    expect(api.put).toHaveBeenCalledWith('/vehicles/1', { price: 20000 });
    expect(result.price).toBe(20000);
  });

  it('deleteVehicle calls DELETE /vehicles/:id', async () => {
    vi.mocked(api.delete).mockResolvedValueOnce({});
    await deleteVehicle('1');
    expect(api.delete).toHaveBeenCalledWith('/vehicles/1');
  });

  it('purchaseVehicle calls POST /vehicles/:id/purchase with quantity', async () => {
    vi.mocked(api.post).mockResolvedValueOnce({ data: { ...mockVehicle, quantity: 4 } });
    const result = await purchaseVehicle('1', 1);
    expect(api.post).toHaveBeenCalledWith('/vehicles/1/purchase', { quantity: 1 });
    expect(result.quantity).toBe(4);
  });

  it('restockVehicle calls POST /vehicles/:id/restock with quantity', async () => {
    vi.mocked(api.post).mockResolvedValueOnce({ data: { ...mockVehicle, quantity: 10 } });
    const result = await restockVehicle('1', 5);
    expect(api.post).toHaveBeenCalledWith('/vehicles/1/restock', { quantity: 5 });
    expect(result.quantity).toBe(10);
  });
});