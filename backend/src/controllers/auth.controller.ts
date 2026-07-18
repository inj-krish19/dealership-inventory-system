import { Request, Response } from 'express';
import { AuthService } from '../services/AuthService.js';
import { MongoUserRepository } from '../repositories/mongo/MongoUserRepository.js';
import { registerSchema, loginSchema } from '../validators/auth.validator.js';

const authService = new AuthService(new MongoUserRepository());

export async function register(req: Request, res: Response) {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: 'Validation failed', errors: parsed.error.issues });
  }

  try {
    const result = await authService.register(parsed.data);
    return res.status(201).json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Registration failed';
    return res.status(409).json({ message });
  }
}

export async function login(req: Request, res: Response) {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: 'Validation failed', errors: parsed.error.issues });
  }

  try {
    const result = await authService.login(parsed.data);
    return res.status(200).json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Login failed';
    return res.status(401).json({ message });
  }
}