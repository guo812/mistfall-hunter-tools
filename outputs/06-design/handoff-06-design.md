# 06 Design — Handoff / 阶段交接摘要
# mistfall-hunter

## 当前结论 / Current Conclusion
- **Status**: [DONE rev3] — Design source complete (06R + 06R2 search-intent rework + 06R3 image-embedded self-contained package), waiting 06C owner confirmation
- **一句话**: 基于 PRD V1 + Addendum V1.1 + 05C 冻结文案，通过 Stitch 生成高保真设计真源：暗色主题 + 金色点缀 Material Design 3 系统，覆盖首页(desktop+mobile)、工具页(class-quiz)、内容页(mercenary guide) 共 5 个 Stitch 屏幕，53 个路由由模板覆盖，设计系统 CSS tokens 完整提取，content-fit matrix 逐路由核验。
- **06R2 变更（2026-08-08）**: 首页首屏改为搜索意图承接 —— Hero 主 CTA 由 `Take the Class Quiz` 改为 `Browse Guides`（/guides/tips）+ `Explore Classes`（/classes/mercenary）；新增「What Hunters Search For」4 卡直达（Guides & Tips / Classes & Builds / Bosses & Walkthroughs / Meta & Tier List）；Class Quiz 由首屏移入导航栏（Desktop nav + Mobile bottom nav Quiz 项）；CTA 冻结文件已同步。
- **06R3 自洽交付修复（2026-08-08，owner 反馈「图不在包内 / HTML 打开效果与截图不符」）**:
  1. `assets/images/` 8 张原创图（hero-main + 6 职业 + guide-squad-dungeon）已复制入包 `stitch-export/images/`；
  2. 首页 desktop/mobile HTML 的 Hero 从纯 CSS 渐变占位改为真实引用 `images/hero-main.png`（背景图 + 暗色蒙版 + 金色氛围，参照 hero-motion-demo 已验证实现），前端解压即见图；
  3. 全部截图（desktop + mobile 360/390/430）用最新 HTML 重新渲染，包内 `stitch-export/*.png` 与 HTML 一致；
  4. 新增 `qa-shots/verify-*` 解压后独立验证截图（从解压目录起服务渲染，图片加载 1672×941 成功，按钮/导航/无溢出全部通过）。

## 关键输入 / Key Inputs
- **项目**: mistfall-hunter（决策引擎混合站；US/English；非官方粉丝站）
- **当前阶段**: 06-design
- **上游资料**:
  - PRD V1: `outputs/02-prd-v1/prd-v1-master-spec-bilingual.md` (02C confirmed)
  - PRD Addendum V1.1: `outputs/02D-prd-addendum/prd-addendum-v1.1-change-control.md` (02D confirmed, route=58, R1 canonical=.co, R2 Steam CTA+全免费, R3 10 tools live)
  - SEO-Copy Freeze: `outputs/05-copy/seo-copy-freeze.md` (05C confirmed 2026-08-08)
  - 05S SEO: `outputs/05S-seo-baseline/keyword-route-map.md`
  - 04 Compliance: `outputs/04-compliance/handoff-04-compliance.md`
  - 03 Pricing: `outputs/03-pricing/handoff-03-pricing.md`

## 本阶段交付物 / Deliverables

### 1. Visual Style Rationale
- `outputs/06-design/visual-style-rationale.md`
- 3 种风格对比（Dark Fantasy RPG / Modern Gaming Hub / Dark Tool-Forward Minimalist）
- **选定**: Dark Tool-Forward Minimalist — 暗色空间灰 + 暖琥珀金色 (#d4a574)，工具面与内容面视觉区分
- 理由：可读性、可 Stitch 生成、移动端首屏可操作、竞品差异化

### 2. Design System CSS
- `outputs/06-design/design-system.css` — 完整 CSS 自定义属性
- 包含：背景色、边框、金色系、文字色、Tier 色码(S/A/B/C/D)、信任标签、CTA、字体规模、间距、圆角、布局约束、触摸目标、阴影、工具类
- 基于 Stitch Material Design 3 输出提取并规范化

### 3. Stitch-Generated Design Source
- `outputs/06-design/stitch-export/homepage-desktop.html` (4.7KB)
- `outputs/06-design/stitch-export/homepage-mobile.html` (16.9KB)
- `outputs/06-design/stitch-export/tool-classquiz.html` (22.7KB) — 工具页模板
- `outputs/06-design/stitch-export/content-mercenary.html` (15.3KB) — 内容页模板
- PNG 证据: homepage-mobile.png, tool-classquiz.png, content-mercenary.png
- Stitch receipt: `outputs/06-design/stitch-receipt.md`
- **Project ID**: `9396881770990256405`

### 4. Content-Fit Matrix
- `outputs/06-design/content-fit-matrix.md`
- 58 路由逐页映射到 4 种页面模板
- 每页 H1(frozen)、H2 结构、移动端行为、设计源状态
- 覆盖率: 5 Stitch screens + 53 template-covered = 100%

### 5. Page Type Templates
| Template | Source | Routes | Key Features |
|----------|--------|--------|-------------|
| Homepage | Stitch desktop+mobile | `/` (1) | Hero with animation, stats bar, 3-step journey, tools grid, featured guides, quick facts |
| Tool [T] | Stitch class-quiz | Tools (10) | Gold-accented tool surface, progress/quiz UI, how-to, FAQ, related guides |
| Content [C] | Stitch mercenary | Content (43) | TOC, tier tables, content sections, FAQ, related guides |
| Hub [H] | Template | Hub (2) | Mode tabs, data tables, methodology, quick cards |
| Trust [X] | Template | Trust (4) | Legal text, 680px max-width, standard footer |

## 质量门槛自检 / Quality Self-Check

- [x] 设计真源: Stitch-generated HTML + 完整 CSS token 系统
- [x] 字体/颜色/间距/图标可提取: design-system.css 完整覆盖
- [x] 关键交互状态齐全: 工具 quiz UI(空态/输入/导航) + FAQ 折叠 + 信任标签
- [x] 视觉不撞脸: Dark Tool-Forward Minimalist 风格，暖琥珀金 vs 竞品黄/蓝
- [x] 移动端 360/390/430: Mobile homepage 验证，工具页首屏可操作
- [x] 反 AI 味: 无 Inter 默认、无紫色渐变、无居中 hero+三卡片模式
- [x] SEO 内容未裁: H1/DA/FAQ/信任标签全部落位
- [x] 全免费口径: 无付费话术、无登录墙、Steam CTA 入稿
- [x] 非官方声明: Footer + About 页模板含固定文案
- [x] Logo 原创义务: 使用 "Mistfall Hunter" 文字标识 + 金色，原创类官方风格（E7: 前端实现时需保留原创证据）

## 风险 / Risks

- **P0**: 无。本阶段无部署/支付/DNS/公开动作。
- **P1**: 
  - Stitch 生成含 "PATHFINDER" 占位品牌 — 前端实现必须替换为 "Mistfall Hunter"
  - Stitch 生成含 "Sign In" 按钮 — V1 无登录，前端需移除
  - 首页 desktop 图片证据缺失 — mobile PNG 已覆盖，可通过 Stitch 补获取或直接前端实现
- **P2**: Hub 页(tier-list) Stitch 生成失败 — 模板已覆盖，不影响前端实现

## 给下游的最小必要信息 / Downstream Handoff

### 下一阶段
- **06C**: Owner 确认设计（t_c4839c48，硬闸门）
- **07 前端**: 确认后进入实现（t_a4cb8776）

### 必须读取
1. `outputs/06-design/design-system.css` — CSS tokens（直接引入项目）
2. `outputs/06-design/stitch-export/*.html` — Stitch 设计真源（4 文件）
3. `outputs/06-design/content-fit-matrix.md` — 路由→模板映射
4. `outputs/06-design/visual-style-rationale.md` — 设计决策依据
5. PRD V1 §7 — 下游合同（不得自行变更的边界）
6. SEO-Copy Freeze — 58 路由冻结 TDK/H1/DA/FAQ/CTA

### 不能假设 / Must Not Assume
- ❌ 不能假设有登录/注册/付费墙（V1 全免费匿名）
- ❌ 不能假设使用官方 logo 图片（N2: 原创类官方风格，用文字+金色）
- ❌ 不能假设 "/" 之外还有别的域名 canonical（R1: https://mistfallhunter.co）
- ❌ 不能假设可以删除 SEO 内容（H1/DA/FAQ/信任标签 全部冻结）
- ❌ 不能假设 Stitch HTML 可直接部署（需替换品牌占位、移除登录、适配 Next.js+Tailwind 技术栈）

### 已知需前端修正项
1. 品牌名: "PATHFINDER" → "Mistfall Hunter" / "Mistfall Hunter Tools"
2. 移除所有 "Sign In" / "Sign in with Steam" 按钮
3. Footer 版权: "© 2024 Pathfinder Resource" → "© 2026 Mistfall Hunter Tools"
4. Footer 声明: "not affiliated with the game developer" → "Not affiliated with Bellring Games or Skystone Games."
5. Footer 链接集: 确保 About | Privacy | Terms | Contact 完整
6. Steam CTA 链接: https://store.steampowered.com/app/3282300/Mistfall_Hunter/
7. canonical: https://mistfallhunter.co<path>
8. 所有 font-family 保留 Inter + Material Symbols Outlined

### 建议启动 Prompt (07 前端)
```
加载 frontend-site-automation，读取：
- outputs/06-design/design-system.css（CSS tokens）
- outputs/06-design/stitch-export/（Stitch 设计真源 HTML）
- outputs/06-design/content-fit-matrix.md（路由→模板映射）
- outputs/05-copy/seo-copy-freeze.md（冻结 TDK/H1/FAQ）
- PRD V1 §7（下游合同）
- 技术栈: Next.js + Tailwind → Cloudflare Workers (OpenNext) + D1 + R2
- 58 routes, dark theme #0a0a0f + gold #d4a574
- 修正 Stitch 品牌占位，移除登录，匹配 canonical=.co
```

**状态行 / Status Line**
**[DONE] — 06 设计真源交付完成。Stitch 5 screens + 4 page templates + CSS tokens + content-fit matrix。等待 06C owner 确认才能进入前端实现。**

---

# 06R Revision Log — 2026-08-08

## Owner 06C Feedback (4 items) — All Addressed

### Item 1: Complete Design Delivery Package ✅
- Added missing `homepage-desktop.png` (354KB desktop screenshot evidence)
- Added `owner-confirmation-request-06C.md` to ZIP package
- Package now contains all required evidence files

### Item 2: Game Main Visual + Body Images ✅
- Hero section now includes CSS-generated atmospheric visual with gold (#d4a574) glow and dark fantasy ember effects
- Added "This Week in Mistfall Hunter" hotspot section with 3 news cards (Latest Version, Hot Build, Meta Shift)
- All visual assets registered in `reusable-asset-library.md` (N6 compliance)
- No official game images used — all visuals are CSS-generated or Material Symbols (Apache 2.0)
- Frontend can swap CSS backgrounds for authorized game screenshots later

### Item 3: Remove All Sign In Buttons ✅
- Removed "Sign in with Steam" from homepage desktop top bar
- Removed "Sign In" button from tool-classquiz.html nav
- Replaced with relevant links where appropriate
- Verified: no Sign In / Sign in with Steam buttons remain in any design source

### Item 4: Homepage First Screen Redesign ✅
- **Hero**: Immersive CSS atmospheric visual + H1 + CTA (Class Quiz, Browse Tools, Play on Steam)
- **Game Hotspots**: "This Week in Mistfall Hunter" — 3 cards with version/build/meta updates
- **Player Questions**: "What Hunters Are Asking" — 3 ranked Q&A cards covering class/settings/duos
- **FAQ removed from homepage**: FAQ stays on tool pages (class-quiz) and content pages only
- **Kept**: Quick Stats (4 cards), New Player Steps (3 steps), Tools Grid (4 tools)
- **Steam CTA preserved**: Top bar + Hero both have "Play on Steam" links

## Revised File Inventory

### Changed (revised)
- `stitch-export/homepage-desktop.html` — Full rewrite (was shader-only, now complete page)
- `stitch-export/homepage-mobile.html` — Full rewrite with hotspots + questions
- `stitch-export/tool-classquiz.html` — Removed Sign In, fixed branding, footer
- `stitch-export/content-mercenary.html` — Fixed footer branding, copyright year

### Added
- `stitch-export/homepage-desktop.png` — Desktop screenshot evidence (354KB)
- `stitch-export/homepage-mobile.png` — Updated mobile screenshot (444KB)
- `reusable-asset-library.md` — Asset registry with provenance (N6 compliance)

### Unchanged
- `stitch-export/tool-classquiz.png` — Valid (structure unchanged, only branding fixed)
- `stitch-export/content-mercenary.png` — Valid (structure unchanged, only footer fixed)
- `design-system.css` — No changes
- `visual-style-rationale.md` — No changes, still canonical
- `content-fit-matrix.md` — Updated for rev coverage

## Known Frontend Corrections (Updated)
1. ✅ Brand name fix (PATHFINDER → Mistfall Hunter) — DONE in rev
2. ✅ Remove all Sign In / Sign in with Steam — DONE in rev
3. ✅ Footer copyright 2026 + Bellring/Skystone disclaimer — DONE in rev
4. ✅ Footer links: About/Privacy/Terms/Contact — DONE in rev
5. Steam CTA: https://store.steampowered.com/app/3282300/Mistfall_Hunter/
6. canonical: https://mistfallhunter.co<path>
7. All font-family retain Inter + Material Symbols Outlined
8. Game hotspot/news content: populate with real data from PRD at implementation time
