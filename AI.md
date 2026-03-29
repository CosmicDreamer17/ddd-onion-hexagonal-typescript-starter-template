# 🤖 Master Agentic Protocol (AI.md)

This file is the single source of truth for all autonomous agents interacting with this repository.

## 🚀 Agentic Bootstrap (Creating a New Project)

If you are an AI agent tasked with initializing a new project from this template, follow these steps immediately after cloning:

1.  **Git Re-initialization**: Run `rm -rf .git && git init` to start a fresh history.
2.  **Environment Sync**: Run `pnpm install` to hydrate the workspace.
3.  **Config Setup**: Run `cp .env.example .env` to establish default configuration.
4.  **Baseline Verification**: Run `make verify` to ensure the template is healthy before adding new features.

## 🏗 Architectural Mandates

1.  **Physical Boundaries**: This is a Hexagonal (Ports and Adapters) Monorepo.
    - `domain`: Pure business logic. Zero external dependencies.
    - `application`: Ports (Interfaces) and Use Cases.
    - `infra`: Driven adapters (Drizzle, Neon).
    - `api`/`web`: Driving adapters.
2.  **Dependency Flow**: Inward only (`api -> application -> domain`). Violations will break the build via `dependency-cruiser`.
3.  **Branded Types**: Never use raw primitives for IDs. Always use `Brand<string, 'Name'>` for type safety.
4.  **Zod Validation**: All data crossing a layer boundary MUST be validated via Zod.
5.  **ESM Native**: This is a `type: module` project. Relative imports MUST include the `.js` extension.

## 🛠 Operational Protocols

1.  **Plan Mode First**: Use `/plan` mode before modifying the `domain` or `application` layers.
2.  **The "Slice" Protocol**: When building features, proceed in order: `Domain` -> `Application` -> `Infra` -> `API` -> `Web`.
3.  **Verification**: `make verify` is the absolute standard for task completion.

## 📜 Provenance
Created by **Gemini CLI** (Gemini 3 Flash Preview) on March 29, 2026.
