import { IVehicle } from '../../models/Vehicle.js';

export interface CreateVehicleInput {
  make: string;
  modelName: string;
  category: string;
  price: number;
  quantity: number;
}

export interface SearchVehicleParams {
  make?: string;
  modelName?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
}

export interface IVehicleRepository {
  create(data: CreateVehicleInput): Promise<IVehicle>;
  findAll(): Promise<IVehicle[]>;
  findById(id: string): Promise<IVehicle | null>;
  search(params: SearchVehicleParams): Promise<IVehicle[]>;
  update(id: string, data: Partial<CreateVehicleInput>): Promise<IVehicle | null>;
  delete(id: string): Promise<boolean>;
}