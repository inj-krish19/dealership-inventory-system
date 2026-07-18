import { Vehicle, IVehicle } from '../../models/Vehicle.js';
import { IVehicleRepository, CreateVehicleInput, SearchVehicleParams } from '../interfaces/IVehicleRepository.js';

export class MongoVehicleRepository implements IVehicleRepository {
  async create(data: CreateVehicleInput): Promise<IVehicle> {
    return Vehicle.create(data);
  }

  async findAll(): Promise<IVehicle[]> {
    return Vehicle.find().exec();
  }

  async findById(id: string): Promise<IVehicle | null> {
    return Vehicle.findById(id).exec();
  }

  async search(params: SearchVehicleParams): Promise<IVehicle[]> {
    const filter: Record<string, any> = {};
    if (params.make) filter.make = new RegExp(params.make, 'i');
    if (params.modelName) filter.modelName = new RegExp(params.modelName, 'i');
    if (params.category) filter.category = new RegExp(params.category, 'i');
    if (params.minPrice || params.maxPrice) {
      filter.price = {};
      if (params.minPrice) filter.price.$gte = params.minPrice;
      if (params.maxPrice) filter.price.$lte = params.maxPrice;
    }
    return Vehicle.find(filter).exec();
  }

  async update(id: string, data: Partial<CreateVehicleInput>): Promise<IVehicle | null> {
    return Vehicle.findByIdAndUpdate(id, data, { new: true, runValidators: true }).exec();
  }

  async delete(id: string): Promise<boolean> {
    const result = await Vehicle.findByIdAndDelete(id).exec();
    return result !== null;
  }
}