import { Schema, model, Document, Types } from 'mongoose';

// Vehicle Collection Interface 
export interface IVehicle extends Document {
  _id: Types.ObjectId;
  make: string;

  // modelName instead of model as name of method exist in document.
  modelName: string;
  category: string;
  price: number;
  quantity: number;
  createdAt: Date;
}

// Vehicle Schema of Vehicle Interface
const vehicleSchema = new Schema<IVehicle>(
  {
    make: { type: String, required: true, trim: true },
    modelName: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },

    // price minimum 0 for negative price validation
    price: { type: Number, required: true, min: 0 },

    // quantity minimum 0 for negative quanitity validation, default 0
    quantity: { type: Number, required: true, min: 0, default: 0 },
  },
  { timestamps: true }
);

// Indexing for Searching
vehicleSchema.index({ make: 1, modelName: 1, category: 1, price: 1 });

export const Vehicle = model<IVehicle>('Vehicle', vehicleSchema);