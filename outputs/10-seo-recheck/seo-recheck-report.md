# 10 SEO Recheck Report — mistfall-hunter（上线前本地复核）

> Stage: 10-seo（seo-launch-workflow）｜Gate: [NEEDS_REPAIR]
> Date: 2026-08-08｜Reviewer: seo（profile=seo，市场侦察-01 / SEO-GEO-AEO 研究 Agent）
> Task: t_90060c82｜Board: site-mistfall-hunter
> 复核对象: 本地实现（07 frontend，owner release `owner-release-07-08-local-implementation-20260808.md` 仅授权本地实现，远程/部署/发布仍锁定）
> 复核方式: 本地 preview（127.0.0.1:3007，fresh build .next/BUILD_ID 2026-08-08 20:23 > 源码 mtime 19:41）全量 58 路由 HTTP 抓取 + 源码核对 + 浏览器水合抽查
> 依据基线: seo-copy-freeze.md（05C owner 确认 2026-08-08「行，放行继续推进」）、PRD V1 §5/§5.12、05S-seo-baseline.md、QA thin-content-indexability-review.md、owner-release mandatory acceptance

---

## 0. 结论先行 / Executive Summary

- **技术 SEO 机制基本达标**：robots / sitemap(58) / canonical（除首页尾斜杠）/ indexability / 404 noindex / /api 排除 / 逐页 H1·Title·Meta·JSON-LD / Last Verified·Direct Answer 结构全部通过。
- **内容厚度与唯一性不达标（阻断上线质量）**：43 内容页实测 ~525 词（含导航页脚壳），正文仅 ~480 词，冻结规格为 2000–3000 词；4 复杂工具页 455–494 词（正文 408–447 词），Owner release 要求 500–800 词。**内容页两两相似度 Jaccard 0.79–0.89（唯一性仅 11–21%），违反「每页 ≥60% 内容唯一」硬验收，构成 doorway/克隆页风险**；/items 与 /loot-finder 相似度 0.875。
- **Schema 缺失（GEO/AEO 不达标）**：全站 0 个 FAQPage schema；首页缺 Organization（冻结规格 WebSite+SearchAction+Organization+FAQPage）；工具/内容页缺 Breadcrumb；/tier-list、/items 缺 ItemList。
- **冻结文案未完整落地**：lib/routes.ts 的 DA/Title 为冻结值的改写（冻结文件规定「下游不得自行变更」），首页 Title 实际渲染 88 字符（冻结 54 字符，模板后缀重复追加）。
- **数据页 SEO 侧为空壳**：/items、/loot-finder SSR HTML 无任何物品数据（客户端 fetch 后渲染），默认视图表格无数据行；地图 POI 数据存在但 SSR 不可见。对 JS 不执行或 AI 爬虫，数据页为薄页。
- **修复建议**：内容深度/唯一性 → 05 content 按冻结包逐页产出唯一正文（45 内容页 2000–3000 词 + 10 工具页 500–800 词），再交 07 前端集成；schema/首页 canonical/Title → 07 前端代码修复。详见 §5。

---

## 1. 复核方法与证据

| 项目 | 证据 |
|---|---|
| 全量 58 路由 HTTP 复核 | outputs/10-seo-recheck/audit.py（脚本）|
| 逐页指标 JSON | outputs/10-seo-recheck/seo-recheck.json |
| 本地 preview | http://127.0.0.1:3007（07 阶段遗留进程 + .next fresh build 20:23）|
| 浏览器水合抽查 | /items 默认视图空表 + 搜索框占位（browser snapshot）；map-pois.json 24 POI 可 fetch |
| 相似度矩阵（正文去壳） | 见本报告 §3.3（23 页样本矩阵）|

## 2. 通过项 / PASS（技术 SEO 机制）

| 检查项 | 结果 | 证据 |
|---|---|---|
| robots.txt | ✅ | `User-Agent: * / Allow: / / Disallow: /api/ / Disallow: /404 / Sitemap: https://mistfallhunter.co/sitemap.xml`，HTTP 200 |
| sitemap.xml | ✅ | 58 `<loc>`，全部 URL 为 `https://mistfallhunter.co<path>`，逐条 HTTP 200，无 3xx，无重复 |
| 58 路由 indexable | ✅ | 全部 HTTP 200；无 `<meta name=robots content=noindex>`；h1_count=1（58/58）；meta description 58/58 |
| 404 处理 | ✅ | 任意不存在路由 → 404 + noindex；robots 同时 Disallow /404 |
| /api/* 排除 | ✅ | /api/probe → 404，不进入 sitemap |
| canonical | ✅（57/58）| 除首页外全部自引用 `https://mistfallhunter.co<path>` 精确匹配 |
| JSON-LD 基础层 | ✅ | 58/58 有 ld+json：WebSite×1（首页）/ WebApplication×10（工具）/ Article×47（内容+Trust）|
| AI-answer 结构 | ✅ | 内容/工具页均有 direct-answer 块 + Last Verified + 信任标签（Community Report）；首页 lede 承担 DA 职责 |
| 占位/灰态 | ✅ | 源码与产物无 Coming Soon/placeholder/Lorem；四复杂工具页为可用交互 + 正文 |
| 数据文件存在 | ✅ | public/data/items.json 48 条 / classes.json 6 条 / map-pois.json 24 条（含 provenanceId + lastVerified）|

## 3. 未通过项 / FAIL

### 3.1 内容厚度（P0 级，Owner release 硬验收）

| 类别 | 冻结规格 | 实测（正文去壳） | 判定 |
|---|---|---|---|
| 43 内容页（Classes/Builds/TierList/Maps/Bosses/Guides/Codes）| 2000–3000 词（seo-copy-freeze §3.2）| min 514 / max 541 / avg 525（含壳）；正文 ~470–490 词 | ❌ 薄页 |
| 4 复杂工具页（squad-builder/matchups/build-planner/map）| 500–800 词（seo-copy-freeze §3.1 + owner release）| 494 / 481 / 471 / 455（含壳）；正文 447 / 427 / 417 / 408 词 | ❌ 未达 500 下限 |
| 首页 | 冻结模板（Quick Stats + 3-Step + 10 工具卡 + FAQ 等）| 187 词正文，无 FAQ 区块、无 Quick Facts 表 | ⚠️ 偏薄 |

根因：07 实现未接入 05 冻结包正文，`app/[[...slug]]/page.tsx` 的 Content/ToolArticle 为通用模板（每页仅 H1/DA 变量不同），未生成冻结规格要求的逐页唯一正文。

### 3.2 内容唯一性（P0 级，Owner release 硬验收「每页 ≥60% 内容唯一，禁止 find-and-replace clones」）

正文去壳后 Jaccard（5-shingle）样本矩阵：
- `/classes/mercenary` vs `/classes/seer` = **0.893**；`/classes/*` 组内 0.89 上下
- `/guides/extraction` vs `/guides/pc-settings` = **0.834**；guides 组内 0.83–0.88
- `/tier-list/solo` vs `/tier-list/trio` = **0.892**
- `/bosses/salmar` vs `/bosses/einherjar` = **0.887**；`/maps/hallowgrove` vs `/maps/brandrgarde` = **0.887**
- `/codes/rewards` vs `/codes/twitch-drops` = **0.858**
- `/items` vs `/loot-finder` = **0.875**

→ 内容页唯一性仅 11–21%（要求 ≥60%）；这是 Skill 常见坑「模板型 door page」的典型形态：同模板、仅 H1/DA 换词，Google 视为 doorway/cloaking，可能拒收并连带主站降权。4 复杂工具页组内 0.34–0.39（约 62–66% 唯一，勉强达标，但 FAQ 段落为共享模板，仍建议差异化）。

### 3.3 Schema 缺失（P1 级，05S 基线 + 冻结规格）

| Schema | 冻结规格 | 实测 | 判定 |
|---|---|---|---|
| FAQPage | 54 页（seo-copy-freeze §4：工具 10 + 内容 45 − 数据 FAQ 页）| **0 页**（全站 0 个 FAQPage）| ❌ |
| Organization | 首页 + /about（logo=原创）| 0 页 | ❌ |
| Breadcrumb | 工具/内容页 | 0 页 | ❌ |
| ItemList | /tier-list、/items（[H] Hub 模板）| 0 页 | ❌ |
| WebSite+SearchAction | 首页 | ✅（但 target 为 `/items?q={search_term_string}`，基线写 `/search?q=`；58 路由无 /search，/items 有搜索框，**实现选择可辩护，需记 change note**）| ⚠️ |

→ 首页 ld 实际只有 `WebSite` 单类型；FAQ 以 h3 存在但无 FAQPage JSON-LD，AI 可引用性（GEO/AEO）不完整。

### 3.4 冻结文案未完整落地（P1 级，05C 冻结「下游不得自行变更」）

- lib/routes.ts `answer` 字段为冻结 DA 的改写版。例：/class-quiz 冻结 `Answer 5 questions about how you play and get your best class with reasoning and a build link.` vs 实现 `Answer five questions about how you play and get a class direction with reasoning and a build link.`；/settings 冻结尾 `community-tested.` vs 实现 `based on community-tested starting points.`
- 首页 Title 渲染为 `Mistfall Hunter Tools, Builds & Tier List (Updated Aug 2026) | Mistfall Hunter Tools`（88 字符），冻结为 `Mistfall Hunter Tools, Builds & Tier List (Updated Aug 2026)`（54 字符）——layout template 后缀被重复追加。
- 部分 Title 超 60 字符建议（/settings 69、/class-quiz 73、/controller-vs-kbm 74、/pc-settings 70）。

### 3.5 数据页 SEO 空壳（P1 级，owner release「render usable seed/data states, not empty shells」）

- /items、/loot-finder：SSR HTML 无任何物品数据（0 `<td>` 行），默认视图表格无数据行、仅搜索占位；48 条 items 仅客户端 fetch 后按需搜索可见。功能上 QA 需复验「Browse Items」默认是否给出可浏览列表；SEO 侧：JS 不执行/AI 爬虫看到的是无数据薄页，且无法产出 ItemList schema。
- /map：24 POI 数据可 fetch，画布渲染为客户端行为，SSR 无 POI 文本。
- 建议：数据页增加 SSR 静态物品列表（首 N 条）或默认渲染全部 48 条 + ItemList schema；地图页加 POI 名称的静态可读清单。

### 3.6 首页 canonical 尾斜杠不一致（P2）

- 首页 canonical 渲染为 `https://mistfallhunter.co`（无尾斜杠）；sitemap home loc 为 `https://mistfallhunter.co/`（有尾斜杠）。功能等价但建议统一（全站无尾斜杠口径，sitemap home 改无斜杠，或 canonical 改带斜杠二选一）。

---

## 4. 风险清单

| 级别 | 风险 | 影响 | 处置 |
|---|---|---|---|
| P0 | 45 内容页 ~500 词模板克隆（唯一性 11–21%）| 上线即 doorway 拒收/整站降权风险，污染初始抓取 | 上线前修复：05 逐页唯一正文 → 07 集成 |
| P0 | 4 复杂工具页 <500 词 | 违反 owner release 硬验收 | 同修复 |
| P1 | FAQPage/Organization/Breadcrumb/ItemList schema 全缺 | GEO/AEO 不达标，FAQ 富结果机会丢失 | 07 代码补 schema（FAQ 文案已冻结在 faq-schema-copy.md）|
| P1 | 冻结文案改写（DA/Title）| 05C 冻结违约；长 Title 截断 | 07 改用冻结值；首页 title 去模板后缀 |
| P1 | 数据页 SSR 空壳 | 「not empty shells」验收风险；AI/无 JS 爬虫看到薄页 | 数据页 SSR 静态列表 + ItemList |
| P2 | 首页 canonical 尾斜杠不一致 | 轻微 | 统一口径 |
| P2 | llms.txt 未实现 | 05S 基线 P1 建议（V1.5 批次）| 不阻塞 V1，上线后 2–4 周补 |
| P2 | 生产阶段 CF Managed robots 会注入 AI 爬虫 Disallow（GPTBot/ClaudeBot 等）| 与 GEO 目标冲突 | 07C/11 部署阶段显式决策是否保留（Skill 常见坑）|
| P2 | 全站无 `<main>` landmark | 可访问性弱信号 | 07 顺手加语义 landmark |

## 5. 修复规格（给下游的最小必要信息）

### 建议执行顺序与 assignee（由主控派发）
1. **05 content（推荐 assignee，阻塞项）**：基于冻结包（seo-copy-freeze.md + faq-schema-copy.md + cta-status-copy.md + PRD §5）逐页产出唯一正文：
   - 43 内容页每页 2000–3000 词，H2 按冻结模板，FAQ 用冻结 186 条逐页分配，禁止跨页复用；
   - 10 工具页每页 500–800 词（正文 + FAQ），4 复杂工具页保留现交互；
   - 每页 ≥60% 唯一（验收：相似度 Jaccard < 0.40）。
2. **07 qianduan（依赖 1）**：集成冻结正文与 schema：
   - FAQPage JSON-LD（54 页，字段用冻结 FAQ）、首页 Organization、工具/内容页 Breadcrumb、/tier-list + /items ItemList；
   - 全部 TDK/DA 改用冻结值；首页 title 不再追加模板后缀（或改 template 避免重复）；
   - 首页 canonical 与 sitemap 尾斜杠统一；
   - 数据页（/items /loot-finder）SSR 静态物品列表 + /map POI 静态清单；
   - 补 `<main>` landmark（可选 P2）。
3. **09 QA（依赖 2）**：按 QA rubric §4 复验（正文词数、FAQ≥3、唯一性、canonical、sitemap、数据页非空）。

### 验收门槛（修复后本卡重新复核）
- [ ] 43 内容页正文 ≥2000 词；10 工具页 ≥500 词
- [ ] 内容页两两 Jaccard < 0.40（≥60% 唯一）
- [ ] FAQPage 覆盖 ≥53 页；首页含 Organization；工具/内容页含 Breadcrumb；/tier-list /items 含 ItemList
- [ ] TDK/DA 与冻结值逐字一致；首页 Title = 冻结 54 字符
- [ ] 首页 canonical 与 sitemap 一致（无尾斜杠或全带，二选一）
- [ ] /items /loot-finder SSR 含物品数据；/map SSR 含 POI 文本清单
- [ ] sitemap 58 / robots / 404 noindex / /api 排除维持现状

## 6. 本卡不执行的锁定项

- 生产部署 / DNS / Cloudflare / Git push / GSC / Bing / IndexNow / 分析激活 / 公开发布：仍锁定，需后续 owner release（owner-release-07-08 明确非目标）。
- Cloudflare Managed robots 的 AI 爬虫策略：部署阶段决策，非本卡。

---

**状态行：[NEEDS_REPAIR] — 技术机制通过；内容厚度/唯一性 + schema 完整性不达标，须按 §5 修复后复验；不构成对上线放行。**
