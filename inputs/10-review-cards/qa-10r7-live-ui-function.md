## Task for QA: 10R7 live UI/function + interaction acceptance audit

Authority: `inputs/02-owner-confirmations/owner-release-10R7-live-readiness-audit-20260809.md`.

Perform read-only black-box acceptance on `https://mistfallhunter.co`; do not mutate anything.

Scope:
- Verify all 10 advertised tool routes and their primary user flow: input/select/filter → result/interaction → share/export where visible; record no-op/dead CTA/errors/console/network faults.
- Validate Home, navigation, internal links, About/Privacy/Terms/Contact, key guide/content routes and mobile nav.
- At 1280, 360, 390 and 430 verify first-screen integrity, touch targets, no clipping/horizontal overflow, and visual/interaction correspondence to the 06R3 design handoff.
- Check visible English landing/route copy against PRD V1 / 02D / frozen copy; flag missing, materially divergent, placeholder, or unsupported claims.

Deliverables: `outputs/09-qa/live-audit/10r7-live-ui-functional-acceptance.md`, machine-readable test matrix, screenshots/console evidence; coverage count and scoped verdict PASS/NEEDS_REPAIR/NO-GO/BLOCKED_EVIDENCE.

Non-goals: no login, forms with real submissions, source/Git, deploy/DNS/Cloudflare/cache/GSC/analytics/email actions. ACK/BLOCKED/DONE with verifiable evidence.