import { eq } from 'drizzle-orm';
import { db } from './db.js';
import { users } from './schema.js';
import type { User, CreateUser, UserId } from '@starter/domain';
import { UserIdSchema, EmailSchema } from '@starter/domain';
import type { UserRepository } from '@starter/application';

export class DrizzleUserRepository implements UserRepository {
  private toDomain(row: typeof users.$inferSelect): User {
    return {
      id: UserIdSchema.parse(row.id),
      email: EmailSchema.parse(row.email),
      name: row.name,
      createdAt: row.createdAt,
    };
  }

  async findById(id: UserId): Promise<User | null> {
    const result = await db.select().from(users).where(eq(users.id, id));
    if (result.length === 0) return null;
    return this.toDomain(result[0]);
  }

  async findByEmail(email: string): Promise<User | null> {
    const result = await db.select().from(users).where(eq(users.email, email));
    if (result.length === 0) return null;
    return this.toDomain(result[0]);
  }

  async save(userData: CreateUser): Promise<User> {
    const [inserted] = await db.insert(users).values({
      email: userData.email,
      name: userData.name,
    }).returning();

    return this.toDomain(inserted);
  }
}
