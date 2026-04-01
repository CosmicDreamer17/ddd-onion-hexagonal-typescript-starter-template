import { z } from 'zod';

export type Brand<K, T> = K & { __brand: T };

export type UserId = Brand<string, 'UserId'>;
export type Email = Brand<string, 'Email'>;

export const UserIdSchema = z.string().uuid().transform((v) => v as UserId);
export const EmailSchema = z.string().email().transform((v) => v as Email);

export const UserSchema = z.object({
  id: UserIdSchema,
  email: EmailSchema,
  name: z.string().min(1),
  createdAt: z.date(),
});

export type User = z.infer<typeof UserSchema>;

export const CreateUserSchema = UserSchema.omit({ id: true, createdAt: true });
export type CreateUser = z.infer<typeof CreateUserSchema>;
