import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { CreateUserSchema } from '@starter/domain';
import { DrizzleUserRepository } from '@starter/infra';
import { handle } from 'hono/vercel';

const app = new Hono().basePath('/api');

const userRepository = new DrizzleUserRepository();

const routes = app.post(
  '/register',
  zValidator('json', CreateUserSchema),
  async (c) => {
    const userData = c.req.valid('json');
    
    const existing = await userRepository.findByEmail(userData.email);
    if (existing) {
      return c.json({ error: 'User already exists' }, 400);
    }

    const user = await userRepository.save(userData);
    return c.json({ user }, 201);
  }
);

export type AppType = typeof routes;

export default handle(app);
