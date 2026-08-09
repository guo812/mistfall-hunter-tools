# OWNER_RELEASE — 10R-A3 Canonical Copy Repair Resume

- Project: `mistfall-hunter`
- Issued: 2026-08-09
- Authority source: Owner message in build topic `telegram:-1004485313257:4537`: **「继续修复吧，修复前请清晰传达全部要求」**.
- Active topic: `telegram:-1004485313257:4537` (build)
- Board: `site-mistfall-hunter`
- Workspace: `/root/.hermes/projects/shipsolo/mistfall-hunter/`
- Bound implementation task: `t_171c02fc` — 10R-A3 full copy quality repair
- Canonical QA task completed: `t_f86c178b`
- Supersedes: the “restore clean baseline / approved source package” stop reason only. This does not broaden the existing local-only authority in `owner-release-10r-local-seo-repair-20260809.md`.

## Mandatory reading order

1. `project-control.md`
2. this release
3. `outputs/05-copy-repair/qa-a3-scanner-integrity-audit.md` — canonical acceptance specification
4. `outputs/05-copy/seo-copy-freeze.md`
5. `outputs/05-copy/faq-schema-copy.md`
6. `outputs/05-copy/trust-pages-final-copy.md`
7. `outputs/02-prd-v1/prd-v1-master-spec-bilingual.md`
8. `outputs/05-copy-repair/qa_copy_a3.py` and current task-scoped A3 evidence

## Exact authorized scope

- Continue from the frozen sources above; no backup or Git baseline is required.
- Edit **only** local route-copy artifacts under `outputs/05-copy-repair/routes/**/*.json` and task-scoped local QA/evidence under `outputs/05-copy-repair/`.
- Naturally rewrite the defective route prose manually and route-by-route. Preserve already-valid localized repair work when it passes the canonical scanner.
- Make the canonical scanner and its JSON/Markdown receipt meet the audit specification. Do not treat the legacy/A2 scanner as a pass source.

## Exact repair requirements — all must pass for all 54 routes

1. **Coverage and schema:** exactly 54 parseable JSON route files and exactly 54 unique expected paths. No missing/unexpected/duplicate paths or required-field/schema failures.
2. **Frozen route facts:** `title`, `meta`, `h1`, and `directAnswer` must match their frozen route-specific values; do not rewrite them. Preserve route-associated frozen FAQ question/answer pairs.
3. **Body ranges:** all 43 content routes = 2,000–3,000 canonical-body words; all 10 tool routes = 500–800; `/` = 700–1,100. Count H1, direct answer, section headings/paragraphs/bullets/tables and FAQ Q&A; exclude title/meta from body count.
4. **FAQ allocation:** every route has ≥3 frozen, route-allocated FAQs; zero FAQ count, frozen-question, pair-integrity, or allocation misses.
5. **Template residue:** scan all prose fields across all 54 routes for both the A2 and A3 `For/In … guides/codes … context/note` namespaces. Required result: zero hits.
6. **Intra-page originality:** zero exact repeated paragraphs or sentences of ≥12 normalized words; zero material paragraph/section overlap under the canonical thresholds. Do not repeat boilerplate to hit word counts.
7. **Cross-route originality:** all unordered route pairs must have 5-word-shingle Jaccard `<0.40`; required failure count = zero. Each route needs meaningful task-specific prose, not token-swapped templates.
8. **Compliance:** restore the full compliance banned-claim policy. Zero unsupported official/partner/endorsement, guarantee, copyright, paid-tier, competitor/domain, or misleading-free claims. The only exception is the frozen negative non-affiliation sentence in the home FAQ, precisely contextual and not reusable elsewhere.
9. **Semantic quality:** prose must be readable English, user-task-specific, factual/qualified where game facts are uncertain, and never invented as a substitute for sources. No placeholders, filler, generated tokens, batch substitution, or script-generated route prose.
10. **Evidence/provenance:** produce a task-scoped canonical JSON + Markdown receipt recording scanner SHA-256, exact command, frozen inputs, 54-route manifest comparison, immutable count fields, timestamp, and every failed path/pair if any. Do not manually edit a report to claim PASS.

## Current baseline and work order

- Canonical QA baseline is **NO-GO**: word-range failures `11`, intra-page duplicate groups `312`, pairwise Jaccard failures `55`; template residue, FAQ<3 and frozen-question misses currently zero.
- First repair the 11 long guide routes responsible for duplicate/word/Jaccard failures. Use the canonical scanner after each bounded batch; do not lower any threshold.
- Then run the full canonical 54-route scan and write a new task-scoped result. A full zero-failure scan is necessary but not by itself frontend approval: it must be independently QA-reviewed.

## Strict non-goals / locks

No edits to `app/`, package/config files, CSS/design/brand, backend/data contracts, Git, GitHub, deployment, Cloudflare/D1/R2, DNS/registrar, analytics, GSC/Bing/IndexNow, login/payment/OAuth, promotion, or any remote/public system. Do not unblock `t_2630cbd0` frontend integration, PM acceptance, QA, launch, or any downstream stage.

## Status protocol

- Start only after this complete requirement set is read; ACK with task ID and evidence directory.
- Progress only after a material measured batch; include current canonical counts.
- BLOCKED immediately only for a true scope/authority/input defect, naming the exact missing item. The absence of a historical clean route baseline is explicitly **not** a blocker.
- DONE only when the canonical full-package result is PASS and all artifacts are written. Otherwise return `NEEDS_REVIEW` with real counts.
