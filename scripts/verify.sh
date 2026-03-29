#!/bin/bash
set -e

echo "🔍 Verifying Boundaries..."
pnpm exec dependency-cruiser packages apps

echo "🔍 Checking for Unused Dependencies (Knip)..."
pnpm exec knip

echo "🔍 Linting..."
pnpm turbo lint

echo "🔍 Typechecking..."
pnpm turbo typecheck

echo "✅ All verification passed!"
