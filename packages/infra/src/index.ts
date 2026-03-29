import { eq } from 'drizzle-orm';
import { db } from './db';
import { users } from './schema';
import { User, CreateUser, UserId, UserIdSchema, EmailSchema } from '@starter/domain';
import { UserRepository } from '@starter/application';

export class DrizzleUserRepository implements UserRepository {
  async findById(id: UserId): Promise<User | null> {
    const result = await db.select().from(users).where(eq(users.id, id));
    if (result.length === 0) return null;
    const user = result[0];
    return {
      id: UserIdSchema.parse(user.id),
      email: EmailSchema.parse(user.email),
      name: user.name,
      createdAt: user.createdAt,
    };
  }

  async findByEmail(email: string): Promise<User | null> {
    const result = await db.select().from(users).where(eq(users.email, email));
    if (result.length === 0) return null;
    const user = result[0];
    return {
      id: UserIdSchema.parse(user.id),
      email: EmailSchema.parse(user.email),
      name: user.name,
      createdAt: user.createdAt,
    };
  }

  async save(userData: CreateUser): Promise<User> {
    const [inserted] = await db.insert(users).values({
      email: userData.email,
      name: userData.name,
    }).returning();

    return {
      id: UserIdSchema.parse(inserted.id),
      email: EmailSchema.parse(inserted.email),
      name: inserted.name,
      createdAt: inserted.createdAt,
    };
  }
}
