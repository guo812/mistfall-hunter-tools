# Reusable Asset Library — mistfall-hunter
# Stage: 06R design revision | Date: 2026-08-08
# Usage: N6 — register assets before use; record provenance

## Visual Assets Used in Revision

### 1. Hero Atmospheric Visual (CSS-Generated)
- **Asset ID**: `hero-atmosphere-01`
- **Type**: CSS-generated (gradients + radial overlays)
- **Usage**: Homepage hero background — dark fantasy mist/ember atmosphere
- **Colors**: #d4a574 gold glow on #0a0a0f deep background
- **Provenance**: Original creation via CSS (no external image; no copyright dependency)
- **Reuse**: All landing/hero sections across 58 routes
- **Authorization**: N/A (pure CSS, no third-party source)
- **Notes**: Frontend can replace with game screenshot when authorized. Current implementation uses radial-gradient + opacity overlays.

### 2. Hotspot Cards Iconography (Material Symbols)
- **Asset ID**: `icons-material-symbols-01`
- **Type**: Google Material Symbols (Outlined, FILL 0-1)
- **Usage**: All tool cards, nav items, section headers
- **Icons used**: trending_up, update, local_fire_department, swap_horiz, forum, calculate, map, military_tech, group, home, build, auto_stories, more_horiz, menu, check_circle, chevron_right, help, analytics, expand_more, quiz, visibility, download, shield, swords, inventory_2, school, format_list_numbered, open_in_new
- **Provenance**: Google Fonts CDN (fonts.googleapis.com), Apache 2.0 license
- **Reuse**: Unlimited, per Google Fonts license
- **Authorization**: Confirmed Apache 2.0 — no attribution required for icon usage

### 3. Hot / Trending Labels (CSS-Generated)
- **Asset ID**: `hot-label-badges-01`
- **Type**: CSS-generated gradient badges
- **Usage**: "TRENDING", "S-TIER", version tags on hotspot/news cards
- **Colors**: Linear gradient rgba(212,165,116,0.2) → rgba(212,165,116,0.05), border rgba(212,165,116,0.3)
- **Provenance**: Original CSS creation
- **Reuse**: Any page needing urgency/status indicators

### 4. Gold Accent Lines (CSS-Generated)
- **Asset ID**: `gold-line-accents-01`
- **Type**: CSS border-left accent
- **Usage**: Tool surfaces, news cards — 2px solid #d4a574 left border
- **Provenance**: Visual Style Rationale (Style C) — design system token
- **Reuse**: All tool-surface and featured-card components

### 5. Tier Color Badges (CSS-Generated)
- **Asset ID**: `tier-badges-01`
- **Type**: CSS-generated inline badges
- **Colors**: S=#d4a574, A=#3fb950, B=#58a6ff, C=#8b949e, D=#f85149
- **Provenance**: Design system tokens, per PRD V1
- **Reuse**: All tier list, content page, and tool page surfaces

### 6. Mist/Noise Overlay Texture (SVG Data URI)
- **Asset ID**: `mist-overlay-svg-01`
- **Type**: Inline SVG data URI (feTurbulence fractalNoise filter)
- **Usage**: Subtle atmospheric texture overlay on hero sections
- **Provenance**: Original creation (SVG filter, no external dependency)
- **Reuse**: Any page needing atmospheric depth

## Asset Integrity Notes
- No official game images, logos, screenshots, or trademarked materials used (N2 compliance)
- All visuals are CSS-generated, Material Symbols (Apache 2.0), or original SVG filters
- Frontend may swap CSS backgrounds for authorized game screenshots after obtaining proper permissions
- All assets are embedded/inline — no external CDN dependencies beyond Google Fonts
