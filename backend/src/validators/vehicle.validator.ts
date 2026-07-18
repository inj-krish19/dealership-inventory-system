import { z } from 'zod';

export const createVehicleSchema = z.object({
  make: z.string().min(1),
  model: z.string().min(1),      // note: API contract field is "model"
  category: z.string().min(1),
  price: z.number().positive(),
  quantity: z.number().int().min(0),
});

export const updateVehicleSchema = createVehicleSchema.partial();

export const quantitySchema = z.object({
  quantity: z.number().int().positive(),
});