import { Schema, model, Document, Types } from 'mongoose';

// User roles - User or Admin
export type UserRole = 'user' | 'admin';

// User Collection Interface 
export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string; // hashed, never returned in plain queries
  role: UserRole;
  createdAt: Date;
}

// User Schema of User Interface
const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Invalid email format'],
    },

    // Deselecting password for normal queries - select:false
    password: { type: String, required: true, minlength: 6, select: false },

    // User roles. Default: user
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
  },
  { timestamps: true }
);

export const User = model<IUser>('User', userSchema);