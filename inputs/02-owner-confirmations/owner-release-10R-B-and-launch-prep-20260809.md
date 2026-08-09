# OWNER_RELEASE — A3 integration, controlled launch preparation

- **Project:** `mistfall-hunter`
- **Domain:** `mistfallhunter.co`
- **Active build topic:** `telegram:-1004485313257:4537`
- **Workspace:** `/root/.hermes/projects/shipsolo/mistfall-hunter`
- **Authority source:** owner instruction in the project build topic: “你兜底完成快点推进。我要马上上线抢流量，我一直问这也太累了”.
- **Date:** 2026-08-09

## Supersedes

This release supersedes the stale A2-dependent block recorded on `t_2630cbd0`. The currently canonical copy evidence is A3: `t_171c02fc` DONE and `outputs/05-copy-repair/reviews/independent-semantic-a3-post-remediation-20260809.md` = `PASS_FOR_NEXT_REVIEW_GATE`.

## Authorized scope now

1. **Frontend integration — local only:** unblock and complete `t_2630cbd0` against the A3 canonical copy; integrate the 54 route bodies, frozen metadata/direct answers/FAQs, required SSR data and JSON-LD; run serial clean build + OpenNext package build + local route/SEO audit; write evidence only in the project workspace.
2. **Fresh independent gates — read-only:** execute new SEO, compliance, PM and QA rechecks against the reconciled implementation. Do not reuse the pre-A3 PM `NEEDS_REPAIR` verdict as current evidence.
3. **Launch preparation:** after all four gates are terminally PASS/GO, inspect real deployment and domain prerequisites, then prepare the exact production deployment/smoke sequence. 

## Release boundary

- The owner has requested rapid launch; do not introduce ceremonial confirmation loops.
- **Still required before a production claim:** fresh terminal SEO/compliance/PM/QA verdicts, a successful build, an authenticated deploy path, and live production smoke evidence.
- Remote Cloudflare deployment, custom-domain/DNS mutations, cache purge, GSC/Bing/IndexNow submissions, external promotion, email routing, OAuth/payment/secrets changes remain action-specific and must be performed only when their concrete prerequisite is verified. Missing permissions are a hard blocker and must be reported with the exact dashboard action; do not fake completion.
- No payment, paid promotion, subscription, OAuth, secret exposure, or external community/marketing posting is authorized by this release.

## Required evidence

- Current source and A3 copy provenance/reconciliation
- Clean `npm run build` and project-defined OpenNext build output
- Route/metadata/schema/SSR audit, including 54 content routes and sitemap matrix
- New independent SEO/compliance/PM/QA conclusions and mobile 360/390/430 evidence
- If production is reached: deployment version, production URL, HTTP/sitemap/robots/canonical smoke evidence, and explicit remaining external-account gaps
