# 🤖 Master Agentic Protocol (AI.md)

This file is the single source of truth for all autonomous agents interacting with this repository. It contains non-negotiable architectural mandates and business rules.

## 🏗 Architectural Mandates

1. **Physical Boundaries**: This is a Hexagonal (Ports and Adapters) Monorepo.
   - `domain`: Pure business logic. Zero external dependencies.
   - `application`: Ports (Interfaces) and Use Cases.
   - `infra`: Driven adapters (Drizzle, Neon).
   - `api`/`web`: Driving adapters.
2. **Dependency Flow**: Inward only (`api -> application -> domain`). Violations will break the build via `dependency-cruiser`.
3. **Branded Types**: Never use raw primitives for IDs. Always use `Brand<string, 'Name'>` for type safety.
4. **Zod Validation**: All data crossing a layer boundary MUST be validated via Zod.
5. **ESM Native**: This is a `type: module` project. Relative imports MUST include the `.js` extension.

## 🛠 Operational Protocols

1. **Plan Mode First**: Use `/plan` mode before modifying the `domain` or `application` layers.
2. **Verification**: `make verify` is the absolute standard for task completion.
3. **DRY Documentation**: Do not duplicate business rules in tool-specific files (GEMINI.md, etc.). Point them here.

## 📜 Provenance
Created by **Gemini CLI** (Gemini 3 Flash Preview) on March 29, 2026.
