# OWNER_RELEASE — 10R12 production analytics + SEO acceptance (mistfall-hunter)

- Derived from owner direction on 2026-08-10 in topic `telegram:-1004485313257:5136`. This release is bounded by 10R11 PASS (PASS verdict on 10R10 round-2 repair) and adds the production analytics + SEO acceptance layer.
- Project: `mistfall-hunter`; workspace: `/root/.hermes/projects/shipsolo/mistfall-hunter`; active execution topic: `telegram:-1004485313257:5136` (build+ops unified per owner 2026-08-09 explicit confirmation; no new ops topic).
- Live target: `https://mistfallhunter.co` (current production Worker `52d6c1ce-0dfa-4943-89d9-58459bd06921`, source commit `d08de0a`).
- Canonical sources of truth: 06R3 archive + manifest + checksums; PRD V1; frozen copy; 10R10 Privacy base; 10R11 scoped Re-QA report; 10R9 NO-GO closure evidence.
- No new cookies / no consent banner. All analytics load by default with opt-out links (owner decision 2026-08-10).

## Permitted scope (this release)

1. **Plausible** (self-hosted at `https://plausible.shipsolo.io`) — add a single client-side `<script defer data-domain="mistfallhunter.co" src="https://plausible.shipsolo.io/js/script.js"></script>` to the global `<head>` in `app/layout.tsx`. Plausible does **not** require consent and stores no PII; only anonymous page-view aggregates.

2. **GA4** (Measurement ID `G-GJRSQJV4XE`) — embed the standard `googletagmanager.com/gtag/js` block with `G-GJRSQJV4XE` config. Loaded by default per owner direction; opt-out link in Privacy §4.

3. **Microsoft Clarity** — read `CLARITY_PROJECT_ID` from `/root/.hermes/credentials/.env.site` (referenced by the workspace symlink `~/.hermes/projects/shipsolo/mistfall-hunter/.env.site`). Embed `<script>(function(c,l,a,r,i,t,y){...})(window,document,"script","https://www.clarity.ms/tag/"+i,"<CLARITY_PROJECT_ID>")</script>` (with the placeholder replaced at build time via `next.config.ts` env injection). Loaded by default per owner direction; opt-out link in Privacy §4.

4. **GSC HTML-meta verification** — add `<meta name="google-site-verification" content="Dnjb2JemYHtDyQPbzM-RMpIkIINPtcF1unhsK5QrVvQ" />` to the global `<head>` in `app/layout.tsx`. This is the HTML-meta verification method owner provided.

5. **robots.txt** — replace the current `User-Agent: * / Disallow: /` blocker with `User-Agent: * / Allow: /` plus a `Sitemap: https://mistfallhunter.co/sitemap.xml` line. This is required for any search-engine crawler to discover the site at all.

6. **Privacy text — analytics disclosure** — rewrite §4 to acknowledge the four analytics services now in use:
   - Plausible (anonymous page-views, no PII, no cookies, self-hosted at plausible.shipsolo.io).
   - Google Analytics 4 (anonymous + IP-truncated, default 14-month retention, opt-out link provided).
   - Microsoft Clarity (session recording + heatmaps, anonymous, opt-out link provided).
   - Data is anonymous and aggregated; no PII is collected; you may opt out via the links in the next subsection.
   - Drop the prior "does not load Google Analytics 4" and "does not load Cloudflare Web Analytics" absence-statements; replace with the new disclosure + opt-out subsection.
   - §9 retention updated to match the new disclosures (Plausible does not set a fixed retention; GA4 default 14 months; Clarity default 36 months).
   - §5 cookies stays as "no cookie-consent banner", with an explicit note that analytics are loaded by default per owner decision for US/English audience.

7. **Production redeploy** — `npm run opennext:build && npx wrangler deploy` (split to bypass the .next write race documented in 10R10 release notes). Update `outputs/09-qa/live-audit/deploy-info.json`.

8. **Independent scoped Re-QA** — open a new Kanban task (10R13) for QA verifying ONLY:
   - All four `<script>` tags render in production HTML for `/` (curl raw HTML).
   - Privacy §4 contains the new disclosure + opt-out subsection; no 04R4 disallowed claims (no active GA4 retention-as-14-months-as-positive, no active Cloudflare Web Analytics claim, no D1/R2 active claim, no consent-banner-in-operation claim).
   - `/robots.txt` returns `Allow: /` + `Sitemap: ...`.
   - `<meta name="google-site-verification" content="Dnjb2JemYHtDyQPbzM-RMpIkIINPtcF1unhsK5QrVvQ" />` is present in live HTML.
   - Sitemap, favicon, 10R10 fixes (3 P0 tools, 44px, /checklist persistence) all still pass (regression spot-check).

## Ahrefs (owner-self-served, NOT in this release scope)

Ahrefs is a third-party SEO tool; it has no client-side SDK on the site. Owner will add `mistfallhunter.co` to Ahrefs manually and import data from Google Search Console after GSC verification succeeds. **No coordinator / worker action needed for Ahrefs in this release.** Logged in `outputs/00-kanban/post-launch-reminders.md` Reminder 2.

## Hard non-goals / locks
- No DNS / Cloudflare zone mutation (GSC verification is HTML-meta, not DNS).
- No new cookies / no consent banner.
- No Stripe / payment / OAuth.
- No GSC submission of sitemap before verification is confirmed; verify first, then submit.
- No mutation of `outputs/06-design/mistfall-hunter-06R3-design-rev-20260808.tar.gz` or its `manifest.json`/`checksums.json`.
- No mutation of `outputs/02-prd-v1/` or `outputs/05-copy/seo-copy-freeze.md` without owner re-confirmation.
- Privacy must NOT re-introduce any 04R4 disallowed claim (active Cloudflare Web Analytics, active consent banner, D1/R2 use, fixed retention period as a positive statement). The 14-month figure may only appear inside GA4 retention disclosure context.

## Required completion evidence
- Frontend (`qianduan`): commits in the repo showing all five changes; `npm run opennext:build && npx wrangler deploy` log excerpt; updated `deploy-info.json`; raw HTTP probe of `/`, `/robots.txt`, `/sitemap.xml`, `/privacy` returning 200 with the new content; 1280 screenshot of `/` showing the rendered HTML-meta verification tag in DevTools-equivalent raw view.
- Compliance (`hegui`): new authoritative Privacy text at `outputs/05-copy-repair/10r12-analytics-disclosure.md`; before/after diff for `/privacy`; screenshots at 1280 + 360; explicit statement that no disallowed claim was re-introduced.
- QA (10R13 scoped Re-QA, scoped): see Permitted scope §8 above.

## Owner-authorized credential access
Coordinator may read `/root/.hermes/credentials/.env.site` to obtain `CLARITY_PROJECT_ID`. The token must not be printed into any chat message, long-term memory, or commit. The script block uses the placeholder replaced at build time via `next.config.ts` env injection (or via a server-rendered `<head>` child).