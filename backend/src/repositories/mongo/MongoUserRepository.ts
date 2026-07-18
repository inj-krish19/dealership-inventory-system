import { User, IUser } from '../../models/User.js';
import { IUserRepository, CreateUserInput } from '../interfaces/IUserRepository.js';

// Mongo User Repository 
export class MongoUserRepository implements IUserRepository {
  async create(data: CreateUserInput): Promise<IUser> {
    return User.create(data);
  }

  async findByEmail(email: string, includePassword = false): Promise<IUser | null> {
    const query = User.findOne({ email });
    if (includePassword) query.select('+password');
    return query.exec();
  }

  async findById(id: string): Promise<IUser | null> {
    return User.findById(id).exec();
  }
}