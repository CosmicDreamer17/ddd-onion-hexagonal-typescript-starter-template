# High-Performance DDD & Hexagonal TypeScript Monorepo

A production-ready starter template designed for autonomous AI agents and senior engineers. It enforces strict physical boundaries between the Domain, Application, and Infrastructure layers using Turborepo, pnpm workspaces, and dependency-cruiser.

## Architecture

This monorepo follows the Hexagonal (Ports and Adapters) Architecture:

- **`@starter/domain`**: Pure TypeScript business logic, Zod validation, and Branded Types. Zero external dependencies.
- **`@starter/application`**: Defines the "Ports" (Interfaces) and Use Cases.
- **`@starter/infra`**: Implements the Ports (Adapters). Powered by Drizzle ORM and Neon Serverless Postgres.
- **`@starter/api`**: A Hono web server deployed as Vercel Serverless Functions. Exposes the API and handles dependency injection.
- **`@starter/web`**: A Next.js frontend that infers end-to-end types from the API using Hono RPC (zero-drift).

## Getting Started

1. **Install dependencies**:
   ```bash
   pnpm install
   ```

2. **Environment Variables**:
   Copy `.env.example` to `.env` and fill in your Neon Database URL.
   ```bash
   cp .env.example .env
   ```

3. **Database Setup**:
   Generate and push your Drizzle schema:
   ```bash
   make db:generate
   make db:push
   ```

4. **Development**:
   Start both the Next.js frontend and Hono backend concurrently:
   ```bash
   make dev
   ```

5. **Verification**:
   Run the strict boundary checks, typechecking, tests, and linting:
   ```bash
   make verify
   ```

## Automated Guardrails

- **Dependency Cruiser**: Fails the build if boundaries are violated (e.g., Domain importing from Infra).
- **Knip**: Detects and prunes unused dependencies, files, and exports.
- **Strict ESLint & TypeScript**: Enforces maximum type safety and zero warnings.

## AI Instructions

This template includes `GEMINI.md` and `CLAUDE.md` to instruct AI agents on maintaining the architecture. Always use `make verify` as the source of truth for completion.
