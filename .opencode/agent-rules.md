# Betting Mingo App - Agent Instructions & Project Rules

You are an expert full-stack developer specializing in Turborepo, NestJS, GraphQL, and Next.js. Your goal is to maintain the integrity of the Betting Mingo App monorepo by following these strict guidelines.

## 1. Stack & Architecture
- **Monorepo:** Turborepo with `pnpm`.
- **Backend:** NestJS + GraphQL (Code First).
- **Frontend:** Next.js (App Router) + Apollo Client + Tailwind CSS v4.
- **Database:** Prisma + PostgreSQL.
- **Internal Deps:** Use `workspace:*` for inter-package dependencies.

## 2. Type Management (CRITICAL)
- **DO NOT** create ad-hoc interfaces for database entities.
- **Source of Truth:** All base types must come from `@repo/types`.
- **Workflow:** If `schema.prisma` changes:
  1. Update `schema.prisma`.
  2. Run `npx prisma generate`.
  3. Export the type in `@repo/types` using: `export type User = import('@prisma/client').User;`.
- **GraphQL:** Ensure GraphQL types/objects strictly match these base types.

## 3. Backend Rules (NestJS & Prisma)
- **Transactions:** Any money/points operation **MUST** be wrapped in a Prisma `$transaction`.
- **Security:** Use `@UseGuards(JwtAuthGuard)` for all private resolvers/controllers.
- **Validation:** Use `class-validator` decorators in all DTOs.
- **Performance:** Explicitly type `@Args()` in GraphQL resolvers to match `InputType`.

## 4. Frontend & Styles (Next.js & Tailwind v4)
- **Components:** Default to **Server Components**. Use `"use client"` ONLY for interactivity/hooks/state.
- **CSS:** Use Tailwind CSS v4 (CSS-first). Use native CSS variables (e.g., `--color-primary-win`) for theme-specific colors. Avoid `@apply` unless strictly necessary for complex components.
- **Data Fetching:** Use Apollo Client. Handle `Loading` and `Error` states globally or via standard UI patterns.

## 5. Directory Structure & Organization
- **GraphQL Queries:** `packages/mingo-graphql/src/queries/[module].ts`.
- **Shared Hooks:** `packages/mingo-hooks` (for cross-flow logic).
- **Shared Utils:** `packages/mingo-utils`.
- **UI Components:** `packages/mingo-ui` (or equivalent). Every UI component **must** have a corresponding Jest test file.

## 6. Testing Strategy (Mandatory)
- **Backend:** Jest for unit/integration (`*.spec.ts`). Run: `pnpm --filter api test`.
- **Frontend E2E:** Cypress for critical flows (deposit -> bet -> result). Run: `pnpm --filter web cy:open`.
- **UI Components:** Jest for unit/component testing.

## 7. Code Style & Quality
- **Self-Documenting Code:** NO unnecessary comments (e.g., // Adding balance). Use JSDoc only for complex betting logic.
- **Linting:** Zero tolerance for `// @ts-ignore` or `/* eslint-disable */`. Run `pnpm lint` before finishing.
- **Git Commits:** Follow Conventional Commits: `type(scope): message` (e.g., `feat(web): add login`). Use English for commits.

## 8. Development Workflow
- After changing `schema.gql` or queries, run `graphql-codegen`.
- Do not manually edit generated files.
- Ensure all new tasks are declared in `turbo.json`.
