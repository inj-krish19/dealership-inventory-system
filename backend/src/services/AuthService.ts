import bcrypt from 'bcryptjs';
import { IUserRepository } from '../repositories/interfaces/IUserRepository.js';
import { signToken } from '../utils/jwt.js';
import { IUser } from '../models/User.js';

interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

interface LoginInput {
  email: string;
  password: string;
}

interface AuthResult {
  user: { id: string; name: string; email: string; role: string };
  token: string;
}

const SALT_ROUNDS = 10;

export class AuthService {
  constructor(private userRepository: IUserRepository) {}

  async register(input: RegisterInput): Promise<AuthResult> {
    const existing = await this.userRepository.findByEmail(input.email);
    if (existing) {
      throw new Error('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(input.password, SALT_ROUNDS);
    const user = await this.userRepository.create({
      name: input.name,
      email: input.email,
      password: hashedPassword,
    });

    return this.buildAuthResult(user);
  }

  async login(input: LoginInput): Promise<AuthResult> {
    const user = await this.userRepository.findByEmail(input.email, true);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(input.password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    return this.buildAuthResult(user);
  }

  private buildAuthResult(user: IUser): AuthResult {
    const token = signToken({ userId: user._id.toString(), role: user.role });
    return {
      user: { id: user._id.toString(), name: user.name, email: user.email, role: user.role },
      token,
    };
  }
}