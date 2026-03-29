import { User, CreateUser, UserId } from '@starter/domain';

export interface UserRepository {
  findById(id: UserId): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  save(user: CreateUser): Promise<User>;
}
