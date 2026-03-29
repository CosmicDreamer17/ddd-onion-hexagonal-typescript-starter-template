# 🤖 Origin Note
This workspace was initialized and bootstrapped by Gemini CLI on 2026-03-29. Every architectural boundary and automated guardrail was established autonomously to ensure long-term machine-maintainability.

# Agentic Instructions for Gemini CLI

## Mandatory Protocols

1. **Plan Mode First**: Always use `/plan` mode before modifying any files in the `packages/domain` or `packages/application` layers.
2. **Branded Types**: Never use raw primitives (string, number) for domain IDs or sensitive fields. Always use `Brand<string, 'Name'>`.
3. **Zod Validation**: All data crossing a boundary (API -> Application, Application -> Infra) MUST be parsed through a Zod schema.
4. **Dependency Flow**: Strictly follow the inward dependency rule.
   - `domain` -> NO IMPORTS.
   - `application` -> only `domain`.
   - `infra` -> `application` and `domain`.
   - `api`/`web` -> `application` and `domain`.
5. **ESM Imports**: This is a pure ESM project. All relative imports must end in `.js` (e.g., `import { x } from './y.js'`).

## Source of Truth
Architecture is verified via `make verify`. If this command fails, the task is NOT complete.
