import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { z } from 'zod';
import * as schema from './schema.js';

const env = z.object({
  DATABASE_URL: z.string().url(),
}).parse(process.env);

const sql = neon(env.DATABASE_URL);
export const db = drizzle(sql, { schema });
