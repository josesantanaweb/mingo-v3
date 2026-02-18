---
description: "Genera un commit semántico para el monorepo de apuestas"
agent: build
---

# Tarea: Crear un commit profesional

Sigue estos pasos para procesar los cambios actuales:

1. **Analiza los cambios:** Ejecuta `!git diff --cached` para ver qué se va a commitear.
2. **Determina el Scope:**
    - `api`: Cambios en NestJS/Prisma.
    - `web`: Cambios en Next.js.
    - `ui`: Cambios en componentes @mingo/ui.
3. **Busca el Issue Key:** Revisa el nombre de la rama actual (`!git branch --show-current`) o mensajes previos para encontrar un ID tipo BET-XXX.
4. **Reglas del Mensaje:**
    - **Formato:** `<issue-key>: <type>(<scope>): <Summary>`
    - **Tipos:** feat, fix, refactor, chore, db, deps.
    - **Estilo:** Imperativo (add, fix), capitalizado, sin punto final.
    - **Límite:** 72 caracteres.

**Acción:** Genera el mensaje y ejecuta `!git commit -m "tu mensaje"`.
