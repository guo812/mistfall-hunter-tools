# OWNER_RELEASE — 10R Local SEO Repair

- Project: `mistfall-hunter`
- Issued: 2026-08-09
- Authority source: Owner messages in Telegram build topic `-1004485313257:4537`: **「继续修复」** and **「继续」**.
- Active topic: `telegram:-1004485313257:4537` (build)
- Workspace: `/root/.hermes/projects/shipsolo/mistfall-hunter/`
- Kanban board: `site-mistfall-hunter`
- Supersedes scope gap only: this release supplements, and does not broaden, `owner-release-07-08-local-implementation-20260808.md`.

## Bound tasks

- `t_7bcf8cae` — 10R-A content repair
- `t_f7468a10` — 10R-A2 content quality correction (NO-GO evidence only; superseded for repair scope)
- `t_171c02fc` — 10R-A3 full copy quality repair
- `t_2630cbd0` — 10R-B frontend SEO integration
- Follow-up local-only SEO/PM/QA rechecks that verify this repair, when their task cards explicitly cite this release.

## Authorized local scope

### 10R-A Content repair — content
1. Read the frozen copy package and SEO recheck evidence already in this project workspace.
2. Write only local, machine-readable per-route copy artifacts under `outputs/05-copy-repair/`.
3. Complete the 43 content pages at 2,000–3,000 words each and the 10 tool pages at 500–800 words each; preserve frozen TDK/H1/Direct Answer and dedicated frozen FAQs.
4. Produce word-count, FAQ, prohibited-claim, and pairwise uniqueness evidence proving Jaccard `<0.40` (at least 60% route-unique content).

### 10R-B Frontend SEO integration — qianduan
1. Integrate only approved local copy artifacts into the existing local Next.js/OpenNext project.
2. Repair the SEO findings in `outputs/10-seo-recheck/seo-recheck-report.md`: frozen TDK/DA, FAQPage/Organization/Breadcrumb/ItemList JSON-LD, homepage title/canonical alignment, and SSR-readable items/loot/POI content.
3. Run only local build, OpenNext build, localhost preview/smoke, and local audit evidence.
4. Write evidence only under this project workspace, including `outputs/07-frontend/` and/or `outputs/10-seo-recheck/`.

## Mandatory local acceptance conditions

- 43 content pages: 2,000–3,000 words; 10 tools: 500–800 words.
- Route uniqueness: Jaccard `<0.40` using the established audit method.
- Frozen TDK/H1/DA values are used verbatim; each route has at least 3 allocated frozen FAQs.
- `/items`, `/loot-finder`, and `/map` provide SSR-readable useful data states.
- Re-run the existing local SEO audit after integration and attach evidence. Passing a local audit does not authorize production release.

## Explicit non-goals / still locked

This release does **not** authorize Cloudflare mutations, D1/R2, secrets, remote bindings, Git push, production deploy, custom-domain/DNS changes, registrar actions, GSC/Bing/IndexNow submission, analytics activation, promotion, public release, login, payments, OAuth, paid tiers, real-user-data collection, or any other external/public action.

## Reporting

- Every ACK/BLOCKED/DONE must include the bound task ID and verifiable project-workspace paths.
- `DONE` requires local evidence; it does not authorize the next production or launch stage.
