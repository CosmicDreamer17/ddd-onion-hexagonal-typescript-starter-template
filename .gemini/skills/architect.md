# Architect Skill

## Description
This skill focuses on maintaining the strict Hexagonal (Ports and Adapters) boundary in the TypeScript Monorepo.

## Rules
- The Domain layer must be pure and have zero external dependencies. Only Typescript language features, and Zod for validation.
- The Application layer holds ports (interfaces for DB, messaging) and use cases.
- The Infrastructure layer implements these ports using Drizzle ORM and Neon.
- The API (Hono) is the driving adapter, routing HTTP requests to application use cases.
- The Next.js frontend is another driving adapter, connecting over the Type Bridge (RPC) to the API.

## Workflow
When modifying architecture:
1. Verify `dependency-cruiser` rules are respected.
2. Validate domain models using Zod.
3. Keep logic out of the infra layer, keep infra logic out of the domain.