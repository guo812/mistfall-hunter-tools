# PRD Addendum V1.1 / Change Control — mistfall-hunter
# PRD Addendum V1.1 / 变更控制（02D）

> **阶段 Stage**: 02D PRD addendum / change control
> **日期 Date**: 2026-08-08
> **作者 Author**: prd（profile=prd），依据 product-definition-prd §7「专业基线与 PRD Addendum」
> **基线 Base**: outputs/02-prd-v1/prd-v1-master-spec-bilingual.md（PRD V1，02C 已确认，owner 2026-08-08 放行）
> **回收来源 Sources**: outputs/03-pricing/（03 pricing，ADD-03-1..5）；outputs/04-compliance/（04 compliance，A1-A10）；outputs/05S-seo-baseline/（05S SEO，SEO-A1..A8）；inputs/02-owner-confirmations/（owner 决策三件套）
> **状态 Status**: **[BLOCKED] — WAITING_OWNER_RECONFIRM（A2 路由范围 58→60）**；已采用修订均为 owner 已确认项或非重大执行约束；A2 为唯一真实待决策项，放行前 05 文案 / 06 设计 / 07 前端 / 08 后端保持锁定。
> **语言 Language**: 中英双语。英文路由/术语保留给 SEO/copy/frontend 下游；中文说明业务含义与决策点。

---

## 0. 结论先行 / Executive Summary

- **Gate**: [BLOCKED] — 等待 owner 对 A2（新增 2 个法律页，58→60 路由）做最终确认；其余内容已在本文件完成逐项映射。
- **已采用修订（owner 已确认，带 provenance）**：
  1. R1 生产域名 canonical → `https://mistfallhunter.co`（owner 02C 消息 + 04 A1 + 05S SEO-A1）；
  2. R2 Steam CTA + 全免费/流量导向（owner-additional-requirement-20260808.md，取消 Pro/模板变现方向，更新 N12 口径）；
  3. R3 V1 全部 10 工具路由上线且非薄页、index、进 sitemap（owner-decision-seo-a2-20260808.md，作废 V1/V1.5 分批）。
- **已采用执行约束（非重大）**：ADD-03-3 配额口径、ADD-03-4 事件信号注释、A3 域名邮箱、A4 Refund 段落、A5 cookie consent、A6-A10 下游约束、SEO-A3..A8。
- **待 owner 决策**：A2 — 新增 `/cookie-policy` + `/disclaimer`（58→60 indexable routes，sitemap ≥60）。
- **未采用 / 延后**：ADD-03-2（/pricing 路由，V1 不加）、ADD-03-5（支持入口，延后，owner 另行决定）。

---

## 1. 变更日志 / Revision Log

| ID | PRD V1 引用 | 变更 | 来源 Source | 原因 Reason | 影响 Impact | 状态 |
|---|---|---|---|---|---|---|
| R1 | §1 域名；§5.1 canonical；§6.1 | 生产域名 = mistfallhunter.co；canonical 终值 `https://mistfallhunter.co<path>`；.gg 补注册 301 为可选（owner 决定） | 04 A1 + 05S SEO-A1 + owner-confirmation-02C-20260808.md（「域名已经注册，.co的」） | PRD V1 写的是 domain_pending/.gg 首选，已陈旧；owner 已注册并确认 | 07 canonical/sitemap/robots；requirements-trace #9/#10 | ✅ ADOPTED（owner 已确认） |
| R2 | §1 商业化；§2.4；§4.5 N12；§2.3；§7.1；§7.2 | ① 首页 Hero + 工具页/相关内容页新增 Steam CTA（Play on Steam，https://store.steampowered.com/app/3282300/Mistfall_Hunter/）；② 商业模式改为全免费 + 流量导向，取消「Pro/模板变现评估」方向；N12 增补「不做任何付费功能」口径 | owner-additional-requirement-20260808.md（「增加进入steem游戏的链接按钮。不做付费，做全免费，主要要流量。」） | owner 明确决策，最新 owner 输入优先 | 设计 Steam CTA 入稿；文案禁付费话术；pricing 结论同步为全免费 | ✅ ADOPTED（owner 已确认） |
| R3 | §4.1/§4.2 分批；§5.2 批次列；§6.1；§2.3 #2；§7.1；§7.4 | V1 首发 10 工具全部上线；Squad Builder / Matchups / Build Planner / Map 四页为可用工具（P0 核心功能先实现），内容非薄页（正文+FAQ+内链+结构化数据）；全部 index + 进 sitemap；删除 Coming Soon 灰态占位方案；「V1 首发 6 + V1.5 补 4」分批作废 | owner-decision-seo-a2-20260808.md（「四个工具页要直接做成非薄页上线。要允许抓取。」） | owner 否决 noindex/Coming Soon；复杂交互增强仍可后续迭代 | 06 设计无灰态卡；05 文案四页配实质正文；10 SEO 验收四页 index+非薄页；QA 仍按工具逐批验收（requirements-trace #2 口径不变） | ✅ ADOPTED（owner 已确认） |
| R4 | §4.1 P0-9 埋点基线 | 前端实现 cookie consent banner：默认阻止 GA4，Accept 后加载，Reject 不加载，可改偏好；偏好存 cookie/localStorage；无 GA4 时工具功能不受影响 | 04 A5（执行约束；来源 P1-1 GA4 披露要求） | V1 使用 GA4，需披露+用户控制；CF Web Analytics cookieless 不受影响 | 07 前端实现；QA 验收三态（默认/接受/拒绝） | ✅ ADOPTED（执行约束，非重大） |
| E1 | §3 通用状态机「超限 Quota」 | 增补口径：「超限=无」仅适用于工具本身（客户端本地计算）；站点级只读 API（/loot-finder、/items）允许服务端 rate limit 作为滥用防护，但不得阻断匿名正常使用（fail-open）；页面/文案统一写 Free to use，不写 Unlimited | 03 ADD-03-3（P0 采纳建议） | 防止后端误加用户级配额墙，违反 N12；同时允许 D1 滥用防护 | 08 后端 rate limit 设计；QA 断网/限流模拟 | ✅ ADOPTED（执行约束，非重大） |
| E2 | §6.3 Event Contract 表尾 | 注释：事件同时作为流量/复访/分享等运营信号，由 12 data review 输出评估（owner 全免费口径下不做变现评估，改为流量分析）；事件参数红线不变 | 03 ADD-03-4（P1） | 数据收集口径提前固定，避免后续改埋点 | 07 埋点不变；12 data review 读取 | ✅ ADOPTED（注释，非重大） |
| E3 | §5.11 /contact /about；Footer | 统一联系邮箱 `contact@mistfallhunter.co`；Email Routing 接线列为撤 noindex/公开发布硬前置；禁止 Gmail/个人邮箱/占位符 | 04 A3（执行约束） | 合规 P1-2 域名与联系方式守卫 | 05 文案、07 前端、07C 域名接线、QA | ✅ ADOPTED（执行约束，非重大） |
| E4 | §5.11 /terms；§4.4 N12 | V1 在 Terms §8 内置「Refunds and Payments（当前无付费服务）」段落，不单独建 /refund-policy 页；若未来 owner 变更全免费口径引入付费，支付上线前再建 /refund-policy + 服务商披露 + 04R | 04 A4（条件性；03 定价确认 V1 免费 + owner 全免费） | V1 无支付，无退款暴露面；保持法律页最小化 | Terms 草稿含 §8；04R 未来触发 | ✅ ADOPTED（条件性，非重大） |
| E5 | §5 通用组件 / §6.2 Data Contract | 信任标签判定口径入 PRD：Verified / Community Report / Needs Update 的定义与证据要求，防止文案/数据实现阶段滥用 | 04 A8（执行约束） | 禁止无证据的 Verified | 05 文案、08 数据、QA | ✅ ADOPTED（执行约束，非重大） |
| E6 | §6.2 爬取策略；§7.3 | 明确 robots.txt 检查、rate limit、来源台账字段（来源 URL/采集日期/Last Verified/权属状态）由 08 落实；台账先于数据上线（04 已建骨架 inputs/04-compliance/reuse-ledger.md） | 04 A9（执行约束） | 爬取礼貌策略可执行化 | 08 后端、04R、QA | ✅ ADOPTED（执行约束，非重大） |
| E7 | §7.1 设计（Logo N2） | 06 设计交付时附原创过程证据（草图/迭代/源文件）；04R 对最终 logo 做相似度复核并记录判定 | 04 A10（执行约束） | 类官方风格原创 logo 需证据链 | 06 设计、04R | ✅ ADOPTED（执行约束，非重大） |
| E8 | §4.3 P1；§6.2/§6.3 | Newsletter（P1）上线前合规闸门：收集邮箱前更新 Privacy（服务商/存储/保留/退订）；事件参数不含 email（保持红线）；04R 复验后放行 | 04 A6（执行约束） | P1 邮件订阅需披露 | P1 迭代、08 后端、04R | ✅ ADOPTED（执行约束，非重大） |
| E9 | §4.4 P2（AI Q&A） | AI 功能上线前补 AI Content Policy（provider/数据共享/不保证原创准确无侵权/提示词权利）并同步 Privacy/Terms | 04 A7（执行约束） | P2 AI 功能合规前置 | P2 迭代、04R | ✅ ADOPTED（执行约束，非重大） |
| E10 | §4.3 P1（llms.txt 缺失） | llms.txt 加入 P1 批次（上线后 2-4 周），路径 /llms.txt，列出 58 页标题/URL/一句话摘要 | 05S SEO-A3 | AEO 主流做法 | 07 前端 + 10 SEO recheck | ✅ ADOPTED（P1 规划，非重大） |
| E11 | §6.1 sitemap | 明确 sitemap 拆分结构（tools/classes+builds/guides+codes+duo/maps/bosses/pages）与 lastmod/priority 策略，只含真实可索引页 | 05S SEO-A4 | Brief V2 §13 结构落成合同 | 07 前端 | ✅ ADOPTED（实现细节，非重大） |
| E12 | Brief V2 §3 竞品全景（未含 metamist.io） | 竞品监控新增 metamist.io（builds/tier list/class guides UGC）；差异化盯防：互动工具 + Duo 独家 + Last Verified 更新节奏 | 05S SEO-A5 | 2026-08-08 实测已上线，与本站正面竞争 | 10 SEO recheck / 12 数据复盘 | ✅ ADOPTED（监控项，非重大） |
| E13 | §5 逐页 Title/Meta（未定义 OG） | 补 OG image 1200×630 模板 + Twitter card 规范（每页可复用模板 + title 叠加） | 05S SEO-A6 | 社交分享与 AI 抓取表现 | 06 设计 + 07 前端 | ✅ ADOPTED（设计/SEO 细节，非重大） |
| E14 | §6.2 数据新鲜度 | 内容页 dateModified 与 Last Verified 显示同步；schema dateModified 随更新刷新 | 05S SEO-A7 | 新鲜度信号对 GEO/AEO 重要 | 07 前端 + 05 文案 | ✅ ADOPTED（SEO 细节，非重大） |
| E15 | §2.4 待确认项（游戏数据未结构化） | 数据采集优先级：tier list 数据 > 物品子集 > 地图 POI（对应最高可进入性长尾）；按 GSC 查询信号扩页（薄内容防线不变） | 05S SEO-A8 | mistfalldb 数据护城河是最大威胁，v1 聚焦最高 ROI 子集 | 08 后端 + 12 数据复盘 | ✅ ADOPTED（后端规划，非重大） |
| P1 | §5.12 / §6.1 | V1 不新增 /pricing 路由；未来若 owner 变更全免费口径，经新 02D 变更控制再评估（index/noindex 由 10 SEO 评估） | 03 ADD-03-2（P2，延后） | 避免破坏 58 路由硬验收与薄内容防线；全免费口径下大概率永远不需要 | — | ⏸️ NOT ADOPTED / DEFERRED |
| P2 | §5.11 / Footer | 「Support this fan site」（Buy Me a Coffee 风格捐赠链接）：不采纳为 V1 默认；如 owner 后续想要，需单独决策 + 04 合规确认文案与数据边界后实施 | 03 ADD-03-5（P1 可选） | owner「全免费/流量导向」下捐赠入口属变现表面，需 owner 明确；避免误导免费承诺 | — | ⏸️ NOT ADOPTED / DEFERRED |
| **A2** | §5.11 信任页（4→6）；§6.1 路由计数（58→60）；§2.3 成功标准 #1（sitemap ≥58→≥60）；06 设计信任页模板；07 前端路由；footer 链接集 | 新增 `/cookie-policy`（+ /cookies 308 别名）与 `/disclaimer` 两个 indexable 法律页 | 04 A2（owner 决策项） | 合规 P0-4 法律页完整性（Cookie 披露 + 免责声明），V1 使用 GA4 与社区内容 | 路由首版范围变化：58→60；sitemap ≥60；设计/文案/前端 footer | 🟡 **[WAITING_OWNER_RECONFIRM]** |

---

## 2. 已采用修订明细 / Adopted Revisions Detail

### R1 — 生产域名 canonical（owner 已确认）
- **变更**：PRD §1 域名字段、§5.1 canonical 占位、§6.1 canonical 由「mistfallhunter.gg（首选，未注册，domain_pending）」更新为：
  - 生产域名：**mistfallhunter.co**（已注册，Dynadot，owner 2026-08-08 确认）
  - canonical 终值：`https://mistfallhunter.co<path>`（全站自引用；无尾斜杠统一；小写；查询参数不参与 canonical）
  - mistfallhunter.gg：不注册或补注册做 301，由 owner 决定（可选，不阻塞 V1）
- **来源**：owner-confirmation-02C-20260808.md（原话「域名已经注册，.co的。dynadot买的。放行下一步」）+ 04 A1 + 05S SEO-A1。
- **下游**：07 前端 canonical/sitemap/robots；requirements-trace #9/#10 同步更新（见本包变更）。
- **判定**：非重大变更（事实更新，owner 已确认），采用。

### R2 — Steam CTA + 全免费/流量导向（owner 已确认）
- **变更**：
  1. **Steam CTA**：首页 Hero + 工具页/相关内容页 CTA 按钮「Play on Steam」，链接 https://store.steampowered.com/app/3282300/Mistfall_Hunter/（官方 Steam 页，App ID 3282300，Free-to-Play，Bellring Games；已核验 2026-08-08）。外链 rel 属性由 10 SEO 评估。
  2. **商业模式**：全免费 + 流量导向。取消 PRD §1/§2.4「Pro/模板变现 03 定价评估」方向；N12 增补口径：**首版及后续均不做登录/注册/付费墙，不做任何付费功能（含订阅/终身版/咨询型收费）**；流量/收录/自然增长为首要 KPI；流量变现（广告/联盟等）为上线后评估项，仍需 owner 闸门。
- **来源**：owner-additional-requirement-20260808.md（原话「增加进入steem游戏的链接按钮。不做付费，做全免费，主要要流量。」）
- **下游**：06 设计（Steam CTA 入稿）；05 文案（禁付费话术，Free to use 口径）；03 pricing 结论同步为全免费成本最小化；04 Terms 不含付费条款；10 SEO 流量/收录为核心 KPI。
- **判定**：商业模式变更，但 **owner 已明确决策**（最新 owner 输入优先，product-definition-prd §2.5.1 口径），采用。

### R3 — V1 全部 10 工具上线，非薄页 index（owner 已确认）
- **变更**：
  1. §4.1 P0 V1 首发 6 + §4.2 P0 V1.5 补 4 → **V1 首发 10 工具全部上线**；「V1.5 补 4」批次作废；
  2. Squad Builder（/squad-builder）、Matchup Matrix（/matchups）、Build Planner（/build-planner）、Interactive Map（/map）四页 V1 即交付为**可用工具**：P0 核心功能优先实现（交互复杂度可分级），页面内容**非薄页**（功能可用性 + 结构化数据 + 指南正文 + FAQ + 内链）；
  3. 四页全部 **index + 进 sitemap**（sitemap ≥58 URLs 含四页）；删除「Coming Soon 灰态占位」方案；
  4. 复杂交互增强（拖拽优化、地图瓦片扩展等）仍可后续迭代（P1）。
- **来源**：owner-decision-seo-a2-20260808.md（原话「四个工具页要直接做成非薄页上线。要允许抓取。」）
- **下游**：06 设计（无灰态卡，四页按可用工具设计）；05 文案（四页配实质正文/FAQ）；07 前端（四页 P0 核心功能实现）；10 SEO（验收四页 index + 非薄页）；QA（四页按工具验收，requirements-trace #2 口径不变）。
- **判定**：P0 功能范围变更，但 **owner 已明确决策**，采用。路由总数保持 58（§5.12 index 集合不变：全部 index，仅 /api/* 与 /404 noindex）。

### R4 — Cookie Consent Banner（执行约束）
- 见 §1 表 R4。属于 P0-9 埋点基线的实现细化，不改变隐私数据方案本身（仍为 localStorage + GA4 + CF Web Analytics cookieless）。

---

## 3. 待 owner 决策 / WAITING_OWNER_RECONFIRM

### A2 — 新增 2 个法律页（58 → 60 路由）
- **建议（04 compliance）**：新增 `/cookie-policy`（+ /cookies 308 别名）与 `/disclaimer` 两个 indexable 法律页；信任页 4 → 6；路由总数 58 → 60；sitemap ≥60；§2.3 成功标准 #1 同步。
- **理由**：V1 使用 GA4（cookie/分析披露）+ 社区来源内容（免责声明）；法律页完整性是合规 P0-4。
- **折衷方案（若 owner 不想扩路由）**：Cookie/Disclaimer 内容并入 Privacy/Terms（仍满足披露，路由保持 58，可读性略差）。
- **影响**：改变首版路由范围 → 属重大变更，按 02D 闸门必须 owner 确认后才能放行 05 文案 / 06 设计 / 07 前端。
- **需要 owner 回复**：A2 选「新增 2 页（60 路由）」还是「并入现有法律页（58 路由）」。

---

## 4. 未采用 / 延后 / Not Adopted & Deferred

| ID | 内容 | 原因 | 恢复条件 |
|---|---|---|---|
| P1（ADD-03-2） | /pricing 路由 | V1 全免费 + 无付费功能，无定价页需求；避免破坏 58 路由硬验收与薄内容防线 | 未来 owner 变更商业口径，经新 02D 变更控制 |
| P2（ADD-03-5） | 支持入口（Buy Me a Coffee 风格捐赠链接） | owner「全免费/流量导向」方向下捐赠链接属变现表面，未获 owner 明确；避免与免费承诺混淆 | owner 单独决策 + 04 合规确认文案/数据边界 |

---

## 5. 材料变更判定 / Material Change Assessment

| 受保护维度 | 是否变化 | 处置 |
|---|---|---|
| 定位 / 主 ICP | 否 | 决策引擎定位不变（R2 只加强流量导向，不换定位） |
| P0 功能 | 是（R3：V1 10 工具全部上线） | **owner 已确认**（owner-decision-seo-a2）→ 采用 |
| 商业模式 | 是（R2：全免费/流量导向，取消 Pro 评估） | **owner 已确认**（owner-additional-requirement）→ 采用 |
| 隐私数据方案 | 否（R4 只是 GA4 consent 实现细化；数据仍 localStorage + GA4 + CF Web Analytics） | 执行约束 → 采用 |
| 首版路由范围 | 是（A2 提议 58→60） | **owner 未确认 → [WAITING_OWNER_RECONFIRM]** |
| 成本 / 上线期限 | 否（V1 边际成本≈$0 不变；普通上线期望不变） | — |

**结论**：除 A2 外无未决重大变更；A2 确认后本 Addendum 即可整体放行，05 文案 / 06 设计 / 07 前端 / 08 后端按本文件 + PRD V1 执行。

---

## 6. 下游必须读取 / Downstream Must-Read

### 05 文案（copy）
- 必须读取：PRD V1 §5（逐页 Title/Meta/H1）+ 本 Addendum（R1-R4、E1-E15）+ outputs/05S-seo-baseline/keyword-route-map.md + outputs/04-compliance/legal-pages-baseline-drafts.md。
- 新增/修改任务：Steam CTA 文案（R2）；四工具页实质正文 + FAQ（R3）；「Free to use」统一口径（E1）；contact@mistfallhunter.co（E3）；Terms §8 Refunds and Payments（E4）；信任标签文案口径（E5）；Trust 页 title/meta 由 04 合规定稿（PRD §5.11 责任不变）。
- 禁止：付费话术（Upgrade/Buy/Subscribe）、Unlimited/无限、无证据 Verified、竞品对比表上公开页。

### 06 设计（design）
- 必须读取：PRD V1 §7.1 + 本 Addendum。
- 新增/修改任务：Steam CTA 按钮入 Hero + 工具页/内容页模板（R2）；四工具页按可用工具设计（无 Coming Soon 灰态卡）（R3）；OG image 1200×630 模板 + Twitter card（E13）；cookie consent banner 视觉（R4）；logo 原创过程证据包（E7）；信任页模板数量按 A2 决策（60=6 页 / 58=4 页）。

### 07 前端（frontend）
- 必须读取：PRD V1 §5/§6/§7.3 + 本 Addendum。
- 硬约束：canonical = https://mistfallhunter.co<path>（R1）；58 路由 indexability（仅 /api/*、/404 noindex）（A2 确认前保持）；Steam CTA 外链（R2）；cookie consent banner 默认阻止 GA4（R4）；rate limit + fail-open（E1）；联系邮箱 contact@（E3）；dateModified 同步（E14）；sitemap 结构（E11）；事件参数红线不变（不含图片内容/文件名/PII）。

### 08 后端（backend/data）
- 爬取礼貌策略 + 台账字段契约（E6）；数据采集优先级 tier list > items > map POI（E15）；rate limit fail-open（E1）；无支付/无登录实现（R2，N12）。

### 10 SEO recheck
- 验收四工具页 index + 非薄页（R3）；canonical .co（R1）；llms.txt P1（E10）；metamist.io 监控（E12）；A2 决策后路由计数（58/60）；CF Managed robots 对 AI 爬虫策略复核（05S §3.4）。

### 12 Data Review
- 事件信号用于流量/复访/分享分析（E2，owner 全免费口径下不做变现评估）。

### 04R Compliance recheck
- Cookie consent 实现验收（R4）；联系邮箱接线（E3）；Terms §8 段落（E4）；台账填充核对（E6）；logo 相似度复核（E7）；Newsletter/AI 上线前闸门（E8/E9）。

### 保持锁定的边界（downstream cannot change）
- NOT-DO N1-N12 原样保留（N12 按 R2 增补「不做任何付费功能」口径，仍为硬约束）；
- 匿名 P0 不可拦截：无登录/无付费墙/无配额墙，认证或权益服务故障 fail-open（R2 下无权益服务，fail-open 恒成立）；
- 事件参数红线：不含图片内容/文件名/PII；
- 58 路由集合（A2 确认前）；PRD §5 逐页唯一 Title/Meta/H1（Trust 页由 04 定稿除外）；
- 技术栈 Next.js + Workers (OpenNext) + D1 + R2，不用 Pages。

---

## 7. 与 03/04/05S 报告的采纳对账 / Adoption Reconciliation

| 来源 | 建议 | 采纳 | 说明 |
|---|---|---|---|
| 03 pricing | ADD-03-1 商业化口径 | ✅ 采纳（升级为 R2 全免费口径） | owner 决策更强口径替代 Pro 评估建议 |
| 03 pricing | ADD-03-2 /pricing 路由 | ⏸️ 延后 | 全免费下大概率不需要 |
| 03 pricing | ADD-03-3 配额口径 | ✅ 采纳（E1） | 后端/QA 需要 |
| 03 pricing | ADD-03-4 事件信号 | ✅ 采纳（E2） | 改为流量分析信号 |
| 03 pricing | ADD-03-5 支持入口 | ⏸️ 延后 | owner 另行决定 |
| 04 compliance | A1 域名 | ✅ 采纳（R1） | owner 已确认 |
| 04 compliance | A2 +2 法律页 | 🟡 待 owner（A2） | 唯一阻塞项 |
| 04 compliance | A3 邮箱 | ✅ 采纳（E3） | 执行约束 |
| 04 compliance | A4 Refund | ✅ 采纳（E4） | 条件性，V1 Terms §8 段落 |
| 04 compliance | A5 cookie consent | ✅ 采纳（R4） | 执行约束 |
| 04 compliance | A6-A10 | ✅ 采纳（E5-E9） | 执行约束 |
| 05S SEO | SEO-A1 canonical | ✅ 采纳（R1） | owner 已确认 |
| 05S SEO | SEO-A2 V1.5 四页 | ✅ 采纳（R3） | owner 已决策（index+非薄页） |
| 05S SEO | SEO-A3..A8 | ✅ 采纳（E10-E15） | P1/实现细节 |

---

**Status**: [BLOCKED] — PRD Addendum V1.1 交付完成；唯一待 owner 决策项 A2（58→60 法律页）；owner 确认后由主控 unblock 放行 05 文案 / 06 设计 / 07 前端 / 08 后端。
