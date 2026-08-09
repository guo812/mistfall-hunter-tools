# OWNER_RELEASE — 10R8 production repair & redeploy（mistfall-hunter）

- Derived from owner direction on 2026-08-09: 10R7 only-read audit closed with verdict **NO-GO**. Owner authorized fixing the live site against the approved 06R3 design + frozen copy + tool contracts, redeploying to `https://mistfallhunter.co`, then running independent Re-QA. No separate Owner Review after Re-QA — QA GO auto-advances to launch.
- Project: `mistfall-hunter`; workspace: `/root/.hermes/projects/shipsolo/mistfall-hunter`.
- **Active execution topic: `telegram:-1004485313257:5136`** (current ops topic per project map). The historical build topic `4537` is archived and is **not** the execution topic for this release. All worker ACKs / progress / DONE / BLOCKED must be posted in topic 5136; do not post to 4537.
- Live target: `https://mistfallhunter.co` (must rebuild on top of the current production version; record new version/commit/timestamp after deploy).
- Canonical sources of truth (must be reused as-is; do not silently rewrite):
  - Design: `outputs/06-design/mistfall-hunter-06R3-design-rev-20260808.tar.gz` (sha256 `1c68b99849fa72804cc99ad93d4eed91986e84eb9c1d645830934a62205bed3d`), plus the now-archived `manifest.json` + `checksums.json` at `outputs/06-design/` (manifest sha256 `cba71aea6df78b9cfc3914fd55b6b61bd69c289b2c3d7e0b9a668c4b39404522`).
  - PRD V1: `outputs/02-prd-v1/prd-v1-master-spec-bilingual.md` (owner-confirmed 02C).
  - 02D addendum: `inputs/02-owner-confirmations/owner-confirmation-02D-20260808.md` (routes = 58; canonical `.co`; Steam + 全免费; 10 工具全量上线).
  - Frozen copy: `outputs/05-copy/seo-copy-freeze.md` and `outputs/05-copy/trust-pages-final-copy.md`.
  - **Compliance copy for Privacy: 10R5 is owner-confirmed in this release.** The earlier `owner-release-10R5-compliance-copy-draft-20260809.md` "owner-review-required" gate is superseded by this release. Use the 10R5 package at `outputs/05-copy-repair/10r5-compliance/` as the canonical truth copy; do not push it back through a new content review cycle.
  - Backend data contracts: `outputs/08-backend-data/` (48 items / 6 classes / 24 POIs / 10 toolRoutes / remoteFetch=false).

## Permitted scope (this release)
1. **Homepage**: rewrite hero + first two sections to match 06R3 — CTA stack must be `Play on Steam` + `Browse Guides` + `Explore Classes`; modules must appear in order: `What Hunters Search For` (4-card intent hubs) → `This Week in Mistfall Hunter` (game hotspots) → `What Hunters Are Asking` (player questions). Remove any leftover 06R-era labels such as `Take the Class Quiz`, `Start here`, `Tools` from the hero area.
2. **Build Planner (`/build-planner`)**: deep-to-shallow capability band. Required: primary class selector, **all 6 classes** with full **Talents/perks/weapons/armor/specializations** panels, **Copy Share URL**, shareable build URL with class/spec/loadout encoded. Match PRD V1 §Build Planner.
3. **Interactive Map (`/map`)**: Canvas-based map with **markers/POIs, layer toggles, pan + zoom**, plus extraction route overlay. Match PRD V1 §Interactive Map. Static table fallback is not acceptable.
4. **Matchups (`/matchups`)**: 6×6 clickable matrix; each cell opens class-vs-class analysis. Match PRD V1 §Matchups.
5. **Class Quiz (`/class-quiz`)**: 5 single-choice questions, fit score, reasons list, retake, "View your build" link to `/builds/<class>`. Match PRD V1 §Class Quiz.
6. **Settings (`/settings`)**: PC/PS5/Xbox platform selector + GPU + resolution + target FPS + presets + reset + copy settings URL. Match PRD V1 §Settings.
7. **Tier List (`/tier-list`)**: Solo / Trio / Duo / Beginner mode tabs across all 6 classes with ranking table/cards. Match PRD V1 §Tier List.
8. **Extraction Checklist (`/checklist`)**: 15–20 grouped objectives, localStorage persistence, progress bar, reset, 100% ready confirmation. Match PRD V1 §Checklist.
9. **Privacy (`/privacy`)**: integrate the **10R5 truthful copy** verbatim (canonical: `outputs/05-copy-repair/10r5-compliance/`). Remove every claim of GA4 / Cloudflare Web Analytics / consent-banner operation / D1-R2 usage / fixed retention period unless 04 compliance owner decision has approved it. Use only future-conditional wording where accurate.
10. **Asset reuse**: 06R3 `stitch-export/images/hero-main.png` and 6 class cards + `guide-squad-dungeon.png` are the authoritative visuals; reuse their URLs in the rebuilt components.
11. **Production deploy**: rebuild production Worker with the new bundle, deploy via `npm run deploy` (must run the OpenNext patch step — do NOT bypass with `build` + `wrangler deploy` only), record the new Worker version + timestamp in `outputs/09-qa/live-audit/deploy-info.json`.
12. **Re-QA handoff**: open a new Kanban task (10R9) for QA to run read-only black-box against the new production build; QA verdict PASS is the launch gate.

## Explicit non-goals / locks
- No DNS registrar mutation, no contact/email routing, no Cloudflare zone mutation beyond the deploy itself, no GitHub push that wasn't already scheduled in 07/08.
- No Stripe / payment / OAuth changes (site is 100% free per 02D; V1 has zero paid UI).
- No GSC submission, no IndexNow, no external directory/community post, no production external link building.
- No mutation of `outputs/06-design/mistfall-hunter-06R3-design-rev-20260808.tar.gz` or its now-archived `manifest.json` / `checksums.json` — those are the audit fingerprint and are read-only for this release.
- Privacy page must not reintroduce the disallowed P1-A claims even partially. The 10R5 draft is canonical; do not edit it.
- No new routes beyond the 58 already confirmed in 02D.

## Required completion evidence
- Frontend (`qianduan`) closes tasks 1–8 above; commits source; rebuilds; deploys; records `deploy-info.json` with Worker version + ISO timestamp + commit SHA + `npm run deploy` log excerpt.
- Compliance (`hegui`) integrates 10R5 Privacy copy on `/privacy`; records before/after diff and screenshot evidence under `outputs/04-compliance/live-recheck/`.
- Backend (`houduan`) verifies tool contracts (Build Planner talent tree data, Map POI/layer data, Matchups matrix data, Class Quiz question bank, Settings presets, Tier List rankings, Checklist objectives) match the rebuilt UI; no remote fetch enabled.
- QA (Re-QA, scoped as 10R9) runs the full 10R7 matrix against the new production build: 19 routes × 4 viewports + raw HTTP + console/network capture + 20 screenshots; required verdicts: PASS / NEEDS_REPAIR / NO-GO / BLOCKED_EVIDENCE. Verdict PASS auto-advances to launch; NEEDS_REPAIR / NO-GO loops back to the responsible lane with this release re-applied.

## Worker communication contract
- ACK / progress / DONE / BLOCKED all go to topic `telegram:-1004485313257:5136` (current active topic), not the archived `4537`.
- If the worker cannot post into topic 5136 (e.g. isolated worker session without an attached topic), it must still leave a real Kanban claim/run + comment and the coordinator will relay the status to topic 5136 with the `【Kanban 回执转发｜非 worker 原生群消息】` label. Do not treat that as a native worker ACK.

## Out-of-band / awaiting owner
- Future AI features, paid tier, community auth, more tool pages — locked; not part of this release.