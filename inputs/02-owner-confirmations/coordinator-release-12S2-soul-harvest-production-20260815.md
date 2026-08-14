# Coordinator Release — 12S2 Soul Harvest production update

**Date:** 2026-08-15
**Owner authorization:** `[G] 主控独立完成文案确认及上线修改，改的时候注意不要大改，不要影响现在seo`

## Binding inputs

- Copy freeze verdict: `outputs/12S-soul-harvest/review/12S1-independent-fact-scope-review-20260814.md` (`PASS_FOR_COPY_FREEZE`)
- Frozen copy: `outputs/12S-soul-harvest/copy/soul-harvest-copy-route-brief.md`
- Fact boundary: `inputs/02-owner-confirmations/owner-release-12S1-soul-harvest-update-20260814.md`
- Production target: `https://mistfallhunter.co`

## Authorized scope

Main controller only; no delegated writer.

1. Add the fact-bounded canonical guide route `/guides/soul-harvest`, including its route registration, frozen title/meta/H1/visible Steam source link, FAQ schema, sitemap entry, and a route-specific static social image so the route has no OG/Twitter 404.
2. Add only the frozen Blackarrow/Sorcerer **solo-PvP re-test required** caveat to the existing relevant guide copy; do not make a balance, PvE, tier, ranking, or tactical claim.
3. Perform scoped build, OpenNext bundle, selective commit/push, Wrangler deploy, and production smoke of the changed URL plus SEO-regression sentinels.

## SEO preservation requirements

- Do not change existing route paths, canonical targets, robots policy, sitemap inclusion of existing URLs, global metadata, analytics/legal configuration, or existing TDK except the new route.
- No global reformatting of `lib/copy.ts`; use a parsed, minimal data mutation only.
- New page language must preserve “increases the chance,” never imply certainty, rates, rewards, Richie trade, Season Tasks, Soulgnawer completion, or a walkthrough.

## Explicit non-goals

No DNS/zone mutation, dashboard action, GSC/Bing, IndexNow, analytics change, legal change, payment/login/data migration, external post, broad UI/design change, or unrelated source edit.

## Stop conditions

Stop and report if a required new route cannot pass build, local route/metadata/schema checks, or production marker verification without expanding scope.
