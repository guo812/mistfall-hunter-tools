# OWNER_RELEASE — 10R6 live design/copy fidelity audit

- Derived from owner instruction on 2026-08-09: check the live site against the design handoff package and delivered copy.
- Project: `mistfall-hunter`; workspace: `/root/.hermes/projects/shipsolo/mistfall-hunter`; active build topic: `telegram:-1004485313257:4537`.
- Live target: `https://mistfallhunter.co` (read-only verification target; HTTP 200 observed by coordinator).

## Permitted scope
1. Read-only inspect the canonical 06-design package, manifest/checksums/tar integrity, handoff, frozen copy and the live site at desktop plus 360/390/430 mobile widths.
2. Compare design composition, components, assets, navigation, CTA labels, typography/token approximations, route coverage, visible copy, title/meta/canonical, and trust-page wording.
3. Produce screenshots, DOM/geometry evidence and a route/itemized PASS / mismatch report only under `outputs/06-design/live-audit/`.

## Required delivery
- A single `PASS`, `NEEDS_REPAIR`, `NO-GO`, or `BLOCKED_EVIDENCE` verdict.
- Exact affected route/screen and source-of-truth reference for every mismatch; distinguish production drift from approved local-but-not-deployed materials.
- Evidence at 1280 desktop and mobile 360/390/430; validate no horizontal overflow and full first screen.
- Verify design package with the four-way verifier and record its result.

## Explicit non-goals / locks
No source, Git, Worker/Cloudflare/DNS/configuration, cache purge, analytics, Email Routing, deployment, production mutation, publication, or rollout. This audit does not approve the live site.
