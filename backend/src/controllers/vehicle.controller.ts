import { Response } from 'express';
import { VehicleService } from '../services/VehicleService.js';
import { MongoVehicleRepository } from '../repositories/mongo/MongoVehicleRepository.js';
import { createVehicleSchema, updateVehicleSchema, quantitySchema } from '../validators/vehicle.validator.js';
import { toVehicleDTO, fromVehicleRequestBody } from '../utils/vehicleMapper.js';
import { AuthRequest } from '../middleware/auth.js';
import { parseIdParam } from '../validators/params.validator.js';

const vehicleService = new VehicleService(new MongoVehicleRepository());

export async function createVehicle(req: AuthRequest, res: Response) {
  const parsed = createVehicleSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: 'Validation failed', errors: parsed.error.issues });

  const vehicle = await vehicleService.create(fromVehicleRequestBody(parsed.data));
  return res.status(201).json(toVehicleDTO(vehicle));
}

export async function getAllVehicles(req: AuthRequest, res: Response) {
  const vehicles = await vehicleService.findAll();
  return res.status(200).json(vehicles.map(toVehicleDTO));
}

export async function searchVehicles(req: AuthRequest, res: Response) {
  const { make, model, category, minPrice, maxPrice } = req.query;
  const vehicles = await vehicleService.search({
    make: make as string,
    modelName: model as string,
    category: category as string,
    minPrice: minPrice ? Number(minPrice) : undefined,
    maxPrice: maxPrice ? Number(maxPrice) : undefined,
  });
  return res.status(200).json(vehicles.map(toVehicleDTO));
}

export async function updateVehicle(req: AuthRequest, res: Response) {
  const parsed = updateVehicleSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: 'Validation failed', errors: parsed.error.issues });

  try {
    const id = parseIdParam(req.params.id);
    const mapped = parsed.data.model
      ? { ...fromVehicleRequestBody(parsed.data as any) }
      : parsed.data;
    const vehicle = await vehicleService.update(id, mapped as any);
    return res.status(200).json(toVehicleDTO(vehicle));
  } catch (error) {
    return res.status(404).json({ message: (error as Error).message });
  }
}

export async function deleteVehicle(req: AuthRequest, res: Response) {
  try {
    const id = parseIdParam(req.params.id);
    await vehicleService.delete(id);
    return res.status(204).send();
  } catch (error) {
    return res.status(404).json({ message: (error as Error).message });
  }
}

export async function purchaseVehicle(req: AuthRequest, res: Response) {
  const parsed = quantitySchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: 'Validation failed', errors: parsed.error.issues });

  try {
    const id = parseIdParam(req.params.id);
    const vehicle = await vehicleService.purchase(id, parsed.data.quantity);
    return res.status(200).json(toVehicleDTO(vehicle));
  } catch (error) {
    const message = (error as Error).message;
    return res.status(message === 'Vehicle not found' ? 404 : 400).json({ message });
  }
}

export async function restockVehicle(req: AuthRequest, res: Response) {
  const parsed = quantitySchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: 'Validation failed', errors: parsed.error.issues });

  try {
    const id = parseIdParam(req.params.id);
    const vehicle = await vehicleService.restock(id, parsed.data.quantity);
    return res.status(200).json(toVehicleDTO(vehicle));
  } catch (error) {
    return res.status(404).json({ message: (error as Error).message });
  }
}