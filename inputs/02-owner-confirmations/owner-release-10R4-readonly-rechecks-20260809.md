# OWNER_RELEASE — 10R4 fresh local read-only rechecks

- Project: `mistfall-hunter`; board `site-mistfall-hunter`; workspace `/root/.hermes/projects/shipsolo/mistfall-hunter`; build topic `telegram:-1004485313257:4537`.
- Authority: the active 10R-D local-repair release plus owner [G] continuation/expedite instructions in this project topic.
- Immutable local repair handoff: frontend task `t_774f96be`, receipt `outputs/07-frontend/10r-d-frontend-repair-receipt-20260809.md`, rendered audit `outputs/07-frontend/10r-d-rendered-route-audit-20260809.json`.

## Authorized scope
Independent `hegui`, `seo`, and `prd` rechecks may read the repaired local workspace, run local build/preview/audit scripts as needed, and write review evidence under their own `outputs/` review folders. Their task IDs are bound in the section below before they may start.

## Bound review cards
- `t_4ee0e876` — `hegui`: 04R4 compliance local recheck, output only under `outputs/04-compliance/reviews/`.
- `t_c1f9e153` — `seo`: 10R-D SEO local recheck, output only under `outputs/10-seo-recheck/reviews/`.
- `t_cc3cbae5` — `prd`: 02P-R2 PM local acceptance, output only under `outputs/02P-pm-acceptance/reviews/`.

## Required verdict / non-goals
Each reviewer gives only `PASS`, `NEEDS_REPAIR`, `NO-GO`, or `BLOCKED_EVIDENCE` based on independently reproducible local evidence. No source edits, Git, deploy, Cloudflare/DNS/cache, email routing, analytics, GSC/Bing/IndexNow, credentials, external promotion, or public action. A PASS is not production authorization. All three terminal PASS are prerequisites to independent local QA.
