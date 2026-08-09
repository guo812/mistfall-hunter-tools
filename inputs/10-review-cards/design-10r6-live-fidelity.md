## Task for 设计主管: 10R6 live design + copy fidelity audit

Authority: `inputs/02-owner-confirmations/owner-release-10R6-live-design-copy-audit-20260809.md`.

Goal: independently compare the live site `https://mistfallhunter.co` with the canonical 06-design handoff and approved/frozen copy materials; identify production drift without changing anything.

Required inputs:
- `outputs/06-design/mistfall-hunter-06R3-design-rev-20260808.tar.gz`
- `outputs/06-design/handoff-06-design.md`, `outputs/06-design/design-system.css`
- current project source/route contract and frozen-copy references.
- 10R5 draft is owner-review-only and must be labeled **not approved/not deployed**, not treated as live truth.

Scope:
1. Run the design package four-way verifier; locate and report canonical design screen/page map.
2. Audit live root, key tools/content/trust templates and all route-family variants that design/handoff covers. Compare DOM structure, visible copy, nav/footer, CTA, imagery/assets, design tokens and interaction affordances.
3. Capture desktop 1280 and mobile 360/390/430 evidence; geometric checks for hero completeness/no horizontal overflow.
4. Audit title/meta/H1, canonical and public Privacy text specifically. For any mismatch distinguish (a) live vs canonical approved design/copy; (b) local draft vs live; (c) potential legal or release-blocking drift.

Non-goals: no source/Git/deploy/Cloudflare/DNS/cache/analytics/Email Routing or other mutation.

Deliverables: `outputs/06-design/live-audit/10r6-live-design-copy-fidelity-report.md`, machine-readable matrix, screenshots/evidence; exact verdict; summary with route+source reference+severity+recommended owner decision.

Protocol: ACK/已开始; report BLOCKED with exact missing artifact; DONE with report path, asset/checksum evidence, inspected count and conclusion.