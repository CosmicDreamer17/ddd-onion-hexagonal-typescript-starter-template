import { describe, it, expect, vi } from 'vitest';
import { app } from './index.js';

// Mock the repository class correctly using a function that can be used as a constructor
vi.mock('@starter/infra', () => {
  return {
    DrizzleUserRepository: function() {
      return {
        findByEmail: vi.fn().mockResolvedValue(null),
        save: vi.fn().mockResolvedValue({
          id: '123e4567-e89b-12d3-a456-426614174000',
          email: 'test@example.com',
          name: 'Test User',
          createdAt: new Date()
        })
      };
    }
  };
});

describe('API Endpoints', () => {
  it('POST /api/register should return 201 for valid data', async () => {
    const res = await app.request('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test@example.com',
        name: 'Test User'
      })
    });

    expect(res.status).toBe(201);
    const body = await res.json();
    expect(body.user.name).toBe('Test User');
  });

  it('POST /api/register should return 400 for invalid email', async () => {
    const res = await app.request('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'invalid-email',
        name: 'Test User'
      })
    });

    expect(res.status).toBe(400);
  });
});
