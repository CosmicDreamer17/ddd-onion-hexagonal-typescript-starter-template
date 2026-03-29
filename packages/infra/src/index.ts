import { eq } from 'drizzle-orm';
import { db } from './db.js';
import { users } from './schema.js';
import type { User, CreateUser, UserId } from '@starter/domain';
import { UserIdSchema, EmailSchema } from '@starter/domain';
import type { UserRepository } from '@starter/application';

export class DrizzleUserRepository implements UserRepository {
  async findById(id: UserId): Promise<User | null> {
    const result = await db.select().from(users).where(eq(users.id, id));
    const user = result[0];
    if (!user) return null;
    return {
      id: UserIdSchema.parse(user.id),
      email: EmailSchema.parse(user.email),
      name: user.name,
      createdAt: user.createdAt,
    };
  }

  async findByEmail(email: string): Promise<User | null> {
    const result = await db.select().from(users).where(eq(users.email, email));
    const user = result[0];
    if (!user) return null;
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

    if (!inserted) {
      throw new Error('Failed to insert user');
    }

    return {
      id: UserIdSchema.parse(inserted.id),
      email: EmailSchema.parse(inserted.email),
      name: inserted.name,
      createdAt: inserted.createdAt,
    };
  }
}
