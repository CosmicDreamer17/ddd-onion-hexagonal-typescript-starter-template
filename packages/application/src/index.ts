import type { User, CreateUser, UserId, Email } from '@starter/domain';
import { EmailSchema } from '@starter/domain';

export interface UserRepository {
  findById(id: UserId): Promise<User | null>;
  findByEmail(email: Email): Promise<User | null>;
  save(user: CreateUser): Promise<User>;
}

export type RegisterResult =
  | { success: true; user: User }
  | { success: false; error: string };

export class RegisterUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(data: CreateUser): Promise<RegisterResult> {
    const email = EmailSchema.parse(data.email);

    const existing = await this.userRepository.findByEmail(email);
    if (existing) {
      return { success: false, error: 'User already exists' };
    }

    const user = await this.userRepository.save(data);
    return { success: true, user };
  }
}
