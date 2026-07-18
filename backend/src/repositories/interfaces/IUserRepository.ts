import { IUser } from '../../models/User.js';

// User Input Interface
export interface CreateUserInput {
  name: string;
  email: string;
  password: string;
  role?: 'user' | 'admin';
}

// User Repository
export interface IUserRepository {
  create(data: CreateUserInput): Promise<IUser>;
  findByEmail(email: string, includePassword?: boolean): Promise<IUser | null>;
  findById(id: string): Promise<IUser | null>;
}