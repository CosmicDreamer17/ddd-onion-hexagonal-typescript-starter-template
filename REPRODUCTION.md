# 🏗 Project Reproduction Protocol (for AI Agents)

This document provides the exact sequence of commands an AI agent should follow to instantiate a new project from this template and begin feature development.

## 1. Initial Scaffolding

```bash
# 1. Clone the template (shallow)
git clone --depth 1 git@github-cosmicdreamer:CosmicDreamer17/ddd-onion-hexagonal-typescript-starter-template.git <new-project-name>
cd <new-project-name>

# 2. Re-initialize Git for the new project
rm -rf .git
git init
git config user.name "CosmicDreamer17"
git config user.email "CosmicDreamer17@users.noreply.github.com"

# 3. Setup workspace
pnpm install
cp .env.example .env
```

## 2. Bootstrapping Strategy

Before writing code, agents MUST:
1. **Read AI.md**: Understand the strict inward dependency flow and branded type mandates.
2. **Execute make verify**: Confirm the base state is valid before making any modifications.
3. **Analyze the Slice**: Examine `packages/domain/src/index.ts` and `apps/api/src/index.ts` to understand the reference User Registration implementation.

## 3. Development Workflow (The "Slice" Protocol)

When creating a new feature (e.g., "Projects", "Tasks"), follow these steps in order:

1. **Domain**: Define types and Zod schemas in `packages/domain/src/`. Use Branded Types for IDs.
2. **Application**: Define the Repository interface (Port) in `packages/application/src/`.
3. **Infrastructure**: Implement the repository using Drizzle in `packages/infra/src/`. Define the schema in `schema.ts`.
4. **API**: Register the new routes in `apps/api/src/index.ts`. Inject the implementation.
5. **Web**: Consume the API in `apps/web/` using the `hc` (Hono Client).
6. **Verify**: Run `make verify`.

## 4. Verification Checkup

Agents must ensure `make verify` passes before considering any task complete. This command runs:
- **Dependency Cruiser**: Prevents architectural leakage.
- **Knip**: Prunes unused exports/deps.
- **Vitest**: Runs logic and integration tests.
- **TypeScript**: Ensures full type-safety across the mono-repo bridge.
