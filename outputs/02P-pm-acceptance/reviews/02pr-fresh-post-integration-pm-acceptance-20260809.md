# 02P-R PM Acceptance Re-Review — mistfall-hunter（fresh post-integration PM acceptance）

- 项目 Project: mistfall-hunter（board: site-mistfall-hunter）
- 生产域名 Production domain: mistfallhunter.co（canonical 终值 `https://mistfallhunter.co<path>`）
- 阶段 Stage: 02P-R fresh post-integration PM acceptance（任务 t_72cd17d8，owner/profile=prd）
- 日期 Date: 2026-08-09
- 权限 Authority: `inputs/02-owner-confirmations/owner-release-10R-B-and-launch-prep-20260809.md`（本地集成 + fresh 四闸门；无远程动作）
- 依赖 Dependency: 04R3 compliance（t_19e2b004 DONE）与 10R-C SEO（t_ba415d29 DONE）fresh 复核均已完成
- 复核对象: A3 集成后的当前源码 + fresh build（BUILD_ID `PMTtYEz_svnYmAso8Y81-`，2026-08-09 12:29）本地 standalone preview `http://127.0.0.1:3101`（由 `.next/standalone/server.js` 启动），全量 58 路由
- 上游输入: PRD V1（outputs/02-prd-v1/prd-v1-master-spec-bilingual.md，02C 已确认）+ 02D Addendum V1.1（outputs/02D-prd-addendum/prd-addendum-v1.1-change-control.md，owner 已确认 R1-R4/E1-E15）+ A3 冻结 copy 包（outputs/05-copy-repair/routes/**/*.json，54 文件）+ 旧 02P NEEDS_REPAIR 报告（outputs/02P-pm-acceptance/pm-acceptance-report.md，F1-F10）+ 10R-C SEO fresh（PASS）+ 04R3 合规 fresh（NO-GO）
- 复核方式: PM 独立脚本（/tmp/02pr_pm_audit_http.py + /tmp/02pr_content_jaccard.py + /tmp/02pr_pm_audit.py）对本地 preview 全量 58 路由抓取，逐项对照 PRD V1 §5/§6/§7 与 02D 合同；结果落盘 /tmp/02pr-pm-audit-results.json、/tmp/02pr-content-jaccard.json
- 模式 Mode: 只读本地；未做任何源码修改、Git、部署、DNS/Cloudflare、分析、公开动作

## 0. 结论先行 / Executive Summary

**Gate verdict: [NEEDS_REPAIR] — 旧 02P 的 10 项 FAIL（F1-F10）经 fresh 证据逐项复核全部修复；但本次 fresh 审查独立复现 1 项 P0（33 个公开内容页渲染内部中文占位符 `[DATA-PENDING: 08 ...]`，FAQ 正文与 JSON-LD FAQPage schema 同步污染）与 1 项 P1（法律页正文未接入 05-copy 冻结定稿），与 04R3 合规 NO-GO 一致。P0 清除并复验前，PM 不放行 09 QA / 11 launch。**

一句话：**实现侧的合同缺口已闭环（词数/唯一性/schema/冻结 TDK/SSR/canonical 全部达标），剩余缺口在内容源（A3 copy 包 56 处占位符）与信任页接入（Trust 组件单句 stub），属于 05-copy + 07 前端小步修复，非架构返工。**

## 1. 复核方法与证据

| 项目 | 证据 |
|---|---|
| 本地 preview | http://127.0.0.1:3101（.next/standalone fresh build，BUILD_ID PMTtYEz_svnYmAso8Y81-；server log /tmp/mistfall-preview-02pr.log） |
| PM 独立抓取脚本（全量 58 路由） | /tmp/02pr_pm_audit_http.py → /tmp/02pr-pm-audit-results.json |
| PM 独立内容唯一性脚本（43 内容页两两） | /tmp/02pr_content_jaccard.py → /tmp/02pr-content-jaccard.json |
| PM 静态产物辅助脚本 | /tmp/02pr_pm_audit.py（.next/server/app 58 html 静态复核） |
| 冻结基线 | outputs/05-copy-repair/routes/**/*.json（A3，54）+ outputs/05-copy/faq-schema-copy.md + outputs/05-copy/trust-pages-final-copy.md |
| 上游 fresh 复核 | outputs/10-seo-recheck/reviews/10rc-fresh-post-integration-seo-review-20260809.md（PASS）；outputs/04-compliance/reviews/mistfall-hunter-compliance-04r3-post-integration-20260809.md（NO-GO，P0-1/P1-1） |

## 2. 旧 NEEDS_REPAIR 逐项裁决（supersede / retain）

依据 PRD V1 §5.8/§7.2/§6 + 02D R1/R3，对旧 02P 报告 F1-F10 逐项以当前 fresh 证据重判：

| # | 旧判定（2026-08-08） | 合同要求 | 当前实测（PM 独立，2026-08-09） | 新判定 |
|---|---|---|---|---|
| F1 | ❌ 内容页 ~520 词 P0 薄页 | 内容页正文 2000-3000 词（PRD §5.8） | 43 内容页 article 词数 min 2027 / max 2443；`content_below_2000`=[]（仅首页 1029 属 home-exempt，非内容页） | ✅ **SUPERSEDED — PASS** |
| F2 | ❌ 4 复杂工具页 <500 词 P0 | 工具页 500-800 词（owner mandatory #1） | 10 工具页 article 词数全部 ≥500（min /tier-list=580；/loot-finder=1101、/items=1096 为含 SSR 48 行物品数据的渲染计数，正文部分仍落在 500-800 band；10R-B frozen editorial body 口径 54/54 通过） | ✅ **SUPERSEDED — PASS** |
| F3 | ❌ 内容两两 Jaccard 0.79-0.89 P0 doorway | 唯一性 ≥60%（5-shingle Jaccard < 0.40） | 43 内容页两两 5-shingle max **0.1938**（/builds/shadowstrix ↔ /builds/sorcerer），< 0.40；全站含工具数据页 max 0.2731（/items ↔ /loot-finder，共享 48 行物品表，属数据页正常特征） | ✅ **SUPERSEDED — PASS** |
| F4 | ❌ FAQPage schema 0 P1 | FAQPage ≥53 路由、每页 3-5 Q | FAQPage JSON-LD 54/54 copy 路由；总 Q=182；`faqpage_missing_lt3`=[] | ✅ **SUPERSEDED — PASS** |
| F5 | ❌ Organization schema 0 P1 | 首页 + /about | Organization home=True、about=True | ✅ **SUPERSEDED — PASS** |
| F6 | ❌ Breadcrumb schema 0 P1 | 工具/内容页 | BreadcrumbList 53 路由（10 工具 + 43 内容，与 10R-B 一致） | ✅ **SUPERSEDED — PASS** |
| F7 | ❌ ItemList schema 0 P1 | /tier-list、/items | ItemList = [/items, /tier-list] | ✅ **SUPERSEDED — PASS** |
| F8 | ❌ 冻结 TDK/DA 改写、首页 Title 88 字符 P1 | 冻结文案逐字（05C「下游不得自行变更」） | title 54/54 exact、meta 54/54 exact、directAnswer 54/54 exact（frozen_da_checked=54，mismatch=[]）；首页 Title 与 A3 home.json 一致 | ✅ **SUPERSEDED — PASS** |
| F9 | ❌ 数据页 SSR 空壳 P1 | /items /loot-finder SSR 物品行；/map POI | /items SSR `<tr>`=49（48 行 + 表头，10R-B 同口径 count-1=48）；/loot-finder SSR `<tr>`=49（48 行）；/map 命中 4 个命名 POI（Extraction Gate 1 / Boss Arena 2 / Treasure Room 3 / Crossroads 8）且 12 POI × 2 地图渲染 | ✅ **SUPERSEDED — PASS** |
| F10 | ❌ 首页 canonical 尾斜杠不一致 P2 | canonical 全站 `https://mistfallhunter.co<path>`（02D R1，无尾斜杠统一） | 58/58 canonical exact（`canonical_mismatch`=[]）；sitemap home loc=`https://mistfallhunter.co`（无尾斜杠）与页面 canonical 一致 | ✅ **SUPERSEDED — PASS** |

## 3. 本次 fresh 新增未通过项（retain / 新增）

| # | 级别 | 问题 | 证据（PM 独立） | 来源归属 | 修复后复验 |
|---|---|---|---|---|---|
| N-P0 | P0 | **33 个公开内容页渲染内部中文占位符 `[DATA-PENDING: 08 ...]`**（含 FAQ 正文与 JSON-LD FAQPage schema） | `data_pending_pages`=33（全部 3 boss + 6 class + 6 build + 3 code + 11 guide + 2 map）；`data_pending_jsonld_pages`=33；`data_pending_visible_pages`=33；`lib/copy.ts` 与 A3 routes JSON 各 56 处；样例 `/bosses/salmar` FAQ 可见文本「...see the Brandrgarde Map Guide for the route. [DATA-PENDING: 08 坐标]」；JSON-LD acceptedAnswer 同步命中 | 05-copy（A3 copy 包未清占位符，来源 `lib/copy.ts` 由 A3 生成）+ 07 前端集成未拦截；SEO 10R-C ban 词检查仅覆盖 `[DATA: ...]`/TBD，未覆盖 `DATA-PENDING`（脚本确认无该模式） | 04R4 + 10R-D + 02P-R2 三线复验 |
| N-P1 | P1 | **法律页正文未接入 05-copy 冻结定稿**（Trust 组件仅渲染 route.answer 单句 + 联系句；privacy/terms/contact 正文 577-592 字符，缺 No Account / Browser-Local / Analytics / Cookies / Hosting / Children / Retention / CCPA / As-Is / Refunds / Takedown 72h 等全部章节） | 与 04R3 §1 一致（复用其源码级证据 app/[[...slug]]/page.tsx L84 + 构建产物 grep）；冻结定稿 outputs/05-copy/trust-pages-final-copy.md 存在但未被引用 | 07 前端（A3 集成时 Trust 组件未接定稿） | 04R4 + 02P-R2 |

## 4. 两轮 fresh 复核差异的 PM 裁决

- **10R-C SEO = PASS** 与 **04R3 合规 = NO-GO** 并不矛盾：SEO 验收口径（路由/元数据/schema/SSR/词数/唯一性）全部实测通过；合规发现的内容占位符属于**用户可见内容质量与结构化数据洁净度**维度，SEO 脚本的 ban 词表未覆盖 `DATA-PENDING`（审计盲区），但 PM 独立对渲染 DOM + JSON-LD 全文 grep 可稳定复现 33 页命中。
- PM 裁决：占位符违反 PRD V1 §5.8「内容页成功 = 正文 + FAQ Schema」的产品完成度语义（面向 US/English 用户的公开页出现中文内部待办标记，且 JSON-LD 同步污染 AEO），判定为 P0 阻断项；这也与 owner-release「fresh 四闸门全部 PASS/GO 后才可准备生产」的边界一致——**四闸门中合规为 NO-GO，故整体仍为 NEEDS_REPAIR，不放行 09 QA / 11 launch**。
- 旧 02P 报告中「素材台账 P1（t_f0ed10f6）」与「Email Routing / GA4 / 生产部署」等风险项：台账已由 04R3 复核关闭（REUSE-001..008 补齐）；Email Routing（P1-2）、Cookie consent/GA4（P1-3）、Refund（P1-4）为 04R3 保留的发布硬前置，非 PM 内容合同缺口，维持 retain 移交 07C/合规。

## 5. 通过项汇总（PM 视角产品要求）

- 58 路由全量 200（pages_ok=58/58），sitemap 58 URLs，canonical 58/58 exact（.co）
- 10 工具路由独立存在、H1 与 PRD §5.2/02D R3 一致、全部 index 非薄页
- 43 内容页词数 2000-3000、唯一性 5-shingle 0.1938 < 0.40（doorway 风险解除）
- schema 矩阵完整：FAQPage 54/54（182 Q）+ Organization（home/about）+ BreadcrumbList 53 + ItemList（/items、/tier-list）+ WebApplication/Article/WebSite
- 冻结 TDK/DA 逐字 54/54（F8 违约解除）
- SSR 数据非空壳：items 48 / loot-finder 48 / map 12 POI × 2
- 无登录/无付费墙（N12）、非官方声明、合规面通过项沿用 04R3

## 6. 风险清单

| 级别 | 风险 | 影响 | 处置 |
|---|---|---|---|
| P0 | 33 页 `[DATA-PENDING: 08 ...]` 占位符（正文 + JSON-LD） | 英文市场观感差、FAQ 结构化数据被中文待办污染、信任度受损；带病上线即违反 owner-release fresh-gate | 05-copy 清除/替换为面向用户的中性表述（如「Details verified with community reports」）→ 07 前端重建 → 04R4/10R-D/02P-R2 复验 |
| P1 | 法律页单句 stub 未接 05-copy 定稿 | Privacy/Terms/Contact 披露不完整，「事实披露与真实实践一致」验收不成立 | Trust 组件接入 trust-pages-final-copy.md（保留 contact@、Analytics 用「may be added with consent」措辞）→ 同批重建复验 |
| P1 | FAQ 文本跨页复用 3 处（ps5/xbox 同 Q 同 A；faq/home、faq/getting-started 同 Q 异 A） | 轻微重复摘要风险（10R-C §7 观察，来源 A3 冻结包） | 上线前 owner/文案决策：ps5/xbox 平台化改写或保留 |
| P2 | Google Fonts 外部请求 / 主页「48 Guides」数字与 43 内容路由偏差 / 未来功能披露 / GA4 保留期 | 非阻塞 | 04R3 P2 项，上线后跟进 |

## 7. 下游交接（给主控 / 05-copy / 07 前端 / 09 QA / 11 launch）

- **主控**：本卡 verdict=[NEEDS_REPAIR]（旧 F1-F10 全部 supersede 为 PASS；新增 P0 占位符 + P1 法律页定稿）。请派 05-copy 清除 33 页 DATA-PENDING 占位符 + 07 前端接入 trust-pages-final-copy.md，重建后按 04R4（合规）+ 10R-D（SEO）+ 02P-R2（PM）三线复验；三线全 PASS 后再放 09 QA / 11 launch。
- **09 QA（t_b291a21d）**：维持锁定。复验重点追加：占位符零命中（页面可见文本 + JSON-LD）、法律页章节完整性、旧 07R2 移动端/功能回归。
- **11 launch**：维持锁定（部署/DNS/Cloudflare/Git/GSC/Bing/IndexNow/分析/Email Routing 均需 owner 单独放行 + 四闸门 terminal PASS）。
- **不能假设**：不能假设 DATA-PENDING 已清除（实测 33 页命中）；不能假设法律页正文已完整（实测单句 stub）；不能假设 SEO PASS 等于无内容占位符（其 ban 词表未覆盖 DATA-PENDING）；不能假设 GA4 已激活或 contact@ 可收信（Email Routing 未接线）。

## 8. 验收清单

- [x] 58 路由 / canonical / sitemap 与 PRD V1 + 02D 一致（58/58）
- [x] 内容页词数 2000-3000（F1 — supersede PASS）
- [x] 工具页词数 ≥500（F2 — supersede PASS）
- [x] 内容唯一性 5-shingle < 0.40（F3 — supersede PASS，实测 0.1938）
- [x] FAQPage / Organization / Breadcrumb / ItemList schema（F4-F7 — supersede PASS）
- [x] 冻结 TDK/DA 逐字（F8 — supersede PASS）
- [x] 数据页 SSR 非空壳（F9 — supersede PASS，items/loot 48、map POI）
- [x] canonical 统一（F10 — supersede PASS）
- [ ] **DATA-PENDING 占位符清除（N-P0 — 未满足，本次 NO-GO 主因）**
- [ ] **法律页 05-copy 定稿接入（N-P1 — 未满足，随 N-P0 同批修复）**

**状态行：[NEEDS_REPAIR] — 旧 02P F1-F10 全部修复（supersede 为 PASS）；fresh 独立复现 33 页 DATA-PENDING 占位符 P0 + 法律页定稿未接入 P1（与 04R3 NO-GO 一致）；修复 + 04R4/10R-D/02P-R2 复验前不放行 09 QA/11 launch。**
