import { serve } from '@hono/node-server';
import { DrizzleUserRepository } from '@starter/infra';
import { createApp } from './index.js';

const { app } = createApp(new DrizzleUserRepository());

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;

console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port
});
