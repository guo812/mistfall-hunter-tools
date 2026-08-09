# Visual Style Rationale — mistfall-hunter

> Stage: 06-design
> Date: 2026-08-08
> Author: design (profile=design)
> Based on: PRD V1 + Addendum V1.1 + SEO-Copy Freeze (05C CONFIRMED)

## Site Context

- **Type**: Decision-engine tool site (60%) + guide content (30%) + trust (10%)
- **Audience**: US/English, male-skewed PC/console gamers, extraction ARPG players
- **Key UX**: Tools first-screen-operable on mobile (360/390/430), long-form readable content, mega menu navigation for 58 routes
- **Constraints**: Dark theme + gold accents mandated; card layout; unofficial fan site; all free, no sign-up

---

## Style A: Dark Fantasy RPG (Diablo-style Wiki)

**Concept**: Immersive dark fantasy like in-game UI — stone textures, gold filigree, gothic serif headings, parchment backgrounds.

| Dimension | Implementation |
|-----------|---------------|
| Background | #08080c with subtle noise texture |
| Surface | #12121a with 0.5px gold border, slight inner shadow |
| Typography | Headings: serif (Cinzel or similar gothic serif); Body: sans-serif (Crimson Text) |
| Gold | #c9a85b ~ #d4af37 (bright, ornate, metallic gradient) |
| Accents | Deep red #8b0000 for CTA, emerald #0a5c36 for success |
| Spacing | Generous, ornate dividers, decorative icons |
| Cards | Beveled edges, gold trim, dark fill |

**Pros**: Maximum immersion for ARPG audience; aligns with Mistfall Hunter's gothic fantasy aesthetic; distinctive from competitors.
**Cons**: • Serif headings hurt readability at 2000-3000 word guides • Ornate gold borders bloat mobile tool UI • Noise textures + gradients complicate Stitch generation and frontend implementation • Too "theme-heavy" — competitors (metamist.io, mistfalldb) use clean game wikis, this risks looking like a 2010 fansite • Content density suffers — decorative elements eat first-screen space on mobile.

**Verdict**: ❌ Rejected. Immersion cost > readability/implementability. Not suitable for a tool-heavy site where mobile first-screen must show controls, not atmosphere.

---

## Style B: Modern Gaming Hub (IGN/GameRant/Dextero hybrid)

**Concept**: Clean, fast gaming media site with bold headlines, high-contrast CTAs, large hero imagery. Dark navy base with bright saturated accents.

| Dimension | Implementation |
|-----------|---------------|
| Background | #0d1117 (GitHub-dark adjacent) |
| Surface | #161b22 with 4px radius, minimal shadow |
| Typography | All sans-serif: Inter/Oswald hybrid — bold condensed headlines, clean body |
| Gold | #f0c040 ~ #ffd700 (bright, pop-culture gold, high saturation) |
| Accents | Bright blue #58a6ff CTAs, green #3fb950 for trust labels, red #f85149 for danger |
| Spacing | Tight, content-dense, above-fold maximized |
| Cards | Flat, high contrast, large imagery, 3-4 per row on desktop |

**Pros**: Familiar reading pattern for gaming audience; very high content density; clean implementation in Stitch/Tailwind; strong SERP CTR via bold typography.
**Cons**: • Looks generic — very similar to dozens of game guide sites • Gold accent feels like "gaming yellow" rather than "Mistfall gold" • Tool UI blends into content — hard to signal "this is interactive" vs "this is an article" • Lacks distinctive identity for a decision-engine positioning • No visual hierarchy differentiation between tool pages and content pages.

**Verdict**: ❌ Rejected. Too generic. Does not differentiate the site from hundreds of gaming wikis. The decision-engine USP should be visually distinct.

---

## Style C: Dark Tool-Forward Minimalist — SELECTED ✓

**Concept**: Precision tool aesthetic meets fantasy atmosphere. Dark space-gray base with warm restrained gold. Typography prioritizes information hierarchy. Tool surfaces are elevated and distinct from content surfaces. European minimalist composition with enough atmosphere for the ARPG audience. Reference points: Linear + Stripe dark mode for tool surfaces, mixed with Diablo inventory screen for atmosphere.

| Dimension | Implementation |
|-----------|---------------|
| Background | #0a0a0f (near-black, deep space) |
| Surface (content) | #141420 ~ #1a1a2e with 6px radius, subtle border #2a2a3a |
| Surface (tool) | #181825 with 8px radius + distinct left-accent border (gold 2px), slight elevation (shadow or lighter bg) |
| Typography | All sans-serif: Headings — Space Grotesk or equivalent geometric sans (600-700 weight); Body — Inter or system sans (400 weight, 16px base, 1.6 line-height); Mono — JetBrains Mono for data/numbers |
| Gold | #d4a574 (warm amber-gold, restrained, not yellow) ~ #f0c040 (highlight only). Gold used for: tool accents, tier S markers, primary CTAs, selected nav states |
| Accents (Tier) | S=#d4a574 (gold), A=#3fb950 (green), B=#58a6ff (blue), C=#8b949e (gray), D=#f85149 (red) |
| Trust labels | Verified=#3fb950, Community=#d4a574, NeedsUpdate=#f85149 |
| CTAs | Primary: gold bg #d4a574 on dark text #0a0a0f; Secondary: dark border #3a3a4a; Steam: distinct Steam-blue #1a9fff |
| Spacing | Tight vertical rhythm (8px grid), generous horizontal padding for readability (content max-width 680px, tool max-width 960px) |
| Cards | Content cards: flat, image-top, minimal border. Tool cards: elevated, gold accent left border, distinct interactive feel. |
| Nav | Top bar: fixed, dark #0a0a0f/95% backdrop-blur. Mega menu: 5-column dropdown, glass-morphism surface. Mobile: bottom sheet menu. |
| Hero | Full-width dark image/video with animated mask overlay. Gold CTA on dark. Stats bar below. |
| Mobile | Bottom nav: 4-item (Home / Tools / Guides / More). Tool first-screen: controls visible, no scroll required for primary action. |

**Why this wins**:

1. **Tool-content differentiation**: Tool surfaces (elevated, gold-accented) visually signal interactivity vs content surfaces (flat, text-focused). This is essential for a decision-engine site where users need to distinguish "use a tool" from "read a guide" at a glance.

2. **Readability-first for 2000-3000 word guides**: Clean sans-serif on dark backgrounds with proper line-height and max-width constraint = zero fatigue for long reading sessions. Serif/gothic options fail here.

3. **Ownable gold**: #d4a574 is warm, restrained, weapon-metal gold — not generic "gaming yellow." It distinguishes from every competitor.

4. **Mobile-first tool operability**: Tight vertical rhythm + elevated tool cards = tool controls reach first screen at 360/390/430 without decorative bloat. Style A and B fail this hard gate.

5. **Stitch-implementable**: Clean geometric design translates well to Stitch generation. No complex textures, gradients, or decorative elements that break in automated generation.

6. **SERP advantage**: Bold, readable typography with clear visual hierarchy → strong CTR via featured snippets and rich results. Clean markup = better crawler parsing.

7. **Competitive differentiation**: metamist.io uses generic dark-wiki; mistfalldb uses clean but flat game DB style. Our tool-forward approach with gold accent system is visually ownable.

---

## Design System Tokens

| Token Group | Token | Value | Usage |
|------------|-------|-------|-------|
| **Background** | `--bg-primary` | `#0a0a0f` | Page background |
| | `--bg-secondary` | `#0f0f1a` | Section background |
| | `--bg-surface` | `#141420` | Card, panel background |
| | `--bg-tool` | `#181825` | Tool card/surface |
| | `--bg-elevated` | `#1e1e30` | Modal, dropdown, mega menu |
| **Border** | `--border-default` | `#2a2a3a` | Card border |
| | `--border-tool` | `#d4a574` | Tool accent border |
| | `--border-subtle` | `#1a1a2e` | Divider |
| **Gold** | `--gold-primary` | `#d4a574` | Primary CTA, tool accents |
| | `--gold-highlight` | `#f0c040` | Hover, selected, tier S |
| | `--gold-muted` | `#8b7355` | Muted gold, secondary |
| **Text** | `--text-primary` | `#e6e6e6` | Body text |
| | `--text-secondary` | `#8b949e` | Meta, captions |
| | `--text-heading` | `#f0f0f0` | H1-H3 |
| | `--text-gold` | `#d4a574` | Gold text accent |
| **Accent** | `--accent-green` | `#3fb950` | Verified, Tier A, success |
| | `--accent-blue` | `#58a6ff` | Tier B, links, Steam CTA |
| | `--accent-red` | `#f85149` | Tier D, Needs Update, danger |
| | `--accent-gray` | `#8b949e` | Tier C, muted |
| **Typography** | `--font-heading` | `'Inter', system-ui, sans-serif` | All headings |
| | `--font-body` | `'Inter', system-ui, sans-serif` | Body text |
| | `--font-mono` | `'JetBrains Mono', monospace` | Data, numbers, code |
| | `--text-base` | `16px` | Body base |
| | `--line-height` | `1.6` | Body reading |
| | `--max-content-width` | `680px` | Long-form content |
| | `--max-content-width-wide` | `960px` | Tool pages, landing |
| **Spacing** | `--space-unit` | `8px` | Base unit |
| | `--section-gap` | `48px` | Between sections |
| | `--card-gap` | `16px` | Between cards |
| **Radius** | `--radius-card` | `6px` | Content cards |
| | `--radius-tool` | `8px` | Tool cards |
| | `--radius-btn` | `6px` | Buttons |
| **Touch** | `--touch-min` | `44px` | Minimum touch target |
| **Shadow** | `--shadow-tool` | `0 2px 8px rgba(0,0,0,0.3)` | Tool elevation |
| | `--shadow-mega` | `0 8px 32px rgba(0,0,0,0.5)` | Mega menu |
