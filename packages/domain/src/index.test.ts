import { describe, it, expect } from 'vitest';
import { UserIdSchema, EmailSchema } from './index.js';

describe('Domain Schemas', () => {
  it('should parse valid emails', () => {
    const result = EmailSchema.safeParse('test@example.com');
    expect(result.success).toBe(true);
  });

  it('should reject invalid emails', () => {
    const result = EmailSchema.safeParse('invalid-email');
    expect(result.success).toBe(false);
  });

  it('should parse valid UUIDs as UserIds', () => {
    const result = UserIdSchema.safeParse('123e4567-e89b-12d3-a456-426614174000');
    expect(result.success).toBe(true);
  });

  it('should reject invalid UUIDs', () => {
    const result = UserIdSchema.safeParse('123');
    expect(result.success).toBe(false);
  });
});
