# 05S SEO Strategy Baseline — mistfall-hunter

> 阶段 Stage: 05S SEO strategy baseline（基于已确认 PRD V1 输出 SEO/GEO/AEO 基线）
> 日期 Date: 2026-08-08
> 作者 Author: seo（profile=seo，市场侦察-01 / SEO-GEO-AEO 研究 Agent）
> 上游 Upstream: outputs/02-prd-v1/prd-v1-master-spec-bilingual.md（02C 已确认）；inputs/01-research/mistfall-hunter-prd-brief-v2.md（FROZEN）；inputs/02-owner-confirmations/owner-decision-02A-rev-20260808.md；owner-confirmation-02C-20260808.md
> 主域名 Domain: **mistfallhunter.co**（owner 2026-08-08 确认，Dynadot 注册）
> 状态 Status: [DONE] — 基线交付，待 05 文案 / 06 设计 / 07 前端消费

---

## 0. 结论先行 / Executive Summary

- **一句话结论**：58 路由全部可索引，主词映射已回填（见 `keyword-route-map.md`）；canonical 终值 = `https://mistfallhunter.co<path>`；schema 三层（WebSite/SearchAction + 页面级 FAQ/Breadcrumb + 数据级 ItemList/Article）；V1.5 Coming Soon 页与 trust 页 indexability 需要两条 addendum 决策。
- **SERP 可进入性判断**：品牌词 `mistfall hunter` 被官方页（Steam/PSN/Xbox/官网）占据，正文站短期难进 Top3；但 7 类长尾词（tier list / build / settings / beginner / loot / duo-squad / matchup）当前由大媒体与 YouTube 浅覆盖，工具页差异化可切入；**新竞品 metamist.io 已上线**（builds/tier list/class guides UGC 站），Brief V2 竞品全景未记录，需加入竞品监控。
- **关键风险**：V1.5 四个工具页若以 Coming Soon 灰态卡落地但保持 index，将制造 4 个 placeholder 薄页污染初始抓取（Skill 硬约束：placeholder/pending data 不得索引）——见 addendum SEO-A2。

---

## 1. 页面矩阵对账 / Page Matrix Reconciliation

来源：PRD V1 §5（逐页唯一 Title/Meta/H1 已回填）与 §6.1（58 路由）。本阶段做 SEO 侧对账：每页主词/次词/竞争/机会的完整映射见 `keyword-route-map.md`，此处仅列结构校验结论。

| 组 | 路由数 | PRD § | index | 主词类型 | 说明 |
|---|---|---|---|---|---|
| Core | 1 | 5.1 | ✅ | 品牌+类目词 | `/` 主词 `mistfall hunter tools/builds/tier list` |
| Tools V1 | 6 | 5.2 | ✅ | 工具词 | class-quiz / settings / tier-list / loot-finder / items / checklist |
| Tools V1.5 | 4 | 5.2 | ⚠️ 待定 | 工具词 | build-planner / squad-builder / matchups / map —— Coming Soon 状态，见 SEO-A2 |
| Classes | 6 | 5.3 | ✅ | 职业词 | `/classes/[class]` |
| Builds | 6 | 5.4 | ✅ | 配装词 | `/builds/[class]` |
| TierList 子页 | 4 | 5.5 | ✅ | 模式词 | solo/trio/duo/beginner |
| Maps | 2 | 5.6 | ✅ | 地图词 | hallowgrove / brandrgarde |
| Bosses | 3 | 5.7 | ✅ | Boss 词 | cursed-moonwane / salmar / einherjar |
| Guides | 17 | 5.8 | ✅ | 攻略词 | getting-started … gold-farming |
| Codes | 3 | 5.9 | ✅ | 兑换词 | rewards / how-to-redeem / twitch-drops |
| Duo/Solo | 2 | 5.10 | ✅ | 独家词 | duo / solo-survival |
| Trust | 4 | 5.11 | ✅ | 法务词 | about / privacy / terms / contact（04 合规定稿） |
| Noindex | — | 5.12 | ❌ | — | `/api/*`、`/404` |

**对账结论**：
1. 58 indexable 路由数量与 PRD §6.1、Brief V2 §10 一致 ✅（requirements-trace #1）。
2. 逐页唯一 Title/Meta/H1 已由 PRD §5 回填，本阶段不重写，仅做关键词映射与 SERP 竞争核对。
3. **唯一冲突点**：PRD §6.1 明确"58 路由全部 index"，但 V1.5 四页 V1 阶段是 Coming Soon 灰态（§4.2 "路由随 V1 存在"）。按 Skill「placeholder/pending data 不得索引」与「薄页污染初始抓取」硬约束，需要 owner/主控决策：a) noindex 至功能上线，或 b) 上线时补足内容再 index。见 addendum SEO-A2。

---

## 2. 关键词映射 / Keyword Mapping

完整 58 路由 × 主词 × 次词 × SERP 竞争 × 可进入性判断：**`outputs/05S-seo-baseline/keyword-route-map.md`**。

种子词（launch card）映射一览：

| 种子词 | 首选落地路由 | 竞争现状（2026-08-08 实测） | 可进入性 |
|---|---|---|---|
| mistfall hunter | `/` | 官方 Steam/PSN/Xbox/官网 + YouTube + Reddit 占 Top8 | 🟡 品牌词短期不追，做品牌承接页 |
| mistfall hunter tier list | `/tier-list` + 4 子页 | Gamespot/GamesRadar/Gamerant/Mobalytics/skycoach/lagofast 已占 | 🟡 竞争已起，用 Duo 维度+互动工具差异化 |
| mistfall hunter build | `/builds/[class]` ×6 | skycoach/metamist.io/Mobalytics/YouTube 已占 | 🟡 需工具 embed + 原创数据差异化 |
| mistfall hunter best class | `/class-quiz` + `/tier-list/beginner` | GamesRadar/Gamerant/YouTube 已占 | 🟡 用 quiz 交互差异化 |
| mistfall hunter squad comp | `/squad-builder` + `/guides/duo` | YouTube/Reddit 讨论多，无专门工具页 | 🟢 **空位**（独家窗口） |
| mistfall hunter settings | `/settings` + 3 平台指南 | Gamerant/Destructoid/YouTube 已占 | 🟡 PC 词竞争强；PS5/Xbox 相对浅 |
| mistfall beginner guide | `/guides/getting-started` | Fextralife/Mobalytics/YouTube 大量覆盖 | 🟡 红海，但新手任务链可承接 |
| loot finder / items database | `/loot-finder` `/items` | **mistfalldb.com 数据护城河强**（599 武器） | 🔴 硬仗：v1 高频子集小而准，追平而非超越 |
| duo / matchup | `/guides/duo` `/matchups` | 无专门英文页 | 🟢 **独家空位** |

**SERP 竞争结论**：
- 品牌词 & 首页词：官方 + 媒体 + YouTube 占据，短期目标不是 rank1，而是"决策引擎"定位承接 + 长尾词集群。
- 工具/互动词（squad comp / duo / matchup / checklist / quiz）：SERP 无工具型竞品，可进入性最高——这与 Brief V2 §5 差异化武器判断一致，且经实测仍成立。
- 内容词（tier list / build / settings / beginner）：大媒体（Gamespot/Gamerant/Mobalytics/skycoach）已入场但覆盖浅（每站 1-3 篇、无更新节奏），新站可用"Last Verified + trust label + 工具嵌入 + 补丁后 24h 更新"差异化。
- **新增竞品警示**：metamist.io 已上线（builds/tier list/class guides UGC + 官方 Discord 指南转置 + maps），与本站定位高度重合，需加入竞品监控与差异化盯防（addendum SEO-A5）。

---

## 3. GEO/AEO 基线 / GEO & AEO Baseline

目标：让 Google AI Overviews / Perplexity / ChatGPT / Gemini 等 AI 检索把本站作为 Mistfall Hunter 答案来源。

### 3.1 站点级实体信号
- **WebSite + SearchAction schema**（全站 head，唯一 URL 不变式）：`https://mistfallhunter.co`，`potentialAction: SearchAction target=https://mistfallhunter.co/search?q={search_term_string}`。
- **Organization schema**：logo = 原创类官方风格 logo（N2），name = "Mistfall Hunter Tools"（Unofficial 声明不放在结构化字段中以免语义冲突，放在可见页脚 + About）。
- **game 实体一致性**：所有页面统一使用官方命名（Mistfall Hunter / Bellring Games / Skystone Games / Gyldhunter / Hallowgrove / Brandrgarde / 6 职业英文名）。禁用同义词替换（如把 Mercenary 写成 Warrior），保证实体指称一致，便于 AI 抽取。

### 3.2 页面级 AI 可引用结构
每内容页（48 页）固定顺序：
1. H1 = 主词精确匹配（PRD §5 已定）
2. **直接答案块（Direct Answer）**：H1 下方 1-2 句结论性答案（定义/最佳/如何），不加长铺垫——AI 摘要与 Featured Snippet 的主要抓取对象；
3. Last Verified + trust label（Verified/Community/Needs Update）——新鲜度与可信度信号；
4. TOC + 正文 2000-3000 词，段落短句、每个 H2 子主题 1-2 段实质内容；
5. **数据表**：tier list 排名表、物品属性表、设置档位表等，用 `<table>` 而非图片（AI 可解析）;
6. FAQ 3-5 条（FAQPage schema 同步）；
7. 相关卡（内链 5-15）。
工具页同样补"如何用"步骤 + 输出解释 + FAQ（工具页非纯交互，保留静态可读文本，避免 JS-only 内容无法被 AI 抓取）。

### 3.3 Trust & Citability 信号
- 数据来源标注：来源 URL + 采集日期（Data Contract 已有），公开页呈现"Source"链接（仅受益方是竞品/官方来源时标 [官方]/[社区] 标签，不展开对比表——internal benchmark 不上公开页）；
- 复用台账登记（先登记后使用，N6）——合规与可引用可信度双重需要；
- 避免 AI 无法验证的模糊数字；统计数字来自真实数据（skill 反编造规则）。

### 3.4 AEO 技术项
- `llms.txt`：P1 建议（addendum SEO-A3）——V1 可先不加，上线后 2-4 周与 V1.5 同批；
- 移动端可读性：表格横向滚动、字号 ≥16px、无 hover 依赖（AI 抓取的是 DOM 文本，移动端可读性间接影响用户体验信号）；
- **Cloudflare Managed robots 注意**：Workers 站点 robots.txt 会被 CF 自动注入 `Disallow` AI 爬虫（GPTBot/ClaudeBot/CCBot/Google-Extended）与 `Content-Signal`。若 GEO 优先，需在部署阶段显式决策是否保留这些 Disallow，并在 10 SEO recheck 中复核——这是 CF 默认值而非本站策略（skill 常见坑）。

---

## 4. Canonical / Schema / Indexability 约束 / Technical SEO Constraints

以下为 07/08 实现阶段**不得自行变更**的边界（并入 PRD §7.3 已列边界，此处细化）。

### 4.1 Canonical
- **终值**：`https://mistfallhunter.co<path>`（owner 已确认主域；替换 PRD 中"待最终域名确认"占位）。
- 全站 canonical 自引用，`<link rel="canonical" href="https://mistfallhunter.co/path">`；
- 统一 trailing-slash 策略（建议无尾斜杠路由，`.co/class-quiz`；或全站有尾斜杠二选一，不得混用）；
- URL 一律小写；查询参数不参与 canonical（工具分享 URL 如 `?result=class` 必须自引用 canonical 到无参路径，避免参数重复收录）；
- `http://` 与 `https://` 双入口 301 到 https（生产 Cloudflare Workers 默认处理，QA 阶段验证 301 证据）；
- **mistfallhunter.gg 若补注册**：301 到 .co（02D change control，addendum SEO-A1 备注）。

### 4.2 Schema 分配（07 实现）
| Schema 类型 | 适用页面 | 关键字段 |
|---|---|---|
| WebSite + SearchAction | 全站 head | name, url, potentialAction |
| Organization | 全站 head（或 /about） | name, url, logo（原创） |
| BreadcrumbList | 全站（除首页） | 首页 → 分类 → 当前页 |
| FAQPage | 48 内容页 + 工具页 FAQ | mainEntity 3-5 Q&A（文案 05 冻结后 JSON-LD 序列化） |
| ItemList | /tier-list、4 子页、/items | itemListElement 排名/条目 + 评分字段 |
| Article | guides/classes/builds/bosses/maps | headline, datePublished, dateModified, author(站名) |
| WebApplication（可选） | 10 工具页 | name, applicationCategory=GameApplication, operatingSystem=Web |
| HowTo（可选） | 需步骤型页面（settings 指南、how-to-redeem） | step 结构化；注意 Google 2023 后 HowTo rich result 限制，仍利于 AI 解析 |

约束：所有 JSON-LD 静态 SSR 输出，不得客户端后注入（AI 抓取与 GSC 渲染一致）；ID 字段稳定（`https://mistfallhunter.co/tier-list#faq` 等）。

### 4.3 Indexability
- **index**：58 路由（其中 V1.5 四页待 SEO-A2 决策）；
- **noindex**：`/api/*`、`/404`；noindex 页**不得**进 sitemap；
- **noindex 不得仅写在正文/文案里**：必须在 HTML `<meta name="robots" content="noindex">` 或 Next.js metadata robots 中实际输出（skill 常见坑）；
- **sitemap**：`/sitemap.xml` ≥58 indexable URLs，按 Brief V2 §13 拆分结构（tools/classes+uilds/guides+codes+duo/maps/bosses/pages）或单文件均可，但**只含真实可索引页**；无 V1.5 Coming Soon 薄页（若 noindex 则移出）；
- **robots.txt**：Allow 全站 + Sitemap 指向；对 AI 爬虫策略按 3.4 决策（部署阶段复核 CF Managed 注入）；
- **404 页**：HTTP 404 + noindex + 相关页推荐（PRD §3 内容页通用任务已定）；
- 无分页/筛选参数收录问题：/items 分页用 `<link rel="next/prev">` 或参数归一，避免 ?page=2 污染 index。

### 4.4 元数据 & 社交
- OG image 1200×630（每页可用模板 + 页面级 title 叠加；PRD §5 未定义 OG 模板，见 addendum SEO-A6）；
- Twitter card summary_large_image；OG title/description 与 HTML title/meta 一致（或前缀站名）；
- favicon/apple-touch-icon 由 06 设计出稿。

### 4.5 性能基础（SEO 质量门槛）
- 移动端 LCP < 2.5s、INP < 200ms（工具页 ISR + 静态优先已满足架构，实施阶段需验证）；
- 首屏可用（360/390/430 工具首屏可操作）——QA 阶段已列为验收（requirements-trace #2）。

---

## 5. PRD Addendum 建议 / PRD Addendum Proposals（可追溯，不重写 PRD）

> 原则：本阶段只输出**建议**，PRD V1 是唯一主真源；每条给出 PRD 引用点、理由、建议措辞、责任阶段。由主控评估是否走 02D change control / 由 05/06/07 阶段直接吸收。

| # | 引用点（PRD V1） | 建议 | 理由 | 责任 |
|---|---|---|---|---|
| SEO-A1 | §1 域名；§5 canonical "待最终域名确认" | canonical 终值替换为 `https://mistfallhunter.co`；.gg 若补注册 301 到 .co（02D 记录） | owner 已确认主域；canonical 占位符必须在 07 实现前解析 | 07 前端 + 02D |
| SEO-A2 | §4.2 / §5.12 / §6.1（V1.5 Coming Soon 与"58 全 index"冲突） | **决策项**：V1 上线时 V1.5 四路由 a) noindex 至功能上线（推荐，防 placeholder 薄页污染初始抓取），或 b) 上线时直接补足内容并 index。若选 a)：sitemap 不含四页，10 SEO recheck 时功能上线后撤 noindex | Skill 硬约束：placeholder/pending data 不得索引；初始抓取预算宝贵 | 主控/owner 决策 + 07 前端 |
| SEO-A3 | §4.4 P1（无 llms.txt） | 建议 llms.txt 加入 P1 批次（上线后 2-4 周），路径 `/llms.txt`，列出 58 页标题/URL/一句话摘要 | AEO 主流做法：AI 检索可读站点地图 + 实体清单 | 07 前端 + 10 SEO recheck |
| SEO-A4 | §6.1 sitemap 仅"≥58 URLs" | 明确 sitemap 拆分结构与 lastmod/priority 策略（可并入 §7.3 或由 07 实现约定） | Brief V2 §13 已有结构，PRD 未落合同 | 07 前端 |
| SEO-A5 | Brief V2 §3 竞品全景（未含 metamist.io） | 竞品监控新增 metamist.io（builds/tier list/class guides UGC，定位高度重合）；差异化盯防：互动工具 + Duo 独家 + Last Verified 更新节奏 | 2026-08-08 实测已上线，SERP 与本站正面竞争 | 10 SEO recheck / 12 数据复盘 |
| SEO-A6 | §5 逐页 Title/Meta（未定义 OG） | 补 OG image 1200×630 模板 + Twitter card 规范（每页可复用模板 + title 叠加） | 社交分享与 AI 抓取表现 | 06 设计 + 07 前端 |
| SEO-A7 | §6.2 数据新鲜度（Last Verified 未落 schema） | 内容页 `dateModified` 与 Last Verified 显示同步；schema dateModified 随更新刷新 | 新鲜度信号对 GEO/AEO 重要 | 07 前端 + 05 文案 |
| SEO-A8 | §2.4 待确认项（游戏数据未结构化） | 数据采集优先级：tier list 数据 > 物品子集 > 地图 POI（对应最高可进入性长尾）；数据子集上线后按 GSC 查询信号扩页（薄内容防线 §5.12 已有口径） | 数据护城河（mistfalldb）是最大威胁，v1 聚焦最高 ROI 子集 | 08 后端 + 12 数据复盘 |

---

## 6. 风险登记 / Risks（本阶段视角）

| 级别 | 风险 | 影响 | 缓解 |
|---|---|---|---|
| P0 | V1.5 Coming Soon 页 index 污染初始抓取 | 抓取预算浪费 + 薄页信号 | SEO-A2 决策 noindex（推荐） |
| P0 | canonical 占位未解析即上线 | 全站 canonical 错误、收录分裂 | SEO-A1 在 07 实现前落地 |
| P1 | 大媒体 + metamist.io 竞速 tier list/build/settings 词 | 冷启动期排名压力 | 工具差异化 + Duo 空位 + Last Verified 更新节奏；竞品监控（SEO-A5） |
| P1 | mistfalldb 数据护城河 | loot/items 词难超越 | v1 高频子集小而准 + 追平策略（不正面硬拼数据量） |
| P1 | Cloudflare Managed robots 注入 AI Disallow | GEO 目标被 CF 默认策略阻断 | 部署阶段显式决策 + 10 SEO recheck 复核 |
| P2 | 品牌词被官方长期占据 | 品牌流量依赖官方页 | 长尾集群 + 工具分享链接获客 |

---

## 7. 交付物清单 / Deliverables

1. 本文件：`outputs/05S-seo-baseline/05S-seo-baseline.md`（SEO/GEO/AEO 基线 + 约束 + addendum）
2. `outputs/05S-seo-baseline/keyword-route-map.md`（58 路由 × 关键词映射 × SERP 竞争）
3. `outputs/05S-seo-baseline/handoff-05S-seo.md`（下游交接摘要，按模板）

## 8. 验收自检 / Acceptance Self-check

- [x] 页面矩阵对账：58 indexable + 2 noindex 核对（PRD §5/§6.1 一致）
- [x] 每个 indexable 页有主词映射（keyword-route-map.md）
- [x] canonical 终值已定（mistfallhunter.co）+ 尾斜杠/大小写/参数约束
- [x] schema 分配表（WebSite/FAQ/Breadcrumb/ItemList/Article/WebApplication/HowTo）
- [x] indexability 约束（noindex 页不进 sitemap、HTML 输出、404 规范）
- [x] SERP 竞争力对照（实测 Top8：官方/媒体/YouTube/metamist）
- [x] GEO/AEO 结构（Direct Answer / 数据表 / FAQ / llms.txt 建议 / CF robots 提醒）
- [x] PRD addendum 建议（8 条，可追溯引用点，非重写）
- [ ] sitemap/GSC 提交状态：待部署后（10 SEO recheck 阶段，无线上 URL，不假装完成）

**结论**：[DONE] — 05S 基线交付；无线上 URL/GSC 权限需求在本阶段（部署后由 10 SEO recheck 承接），不触发 BLOCKED。
