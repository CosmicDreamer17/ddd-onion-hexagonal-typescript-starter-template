# Architect Skill

## Description
Expertise in maintaining and evolving the Hexagonal / DDD boundaries of this TypeScript Monorepo. Use this skill when implementing new features, refactoring layers, or debugging boundary violations.

## Core Rules

### 1. The Core is Pure
- `@starter/domain` must contain zero external dependencies (except `zod`).
- No database logic, no API logic, no framework logic.
- Use **Branded Types** for all IDs: `type ProjectId = Brand<string, 'ProjectId'>`.

### 2. Dependency Flow
- **Inward only.**
- `api` can import from `application`, `domain`, and `infra` (only in composition roots: `dev.ts`, `vercel.ts`).
- `infra` can import from `application` and `domain`.
- `application` can only import from `domain`.
- `domain` can import NOTHING.
- Route handlers in `api/src/index.ts` MUST only depend on `application` ports, never on `infra` directly.

### 3. Boundary Validation
- All data entering the `application` layer from the `api` must be validated by a Zod schema.
- All data returned from the `infra` layer must be validated/parsed by a Zod schema before becoming a domain entity.

### 4. ESM Compliance
- This project is `type: module`.
- All relative imports MUST include the `.js` extension: `import { x } from './y.js'`.

### 5. Dependency Injection
- Use cases accept ports via constructor injection (e.g., `RegisterUserUseCase(repo: UserRepository)`).
- `apps/api/src/index.ts` exports a `createApp(repo)` factory — route handlers never instantiate concrete adapters.
- Concrete adapters are wired only in composition roots: `dev.ts` (local) and `vercel.ts` (Vercel).
- Tests inject in-memory implementations directly via `createApp()` — no `vi.mock` needed.

### 6. Environment Validation
- Environment variables are validated via Zod at startup (see `packages/infra/src/db.ts`).
- New env vars should be added to `.env.example` with comments.

## Workflow for New Features

1. **Plan**: Define the Domain Entity and Zod Schema in `@starter/domain`.
2. **Contract**: Define the Repository Port (Interface) and Use Case in `@starter/application`. Use cases return discriminated unions (Result types) for expected failures.
3. **Implementation**: Implement the Port in `@starter/infra` using Drizzle. Use a `toDomain()` method for row mapping.
4. **Wiring**: Add the use case to `createApp()` in `apps/api/src/index.ts`. Wire the concrete adapter in `dev.ts` and `vercel.ts`.
5. **Consumption**: Use the `hc` client in `apps/web` to fetch the data with zero-drift types.
6. **Verify**: Always run `make verify` to ensure no boundary violations were introduced.
