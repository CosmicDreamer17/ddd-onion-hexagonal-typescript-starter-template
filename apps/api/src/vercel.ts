import { DrizzleUserRepository } from '@starter/infra';
import { handle } from 'hono/vercel';
import { createApp } from './index.js';

const { app } = createApp(new DrizzleUserRepository());

export default handle(app);
