import { describe, it, expect } from 'vitest';
import type { UserRepository } from '@starter/application';
import type { User, CreateUser, UserId, Email } from '@starter/domain';
import { createApp } from './index.js';

function createInMemoryUserRepository(): UserRepository {
  const users: User[] = [];

  return {
    async findById(id: UserId): Promise<User | null> {
      return users.find((u) => u.id === id) ?? null;
    },
    async findByEmail(email: Email): Promise<User | null> {
      return users.find((u) => u.email === email) ?? null;
    },
    async save(data: CreateUser): Promise<User> {
      const user: User = {
        id: '123e4567-e89b-12d3-a456-426614174000' as UserId,
        email: data.email,
        name: data.name,
        createdAt: new Date(),
      };
      users.push(user);
      return user;
    },
  };
}

describe('API Endpoints', () => {
  it('POST /api/register should return 201 for valid data', async () => {
    const repo = createInMemoryUserRepository();
    const { app } = createApp(repo);

    const res = await app.request('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test@example.com',
        name: 'Test User',
      }),
    });

    expect(res.status).toBe(201);
    const body = await res.json();
    expect(body.user.name).toBe('Test User');
  });

  it('POST /api/register should return 400 for invalid email', async () => {
    const repo = createInMemoryUserRepository();
    const { app } = createApp(repo);

    const res = await app.request('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'invalid-email',
        name: 'Test User',
      }),
    });

    expect(res.status).toBe(400);
  });

  it('POST /api/register should return 400 for duplicate email', async () => {
    const repo = createInMemoryUserRepository();
    const { app } = createApp(repo);

    await app.request('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test@example.com',
        name: 'Test User',
      }),
    });

    const res = await app.request('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test@example.com',
        name: 'Another User',
      }),
    });

    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toBe('User already exists');
  });
});
