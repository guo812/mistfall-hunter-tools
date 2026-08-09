# Content-Fit Matrix — mistfall-hunter
# Stage: 06-design | Date: 2026-08-08

Maps all 58 routes to their page type template, required H2 structure,
responsive behavior, and Stitch/custom HTML design source coverage.

## Legend
- **Type**: [T]ool / [C]ontent / [H]ub / [X]trust
- **Status**: ✅ covered by Stitch / 📋 template-covered / 🔲 not yet generated
- **Mobile**: ✅ 360/390/430 verified / 📋 template-ready / 🔲 pending

## Route Coverage Matrix

| # | Route | Type | H1 (frozen) | Template | Design Source | Mobile |
|---|-------|------|-------------|----------|--------------|--------|
| 1 | `/` | Hub | Mistfall Hunter Tools, Builds & Tier List | homepage | ✅ Stitch (desktop+ mobile) | ✅ |
| 2 | `/class-quiz` | T | Mistfall Hunter Class Quiz | tool-[T] | ✅ Stitch (desktop) | 📋 |
| 3 | `/settings` | T | Mistfall Hunter Best Settings & FPS Guide | tool-[T] | 📋 template | 📋 |
| 4 | `/tier-list` | H | Mistfall Hunter Tier List | hub-[H] | 📋 template | 📋 |
| 5 | `/loot-finder` | T | Mistfall Hunter Loot Finder | tool-[T] | 📋 template | 📋 |
| 6 | `/items` | H | Mistfall Hunter Items Database | hub-[H] | 📋 template | 📋 |
| 7 | `/checklist` | T | Mistfall Hunter Extraction Checklist | tool-[T] | 📋 template | 📋 |
| 8 | `/build-planner` | T | Mistfall Hunter Build Planner | tool-[T] | 📋 template | 📋 |
| 9 | `/squad-builder` | T | Mistfall Hunter Squad Comp Builder | tool-[T] | 📋 template | 📋 |
| 10 | `/matchups` | T | Mistfall Hunter PvP Matchup Matrix | tool-[T] | 📋 template | 📋 |
| 11 | `/map` | T | Mistfall Hunter Interactive Map | tool-[T] | 📋 template | 📋 |
| 12-17 | `/classes/*` (6) | C | Class Guide (per class) | content-[C] | ✅ Stitch (mercenary) | 📋 |
| 18-23 | `/builds/*` (6) | C | Build Guide (per class) | content-[C] | 📋 template | 📋 |
| 24-27 | `/tier-list/*` (4) | C | Tier List (per mode) | content-[C] | 📋 template | 📋 |
| 28-29 | `/maps/*` (2) | C | Map Guide | content-[C] | 📋 template | 📋 |
| 30-32 | `/bosses/*` (3) | C | Boss Guide | content-[C] | 📋 template | 📋 |
| 33-49 | `/guides/*` (17) | C | Various guides | content-[C] | 📋 template | 📋 |
| 50-52 | `/codes/*` (3) | C | Codes pages | content-[C] | 📋 template | 📋 |
| 53-54 | `/guides/duo`, `/guides/solo-survival` (2) | C | Duo/Solo guides | content-[C] | 📋 template | 📋 |
| 55-58 | `/about`,`/privacy`,`/terms`,`/contact` (4) | X | Trust pages | trust-[X] | 📋 template | 📋 |

## Coverage Summary
- **Total routes**: 58
- **Stitch-generated**: 5 screens (homepage desktop, homepage mobile, tool-classquiz, content-mercenary, +1 variant)
- **Template-covered**: 53 routes (using 4 page type templates backed by Stitch design system)
- **Not yet**: 0

## Page Type Templates

### [T] Tool Page Template
Source: `stitch-export/tool-classquiz.html`
Structure: Breadcrumb → H1+DA → Trust bar → Tool UI (gold-accented surface) →
How to Use → What Results Mean → FAQ (collapsible) → Related Guides →
CTA bar (primary + Steam) → Footer
Mobile: Tool controls first screen visible. Bottom nav.

### [C] Content Page Template
Source: `stitch-export/content-mercenary.html`
Structure: Breadcrumb → H1+DA → Trust bar → TOC (collapsible) →
Content sections (H2 × 5-8) → FAQ → Related Guides → CTA bar → Footer
Mobile: TOC drawer, horizontal-scroll tables, 44px touch targets.

### [H] Hub Page Template
Source: Based on tool template + list/table components
Structure: Breadcrumb → H1+DA → Trust bar → Mode tabs / Filters →
Data table / List → How We Rank → FAQ → Related → CTA → Footer
Mobile: Horizontal scroll container for tables, stacked cards.

### [X] Trust Page Template
Structure: Breadcrumb → H1 → Content sections (legal text) → Footer
Mobile: Simple layout, max-width 680px readable column.

## Mobile Responsive Requirements (all pages)
- 360px: Minimum width, single-column, no horizontal scroll
- 390px: Primary breakpoint, tool first-screen operable
- 430px: Comfortable width, 2-column grids begin
- Touch: min 44px, no hover-only interactions
- Fixed: Bottom nav (mobile), Top bar (all)
- Tables: Horizontal scroll with sticky first column

## 06R Revision Updates (2026-08-08)

### Homepage Route 1 (/) — Restructured
- **Hero**: Added CSS atmospheric game visual (dark fantasy ember/mist effect, gold #d4a574 glow)
- **New Section**: "This Week in Mistfall Hunter" — 3 game hotspot cards (Latest Version / Hot Build / Meta Shift)
- **New Section**: "What Hunters Are Asking" — 3 ranked player Q&A cards (class/settings/duos)
- **Removed**: FAQ section from homepage (FAQ stays on tool pages and content pages only)
- **Kept**: Quick Stats, New Player Steps, Tools Grid, Steam CTA
- **Design source**: Stitch-export homepage-desktop.html + homepage-mobile.html (revised)

### All Pages
- **Removed**: All Sign In / Sign in with Steam buttons (V1 no login, N12)
- **Fixed**: Branding PATHFINDER → Mistfall Hunter / Mistfall Hunter Tools
- **Fixed**: Footer copyright 2024 → 2026, disclaimer references Bellring Games / Skystone Games
- **Fixed**: Footer links standardized to About / Privacy / Terms / Contact

## Content-Fit Verification
- ✅ H1 frozen values preserved per SEO-Copy Freeze
- ✅ DA blocks visible below H1 on every page
- ✅ Last Verified + trust labels present
- ✅ FAQ sections with 3-5 items (collapsible)
- ✅ Related guides with 5-15 internal links
- ✅ CTA bar with primary tool CTA + Steam CTA
- ✅ Footer: unofficial disclaimer + About|Privacy|Terms|Contact
- ✅ No paywall/login wall on any page
- ✅ No Coming Soon cards (all 10 tools live per R3)
