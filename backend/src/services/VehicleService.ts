import { IVehicleRepository, CreateVehicleInput, SearchVehicleParams } from '../repositories/interfaces/IVehicleRepository.js';
import { IVehicle } from '../models/Vehicle.js';

export class VehicleService {
  constructor(private vehicleRepository: IVehicleRepository) {}

  async create(data: CreateVehicleInput): Promise<IVehicle> {
    return this.vehicleRepository.create(data);
  }

  async findAll(): Promise<IVehicle[]> {
    return this.vehicleRepository.findAll();
  }

  async search(params: SearchVehicleParams): Promise<IVehicle[]> {
    return this.vehicleRepository.search(params);
  }

  async update(id: string, data: Partial<CreateVehicleInput>): Promise<IVehicle> {
    const updated = await this.vehicleRepository.update(id, data);
    if (!updated) throw new Error('Vehicle not found');
    return updated;
  }

  async delete(id: string): Promise<void> {
    const deleted = await this.vehicleRepository.delete(id);
    if (!deleted) throw new Error('Vehicle not found');
  }

  async purchase(id: string, quantity: number, currentTime: Date = new Date()): Promise<IVehicle> {
    const PURCHASE_CUTOFF_HOUR = 11; // 11 AM, 24-hour format
    if (
      currentTime.getHours() >= PURCHASE_CUTOFF_HOUR || 
      currentTime.getHours() >= PURCHASE_CUTOFF_HOUR - 1 && currentTime.getMinutes() >= 30
    ) {
      throw new Error('Purchases are not allowed after 10:30 AM');
    }

    const vehicle = await this.vehicleRepository.findById(id);
    if (!vehicle) throw new Error('Vehicle not found');
    if (vehicle.quantity < quantity) throw new Error('Insufficient stock');

    const updated = await this.vehicleRepository.update(id, { quantity: vehicle.quantity - quantity });
    if (!updated) throw new Error('Vehicle not found');
    return updated;
  }

  async restock(id: string, quantity: number): Promise<IVehicle> {
    const vehicle = await this.vehicleRepository.findById(id);
    if (!vehicle) throw new Error('Vehicle not found');

    const updated = await this.vehicleRepository.update(id, { quantity: vehicle.quantity + quantity });
    if (!updated) throw new Error('Vehicle not found');
    return updated;
  }
}