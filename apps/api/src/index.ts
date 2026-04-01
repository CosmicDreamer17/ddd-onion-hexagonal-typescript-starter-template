import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { CreateUserSchema } from '@starter/domain';
import { RegisterUserUseCase } from '@starter/application';
import type { UserRepository } from '@starter/application';

export function createApp(userRepository: UserRepository) {
  const useCase = new RegisterUserUseCase(userRepository);

  const app = new Hono().basePath('/api');

  const routes = app.post(
    '/register',
    zValidator('json', CreateUserSchema),
    async (c) => {
      const userData = c.req.valid('json');

      const result = await useCase.execute(userData);
      if (!result.success) {
        return c.json({ error: result.error }, 400);
      }

      return c.json({ user: result.user }, 201);
    }
  );

  return { app, routes };
}

export type AppType = ReturnType<typeof createApp>['routes'];
