# Agentic Instructions for Claude

- Always use /plan mode before modifying the Domain layer.
- Never use raw primitives for domain IDs; always use Branded Types.
- All incoming data must be parsed through Zod schemas at the API boundary.
- Architecture is verified via `scripts/verify.sh` or `make verify`. This script is the source of truth for completion.