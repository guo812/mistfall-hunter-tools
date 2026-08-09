# Mistfall Hunter PRD Brief V2 - Expanded
# Mistfall Hunter 工具+攻略站 PRD Brief V2 - 扩展版

**Status**: [NEEDS_REVIEW]  
**Date**: 2026-08-08  
**Author**: zhaoci (关键词研究 Agent)  
**Version**: 2.0 (扩展版 - 含深度竞品拆解)

---

## 1. Executive Summary / 执行摘要

### What we're building / 我们要做什么

A **decision engine** for Mistfall Hunter players - not just a data lookup or guide reader, but a tool that helps players make better in-game decisions through interactive builders, quizzes, and analyzers.

为 Mistfall Hunter 玩家打造**决策引擎** - 不只是数据查询或攻略阅读，而是通过互动构建器、测试和分析工具帮助玩家做出更好的游戏决策。

### Why now / 为什么是现在

- **Game launched 10 days ago** (July 29, 2026) - SERP landscape still forming
- **1M+ players** actively searching for guides
- **3 main unofficial sites exist** but each has clear weaknesses
- **Major gaming sites (IGN, Fextralife, Game8)** have minimal coverage (1-2 articles each)
- **YouTube creator ecosystem** is active but lacks interactive tools

游戏上线仅 10 天（2026年7月29日）- SERP 格局尚未定型，100万+玩家正在搜索攻略，3个主要非官方站各有明显弱点，大型游戏站（IGN、Fextralife、Game8）覆盖极少（各1-2篇文章），YouTube 创作者生态活跃但缺乏互动工具。

### Our approach / 我们的方法

**Learn from competitors' strengths + Fill their gaps + Differentiate with unique tools**

**借鉴竞品优点 + 填补竞品缺口 + 用独特工具差异化**

- **Adopt**: Best practices from MistfallDB (tool UX), mistfallhunters.wiki (content structure), mistfallhunters.com (trust system)
- **借鉴**: MistfallDB 的工具 UX、mistfallhunters.wiki 的内容结构、mistfallhunters.com 的信任体系
- **Fill**: 6 high-demand gaps no one has addressed (Squad Builder, Class Quiz, Matchup Matrix, Settings Recommender, Duo Hub, Patch Tracker)
- **填补**: 6个高需求缺口（阵容构建器、职业测试、对局矩阵、设置推荐器、双人专页、补丁追踪）
- **Differentiate**: Interactive tools that create sticky user experiences
- **差异化**: 创造粘性用户体验的互动工具

### Launch scope / 发布规模

- **10 interactive tools** — V1 首批 6 个 + V1.5 第二批 4 个（上线后 2-4 周）
- **48 indexable pages** (classes, builds, tier lists, maps, bosses, guides, codes, settings)
- **Domain**: mistfallhunter.gg (recommended, to be purchased by Owner)
- **Tech stack**: Next.js + Cloudflare Workers + D1 + R2

---

## 2. Market Overview / 市场概述

### Game context / 游戏背景

| Attribute | Detail |
|-----------|--------|
| **Game** | Mistfall Hunter - PvPvE extraction ARPG |
| **Developer** | Bellring Games |
| **Publisher** | Skystone Games (David Brevik, Diablo creator) |
| **Launch date** | July 29, 2026 |
| **Platforms** | PC (Steam), PS5, Xbox Series X\|S |
| **Players** | 1M+ (10 days post-launch) |
| **Steam peak concurrent** | ~45K |
| **Engine** | Unreal Engine 5 |
| **Modes** | Solo / Duo (no official matchmaking) / Trio / Crossplay |
| **Monetization** | Free + cosmetics (non-P2W) |
| **Classes** | 6 (Mercenary, Sorcerer, Blackarrow, Shadowstrix, Seer, Withered Knight) |
| **Stances per class** | 2 (Dual Stance system) |
| **Season system** | Confirmed seasonal wipes |

### Market timing / 市场时机

**Why this is the right time / 为什么现在是正确的时机**:

- **Early window**: Game launched 10 days ago, SERP not yet dominated
- **Shallow major site coverage**: IGN/Fextralife/Game8 only have 1-2 articles each
- **Active YouTube ecosystem**: Lots of build/tier list/1000h analysis videos = strong search demand
- **Active Reddit community**: r/MistfallHunter has lots of discussions
- **3 unofficial sites exist but beatable**: Each has clear weaknesses we can exploit
- **Game likely to update**: Patches will change meta, content needs to keep up

**风险因素 / Risk factors**:

- **Competitor data moat**: MistfallDB has 599 weapons / 1,584 armor data we can't match quickly
- **Content volume gap**: mistfallhunters.wiki has 60+ pages, we'll launch with 48
- **SEO cold start**: New domain needs 3-6 months to rank well
- **Game popularity may fade**: If no updates, search volume drops (but extraction ARPGs usually have long lifecycles)

---

## 3. Competitor Deep Dive / 竞品深度拆解

### 3.1 Competitor Landscape / 竞品全景

| # | Site | Domain | Type | Data Depth | Tool UX | Content Depth | Update Freq |
|---|------|--------|------|-----------|---------|---------------|-------------|
| A | **MistfallDB** | mistfalldb.com | Database+Tools | ★★★★★ | ★★★★★ | ★★★☆☆ | High |
| B | **Mistfall Hunters Wiki** | mistfallhunters.wiki | Content Wiki | ★★☆☆☆ | ★★☆☆☆ | ★★★★★ | Very High |
| C | **Mistfall Hunters** | mistfallhunters.com | Trust+AI | ★★★☆☆ | ★★☆☆☆ | ★★★☆☆ | Medium |
| D | **Mistfall Hunter Wiki** | mistfallhunter.wiki | Community Wiki | ★★☆☆☆ | ★☆☆☆☆ | ★★☆☆☆ | Low |
| E | **mistfallhunter.cc** | mistfallhunter.cc | Guide Wiki | ★★★☆☆ | ★★☆☆☆ | ★★★☆☆ | Medium |
| F | **Major sites** | IGN/Game8/Fextralife | Gaming media | ★☆☆☆☆ | ★☆☆☆☆ | ★★☆☆☆ | Medium |

---

### 3.2 Competitor A: MistfallDB (mistfalldb.com) - Database & Tool Benchmark / 数据库+工具站标杆

#### Strengths to adopt / 值得借鉴的优点

| # | Strength | Description | Our adoption strategy |
|---|----------|-------------|----------------------|
| A1 | **Tool chain linking** | Build Planner → Loadout Builder → Item Comparison → Damage Calculator, seamless flow between tools | Our tools will cross-link: Class Quiz result → recommended Build → Build Planner → Squad Comp Builder |
| A2 | **Data scale display on homepage** | Big numbers on homepage: "599 Weapons / 1,584 Armor / 104 Skills / 48 Enemies" builds trust | We'll show our scale differently: "6 Classes / 12 Stances / 10 Tools / 48 Guides" |
| A3 | **Loot Finder (reverse search)** | Search item name → shows all acquisition paths (Boss/Chest/NPC/Craft) | Implement directly, this is a must-have tool |
| A4 | **Craft & Flip Profit calculator** | Helps players find most profitable crafts (profit = auction price - material cost - fee) | Implement directly, economy players need this |
| A5 | **Gem Optimizer** | Finds cheapest gem combinations to achieve target affixes | Implement in P1 phase |
| A6 | **Item Comparison** | Compare 2-3 items side-by-side | Implement in P1 phase |
| A7 | **Mega Menu navigation** | Dropdown menu with 5 groups: Builds / Database / Tools / Reference / Mechanics | We'll use Mega Menu too, structure inspired by theirs |
| A8 | **Card-based homepage layout** | Each tool/database entry is a clickable card (icon + name + description) | Adopt directly, this is standard game wiki pattern |
| A9 | **Build sharing via URL** | Build Planner generates shareable URL | Implement directly |
| A10 | **Global search button** | Persistent search entry in header | Implement directly |
| A11 | **"Send Feedback" button** | Persistent feedback button in corner | Implement directly |

#### Weaknesses (our opportunities) / 弱点（我们的机会）

- No Squad Comp Builder / 没有阵容构建器
- No Class Quiz / career recommender / 没有职业测试/推荐器
- Static Tier List, no community voting/change tracking / 静态 Tier List，无社区投票/变动追踪
- No Codes / Redemption tracking / 没有兑换码/奖励追踪
- No PvP Matchup Matrix / 没有 PvP 对局矩阵
- No Extraction Checklist / 没有撤离清单
- No Patch Notes timeline / 没有补丁说明时间线
- No beginner onboarding flow / 没有新手引导流程
- No Duo-specific content / 没有双人专属内容

#### Detailed tool inventory / 详细工具清单

**Builds section (3 tools)**:
1. **Build Planner** - Talent tree planning + shareable link
2. **Build Guides** - In-game recommended builds by class/weapon
3. **Loadout Builder** - Equipment set + comprehensive stats panel

**Database section (14 databases)**:
1. Weapons (599 items)
2. Armor (1,584 items)
3. Skills (104 skills)
4. Talents (talent tree with prerequisites/locks)
5. Affixes (44 affixes)
6. Bestiary (48 enemies/bosses)
7. Missions (raid missions + rewards)
8. Bosses
9. AI Hunters (NPC hunter data)
10. Items (consumables/materials/containers)
11. Affix Gems
12. Crafting (synthesis recipes + costs)
13. Treasures (chests/containers + drop pools)
14. Cosmetics (skins/weapon skins/portraits/poses)
15. Buildings (Hub building upgrade costs)
16. Vendors (NPC shops + inventory)

**Tools section (11 tools)**:
1. Build Planner
2. Loadout Builder
3. Item Comparison (2-3 items side-by-side)
4. Damage Calculator (estimate effective damage)
5. Crafting Cost Calculator (material + gold forging cost)
6. Craft & Flip Profit (tradable crafts ranked by profit)
7. Gem Optimizer (cheapest gem combinations)
8. Loot Finder (search item → show all acquisition paths)
9. Affix Gear Finder (all gear that can roll an affix)
10. Item Values (auction price ladder by rarity)
11. Auction Prices (base market prices for all items)

**Mechanics section (14 guides)**:
1. Combat & Attributes
2. Classes & Weapons
3. Skills & Talents
4. Stamina, Dodge & Crowd Control
5. Lock-On & Aim Assist
6. Controller vs Keyboard & Mouse
7. Items & Affixes
8. Trading, Prices & Currency
9. Ciphers & Deciphering
10. Events & Hub Systems
11. Spiritual Revival
12. Knocked & Downed
13. Loot & Drops
14. Monsters & AI
15. Raids & Match Rules

**Reference section (8 pages)**:
1. Release Date
2. Crossplay
3. Beginner Guide
4. Classes / Tier List
5. Attributes / Rarities
6. Weapon Types / Item Types
7. Currencies

**Tier List**: Community rankings with Solo/Trio/beginner dimensions

---

### 3.3 Competitor B: Mistfall Hunters Wiki (mistfallhunters.wiki) - Content SEO Benchmark / 内容 SEO 标杆

#### Strengths to adopt / 值得借鉴的优点

| # | Strength | Description | Our adoption strategy |
|---|----------|-------------|----------------------|
| B1 | **7-step beginner onboarding flow** | Homepage visualizes 7-step path: Learn Extraction → Pick Class → Lock Build → Bank Loot → Use Tools → Track Calendar → Read Patch Notes | We'll do beginner onboarding too, but upgrade to **interactive** (click to choose path, not just read) |
| B2 | **Hub → Spoke content organization** | Each theme has Hub page + sub-pages, Hub is aggregation entry | Fully adopt, our 6 Hubs (Guides / Classes / Builds / Codes / Items / Tools) follow this structure |
| B3 | **Time-limited reward countdown** | Homepage emphasizes "Wave 3 by Aug 12" deadlines, creates urgency | We'll add countdown in Codes Hub |
| B4 | **Quick Stats Bar** | Top stats bar: 6 Launch classes / 1M+ Live players / 3 Squad size / PC·PS5·Xbox | Adopt directly |
| B5 | **Hero Section fullscreen carousel** | Official Steam screenshots as fullscreen carousel | Adopt directly |
| B6 | **FAQ Schema coverage** | 3-5 FAQs at bottom of each page with Schema markup for rich snippets | Fully adopt, this is SEO must-do |
| B7 | **Very high internal link density** | 10-20 internal links per page to related pages | Fully adopt |
| B8 | **Title/Meta format standard** | `Mistfall Hunter [Topic] \| Mistfall ([Month] [Year])` | We'll use similar: `Mistfall Hunter [Topic] — [Benefit] \| mistfallhunter.gg` |
| B9 | **Featured Guides section** | Homepage highlights most important guide cards | Adopt directly |
| B10 | **Multi-language declaration** | Homepage shows English / 日本語 / Español / Deutsch | We'll do English-only v1 but reserve i18n architecture |
| B11 | **"Inside the Gyldenmist" image gallery** | Game screenshot gallery enhances visual appeal | Can adopt with self-made or properly attributed screenshots |
| B12 | **Time stamps** | (Jul 2026) in title and description increases freshness signal | Fully adopt: (Updated [Month] [Year]) |

#### Weaknesses (our opportunities) / 弱点（我们的机会）

- Very few tools (only 4 simple tools: Class Picker / Checklist / System Requirements / PC Settings)
- No interactive map
- No Build Planner
- No database (weapons/armor/skills not searchable structured data)
- No Damage Calculator / Item Comparison
- No economy/trading tools
- Content is rich but pure text, lacks interactive experience
- No community features (no voting/comments/UGC)

#### Detailed content inventory / 详细内容清单

**Guides Hub (20+ deep guides)**:
1. Getting Started
2. First Extraction
3. How to Extract
4. Controls
5. Tips & Tricks
6. FAQ
7. Windrest Camp Upgrades
8. Scavenger Squads
9. PvP Survival
10. Multiplayer & Co-op
11. Path of Glory
12. Squad Comps
13. Dual Weapon Stances
14. Gyldenmist Lore
15. Leveling
16. Keys & Treasure Rooms
17. Lore
18. Crossplay
19. Map Guides: Hallowgrove
20. Map Guides: Brandrgarde

**Classes Hub (7 pages)**:
1. Mercenary
2. Sorcerer
3. Blackarrow
4. Shadowstrix
5. Seer
6. Withered Knight
7. Best Beginner Class

**Tier List Hub (3 sub-lists)**:
1. Launch Tier
2. Solo Tier
3. Beginner Tier

**Builds Hub (6 build guides)**:
- One for each class

**Codes Hub (4 pages)**:
1. How to Redeem
2. Twitch Drops
3. Compensation Mail
4. Wave 3 Rewards

**Items Hub (6 pages)**:
1. Gyldenblood
2. Weapons
3. Gems
4. Holy Weapons
5. Victory Wine
6. Dried Flower Knot / Moonlight Nectar

**Tools Hub (4 tools)**:
1. Class Picker (interactive: compare 6 class roles)
2. Extraction Checklist (printable checklist)
3. System Requirements
4. PC Settings & FPS Fix

**Updates Hub (6 news/update pages)**:
1. August 6 Update
2. What's Next
3. Patch Notes
4. Season 1
5. Known Issues
6. Launch Day Guide

**Boss Guides (2+)**:
- Cursed Moonwane
- Soul Harvest Event

---

### 3.4 Competitor C: Mistfall Hunters (mistfallhunters.com) - Trust + AI Differentiation / 诚信+AI 差异化

#### Strengths to adopt (selective) / 值得借鉴的优点（选择性采用）

| # | Strength | Description | Our adoption strategy |
|---|----------|-------------|----------------------|
| C1 | **Trust label system** | Each fact marked Confirmed (green) / Reported (yellow) / Unknown (red) + source links | **Adopt but simplify**: We won't label every fact, but will mark Tier List and guides with "Verified / Community Report / Needs Update" |
| C2 | **Source attribution** | Each fact links to specific source (Steam Store / Gematsu / VGChartz) | Adopt: We'll attribute key data to sources |
| C3 | **Information update date** | Page marked "info gathered 2026-08-03" | Adopt: Each page bottom "Last verified: [date]" |
| C4 | **AI Q&A** | Built-in AI chat box, answers based on knowledge base | Consider in P2 phase |
| C5 | **Live stream embed** | Auto-detects currently live Twitch streamers and embeds | Consider in P2 phase |
| C6 | **"Honest" brand positioning** | "We'd rather show 'unknown' than invent an answer" | Adopt spirit: We'll also mark data credibility |
| C7 | **Fast Facts table** | Homepage quick-answer table for most common player questions | Adopt: We'll also have Quick Facts on homepage |

#### Weaknesses (our opportunities) / 弱点（我们的机会）

- Data volume far less than MistfallDB
- Very few tools
- Tier List outdated (last updated Jun 17)
- Content depth less than B
- No Codes / Rewards tracking

---

### 3.5 Other Competitors / 其他竞品

#### Competitor D: Mistfall Hunter Wiki (mistfallhunter.wiki) - Community Wiki / 社区 Wiki

**Strengths**:
- Uses MediaWiki framework (familiar to wiki users)
- Some detailed class/build content

**Weaknesses**:
- Very weak tool capability
- Small content volume
- Poor mobile experience
- No clear differentiation

**Our strategy**: Learn from their detailed content, but our tool-first approach will be superior.

#### Competitor E: mistfallhunter.cc - Guide Wiki

**Strengths**:
- Platform-specific Settings guides (PS5 / Xbox / PC)
- Controller vs KBM recommendations by class
- Detailed FAQ on each page

**Weaknesses**:
- MediaWiki framework, very weak tool capability
- Small content volume

**Our strategy**: Adopt their platform-specific settings approach (we'll have PC/PS5/Xbox guides too).

#### Competitor F: Major Gaming Sites (IGN / Fextralife / Game8 / Destructoid / Game Rant)

**Coverage level**: Very shallow
- IGN: 1 review article
- Fextralife: 1 wiki page (not vertical site)
- Game8: 1 review
- Destructoid: 1 tier list
- Game Rant: 3-4 articles

**Our strategy**: These sites don't compete seriously in this niche. We can outrank them with dedicated vertical site.

---

### 3.6 YouTube Creator Ecosystem (non-site competitors but important content reference) / YouTube 创作者生态

| Creator type | Content | Our opportunity |
|--------------|---------|-----------------|
| Build videos | "Best Blackarrow Build" "Best Mercenary Build" | Our Build guides must cover all 6 classes × 2 stances = 12 builds |
| Tier List videos | "Solo Tier List" "Trio Tier List" "Launch Tier List" | Our Tier List must cover Solo/Trio/Duo/Beginner 4 dimensions |
| 1000h deep analysis | "After 1000 hours, here's what I learned" | We can organize these video insights into structured guides |
| Settings videos | "Best Graphics Settings" "Best Controller Settings" | Our Settings Recommender tool can surpass videos (interactive vs passive watching) |
| Flipping videos | "How to make gold with Auction House flipping" | Economy guide content |

---

## 4. Best Practices Adoption Matrix / 竞品优点综合采纳清单

Categorize competitor strengths by "Must have / Should have / Nice to have":

### 🔴 Must Have - Falling behind without these / 必须做 - 不做就是落后

| Source | Adoption item | Our implementation |
|--------|---------------|-------------------|
| A | Tool chain linking | Class Quiz → Build → Squad Comp → Matchup, each step has next-step CTA |
| A | Card-based homepage + Mega Menu | Standard game wiki UI pattern |
| A | Loot Finder | Search item → show all acquisition paths |
| A | Build Planner + share link | Talent tree planning + URL sharing |
| A | Global search | Persistent search box in header |
| A | Data scale display on homepage | Quick Stats Bar |
| B | Hub → Spoke content organization | 6 Hub pages (Guides / Classes / Builds / Codes / Items / Tools) |
| B | FAQ Schema on every page | 3-5 FAQs per page + JSON-LD Schema |
| B | High internal link density | 5-15 internal links per page |
| B | Title/Meta format standard | `Mistfall Hunter [Topic] — [Benefit] \| site.gg` |
| B | Time stamps | (Updated [Month] [Year]) |
| B | Hero Section + Quick Stats | Homepage hero image + stats bar |
| B | Featured Guides | Homepage highlights 6 most important guides |
| C | Last Verified date | Each page bottom shows last verification date |
| Common | Dark theme + gold accents | Matches game's dark fantasy art style |
| Common | Mobile-first | Many users search on phone during game breaks |

### 🟡 Should Have - Significant value add / 应该做 - 做了明显加分

| Source | Adoption item | Our implementation |
|--------|---------------|-------------------|
| A | Item Comparison | 2-3 items side-by-side (P1) |
| A | Crafting Cost Calculator | Material + gold forging cost (P1) |
| A | Craft & Flip Profit | Craft profit ranking (P1) |
| A | Gem Optimizer | Cheapest gem combinations (P1) |
| A | Damage Calculator | Estimate effective damage (P1) |
| A | "Send Feedback" button | Persistent in corner |
| B | 7-step beginner onboarding | Upgrade to interactive journey (click to choose path) |
| B | Time-limited reward countdown | Codes Hub page countdown |
| B | Image gallery | Self-made or properly attributed game screenshots |
| B | Multi-language architecture reserve | English v1, i18n architecture ready |
| C | Trust labels (simplified) | Mark Tier List and key data "Verified / Community / Needs Update" |
| C | Source attribution | Key data links to sources |
| C | Fast Facts table | Homepage Quick Facts |
| E | Platform-specific Settings guides | PC / PS5 / Xbox one guide each |
| E | Controller vs KBM by class | Dedicated comparison guide |

### 🟢 Nice to Have - Do if resources allow / 可选做 - 有余力再做

| Source | Adoption item | Our implementation |
|--------|---------------|-------------------|
| C | AI Q&A | P2, instant Q&A based on knowledge base |
| C | Live stream embed | P2, auto-show currently live streamers |
| C | "Honest" brand spirit | Incorporate into About page |
| B | "Inside the Gyldenmist" gallery | If we have good screenshot assets |

---

## 5. Gap Filling - Differentiation Weapons / 竞品缺口填补 - 差异化武器

### 6 high-demand gaps (players repeatedly ask but no site addresses well) / 6 个高需求缺口

| # | Gap | Player evidence | Competitor status | Our implementation | Priority |
|---|-----|-----------------|-------------------|--------------------| ---------|
| 1 | **Squad Comp Builder** | Reddit/YouTube lots of "best trio comp" discussion; dtgre.com has article but no interactive tool | ❌ No site offers | Visual drag-and-drop 3 classes to form squad → auto-evaluate comp strengths/weaknesses, role coverage (Frontline/DPS/Support), missing roles, recommended synergies | P0 |
| 2 | **PvP Matchup Matrix** | YouTube 1000h player videos analyze each matchup in detail | ❌ None | 6×6 interactive matrix, click any cell to see matchup analysis and strategy tips, with Solo/Trio dimension toggle | P0 |
| 3 | **Class Quiz** | New player's biggest pain: "don't know which class to pick" | ⚠️ B has simple Class Picker but it's just a comparison table | Interactive 5-question test → recommend best-fit class + reasoning + recommended Build link | P0 |
| 4 | **Settings Recommender** | 5+ major site articles (gamerant/destructoid/sportskeeda/gamerblurb/nerdschalk) prove search demand | ❌ No interactive tool | Input GPU model + monitor resolution → output optimal graphics/FPS settings (PC/PS5/Xbox 3 platforms) | P0 |
| 5 | **Duo Guide** | Reddit lots of complaints about "no Duo matchmaking" | ⚠️ Very little content, no dedicated Hub | Dedicated Duo Hub: Duo Tier List + Duo Build recommendations + Duo strategies + Duo Comp Builder (2-player version) | P0 |
| 6 | **Patch Meta Tracker** | "Tier List changes every patch" | ❌ None | Track Tier List changes after each patch, visualize historical comparison | P1 |

### 4 medium-demand gaps / 4 个中等需求缺口

| # | Gap | Competitor status | Our implementation | Priority |
|---|-----|-------------------|--------------------| ---------|
| 7 | **Solo vs Trio Tier List side-by-side** | Each site has separate pages | Side-by-side comparison view, one-click toggle | P0 (integrated into Tier List page) |
| 8 | **Extraction Route Planner** | Lots of guides about "best loot routes" but no visualization | Interactive map with marked optimal routes | P1 |
| 9 | **Boss Timeline Visualizer** | Text-only guides | Boss fight phase transitions/AOE/DPS window visual timeline | P1 |
| 10 | **Keybinds Cheat Sheet** | Many control guides but no printable cheat sheet | Printable PDF cheat sheet | P2 |

---

## 6. Target Users (ICP) / 目标用户

### ICP-1: New Player (primary, 50% share) / 新手玩家（主 ICP，占比 50%）

- **Profile**: Just bought/downloaded, don't know which class to pick, how to extract, how to build
- **Pain points**: Information overload / don't know where to start / afraid to pick wrong class / game complexity
- **Search terms**: `mistfall hunter best class` / `mistfall beginner guide` / `mistfall hunter how to extract` / `mistfall hunter tips`
- **What we give them**: Class Quiz → class recommendation → Build guide → extraction tutorial → interactive beginner journey
- **Willingness to pay**: Low (but contributes traffic and SEO weight)
- **Competitor reference**: B's 7-step onboarding + C's Fast Facts

### ICP-2: Mid-Core Player (25% share) / 进阶玩家（占比 25%）

- **Profile**: Played 10-50 hours, wants to optimize Build, understand Meta, improve PvP
- **Pain points**: Build trial-and-error cost is high / don't know why losing in PvP / don't know Meta changes after patches
- **Search terms**: `mistfall hunter build` / `mistfall hunter tier list` / `mistfall hunter pvp` / `mistfall hunter matchup`
- **What we give them**: Build Planner → PvP Matchup Matrix → Patch Meta Tracker
- **Willingness to pay**: Medium (might pay for advanced Build templates)
- **Competitor reference**: A's tool chain linking

### ICP-3: Trio/Duo Fixed Squad (15% share) / 三排/双排固定队（占比 15%）

- **Profile**: Has fixed teammates, wants to optimize squad composition
- **Pain points**: Don't know what 3 people should pick / best comp changes after patches / Duo has no official matchmaking
- **Search terms**: `mistfall hunter best trio comp` / `mistfall hunter team composition` / `mistfall hunter duo`
- **What we give them**: Squad Comp Builder → comp evaluation → Duo dedicated Hub
- **Willingness to pay**: Medium-high
- **Competitor reference**: None (this is blank market)

### ICP-4: Economy Player (10% share) / 经济玩家（占比 10%）

- **Profile**: Focuses on Auction House flipping, gold farming, craft profits
- **Pain points**: Don't know what items are valuable / can't calculate craft costs clearly / market price fluctuates
- **Search terms**: `mistfall hunter gold farming` / `mistfall hunter auction house` / `mistfall hunter flipping`
- **What we give them**: Loot Finder → Crafting Cost Calculator → Craft & Flip Profit → Item Values
- **Willingness to pay**: Medium
- **Competitor reference**: A's Craft & Flip and Loot Finder

---

## 7. Product Positioning / 产品定位

### One-liner / 一句话定位

> **"Mistfall Hunter's decision engine — tools that help you pick, build, squad up, and extract smarter."**
> 
> "Mistfall Hunter 的决策引擎 — 帮你选择、构建、组队和更聪明地撤离的工具。"

### Positioning vs competitors / 与竞品的定位对比

| Dimension | MistfallDB | mistfallhunters.wiki | mistfallhunters.com | **Us** |
|-----------|-----------|---------------------|--------------------|---------|
| Core value | Look up data | Read guides | Verify facts | **Make decisions** |
| User behavior | Search→view→leave | Search→read→leave | Search→verify→leave | Search→use tool→decide→return to verify |
| Stickiness | Low | Low | Low | **High** (tool outputs shareable/iterable) |
| Data depth | ★★★★★ | ★★ | ★★★ | ★★★ (v1, gradually catch up) |
| Content depth | ★★★ | ★★★★★ | ★★★ | ★★★★ (quality over quantity) |
| Tool UX | ★★★★★ | ★★ | ★★ | ★★★★★ (+ differentiated tools) |
| Trust system | ★★★ | ★★★ | ★★★★★ | ★★★★ (simplified trust labels) |

### Our unique value formula / 我们的独特价值公式

```
Our value = Competitor A's tool depth
          + Competitor B's content organization
          + Competitor C's trust system
          + 6 unique differentiated tools
          + Mobile-first experience
```

### NOT-DO (explicitly won't do) / NOT-DO（明确不做的事）

1. ❌ No video content (YouTube already has lots of creators)
2. ❌ No forums/community (Reddit/Discord already exist)
3. ❌ No news/update speed coverage (wiki sites already cover)
4. ❌ No automated game data scraping (copyright risk, manual curation + community contributions)
5. ❌ No implying official status ("Unofficial fan resource. Not affiliated with Bellring Games." must be marked)
6. ❌ No copying competitor copy/charts/design (can cover same topics but must be original expression)
7. ❌ No shop/e-commerce
8. ❌ No guide ghostwriting/boosting services
9. ❌ No P2W-related content (game is non-P2W, maintain community trust)

---

## 8. Feature Plan / 功能规划

### P0 - Launch MVP (must have) / P0 - 首版必须有

#### Tools (10) / 工具（10 个）

| # | Tool | Route | User task | Source | Differentiation |
|---|------|-------|-----------|--------|-----------------|
| T1 | Build Planner | `/build-planner` | Pick talent points, plan Build, generate share link | Adopt from A | Match DB |
| T2 | **Squad Comp Builder** | `/squad-builder` | Drag-drop 3 classes to form squad → evaluate comp strengths/weaknesses, role coverage, missing roles, recommended synergies | Unique | **Unique** |
| T3 | **Class Quiz** | `/class-quiz` | Answer 5 questions → recommend best-fit class + reasoning + recommended Build link | Surpass B's simple Picker | **Unique** |
| T4 | **PvP Matchup Matrix** | `/matchups` | 6×6 interactive matrix, click cell to see matchup analysis and strategy, Solo/Trio toggle | Unique | **Unique** |
| T5 | **Settings Recommender** | `/settings` | Input GPU/monitor/platform → output optimal settings (PC/PS5/Xbox) | Unique | **Unique** |
| T6 | Tier List | `/tier-list` | Solo / Trio / **Duo** / Beginner 4-dimension ranking + side-by-side comparison | Adopt from A+B, Duo unique | Duo dimension unique |
| T7 | Interactive Map | `/map` | Pan/Zoom/Filter map + mark POI/extraction points/bosses | Adopt from A | Match DB |
| T8 | Loot Finder | `/loot-finder` | Search item → show all acquisition paths | Directly adopt from A | Match DB |
| T9 | Item Database | `/items` | Weapons/armor/gems/consumables searchable list | Adopt from A (v1 data volume small) | Match DB |
| T10 | Extraction Checklist | `/checklist` | Interactive checklist (check items, save to localStorage) | Adopt from B, upgrade to interactive | Better than wiki |

#### Content (48 pages) / 内容（48 页）

| # | Content type | Pages | Route pattern | Source | Difference |
|---|--------------|-------|--------------|--------|------------|
| C1 | Class guides | 6 | `/classes/[class]` | Adopt B's depth | + embedded Class Quiz result link |
| C2 | Build guides | 6 | `/builds/[class]` | Adopt A's structure | + embedded Build Planner CTA |
| C3 | Tier List sub-pages | 4 | `/tier-list/[mode]` | Adopt from A+B | + Duo unique + trust labels |
| C4 | Map guides | 2 | `/maps/[name]` | Adopt from B | + interactive map embed |
| C5 | Boss guides | 3 | `/bosses/[name]` | Adopt from B | + visual timeline (P1) |
| C6 | System guides | 10 | `/guides/[topic]` | Adopt B's Hub-Spoke | + tool embeds |
| C7 | Codes/Rewards | 3 | `/codes/[topic]` | Adopt from B | + countdown |
| C8 | Beginner | 3 | `/guides/[beginner]` | Adopt B's Quick Start | + interactive journey |
| C9 | Settings | 3 | `/guides/[settings]` | Adopt E's platform-specific | + Settings Recommender embed |
| C10 | Economy | 2 | `/guides/[economy]` | Original (YouTube has demand) | + Loot Finder embed |
| C11 | Duo/Solo | 2 | `/guides/[mode]` | Unique | **Unique** |
| C12 | Trust Pages | 4 | `/about` `/privacy` `/terms` `/contact` | Standard | Includes Unofficial declaration |
| | **Total** | **48** | | | |

### P1 - Post-Launch Sprint (2-4 weeks) / P1 - 首版后快速迭代（2-4 周）

| # | Feature | Description | Source |
|---|---------|-------------|--------|
| P1-1 | Damage Calculator | Estimate Build's effective damage output | Adopt from A |
| P1-2 | Item Comparison | 2-3 items side-by-side attribute comparison | Adopt from A |
| P1-3 | Crafting Cost Calculator | Input target item → material + gold cost | Adopt from A |
| P1-4 | Craft & Flip Profit | Rank tradable crafts by profit | Adopt from A |
| P1-5 | Gem Optimizer | Cheapest gem combinations to achieve target affixes | Adopt from A |
| P1-6 | Patch Meta Tracker | Visualize Tier List changes after each patch | Unique |
| P1-7 | Boss Timeline Visualizer | Boss fight phase transitions/AOE/DPS window visual timeline | Unique |
| P1-8 | Extraction Route Planner | Mark optimal farming routes on interactive map | Unique |

### P2 - Future (1-3 months) / P2 - 远期（1-3 个月）

| # | Feature | Description | Source |
|---|---------|-------------|--------|
| P2-1 | AI Q&A | Instant Q&A based on knowledge base | Adopt from C |
| P2-2 | Live Streamer Embed | Auto-show currently live Twitch streamers | Adopt from C |
| P2-3 | Auction House Price Tracker | Price trend charts | Surpass A's static prices |
| P2-4 | Seasonal Wipe Calculator | Help players plan resource usage before season end | Unique |
| P2-5 | Keybinds Cheat Sheet | Printable PDF cheat sheet | Unique |
| P2-6 | Multi-language | Japanese / Spanish / German | Adopt B's architecture |
| P2-7 | Community Contributions | User-submitted Builds/guides (reviewed before publish) | Surpass all competitors |

---

## 9. Page Information Architecture / 页面信息架构

### Homepage (`/`)

Adopting B's Hero + Stats + Featured Guides + beginner onboarding, fusing A's tool cards + C's Fast Facts:

```
┌─────────────────────────────────────────────────┐
│ Hero Section (official game screenshot carousel │
│ + brand tagline)                                │
│ "Mistfall Hunter's Decision Engine"             │
│ Dual CTA: [Take the Class Quiz] [Browse Tools]  │
├─────────────────────────────────────────────────┤
│ Quick Stats Bar                                 │
│ 6 Classes | 12 Stances | 10 Tools | 48 Guides   │
├─────────────────────────────────────────────────┤
│ Beginner Journey (interactive 3-step onboarding)│
│ [Pick Your Class] → [Build Your Kit] → [Extract]│
├─────────────────────────────────────────────────┤
│ Tools Grid (10 tool cards, icon+name+desc)      │
│ [Squad Builder] [Class Quiz] [Matchups] ...     │
├─────────────────────────────────────────────────┤
│ Featured Guides (6 most important guide cards)  │
│ [Getting Started] [Best Class] [Extraction]     │
│ [Maps] [Codes] [Settings]                       │
├─────────────────────────────────────────────────┤
│ Latest Updates (3 newest updates)               │
├─────────────────────────────────────────────────┤
│ Quick Facts Table (adopt from C)                │
│ Game basic info + Last Verified date            │
├─────────────────────────────────────────────────┤
│ Codes Countdown (time-limited reward countdown) │
│ "Wave 3 Rewards expire in X days"               │
├─────────────────────────────────────────────────┤
│ Footer (About / Privacy / Terms / Contact)      │
│ "Unofficial fan resource. Not affiliated with   │
│  Bellring Games or Skystone Games."             │
└─────────────────────────────────────────────────┘
```

### Tool Pages (one Route per tool)

```
┌─────────────────────────────────────────────────┐
│ H1 = Tool name + "Mistfall Hunter"              │
│ Subtitle = One-line value description           │
├─────────────────────────────────────────────────┤
│ Tool interaction area (above the fold, operable │
│ without scrolling)                              │
│ [Tool UI]                                       │
├─────────────────────────────────────────────────┤
│ How to Use (usage instructions, 2-3 steps)      │
├─────────────────────────────────────────────────┤
│ Next step CTA (tool chain linking, adopt from A)│
│ "Now that you've picked your class,             │
│  try the Build Planner →"                       │
├─────────────────────────────────────────────────┤
│ FAQ (3-5 questions, JSON-LD Schema markup)      │
├─────────────────────────────────────────────────┤
│ Related Tools (3-4 related tool cards)          │
│ Related Guides (3-4 related guide cards)        │
└─────────────────────────────────────────────────┘
```

### Content Pages

```
┌─────────────────────────────────────────────────┐
│ H1 = Precisely match main keyword               │
│ Subtitle = Last updated date + trust label      │
│ "Last verified: August 2026 | Verified ✓"       │
├─────────────────────────────────────────────────┤
│ Table of Contents (anchor jump navigation)      │
├─────────────────────────────────────────────────┤
│ Body (2000-3000 words)                          │
│ - Embedded tool CTA ("Try the Build Planner →") │
│ - Internal links (5-15 to related tools/guides) │
│ - Images/charts (self-made or properly attributed)│
├─────────────────────────────────────────────────┤
│ FAQ (3-5 questions, JSON-LD Schema markup)      │
├─────────────────────────────────────────────────┤
│ Related Guides (3-5 cards)                      │
│ Related Tools (2-3 cards)                       │
└─────────────────────────────────────────────────┘
```

### Hub Pages

```
┌─────────────────────────────────────────────────┐
│ H1 = Theme + "Mistfall Hunter"                  │
│ Theme intro (100-200 words)                     │
├─────────────────────────────────────────────────┤
│ Sub-page card grid (one card per sub-page)      │
│ [Icon] [Title] [One-line description] [→ link]  │
├─────────────────────────────────────────────────┤
│ FAQ                                             │
└─────────────────────────────────────────────────┘
```

---

## 10. Route Contract / 路由合同

### Indexable Routes (58 pages, including all P0)

#### Core Pages
| Route | H1 | Type | Index |
|-------|-----|------|-------|
| `/` | Mistfall Hunter Tools, Builds & Tier List | Home | ✅ |

#### Tool Pages (10)
| Route | H1 | Type | Index |
|-------|-----|------|-------|
| `/build-planner` | Mistfall Hunter Build Planner | Tool | ✅ |
| `/squad-builder` | Mistfall Hunter Squad Comp Builder | Tool | ✅ |
| `/class-quiz` | Mistfall Hunter Class Quiz — Find Your Best Class | Tool | ✅ |
| `/matchups` | Mistfall Hunter PvP Matchup Matrix | Tool | ✅ |
| `/settings` | Mistfall Hunter Best Settings & FPS Guide | Tool | ✅ |
| `/tier-list` | Mistfall Hunter Tier List | Hub | ✅ |
| `/map` | Mistfall Hunter Interactive Map | Tool | ✅ |
| `/loot-finder` | Mistfall Hunter Loot Finder | Tool | ✅ |
| `/items` | Mistfall Hunter Items Database | Tool | ✅ |
| `/checklist` | Mistfall Hunter Extraction Checklist | Tool | ✅ |

#### Class Pages (6)
| Route | H1 |
|-------|-----|
| `/classes/mercenary` | Mistfall Hunter Mercenary Class Guide |
| `/classes/sorcerer` | Mistfall Hunter Sorcerer Class Guide |
| `/classes/blackarrow` | Mistfall Hunter Blackarrow Class Guide |
| `/classes/shadowstrix` | Mistfall Hunter Shadowstrix Class Guide |
| `/classes/seer` | Mistfall Hunter Seer Class Guide |
| `/classes/withered-knight` | Mistfall Hunter Withered Knight Class Guide |

#### Build Pages (6)
| Route | H1 |
|-------|-----|
| `/builds/mercenary` | Mistfall Hunter Mercenary Build Guide |
| `/builds/sorcerer` | Mistfall Hunter Sorcerer Build Guide |
| `/builds/blackarrow` | Mistfall Hunter Blackarrow Build Guide |
| `/builds/shadowstrix` | Mistfall Hunter Shadowstrix Build Guide |
| `/builds/seer` | Mistfall Hunter Seer Build Guide |
| `/builds/withered-knight` | Mistfall Hunter Withered Knight Build Guide |

#### Tier List Sub-pages (4)
| Route | H1 |
|-------|-----|
| `/tier-list/solo` | Mistfall Hunter Solo Tier List |
| `/tier-list/trio` | Mistfall Hunter Trio Tier List |
| `/tier-list/duo` | Mistfall Hunter Duo Tier List |
| `/tier-list/beginner` | Mistfall Hunter Beginner Tier List |

#### Map Pages (2)
| Route | H1 |
|-------|-----|
| `/maps/hallowgrove` | Mistfall Hunter Hallowgrove Map Guide |
| `/maps/brandrgarde` | Mistfall Hunter Brandrgarde Map Guide |

#### Boss Pages (3)
| Route | H1 |
|-------|-----|
| `/bosses/cursed-moonwane` | Mistfall Hunter Cursed Moonwane Boss Guide |
| `/bosses/salmar` | Mistfall Hunter Salmar Boss Guide |
| `/bosses/einherjar` | Mistfall Hunter Einherjar Boss Guide |

#### Guide Pages (17)
| Route | H1 |
|-------|-----|
| `/guides/getting-started` | Mistfall Hunter Beginner Guide |
| `/guides/first-extraction` | Mistfall Hunter First Extraction Guide |
| `/guides/extraction` | How to Extract in Mistfall Hunter |
| `/guides/tips` | Mistfall Hunter Tips & Tricks |
| `/guides/faq` | Mistfall Hunter FAQ |
| `/guides/dual-weapon-stances` | Mistfall Hunter Dual Weapon Stances Guide |
| `/guides/camp-upgrades` | Mistfall Hunter Camp Upgrades Guide |
| `/guides/scavenger-squads` | Mistfall Hunter Scavenger Squads Guide |
| `/guides/leveling` | Mistfall Hunter Leveling Guide |
| `/guides/keys-treasure` | Mistfall Hunter Keys & Treasure Rooms |
| `/guides/pvp-survival` | Mistfall Hunter PvP Survival Guide |
| `/guides/pc-settings` | Mistfall Hunter Best PC Settings & FPS Fix |
| `/guides/ps5-settings` | Mistfall Hunter Best PS5 Settings |
| `/guides/xbox-settings` | Mistfall Hunter Best Xbox Settings |
| `/guides/controller-vs-kbm` | Mistfall Hunter Controller vs Keyboard & Mouse |
| `/guides/auction-house` | Mistfall Hunter Auction House Guide |
| `/guides/gold-farming` | Mistfall Hunter Gold Farming Guide |

#### Codes Pages (3)
| Route | H1 |
|-------|-----|
| `/codes/rewards` | Mistfall Hunter Codes & Rewards |
| `/codes/how-to-redeem` | How to Redeem Mistfall Hunter Codes |
| `/codes/twitch-drops` | Mistfall Hunter Twitch Drops Guide |

#### Duo/Solo Dedicated (2)
| Route | H1 |
|-------|-----|
| `/guides/duo` | Mistfall Hunter Duo Guide |
| `/guides/solo-survival` | Mistfall Hunter Solo Survival Guide |

#### Trust Pages (4)
| Route | H1 | Index |
|-------|-----|-------|
| `/about` | About Us | ✅ |
| `/privacy` | Privacy Policy | ✅ |
| `/terms` | Terms of Service | ✅ |
| `/contact` | Contact | ✅ |

#### Noindex Routes
| Route | Reason |
|-------|--------|
| `/api/*` | API endpoints |
| `/404` | Error page |

---

## 11. Domain & Tech Stack / 域名与技术栈

### Domain candidates

| Priority | Domain | Recommendation | Reason |
|----------|--------|---------------|--------|
| 🥇 | `mistfallhunter.gg` | ★★★★★ | .gg has highest recognition in gaming community |
| 🥈 | `mistfallhunter.co` | ★★★★ | .co common for commercial tool sites |
| 🥉 | `mistfalltools.com` | ★★★ | .com authoritative but tools not searchable |

**Recommendation**: Register `.gg` as primary + `.co` for 301 redirect. Wait for Owner confirmation before registering.

### Tech stack

| Layer | Choice | Reason |
|-------|--------|--------|
| Frontend | Next.js 14 + TypeScript + Tailwind CSS | User preference, SSR/SSG flexibility |
| Deploy | Cloudflare Workers (OpenNext) | User preference, not using Pages |
| Database | Cloudflare D1 | Structured game data (weapons/armor/skills/gems) |
| Storage | Cloudflare R2 | Image assets |
| CDN | Cloudflare global edge | Global acceleration |
| Analytics | GA4 + Cloudflare Web Analytics | Conversion tracking |
| SEO | Static-first + ISR for tool pages | Performance + freshness balance |
| i18n | next-intl (reserved, v1 English only) | P2 multi-language architecture ready |

---

## 12. Visual Style Direction / 视觉风格方向

### Color palette

- **Primary**: Dark series (#0a0a0f ~ #1a1a2e), matches game's dark fantasy art style
- **Accent**: Gold (#d4a574 ~ #f0c040), Gyldenblood / Gyldenmist theme
- **Functional**: Tier List encoding (S=gold / A=green / B=blue / C=gray / D=red)
- **Trust**: Verified=green / Community=yellow / Needs Update=red

### Design language

- **Card-based layout**: Standard game wiki pattern consistent with competitors (adopt from A+B)
- **Game background masked animation Hero**: Animated game footage (video/GIF) with dark overlay mask as Hero background — creates **immersive** dark fantasy atmosphere. Animation loops subtly, not distracting from CTAs. (Owner requirement: 游戏背景蒙版动图，要加沉浸感)
- **Tools above the fold**: Users can start using without scrolling
- **Mobile-first**: Many users search on phone during game breaks
- **Mega Menu navigation**: 5 major group dropdowns (adopt from A)
- **Responsive**: 320px ~ 1920px full breakpoint coverage

### Must avoid

- Don't copy MistfallDB's specific UI component code/layout
- Don't copy mistfallhunters.com's trust label color encoding (can use different colors)
- Don't use competitor's original charts/screenshots
- Don't use official game logo as site logo (copyright risk)

---

## 13. SEO Strategy / SEO 策略

### Title format (adopt from B, improved)

```
Homepage: Mistfall Hunter Tools, Builds & Tier List (Updated Aug 2026) | mistfallhunter.gg
Tools: Mistfall Hunter [Tool Name] — [Benefit] | mistfallhunter.gg
Guides: Mistfall Hunter [Topic] Guide — [Benefit] (Updated [Month] [Year]) | mistfallhunter.gg
Hubs: Mistfall Hunter [Theme] Hub — [Description] | mistfallhunter.gg
```

### Meta Description format

- Unique per page, 150-160 chars
- Include main keyword + value description + update time
- Example: `Find your best Mistfall Hunter class with our interactive quiz. Answer 5 questions about your playstyle and get a personalized class recommendation with build tips. Updated August 2026.`

### Per-page SEO checklist

- [ ] Unique H1 (precisely match main keyword)
- [ ] Meta Description (150-160 chars)
- [ ] OG Image (1200×630px)
- [ ] Canonical URL
- [ ] FAQ Schema (JSON-LD, 3-5 Q&As)
- [ ] Breadcrumb Schema
- [ ] Internal links (5-15 to related pages)
- [ ] Image alt text
- [ ] Last Verified date

### Internal linking strategy (adopt B's high density)

- 5-15 internal links per guide
- Tool pages → related guides ("Learn more about Mercenary →")
- Guide pages → related tools ("Try the Build Planner →")
- Hub pages → all sub-pages
- Sub-pages → Hub page + sibling sub-pages

### Sitemap structure

```
sitemap.xml
├── /sitemap-tools.xml (10 tools)
├── /sitemap-classes.xml (6 classes + 6 builds)
├── /sitemap-guides.xml (17 guides + 3 codes + 2 duo/solo)
├── /sitemap-hubs.xml (tier-list + 4 sub-pages)
├── /sitemap-maps.xml (2 maps)
├── /sitemap-bosses.xml (3 bosses)
└── /sitemap-pages.xml (home + trust pages)
```

---

## 14. Conversion Funnel & Events / 转化漏斗与埋点

### Core funnel

```
SEO Landing → Tool usage → Valuable result → Share/bookmark → Return visit
                                            ↘ Newsletter Signup (patch notifications)
```

### Key events

| Event name | Trigger condition | Parameters |
|------------|------------------|------------|
| `tool_used` | Tool interaction | tool_name, class_selected, build_shared |
| `quiz_completed` | Class Quiz completion | result_class, quiz_duration |
| `squad_built` | Squad Comp Builder usage | comp_classes, comp_rating |
| `matchup_viewed` | Matchup Matrix click view | class_from, class_to |
| `settings_generated` | Settings Recommender output | gpu_model, platform |
| `checklist_completed` | Extraction Checklist completion | items_checked, items_total |
| `content_read` | Content page reading | page, scroll_depth, time_on_page |
| `internal_link_click` | Internal link click | from_page, to_page |
| `build_shared` | Build sharing | build_url, share_method |
| `newsletter_signup` | Email subscription | email, source_page |

---

## 15. Risk Assessment / 风险评估

### P0 risks (must address)

| # | Risk | Impact | Mitigation |
|---|------|--------|-----------|
| R1 | Brand DMCA / UDRP | Domain/site takedown | Mark "Unofficial fan resource. Not affiliated with Bellring Games or Skystone Games."; don't use official logo; About page explicit declaration |
| R2 | Data accuracy | Player trust collapse | Each page marked "Last verified: [date]"; Tier List trust labels; update within 24h of patches |

### P1 risks (need attention)

| # | Risk | Impact | Mitigation |
|---|------|--------|-----------|
| R3 | Competitor data moat | MistfallDB's 599 weapon data we can't match quickly | Compete with tool differentiation, gradually supplement data volume |
| R4 | Content volume gap | mistfallhunters.wiki has 60+ pages | v1 48 pages quality first, each page embedded tool CTA to increase stickiness |
| R5 | SEO cold start | New domain has no authority | High-quality content + high internal link density + FAQ Schema + tool pages natural backlink attraction |
| R6 | Game popularity fade | Search volume drops | Extraction ARPG genre usually has long lifecycle; P2 multi-language to expand markets |

### P2 risks (tolerable)

| # | Risk | Impact | Mitigation |
|---|------|--------|-----------|
| R7 | Major sites enter | Fextralife/IGN deepen coverage | They usually don't do vertical tool sites; our tools are moat |
| R8 | Competitors catch up | DB/wiki add similar tools | First-mover advantage + continuous iteration |

---

## 16. Downstream Handoff / 交接摘要

### Minimum necessary information for downstream stages

| Stage | Must read | Key input |
|-------|-----------|-----------|
| 03 Pricing | This Brief §7 Positioning + §6 ICP | Determine if there's paid plan |
| 04 Compliance | This Brief §15 Risks + §7 NOT-DO | Privacy/Terms/Cookie/Disclaimer |
| 05S SEO | This Brief §13 SEO Strategy | Title/Meta/Schema/Sitemap execution |
| 06 Copywriting | This Brief §8 Feature Plan + §9 Page Architecture | All 48 pages copy |
| 07 Design | This Brief §12 Visual Direction + §9 Page Architecture | Visual source of truth |
| 08 Frontend | This Brief §11 Tech Stack + §10 Route Contract | Next.js + Cloudflare Workers implementation |

### Cannot assume

- Domain is registered (Owner said will buy later)
- Game data is structured (needs manual curation)
- Tools are implemented (needs frontend development)
- Game won't update (patches can come anytime)

---

## Owner Confirmation Checklist / Owner 确认清单

Please confirm the following directions, after confirmation proceed to PRD V1 full document:

| # | Decision item | Current direction |
|---|--------------|-------------------|
| 1 | Site type | Tool site (60%) + Content site (30%) + Trust system (10%) hybrid |
| 2 | Positioning | Decision engine (adopt A tools + B content + C trust + unique differentiation) |
| 3 | Differentiated tools | Squad Comp Builder / Class Quiz / PvP Matchup / Settings Recommender / Duo Hub / Patch Tracker |
| 4 | v1 tool count | 10 (including 5 unique) |
| 5 | v1 content volume | 48 pages |
| 6 | NOT-DO | No video/forums/news/shop/data scraping |
| 7 | Domain direction | .gg priority |
| 8 | Tech stack | Next.js + Cloudflare Workers + D1 + R2 |
| 9 | Visual direction | Dark + gold + card-based + mobile-first |

**Reply format**:
- All confirmed: `Confirm, proceed to PRD V1`
- Partial changes: `Change [item] to [new direction], rest confirmed`
- Need discussion: `[item] uncertain, elaborate`

---

**Status**: [NEEDS_REVIEW]  
**Next action**: Awaiting Owner confirmation
