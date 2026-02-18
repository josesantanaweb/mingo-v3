# Git Create Commit - Betting Monorepo

## Overview
Crea un mensaje de commit profesional, corto y enfocado, siguiendo la arquitectura de nuestro Turborepo de apuestas.

## Context
- **Root:** Turborepo (pnpm)
- **Apps:** `apps/web` (Next.js 15), `apps/api` (NestJS 11)
- **Packages:** `@mingo/ui`, `@mingo/types`, `@mingo/hooks`, `@mingo/utils`
- **DB:** Prisma (Postgres)

## Steps
1. **Review changes**
    - Check the diff: `git diff --cached` (if changes are staged) or `git diff` (if unstaged).
    - Analyze if the change affects financial logic (balances, odds, transactions).
2. **Ask for issue key (optional)**
    - Look for task IDs in the branch name or Notion context (e.g., BET-123, TASK-45).
    - If not found, ask the user or proceed without it.
3. **Stage changes**
    - `git add -A` (unless the user specifies only certain files).
4. **Identify Scope**
    - `web`: Frontend Next.js.
    - `api`: Backend NestJS / GraphQL.
    - `ui`: Shared Tailwind v4 components.
    - `db`: Prisma schema or migrations.
    - `types`: Shared TypeScript interfaces.
    - `deps`: Dependency updates (React 19, Turbo, etc).
5. **Create commit message**
    - Format: `git commit -m "<issue-key>: <type>(<scope>): <short summary>"`
    - If no key: `git commit -m "<type>(<scope>): <short summary>"`

## Rules
- **Length:** Max 72 characters.
- **Imperative mood:** Use "fix", "add", "update" (NOT "fixed", "added").
- **Capitalize:** First letter of the summary must be uppercase.
- **No period:** Do not end the message with a period.
- **Standard Types:** `feat`, `fix`, `refactor`, `chore`, `test`, `docs`, `style`.

## Examples
- `BET-101: feat(api): implement atomic transaction for bet placement`
- `fix(web): solve hydration error in betting slip with Next 15`
- `TASK-22: db(api): add win_amount column to Bet table`
- `chore(deps): upgrade to React 19 and Tailwind v4`
