# OWNER_RELEASE — 07/08 Local Implementation

- Project: `mistfall-hunter`
- Issued: 2026-08-08
- Authority source: Owner message in Telegram build topic `-1004485313257:4537`: **「放行」** after 06C design confirmation and thin-content/indexability review.
- Active topic: `telegram:-1004485313257:4537` (build)
- Workspace: `/root/.hermes/projects/shipsolo/mistfall-hunter/`
- Kanban board: `site-mistfall-hunter`
- Bound tasks: `t_716d78ab` (08 backend/data), then `t_a4cb8776` (07 frontend)

## Authorized local scope

### 08 Backend / data — houduan
1. Create local data contracts, schemas, deterministic seed datasets, API adapter interfaces, validation scripts and local tests for the 10 tool routes.
2. Establish local-compatible Workers/D1/R2 architecture/configuration stubs only when they do not create or mutate remote Cloudflare resources.
3. Satisfy thin-content P1-1 inputs for `/items`, `/loot-finder`, and `/map`: source/seed data must be sufficient for the frontend to render non-empty, useful V1 pages; record source date and provenance/asset ledger references.
4. Write artifacts only under this project workspace and `outputs/08-backend-data/`.

### 07 Frontend — qianduan
1. After 08 completes, implement the local site with Next.js + TypeScript + Tailwind + OpenNext Workers compatibility, using the 06R3 design package as visual source.
2. Implement the frozen 58-route matrix, canonical `https://mistfallhunter.co`, 10 tool routes, metadata/schema/sitemap/robots, frozen copy, Steam CTA, non-official disclosures, and no login/paywall.
3. Implement the confirmed hero: `Browse Guides`, `Explore Classes`, the four search-intent hub cards, Class Quiz only in navigation, and `prefers-reduced-motion` motion fallback.
4. Run local build, local preview/smoke and 360/390/430 mobile checks. Write evidence only under `outputs/07-frontend/`.

## Mandatory acceptance conditions

- Four complex tool routes `/squad-builder`, `/matchups`, `/build-planner`, `/map` each carry 500–800 words of useful supporting content; no placeholder/Coming Soon state.
- Page content must be at least 60% route-unique; no find-and-replace clones.
- `/items`, `/loot-finder`, `/map` must render usable seed/data states, not empty shells.
- 58 public routes are indexable; `noindex` only for `/api/*` and `/404`; sitemap includes all public routes.
- Preserve copyright/non-official wording and source/provenance record. Never use official logo as site logo.

## Explicit non-goals / still locked

This release **does not authorize**:
- Cloudflare account mutations, D1/R2 creation, remote migrations, secrets, remote bindings, Git push, production deploy, custom-domain/DNS changes, registrar actions, GSC/Bing/IndexNow submission, analytics activation, promotion, or public release.
- Login, payments, OAuth, paid tier, paywall, or collection of real user data.
- Any publication or external-service action beyond read-only research required by the existing contracts.

## Reporting and evidence

- Kanban worker claim is valid receipt when an isolated worker cannot post into the forum topic; project-topic messaging remains best effort and must not gate local work.
- ACK/progress/BLOCKED/DONE must include the bound task id and verifiable workspace artifact paths.
- A `DONE` must include tests/build evidence. Completion does not authorize the next production/launch step.
