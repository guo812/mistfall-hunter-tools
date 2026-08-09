# SEO-Copy Freeze — mistfall-hunter（05-copy 主文档）

> 阶段 Stage: 05-copy（SEO-Copy Freeze）
> 日期 Date: 2026-08-08
> 作者 Author: content（profile=content，依据 site-copywriting-student）
> 上游 Upstream: PRD V1（outputs/02-prd-v1/prd-v1-master-spec-bilingual.md，02C 已确认）+ PRD Addendum V1.1（outputs/02D-prd-addendum/prd-addendum-v1.1-change-control.md，02D owner 已确认：路由 58）+ 03 pricing + 04 compliance（legal-pages-baseline-drafts.md）+ 05S SEO baseline（05S-seo-baseline.md + keyword-route-map.md）
> 生产域名 Production domain: **https://mistfallhunter.co**（R1；canonical 终值，无尾斜杠、小写、查询参数不参与 canonical）
> 状态 Status: **[DONE] — 冻结包已交付，等待 05C owner 确认（t_9120f304）；未确认前不得进入设计/前端。**

---

## 0. 结论先行 / Executive Summary

- 58 个 indexable 路由全部冻结：Title / Meta description / H1 / Direct Answer / H2 结构 / FAQ（3-5/页）/ schema / CTA / 状态文案 / 设计落位建议。
- TDK/H1 采用 PRD V1 §5 逐页唯一值（下游不得自行变更），本文件按 02D/04/05S 增量做合规与 SEO 收口；Trust 页 Title/Meta 按 04 合规定稿（A2 = 路由保持 58，Cookie/Disclaimer 并入 Privacy/Terms，不新增 /cookie-policy、/disclaimer）。
- 全局硬约束：全免费口径（N12/R2，禁付费话术）、Steam CTA（R2）、Free to use 而非 Unlimited（E1）、信任标签定义（E5）、contact@mistfallhunter.co（E3）、Unofficial 声明（N1）、竞品名不上公开页（N4，internal benchmark only）。
- 四工具页（/squad-builder /matchups /build-planner /map）按 R3 以**可用工具 + 非薄页正文**冻结（index + sitemap），无 Coming Soon 灰态卡。

## 1. 全局文案规则 / Global Copy Rules

### 1.1 语气与风格（Style）
- 实用、具体、短句；少形容词；5 秒内知道 What/Who/Why/CTA。
- 所有游戏实体使用官方命名（Mistfall Hunter / Bellring Games / Skystone Games / 6 职业英文名 / Hallowgrove / Brandrgarde / Cursed Moonwane / Salmar / Einherjar），禁止同义词替换（GEO/AEO 实体一致，05S §3.1）。
- 数据结论必须带信任标签与 Last Verified；无证据不写具体数值（[DATA-PENDING: 08] 标记）。

### 1.2 信任标签定义（E5，页面/FAQ 出现即需可解释）
- **Verified**：数据经人工核验官方来源或游戏内实测，且有 Last Verified 日期。
- **Community Report**：社区/视频来源汇总，未经官方确认。
- **Needs Update**：补丁后待更新。
- 定义文本固定入 About/Privacy/Terms 与 FAQ 引用处，不得无证据标 Verified。

### 1.3 Steam CTA（R2）
- 文案：`Play on Steam`；链接：https://store.steampowered.com/app/3282300/Mistfall_Hunter/
- 落位：首页 Hero（第三 CTA）+ 工具页/相关内容页 CTA 区；**不得在文案中声称游戏价格**（03 pricing 与 Steam Free-to-Play 口径存在差异，V1 文案不写价格）。
- rel 属性由 10 SEO recheck 评估（默认外链规范）。

### 1.4 全免费口径（N12/R2/E1）
- 允许：`Free to use` / `Free tools, no sign-up` / `No account needed` / `No sign-up`。
- 禁止：`Unlimited`、`free forever`、`100% free`、`open-source`（非真实开源）、`Upgrade`、`Buy`、`Subscribe`、`Pro`、`Lifetime`、`Premium`、`paywall`、任何付费话术（03 handoff §交接契约 + 04 禁用表达）。
- 工具页统一 Footer/说明行：`Free to use. No account needed.`

### 1.5 非官方声明（N1，每页 Footer + About + Terms）
- 固定文案：`Unofficial fan resource. Not affiliated with Bellring Games or Skystone Games.`
- Footer 固定链接集（A2 路由 58 口径，不新增 /cookie-policy、/disclaimer 独立页）：`About | Privacy | Terms | Contact`
- © 行：`© 2026 Mistfall Hunter Tools. All game names and trademarks are property of their respective owners.`

### 1.6 联系邮箱（E3）
- 全站统一 `contact@mistfallhunter.co`；禁止 Gmail/个人邮箱/占位符；Email Routing 接线为上线硬前置（P1-2）。

### 1.7 禁用表达扫描基线（04 §5 + 03 §6.3）
| 类别 | 禁止 | 替代 |
|---|---|---|
| 官方身份 | official, official site, endorsed, sponsored, affiliated（除否定句） | `Unofficial fan resource. Not affiliated...` |
| 绝对化 | 100% accurate, guaranteed, always correct, best tier list（无证据）, no risk | `based on community reports` + 信任标签 + Last Verified |
| 免费/开源 | free forever, 100% free, open-source | `Free to use. No account needed.` |
| 保证类 | guaranteed to win, no-risk extraction, guaranteed drops | 禁用 |
| 版权承诺 | copyright-free, no copyright risk | 禁用 |
| 竞品品牌 | MistfallDB 等站名作品牌/主视觉/正文对比表 | 公开页不出现竞品对比表；internal benchmark only |

### 1.8 设计落位通用要求（给 06）
- Hero 蒙版动效不干扰 CTA（CTA 对比度 ≥ 4.5:1，触区 ≥ 44px）。
- 移动端 360/390/430 首屏：工具首屏可操作；FAQ/正文首屏不要求完整，但 Hero + 首屏工具卡 + 主 CTA 必须完整可见。
- 深色 #0a0a0f~#1a1a2e + 金 #d4a574~#f0c040；Tier 色码 S=金/A=绿/B=蓝/C=灰/D=红；信任标签配色 06 微调、与竞品 C 不雷同。
- 表格横向滚动容器（移动端）；TOC 移动端折叠抽屉。
- OG image 1200×630 模板 + Twitter card（E13）。

---

## 2. 逐路由冻结表 / Route Freeze（58）

> 图例：DA = Direct Answer（H1 下方 1-2 句结论块）；H2 结构见 §3 模板（标有 [T] 的为工具模板、[C] 内容模板、[H] Hub 模板）；FAQ 全文见 `faq-schema-copy.md`；CTA 全文见 `cta-status-copy.md`。TDK = PRD V1 §5 冻结值（Trust 页除外，Trust 页按 04 定稿）。

### 2.1 Core（1）
| Route | H1 / Title / Meta（冻结） | DA（唯一，1-2 句） | CTA 主次 | Schema |
|---|---|---|---|---|
| `/` | H1: Mistfall Hunter Tools, Builds & Tier List<br>Title: Mistfall Hunter Tools, Builds & Tier List (Updated Aug 2026)<br>Meta: Free Mistfall Hunter tools and guides: class quiz, tier list, squad builder, loot finder, settings and 48 deep guides. Pick, build, squad up and extract smarter. Updated August 2026. | Free Mistfall Hunter decision tools and 48 guides — quiz, tier list, squad builder, loot finder and settings — so you can pick, build, squad up and extract smarter. | 主: Take the Class Quiz；次: Browse Tools；第三: Play on Steam | WebSite+SearchAction / Organization / FAQPage / Breadcrumb(不含首页) |

### 2.2 Tools（10，全部 V1 index ✅）
| Route | H1（冻结） | Title / Meta（冻结，见 PRD §5.2） | DA（唯一） | 工具 CTA | Schema |
|---|---|---|---|---|---|
| `/class-quiz` | Mistfall Hunter Class Quiz — Find Your Best Class | PRD §5.2 冻结 | Answer 5 questions about how you play and get your best class with reasoning and a build link. | 主: Start the Quiz；次: View [Class] Build（结果态） | WebApplication / FAQPage / Breadcrumb |
| `/settings` | Mistfall Hunter Best Settings & FPS Guide | PRD §5.2 冻结 | Pick your platform and hardware to get a recommended graphics and FPS setup, community-tested. | 主: Get My Settings；次: Copy Settings（结果态） | WebApplication / HowTo(可选) / FAQPage / Breadcrumb |
| `/tier-list` | Mistfall Hunter Tier List | PRD §5.2 冻结 | Compare all 6 classes across Solo, Trio, Duo and Beginner with trust labels and last-verified dates. | 主: Open Solo Tier List；次: Take the Class Quiz | WebApplication / ItemList / FAQPage / Breadcrumb |
| `/loot-finder` | Mistfall Hunter Loot Finder | PRD §5.2 冻结 | Search any item to see every acquisition path: boss drops, chests, NPC vendors and crafting recipes. | 主: Find an Item；次: Browse the Items Database | WebApplication / FAQPage / Breadcrumb |
| `/items` | Mistfall Hunter Items Database | PRD §5.2 冻结 | Browse weapons, armor, gems and consumables with stats, rarity and drop sources. | 主: Browse Items；次: Open Loot Finder | WebApplication / ItemList / FAQPage / Breadcrumb |
| `/checklist` | Mistfall Hunter Extraction Checklist | PRD §5.2 冻结 | Tick off your pre-extract objectives and never lose loot to a careless run. Progress saves locally. | 主: Start the Checklist；次: Read the Beginner Guide | WebApplication / FAQPage / Breadcrumb |
| `/build-planner` | Mistfall Hunter Build Planner | PRD §5.2 冻结（R3 可用工具） | Plan a build on the interactive talent tree, pick weapons, armor and gems, then share a link. | 主: Plan a Build；次: Browse Items | WebApplication / FAQPage / Breadcrumb |
| `/squad-builder` | Mistfall Hunter Squad Comp Builder | PRD §5.2 冻结（R3 可用工具） | Pick 3 classes (or 2 for Duo), see role coverage, missing roles and synergy, then share your comp. | 主: Build a Squad；次: View Matchup Matrix | WebApplication / FAQPage / Breadcrumb |
| `/matchups` | Mistfall Hunter PvP Matchup Matrix | PRD §5.2 冻结（R3 可用工具） | Click any class matchup for analysis and strategy tips in Solo and Trio modes. | 主: Explore Matchups；次: Read the PvP Guide | WebApplication / FAQPage / Breadcrumb |
| `/map` | Mistfall Hunter Interactive Map | PRD §5.2 冻结（R3 可用工具） | Explore Hallowgrove and Brandrgarde with POI markers, extraction points and boss locations. | 主: Open the Map；次: Read the Map Guide | WebApplication / FAQPage / Breadcrumb |

### 2.3 Classes（6）
| Route | Class | H1 冻结 | DA（唯一，一句） |
|---|---|---|---|
| `/classes/mercenary` | Mercenary | Mistfall Hunter Mercenary Class Guide | The Mercenary is Mistfall Hunter's frontline bruiser — strong up close, built to hold space and protect teammates. |
| `/classes/sorcerer` | Sorcerer | Mistfall Hunter Sorcerer Class Guide | The Sorcerer trades durability for high burst spell damage and is one of the best classes for quick kills. |
| `/classes/blackarrow` | Blackarrow | Mistfall Hunter Blackarrow Class Guide | The Blackarrow is a precision ranged class that excels at safe damage and strong extraction control. |
| `/classes/shadowstrix` | Shadowstrix | Mistfall Hunter Shadowstrix Class Guide | The Shadowstrix is a high-mobility, stealthy class that wins PvP fights with positioning and speed. |
| `/classes/seer` | Seer | Mistfall Hunter Seer Class Guide | The Seer is Mistfall Hunter's utility and support class — buffs, debuffs and team carry potential. |
| `/classes/withered-knight` | Withered Knight | Mistfall Hunter Withered Knight Class Guide | The Withered Knight is a durable, hard-to-kill frontline class built to survive and anchor a squad. |

> Title/Meta 冻结模板（PRD §5.3）：`Mistfall Hunter [Class] Class Guide — Strengths & Builds (2026)` / `Learn the Mistfall Hunter [Class]: strengths, best stance, top builds and beginner tips for [angle] play. Updated August 2026.`（逐页唯一值已在 PRD §5.3 表内）。

### 2.4 Builds（6）
| Route | Class | H1 冻结 | DA（唯一，一句） |
|---|---|---|---|
| `/builds/mercenary` | Mercenary | Mistfall Hunter Mercenary Build Guide | The best Mistfall Hunter Mercenary builds focus on frontline durability, cleave damage and stance-swap pressure. |
| `/builds/sorcerer` | Sorcerer | Mistfall Hunter Sorcerer Build Guide | Sorcerer builds maximize burst spell damage with the right stance, weapons and gem loadout. |
| `/builds/blackarrow` | Blackarrow | Mistfall Hunter Blackarrow Build Guide | Blackarrow builds optimize ranged pressure, kiting and extraction safety at range. |
| `/builds/shadowstrix` | Shadowstrix | Mistfall Hunter Shadowstrix Build Guide | Shadowstrix builds lean into mobility, stealth and burst windows for PvP dominance. |
| `/builds/seer` | Seer | Mistfall Hunter Seer Build Guide | Seer builds balance utility, healing and crowd control to carry a squad through any extract. |
| `/builds/withered-knight` | Withered Knight | Mistfall Hunter Withered Knight Build Guide | Withered Knight builds stack durability and sustain so you can frontline and never die first. |

> Title/Meta 冻结模板（PRD §5.4）：`Mistfall Hunter [Class] Build Guide — Best Loadouts (2026)` / `Best Mistfall Hunter [Class] builds: skills, weapons, armor, gems and [playstyle] playstyle. Updated August 2026.`

### 2.5 Tier List 子页（4）
| Route | Mode | H1 冻结 | DA（唯一，一句） |
|---|---|---|---|
| `/tier-list/solo` | Solo | Mistfall Hunter Solo Tier List | The Solo tier list ranks all 6 classes by how reliably they extract alone — survival and kill speed matter most. |
| `/tier-list/trio` | Trio | Mistfall Hunter Trio Tier List | The Trio tier list ranks classes by role coverage and synergy in three-man squads. |
| `/tier-list/duo` | Duo | Mistfall Hunter Duo Tier List | The Duo tier list — exclusive to this site — ranks the best two-class combinations for extraction. |
| `/tier-list/beginner` | Beginner | Mistfall Hunter Beginner Tier List | The Beginner tier list ranks classes by ease of use and survivability so new players can extract safely. |

> Title/Meta 冻结模板（PRD §5.5）：`Mistfall Hunter [Mode] Tier List (Updated Aug 2026)` / `Mistfall Hunter [Mode] tier list with trust labels and last-verified dates. See which classes rank S to D in [mode] play. Updated August 2026.`

### 2.6 Maps（2）
| Route | H1 冻结 | DA（唯一，一句） |
|---|---|---|
| `/maps/hallowgrove` | Mistfall Hunter Hallowgrove Map Guide | Hallowgrove is Mistfall Hunter's first map — here's every extraction point, boss location and high-value loot route. |
| `/maps/brandrgarde` | Mistfall Hunter Brandrgarde Map Guide | Brandrgarde is the second map — here's where to find POIs, extraction points, bosses and the best loot. |

> Title/Meta 冻结模板（PRD §5.6）：`Mistfall Hunter [Map] Map Guide — POIs & Extraction (2026)` / `Complete Mistfall Hunter [Map] map guide: POIs, extraction points, boss locations and loot routes. Updated August 2026.`

### 2.7 Bosses（3）
| Route | H1 冻结 | DA（唯一，一句） |
|---|---|---|
| `/bosses/cursed-moonwane` | Mistfall Hunter Cursed Moonwane Boss Guide | Cursed Moonwane is one of Mistfall Hunter's endgame bosses — this guide covers phases, attacks and how to beat it. |
| `/bosses/salmar` | Mistfall Hunter Salmar Boss Guide | Salmar is a high-value Mistfall Hunter boss — learn its attack patterns, best classes and rewards. |
| `/bosses/einherjar` | Mistfall Hunter Einherjar Boss Guide | Einherjar is Mistfall Hunter's Einherjar-mode boss — here's how to prepare, survive and secure the kill. |

> Title/Meta 冻结模板（PRD §5.7）：`Mistfall Hunter [Boss] Boss Guide — How to Beat (2026)` / `How to beat [Boss] in Mistfall Hunter: phases, attacks, best classes and rewards. Updated August 2026.`

### 2.8 Guides（17）
| Route | H1 冻结 | DA（唯一，一句） |
|---|---|---|
| `/guides/getting-started` | Mistfall Hunter Beginner Guide | Start Mistfall Hunter the right way: pick a class, learn extraction basics and avoid the mistakes that end runs early. |
| `/guides/first-extraction` | Mistfall Hunter First Extraction Guide | Your first Mistfall Hunter extraction, step by step: loadout, route, objectives and when to leave. |
| `/guides/extraction` | How to Extract in Mistfall Hunter | Extraction in Mistfall Hunter is simple once you know timers, portals, gear risk and safe exits. |
| `/guides/tips` | Mistfall Hunter Tips & Tricks | 25 practical Mistfall Hunter tips covering looting, combat, extraction and economy. |
| `/guides/faq` | Mistfall Hunter FAQ | Direct answers to the most common Mistfall Hunter questions — classes, extraction, crossplay, season wipes and more. |
| `/guides/dual-weapon-stances` | Mistfall Hunter Dual Weapon Stances Guide | Dual weapon stances let you swap fighting styles mid-run — here's how the mechanic and bonuses work. |
| `/guides/camp-upgrades` | Mistfall Hunter Camp Upgrades Guide | Spend your camp upgrades in the right order to speed up progression without wasting resources. |
| `/guides/scavenger-squads` | Mistfall Hunter Scavenger Squads Guide | Scavenger squads are the fastest way to farm loot — here's how they work and how to team up. |
| `/guides/leveling` | Mistfall Hunter Leveling Guide | The fastest ways to level in Mistfall Hunter: quests, efficient runs, gear and XP tips. |
| `/guides/keys-treasure` | Mistfall Hunter Keys & Treasure Rooms | Where to find keys and treasure rooms in Mistfall Hunter and what loot they hide. |
| `/guides/pvp-survival` | Mistfall Hunter PvP Survival Guide | Win more PvP fights with class matchups, positioning and third-party awareness. |
| `/guides/pc-settings` | Mistfall Hunter Best PC Settings & FPS Fix | The best PC settings for Mistfall Hunter FPS — graphics, rendering, input and stutter fixes. |
| `/guides/ps5-settings` | Mistfall Hunter Best PS5 Settings | The best PS5 settings for smooth Mistfall Hunter performance — graphics modes, FOV, controller and crossplay. |
| `/guides/xbox-settings` | Mistfall Hunter Best Xbox Settings | The best Xbox settings for smooth Mistfall Hunter performance — graphics modes, FOV, controller and crossplay. |
| `/guides/controller-vs-kbm` | Mistfall Hunter Controller vs Keyboard & Mouse | Controller or keyboard and mouse? Aim assist, binds and the best setup per class in Mistfall Hunter. |
| `/guides/auction-house` | Mistfall Hunter Auction House Guide | Master the auction house: fees, flipping, price trends and gold-making strategies. |
| `/guides/gold-farming` | Mistfall Hunter Gold Farming Guide | The best gold farming methods in Mistfall Hunter: routes, flips and profit tips. |

> Title/Meta 冻结模板见 PRD §5.8 表（逐页唯一已冻结）。

### 2.9 Codes（3）
| Route | H1 冻结 | DA（唯一，一句） |
|---|---|---|
| `/codes/rewards` | Mistfall Hunter Codes & Rewards | Active Mistfall Hunter codes and rewards with expiry countdowns — redeem them before they expire. |
| `/codes/how-to-redeem` | How to Redeem Mistfall Hunter Codes | Redeem Mistfall Hunter codes in-game on PC, PS5 and Xbox in four quick steps. |
| `/codes/twitch-drops` | Mistfall Hunter Twitch Drops Guide | How Mistfall Hunter Twitch Drops work: watch requirements, claiming and current drops. |

> Title/Meta 冻结模板见 PRD §5.9 表。

### 2.10 Duo/Solo 专属（2，独家）
| Route | H1 冻结 | DA（唯一，一句） |
|---|---|---|
| `/guides/duo` | Mistfall Hunter Duo Guide | The only dedicated Mistfall Hunter Duo guide: best two-class comps, strategies and how to play without matchmaking. |
| `/guides/solo-survival` | Mistfall Hunter Solo Survival Guide | Survive solo in Mistfall Hunter: class picks, loadouts, route discipline and escape tactics. |

> Title/Meta 冻结模板见 PRD §5.10 表。

### 2.11 Trust（4，04 合规定稿；A2 路由 58 口径）
| Route | H1 | Title | Meta | 内容责任 |
|---|---|---|---|---|
| `/about` | About Us | About Mistfall Hunter Tools | Unofficial fan resource for Mistfall Hunter with free decision tools and guides. Not affiliated with Bellring Games or Skystone Games. | 04 定稿 + 05 润色；含 Unofficial 声明、数据来源、信任标签定义、复用台账说明 |
| `/privacy` | Privacy Policy | Privacy Policy | How Mistfall Hunter Tools handles data: browser-local processing, analytics and no account. Full privacy policy. | 04 定稿（含 Cookie 政策并入 §Cookies，A2 方案 B） |
| `/terms` | Terms of Service | Terms of Service | Terms for using Mistfall Hunter Tools. Unofficial fan resource; data provided as-is. | 04 定稿（含 Disclaimer 并入 §Disclaimer，A2 方案 B；含 §Refunds and Payments，E4） |
| `/contact` | Contact | Contact Us | Contact the Mistfall Hunter Tools team about corrections, data sources or takedown requests. | 04 定稿；含 takedown 入口 + contact@mistfallhunter.co |

> Trust 页无 FAQ schema；正文全文在 `trust-pages-final-copy.md`。

---

## 3. H2 结构模板 / H2 Structure Templates

### 3.1 [T] 工具页模板（10 工具共用，正文 500-800 词非薄页 + 工具交互 + FAQ）
```
H1（冻结）
DA 块（1-2 句，含主词）
Last Verified: 2026-08-08 · [信任标签]
[工具 UI 区 — 首屏可操作]
H2: How to Use This Tool（3-5 步静态可读步骤，JS-only 防护）
H2: What the Results Mean（输出解读，1-2 段）
H2: Frequently Asked Questions（3-5 条，FAQPage schema）
H2: Related Guides（内链 5-15）
CTA 区: [主 CTA] [Steam CTA: Play on Steam]
Footer 非官方声明
```
- 语义词：主词 + 次词（keyword-route-map §2）自然嵌入 DA/H2/FAQ；每页至少 60% 内容唯一（薄页防线）。
- 设计落位：工具交互首屏可操作（360/390/430）；FAQ 折叠；表格横向滚动。

### 3.2 [C] 内容页模板（Classes/Builds/TierList 子页/Maps/Bosses/Guides/Codes/Duo-Solo，正文 2000-3000 词）
```
H1（冻结）
DA 块（1-2 句结论性答案）
Last Verified: 2026-08-08 · [信任标签]
[TOC]
H2: <页面主题 1>（1-2 段实质内容）
H2: <页面主题 2>（1-2 段；数据表用 <table>，AI 可解析）
H2: <页面主题 3 / Common Mistakes / Pro Tips>
H2: Frequently Asked Questions（3-5 条，FAQPage schema）
H2: Related Guides（内链 5-15）
CTA 区: [相关工具 CTA] [Steam CTA]
Footer 非官方声明
```
- 语义词：主词 + 次词（keyword-route-map §3-§10）嵌入 DA/H2/FAQ；禁止近义词换词页。
- 设计落位：TOC 移动端抽屉；表格横向滚动；CTA 按钮大触区；Last Verified 可见。

### 3.3 [H] Hub 页模板（/tier-list、/items）
```
H1（冻结）
DA 块
Last Verified + 信任标签
H2: Mode/Category Tabs（Solo/Trio/Duo/Beginner 或 类型/稀有度 筛选）
H2: How We Rank / Data Notes（方法论 + 信任标签解释）
H2: Frequently Asked Questions
H2: Related Guides
CTA 区: [工具 CTA] [Steam CTA]
```
- /tier-list：ItemList schema（条目 + 评分）；/items：ItemList + 分页 next/prev 或参数归一。

### 3.4 首页模板（/）
```
H1（冻结）
Hero: DA + 双 CTA + Steam CTA（蒙版动效背景）
Quick Stats Bar: 6 Classes / 12 Stances / 10 Tools / 48 Guides
New Player 3-Step Journey（1 Take the Class Quiz → 2 Read the Beginner Guide → 3 Use the Extraction Checklist）
H2: Mistfall Hunter Tools（10 工具卡）
H2: Featured Guides（6 卡）
H2: Latest Updates（Last Verified 节奏）
H2: Quick Facts（表格）
H2: Active Codes（倒计时卡，链接 /codes/rewards）
H2: Frequently Asked Questions（3-5）
CTA 区: 底部 [Take the Class Quiz] [Play on Steam]
Footer
```

---

## 4. 逐路由目标词数 / 语义词 / Schema 汇总

- 内容页（43 页 + Duo/Solo 2 = 45）：2000-3000 词；FAQ 3-5；内链 5-15；Article + FAQPage + Breadcrumb。
- 工具页（10）：500-800 词（交互 + 静态正文）；WebApplication + FAQPage + Breadcrumb；四 V1.5 升级页（R3）同标准非薄页。
- Hub（2：/tier-list /items）：ItemList + FAQPage + Breadcrumb。
- 首页（1）：WebSite/SearchAction + Organization + FAQPage。
- Trust（4）：无 FAQ schema；Article 可选；/about 可含 Organization schema（logo=原创，N2）。
- 全站：canonical = https://mistfallhunter.co<path>；noindex = /api/*、/404；sitemap ≥ 58 URLs；robots Allow 全站。
- 语义词总表：直接引用 `outputs/05S-seo-baseline/keyword-route-map.md`（58 路由 × 主词 × 次词 × SERP），本文件不复抄，避免双源漂移。

---

## 5. 风险与标记 / Risks & Markers

- [DATA-PENDING: 08]：需要游戏数据（掉落/数值/地图 POI/Boss 招式）的 FAQ 与 DA 内容，已按“覆盖范围 + 类型”写文案，具体数值待 08 采集后回填，禁止实现阶段编造。
- Trust 页 Title/Meta 由 04 定稿，本文件为最终草案；若 04R 复核需微调，只改 Trust 4 页，不影响其余 54 页。
- 竞品名（如 mistfalldb / metamist.io）只出现在内部台账与监控，不出现在公开正文/FAQ/Meta（N4 + 05S §3.3）。

## 6. 验收自检（本文件）
- [x] 58 路由 TDK/H1 全部冻结（PRD §5 唯一值 + Trust 04 定稿）
- [x] 每页 DA 唯一（见 §2 表）
- [x] H2 模板覆盖全部页面类型（[T]/[C]/[H]/首页）
- [x] FAQ/schema/CTA/状态文案已冻结（见配套文件）
- [x] 全免费口径 + Steam CTA + 非官方声明 + 禁用表达已收口
- [x] 四工具页非薄页 index（R3）

**状态行：[DONE] — SEO-Copy Freeze 主文档交付；配套：faq-schema-copy.md / cta-status-copy.md / trust-pages-final-copy.md / copy-quality-audit.md / handoff-05-copy.md。等待 05C owner 确认（t_9120f304）后才能进入设计。**
