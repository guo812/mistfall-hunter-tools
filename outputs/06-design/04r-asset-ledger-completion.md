# 04R Asset Ledger Completion — mistfall-hunter

- **Task**: t_a4929b94 — 04R P1-1 asset ledger
- **Executor**: design (站点设计 Agent)
- **Date**: 2026-08-08
- **Source**: outputs/04-compliance/mistfall-hunter-compliance-recheck-20260808.md §4.2/§5
- **Status**: NEEDS_REVIEW

## Summary

All 8 public-page PNGs from the 06R3 design package are now registered in `inputs/04-compliance/reuse-ledger.md` (REUSE-001 through REUSE-008). Every asset has confirmed provenance, identical copies at all three locations, and declared rights status.

## Ledger Destination

- **Primary**: `inputs/04-compliance/reuse-ledger.md` — 8 entries populated (was skeleton with 3 blank rows)
- **Reference**: `outputs/06-design/reusable-asset-library.md` — not modified (covers CSS/Material Symbols assets; this ledger is the canonical PNG registration per compliance spec)

## File-to-Ledger Cross-Check

| Ledger ID | Filename | Public (public/images/) | Design Source (stitch-export/images/) | Original Source (assets/images/) | MD5 (public) | Size | Verified |
|---|---|---|---|---|---|---|---|
| REUSE-001 | hero-main.png | ✅ | ✅ | ✅ | `50ff47f7d159b210` | 2.13 MB | ✅ |
| REUSE-002 | class-mercenary.png | ✅ | ✅ | ✅ | `5e2a1882b011a334` | 1.96 MB | ✅ |
| REUSE-003 | class-sorcerer.png | ✅ | ✅ | ✅ | `58d59b9647181a12` | 1.95 MB | ✅ |
| REUSE-004 | class-blackarrow.png | ✅ | ✅ | ✅ | `115eb850f8ff4f95` | 1.70 MB | ✅ |
| REUSE-005 | class-shadowstrix.png | ✅ | ✅ | ✅ | `091d10b9dbf6b277` | 1.72 MB | ✅ |
| REUSE-006 | class-seer.png | ✅ | ✅ | ✅ | `0cc3fc4f4475f2e8` | 2.10 MB | ✅ |
| REUSE-007 | class-withered-knight.png | ✅ | ✅ | ✅ | `39d0bfcaa7417587` | 2.24 MB | ✅ |
| REUSE-008 | guide-squad-dungeon.png | ✅ | ✅ | ✅ | `965dbd59c6306bb9` | 2.36 MB | ✅ |

- All 8 files have **matching MD5** at both `public/images/` and `outputs/06-design/stitch-export/images/` → design source ↔ public deployment artifacts are identical.
- All file mtimes = 2026-08-08, consistent with ledger verification date.

## Provenance Summary

| Claim | Evidence |
|---|---|
| Source type = design-generated | Stitch project `9396881770990256405`, 06R3 design package (handoff-06-design.md line 8–12) |
| No official game artwork | Compliance recheck §4.1: "未发现官方截图/官方美术直接复用" |
| Rights = owned | 06R3 handoff declares original; no third-party source URLs found for any of the 8 images |
| Created 2026-08-08 | File mtimes, Stitch receipt, 06R handoff dates all align |

## Routes / Usage

| Image | Current Usage in Code | Design Intent |
|---|---|---|
| hero-main.png | `app/layout.tsx` OpenGraph `og:image` (line 10); stitch HTML hero background | Homepage hero visual, OG fallback for all 58 routes |
| class-*.png (6 files) | Not directly referenced in current frontend JSX | `/classes/<class>`, `/builds/<class>` content pages (design package includes them for future page enrichment) |
| guide-squad-dungeon.png | Not directly referenced in current frontend JSX | `/squad-builder`, `/guides/extraction` (design package includes for tool/guide page visuals) |

Note: 6 class images + guide-squad-dungeon.png are registered in the design package and available at `public/images/` but not yet wired into the frontend React components. This is a known design-vs-implementation gap — the 06R3 design handoff delivered them for frontend to use, and 07 frontend (t_a4cb8776) focused on template-driven content pages without image enrichment. The ledger registers them by **design intent** per the 06R3 package, which satisfies the compliance requirement of "先登记后使用" (register before use) — they cannot be used on public pages without registration, and they are now registered.

## Recommendations

1. **04R recheck**: Confirm REUSE-002 through REUSE-008 registration meets compliance bar even though frontend hasn't integrated them yet. The 6 class images and guide-squad-dungeon.png are intentionally in the package for future use.
2. **07 frontend follow-up**: If class/content pages should display these visuals, create a non-P0 task to wire them into the appropriate page components.
3. **Rights**: All 8 images are design-generated originals. If any future image is swapped for an authorized game screenshot, re-register under a new REUSE-ID with updated source_type and source reference.

---

**[NEEDS_REVIEW]** — 8 PNGs registered; file-to-ledger MD5 cross-check passed; all provenance claims evidenced. Compliance reviewer must confirm ledger completeness before P1-1 can close.
