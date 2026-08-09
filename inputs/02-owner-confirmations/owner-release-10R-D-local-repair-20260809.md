# OWNER_RELEASE — 10R-D / 04R4 P0-P1 local repair

- Project: `mistfall-hunter`
- Domain: `mistfallhunter.co`
- Active build topic: `telegram:-1004485313257:4537`
- Workspace: `/root/.hermes/projects/shipsolo/mistfall-hunter`
- Date: 2026-08-09
- Derived authority: owner’s active instruction to take over, complete, and launch quickly without repeated confirmation loops.

## Why this release exists
Fresh independent 04R3 compliance and 02P-R PM rechecks found the same release blockers:
- **P0:** public-facing `[DATA-PENDING: 08 ...]` placeholders on 33 routes, visible and in FAQPage JSON-LD.
- **P1:** Privacy/Terms/Contact routes render trust-page stubs rather than the frozen `outputs/05-copy/trust-pages-final-copy.md` body.

## Bound Kanban repair cards (this release is task-specific)

- `t_3621946c` — **content / 文案写作主管-05**; only writable files: `outputs/05-copy-repair/routes/**/*.json` and task-scoped evidence under `outputs/05-copy-repair/`.
- `t_774f96be` — **qianduan / 前端开发主管-07**; starts only after `t_3621946c` is terminal `done`; only app integration/build/evidence as stated below.

No other writer or repair task is bound by this release. The prior `owner-release-10R-B-and-launch-prep-20260809.md` remains historical authority for its completed integration/review scope and does not override this task-specific remediation release.

## Authorized local repair scope
1. `content` (`t_3621946c`) updates only the frozen A3 route-copy source artifacts needed to replace all 56 `DATA-PENDING` tokens with user-facing, truthful neutral English; preserve exact frozen TDK/direct answers/route contracts and write scanner evidence requiring zero residual visible/schema token hits.
2. `qianduan` (`t_774f96be`) integrates the repaired A3 source and the frozen trust-page body into the Next app; rebuild and package locally; write route/render evidence.
3. New independent 04R4 compliance, 10R-D SEO, and 02P-R2 PM rechecks must be terminal PASS before local QA. All review lanes are read-only.

## Non-goals / locks unchanged
No Git push, deployment, Cloudflare/DNS/cache change, analytics, Email Routing, GSC/Bing/IndexNow, secrets, payment/OAuth, external promotion, or public release. Production remains locked pending fresh rechecks and QA.

## Acceptance
- zero `[DATA-PENDING` / internal Chinese placeholder hits in A3 source, visible rendered HTML, and all JSON-LD;
- Privacy/Terms/Contact use the frozen trust-page copy and have required truthful sections;
- clean serial `npm run build` plus project-defined OpenNext package build;
- fresh 04R4 + 10R-D + 02P-R2 PASS, then independent 09R local QA.
