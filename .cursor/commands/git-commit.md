# Git Create Commit - Betting Monorepo

## Overview
Crea un mensaje de commit profesional, corto.

## Steps
1. **Review changes**
    - Check the diff: `git diff --cached` (if changes are staged) or `git diff` (if unstaged).
2. **Stage changes**
    - `git add -A` (unless the user specifies only certain files).
3. **Create commit message**
    - Format: `git commit -m "<issue-key>: <type>(<scope>): <short summary>"`
    - If no key: `git commit -m "<type>(<scope>): <short summary>"`

## Rules
- **Length:** Max 72 characters.
- **Imperative mood:** Use "fix", "add", "update" (NOT "fixed", "added").
- **No period:** Do not end the message with a period.
- **Standard Types:** `feat`, `fix`, `refactor`, `chore`, `test`, `docs`, `style`.

## Examples
- `feat(api): implement atomic transaction for bet placement`
- `fix(web): solve hydration error in betting slip with Next 15`
- `db(api): add win_amount column to Bet table`
- `chore(deps): upgrade to React 19 and Tailwind v4`
