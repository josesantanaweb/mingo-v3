
  # Reglas del Proyecto: Betting Mingo App (Turborepo)

  ## 1. Stack Tecnológico
  - Monorepo: Turborepo (pnpm)
  - Backend: NestJS + GraphQL (Code First)
  - Frontend: Next.js + Apollo Client + Tailwind CSS v4
  - DB: Prisma + PostgreSQL

  ## 2. Gestión de Tipos (Crucial)
  - NO inventar interfaces para entidades de BD.
  - Usar siempre `@repo/types`.
  - Flujo: Si cambia el esquema de Prisma, exportar el tipo de Prisma hacia `@repo/types` usando:
    `export type User = import('@prisma/client').User;`
  - Los tipos de GraphQL deben coincidir con estos tipos base para mantener consistencia.

  ## 3. Estilos (Tailwind v4)
  - Usa la nueva sintaxis de Tailwind v4 (CSS-first configuration).
  - Prioriza variables CSS nativas para temas de la app de apuestas (ej. --color-primary-win).
  - No uses `@apply` a menos que sea estrictamente necesario para componentes complejos.

  ## 4. Lógica de Apuestas (Reglas de Oro)
  - Todas las transacciones de dinero/puntos DEBEN ocurrir dentro de una `$transaction` de Prisma.
  - Los resolvers de NestJS deben usar `UseGuards(JwtAuthGuard)` para cualquier operación privada.
  - El Frontend debe manejar estados de "Loading" y "Error" de Apollo de forma global.

  ## 5. Organización de Archivos
  - Queries de GraphQL: Siempre en `packages/mingo-graphql/src/queries/[modulo].ts`.
  - Hooks: Los hook que se consideren que se usaran para otros flows agregarlos en el `packages/mingo-hooks` para que sean reutilizables.
  - Utilidades compartidas: Preferir `packages/mingo-utils` antes de duplicar helpers en `apps/*`.
 - Tipos compartidos: Agregar en `packages/mingo-types` y consumir via `workspace:*`.

  ## 6. Estrategia de Testing (Obligatorio)
  - **Backend (NestJS):** Usa **Jest** para Unit Tests y Integration Tests.
    - Archivos: `*.spec.ts`.
    - Comando: `pnpm --filter api test`.
  - **Frontend (Next.js/UI):** Usa **Cypress** para End-to-End (E2E) y Component Testing.
    - Los tests de flujo de apuesta (depósito -> apuesta -> resultado) DEBEN ser en Cypress.
    - Comando: `pnpm --filter web cy:open` o `cy:run`.
  - **Mingo components UI (Next.js/UI):** Usa **Jest** para Unit Tests y Component Testing. Es decir cada component ui que se agrege debe tener su test

  ## 7. Estilo de Código y Linting (Estricto)
  - **Cero Comentarios Innecesarios:** NO añadas comentarios explicativos dentro del código (ej. "// Aquí sumamos el saldo"). El código debe ser autodocumentado. Solo usa JSDoc en funciones complejas de lógica de apuestas.
  - **Respeto al Linter:** Antes de dar por finalizada una tarea, DEBES ejecutar el linter del proyecto.
    - Comando: `pnpm lint` o `npx eslint . --fix`.
  - **Prohibido Ignorar Errores:** No uses `// @ts-ignore` ni `/* eslint-disable */`. Si hay un error de tipos o de lint, corrígelo siguiendo las mejores prácticas del stack.
  - **Formateo:** Usa la configuración de Prettier del proyecto. No cambies comillas simples por dobles (o viceversa) si no es el estándar actual.

  ## 8. Reglas de Next.js (version actual)
  - Actualmente usamos Next 14.x y React 18.x en `apps/*`.
  - **Server/Client Components:** Usa "use client" solo si hay hooks/estado/eventos. Todo lo demas debe ser Server Component por defecto.
  - **App Router:** Mantener rutas en `apps/*/src/app` y evitar mezclar Pages Router.
  - **Actualizaciones mayores:** Si se sube Next 15/16 y React 19, entonces aplicar las reglas de APIs async y hook `use`.

  ## 9. Reglas de NestJS y Prisma
  - **Detección de Cambios en DB:** Siempre que modifiques el archivo `schema.prisma`, ejecuta automáticamente `npx prisma generate` para actualizar los tipos.
  - **Validación:** Usa siempre `ValidationPipe` global. Todos los DTOs deben tener decoradores de `class-validator`.
  - **Inyección de Dependencias:** Prefiere siempre el uso de interfaces o clases abstractas para los servicios si vas a realizar testing pesado.
  - **Performance:** En los Resolvers de GraphQL, usa `@Args()` con tipos de TypeScript explícitos que coincidan con los `InputType`.

  ## 10. Codegen y API GraphQL
  - Si cambia `apps/api/src/schema.gql` o se agregan queries nuevas, correr `graphql-codegen` en `apps/*`.
  - No editar tipos generados a mano; siempre regenerar.

  ## 11. Turborepo y dependencias internas
  - Cualquier nueva tarea debe declararse en `turbo.json` para el pipeline.
  - Dependencias internas entre paquetes deben usar `workspace:*`.
  - Evitar overrides que desalineen versiones de `next`, `react` y `react-dom` con las apps.

  ## 12. Reglas de Git
  - **Mensajes de Commit:** Usa siempre el estándar de Conventional Commits (feat:, fix:, chore:, refactor:, docs:).
  - **Idioma:** Los mensajes de commit deben ser en [INGLÉS/ESPAÑOL].
  - **Scope:** Incluye el nombre del package o app afectada entre paréntesis, ej: `feat(web): add login page`.
