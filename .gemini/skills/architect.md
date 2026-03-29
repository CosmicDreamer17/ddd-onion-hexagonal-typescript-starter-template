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
- `api` can import from `application` and `domain`.
- `infra` can import from `application` and `domain`.
- `application` can only import from `domain`.
- `domain` can import NOTHING.

### 3. Boundary Validation
- All data entering the `application` layer from the `api` must be validated by a Zod schema.
- All data returned from the `infra` layer must be validated/parsed by a Zod schema before becoming a domain entity.

### 4. ESM Compliance
- This project is `type: module`.
- All relative imports MUST include the `.js` extension: `import { x } from './y.js'`.

## Workflow for New Features

1. **Plan**: Define the Domain Entity and Zod Schema in `@starter/domain`.
2. **Contract**: Define the Repository Port (Interface) in `@starter/application`.
3. **Implementation**: Implement the Port in `@starter/infra` using Drizzle.
4. **Wiring**: Inject the repository into the Hono router in `apps/api`.
5. **Consumption**: Use the `hc` client in `apps/web` to fetch the data with zero-drift types.
6. **Verify**: Always run `make verify` to ensure no boundary violations were introduced.
