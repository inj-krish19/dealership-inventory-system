import { AuthService } from '../../src/services/AuthService.js';
import { IUserRepository, CreateUserInput } from '../../src/repositories/interfaces/IUserRepository.js';
import { IUser } from '../../src/models/User.js';

// Mock repository — this is why we depend on the interface, not Mongoose directly
class FakeUserRepository implements IUserRepository {
  private users: any[] = [];

  async create(data: CreateUserInput) {
    const user = { _id: 'fake-id-1', ...data, password: `hashed:${data.password}` };
    this.users.push(user);
    return user as unknown as IUser;
  }

  async findByEmail(email: string) {
    return (this.users.find((u) => u.email === email) as unknown as IUser) || null;
  }

  async findById(id: string) {
    return (this.users.find((u) => u._id === id) as unknown as IUser) || null;
  }
}

describe('AuthService', () => {
  let repo: FakeUserRepository;
  let service: AuthService;

  beforeEach(() => {
    repo = new FakeUserRepository();
    service = new AuthService(repo);
  });

  describe('register', () => {
    it('creates a new user with hashed password', async () => {
      const result = await service.register({
        name: 'Krish Shah',
        email: 'krish@example.com',
        password: 'password123',
      });

      expect(result.user.email).toBe('krish@example.com');
      expect(result.token).toBeDefined();
    });

    it('throws if email is already registered', async () => {
      await service.register({ name: 'A', email: 'dup@example.com', password: 'password123' });

      await expect(
        service.register({ name: 'B', email: 'dup@example.com', password: 'password456' })
      ).rejects.toThrow('Email already registered');
    });
  });

  describe('login', () => {
    it('throws for a non-existent email', async () => {
      await expect(
        service.login({ email: 'nope@example.com', password: 'whatever' })
      ).rejects.toThrow('Invalid credentials');
    });
  });
});