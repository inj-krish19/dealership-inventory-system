import { IVehicle } from '../models/Vehicle.js';

// internal -> API response shape
export function toVehicleDTO(vehicle: IVehicle) {
  return {
    id: vehicle._id.toString(),
    make: vehicle.make,
    model: vehicle.modelName,
    category: vehicle.category,
    price: vehicle.price,
    quantity: vehicle.quantity,
  };
}

// API request body -> internal shape
export function fromVehicleRequestBody(body: { make: string; model: string; category: string; price: number; quantity: number }) {
  return {
    make: body.make,
    modelName: body.model,
    category: body.category,
    price: body.price,
    quantity: body.quantity,
  };
}