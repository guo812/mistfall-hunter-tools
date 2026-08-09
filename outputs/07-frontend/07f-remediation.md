# 07F Frontend P1 Remediation — Mistfall Hunter

- Task: `t_da905883`
- Scope authority: `inputs/00-launch-card/owner-release-07-08-local-implementation-20260808.md`
- Active topic: `telegram:-1004485313257:4537`
- Scope performed: local source remediation, local build/OpenNext bundle, localhost preview and mobile evidence only.
- Not performed: Git commit/push, deployment, Cloudflare/DNS mutation, analytics, GSC/IndexNow, or any public action.

## P1 remediation

### 1. 06R3 mobile navigation contract

Implemented in `app/[[...slug]]/page.tsx` and `app/globals.css`:

- Compact mobile header: 44px hamburger target, centered `MISTFALL HUNTER TOOLS` brand, and visible `Play on Steam` link.
- Hamburger opens a real mobile menu (Guides, Tier List, Classes, Builds, About).
- Fixed mobile bottom navigation is exactly `Home / Tools / Guides / Quiz / More`.
- Five bottom targets remain at least 44px wide/high (measured: 360=72×63, 390=78×63, 430=86×63 px).
- `body` receives `calc(80px + env(safe-area-inset-bottom))` bottom padding; measured 80px normal padding exceeds the 64px bottom-nav height at all required widths.

### 2. `/squad-builder` Duo/Trio + deterministic URL

Implemented in `components/tool-panel.tsx`:

- Explicit Duo and Trio controls. Trio presents a real third-class select.
- The evaluation derives role coverage, missing roles, duplicate-pick penalty and score from the selected Duo/Trio classes.
- `Copy share URL` creates deterministic state such as:
  `http://127.0.0.1:3008/squad-builder?mode=trio&classes=mercenary%2Csorcerer%2Cseer`
- Reloading that URL restores mode plus all three selections.

## Commands and results

```text
npm run build                         PASS
npm run opennext:build                PASS (.open-next/worker.js present)
npm run start -- -p 3008              PASS (local preview, HTTP 200)
python3 outputs/07-frontend/remediation-evidence/mobile-remediation-smoke.py
                                      PASS
```

The smoke runs at 360/390/430px and asserts:

1. Header Steam link, hamburger open state and exact five-item navigation.
2. Every bottom-nav target is at least 44×44px.
3. Safe bottom padding is not smaller than fixed-nav height.
4. Select Trio → Mercenary/Sorcerer/Seer → evaluation includes all three role categories.
5. Copy share URL → reload it → restore `mode=trio`, primary, secondary and third selections.

## Evidence

- `outputs/07-frontend/remediation-evidence/mobile-remediation-smoke.py`
- `outputs/07-frontend/remediation-evidence/mobile-remediation-metrics.json`
- `outputs/07-frontend/remediation-evidence/home-360.png`
- `outputs/07-frontend/remediation-evidence/home-390.png`
- `outputs/07-frontend/remediation-evidence/home-430.png`
- `outputs/07-frontend/remediation-evidence/squad-builder-360.png`
- `outputs/07-frontend/remediation-evidence/squad-builder-390.png`
- `outputs/07-frontend/remediation-evidence/squad-builder-430.png`
- `outputs/07-frontend/remediation-evidence/squad-builder-trio-360.png`
- `outputs/07-frontend/remediation-evidence/squad-builder-trio-390.png`
- `outputs/07-frontend/remediation-evidence/squad-builder-trio-430.png`

## Known limits / handoff

- This remediation is local-only and is deliberately not a release or deployment approval.
- The configured image-vision helper returned a model-availability 404, so screenshot proof is retained and layout acceptance is backed by real Chromium/Playwright viewport screenshots plus DOM geometry assertions. Independent QA should inspect the PNGs and rerun the supplied smoke script against its local preview.
- Needs independent re-QA before frontend/SEO/compliance gates can advance.

**Status: NEEDS_REVIEW**
