# OWNER_RELEASE — 10R7 production readiness: UI/function/design/copy/indexability audit

- Derived from owner instruction, 2026-08-09: audit the actually online site for UI, functional interactions, design/interaction-package fidelity, PRD/PS and English landing-copy compliance, complete internal pages, thin-page risk, and Google Search Console eligibility.
- Project: `mistfall-hunter`; workspace `/root/.hermes/projects/shipsolo/mistfall-hunter`; topic `telegram:-1004485313257:4537`.
- Read-only production target: `https://mistfallhunter.co`.

## Execution lanes
- Design: `t_f3995dc2` — expand existing 10R6 visual/copy audit to cover interaction-package and design coverage.
- QA: current 10R7 QA card (to be created) — real user flows/UI functionality across the 10 tools and key content/trust flows.
- SEO: current 10R7 SEO card (to be created) — all-route crawl/indexability, thin-content, sitemap/robots/canonical/schema and GSC-readiness audit.

## Allowed actions
Read-only requests, browser/device emulation, DOM/network/console observation, source/design/copy artifact comparison, and evidence/report writing under `outputs/09-qa/live-audit/`, `outputs/10-seo-recheck/live-audit/`, and `outputs/06-design/live-audit/` only.

## Required boundaries
No source/Git/config mutations; no deploy, rollback, cache purge, DNS, Cloudflare/GSC/Bing/IndexNow, analytics, Email Routing, payment, remote resource or public-promotion action. This is neither a GSC verification nor a production release approval: report `GSC_ELIGIBLE` / `NOT_ELIGIBLE` based on technical checks only; actual GSC property/coverage needs authenticated GSC evidence.

## Required conclusions
Every lane must report PASS / NEEDS_REPAIR / NO-GO / BLOCKED_EVIDENCE; itemize P0/P1 blockers, route coverage count, and evidence. Any observed deployed copy that conflicts with current capability or approved copy is release-blocking until reconciled.
