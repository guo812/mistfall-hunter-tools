# 02P PM Acceptance Report — mistfall-hunter（产品负责人验收）

- 项目 Project: mistfall-hunter（board: site-mistfall-hunter）
- 生产域名 Production domain: mistfallhunter.co（Dynadot 已注册；canonical 终值 `https://mistfallhunter.co<path>`）
- 阶段 Stage: 02P PM acceptance（任务 t_08a081c0，owner/profile=prd）
- 日期 Date: 2026-08-08
- 复核对象: 本地实现（07 前端 t_a4cb8776 验收通过后的源码 + 本地 preview http://127.0.0.1:3007，BUILD_ID vctvHx5OsPOks9t0rFoai；owner release `owner-release-07-08-local-implementation-20260808.md` 仅授权本地实现，远程/部署/发布仍锁定）
- 上游输入: PRD V1（outputs/02-prd-v1/prd-v1-master-spec-bilingual.md，02C 已确认）+ seo-copy-freeze.md（05C 已确认）+ 10 SEO recheck（t_90060c82 [NEEDS_REPAIR]）+ 04R compliance recheck（t_c4af41bb [DONE]，P1 台账待补）+ 07R2 independent Re-QA（t_5afce11b PASS）+ requirements-trace.md + process-contract.md + project-control.md
- 复核方式: 独立脚本 outputs/02P-pm-acceptance/spotcheck.py 对本地 preview 全量 23 路由采样（覆盖 home/tools 10/内容 8/trust 4）+ 交叉核验 10 SEO recheck 报告与 07R2 QA 证据

## 0. 结论先行 / Executive Summary

**Gate verdict: [NEEDS_REPAIR] — 当前实现尚未满足 PRD V1 §5 内容合同与 owner-release mandatory acceptance，不能放行 09 QA / 11 launch。**

产品骨架（58 路由、10 工具路由、匿名可用、非官方声明、移动端导航、Squad Builder 功能、合规法律页）已达标；但 PRD V1 §5/§7.2 冻结内容合同与 owner-release 硬验收存在 P0/P1 缺口，与 10 SEO recheck 结论一致。修复卡已存在且在途（t_99a2bcf6 content RUNNING → t_a249fbb3 qianduan TODO），修复完成并复验前，PM 验收不得 DONE，09 QA 不得启动。

## 1. 复核方法与证据

| 项目 | 证据 |
|---|---|
| PM 独立采样脚本（23 路由） | outputs/02P-pm-acceptance/spotcheck.py |
| 本地 preview | http://127.0.0.1:3007（fresh build，BUILD_ID vctvHx5OsPOks9t0rFoai）|
| 10 SEO 全量 58 路由复核 | outputs/10-seo-recheck/seo-recheck-report.md + seo-recheck.json |
| 07R2 独立移动端/功能 Re-QA | outputs/09-qa/07r2-mobile-functional-reqa.md + outputs/09-qa/07r2-evidence/ |
| 04R 合规复核 | outputs/04-compliance/mistfall-hunter-compliance-recheck-20260808.md |
| 冻结基线 | outputs/05-copy/seo-copy-freeze.md（§3 模板/§4 词数/schema）+ faq-schema-copy.md + PRD V1 §5 |

## 2. 通过项 / PASS（PM 视角的产品要求）

| PRD V1 要求 | 实测 | 判定 |
|---|---|---|
| 58 可索引路由（requirements-trace #1）| lib/routes.ts=58；sitemap 58 URLs 全部 200，canonical=.co；我的采样 23/23 路由 200 | ✅ |
| 10 工具路由独立存在、H1 匹配 PRD §5（#2）| /class-quiz /settings /tier-list /loot-finder /items /checklist /squad-builder /matchups /build-planner /map 全部 200，H1 与 PRD §5.2 一致 | ✅ |
| 移动端 360/390/430 首屏 + 导航（07R2 独立验收）| 9 PNG 独立证据：compact header、底部 5 tab、safe-area、Squad Builder Duo/Trio/share URL/fresh-load 全 PASS | ✅（t_5afce11b）|
| 匿名可用、无登录/付费墙（N12）| 无 login/payment/oauth 代码；工具纯客户端 + localStorage/URL 状态 | ✅（04R §2）|
| 非官方声明 + 禁用表达零命中 | footer `Unofficial fan resource...` 逐页存在（我的采样 23/23）；构建产物 grep 无禁用表达 | ✅（04R §3）|
| 法律页（/privacy /terms /about /contact）| 200，正文与数据实践一致，无个人邮箱暴露 | ✅（04R §1/§4）|
| 数据文件与 provenance（#5/#6）| items 48 / classes 6 / POIs 24；provenance.json remoteFetch=false，local-editorial-seed | ✅（08）|
| 技术 SEO 机制（robots/sitemap/404/api 排除/H1 唯一/meta 齐全/JSON-LD 基础层）| 全量 58 路由复核通过 | ✅（10 SEO §2）|

## 3. 未通过项 / FAIL（PM 验收角度，直接对应 PRD V1 §5 与 owner-release mandatory acceptance）

| # | PRD V1 / owner-release 要求 | 实测（我的采样 + 10 SEO 全量）| 判定 |
|---|---|---|---|
| F1 | 内容页正文 2000–3000 词（PRD §5.8 内容页通用任务；seo-copy-freeze §3.2）| 内容页实测 ~520 词（含壳，正文 ~480）；我的采样 /guides/getting-started=520、/classes/mercenary=527、/builds/sorcerer=520、/tier-list/duo=524、/maps/hallowgrove=522、/bosses/salmar=521、/codes/rewards=523、/guides/duo=520 | ❌ P0 薄页 |
| F2 | 工具页正文 500–800 词（owner-release mandatory #1；seo-copy-freeze §3.1）| 4 复杂工具页 455–496 词；我的采样 /class-quiz=459、/settings=456、/tier-list=431、/loot-finder=440、/items=438、/checklist=418、/squad-builder=496、/matchups=474、/build-planner=464、/map=455 | ❌ P0 未达 500 下限 |
| F3 | 内容唯一性 ≥60%（owner-release mandatory #2；seo-copy-freeze §3.1/3.2）| 内容页两两 Jaccard 0.79–0.89（唯一性 11–21%）；/items vs /loot-finder=0.875 | ❌ P0 doorway 风险 |
| F4 | FAQPage schema（seo-copy-freeze §4：工具 10 + 内容 45 + Hub 2 + 首页）| 我的采样 23 路由 FAQPage_ld 全 0；10 SEO 全量 0 FAQPage | ❌ P1 |
| F5 | Organization schema（首页 + /about，logo 原创 N2）| 我的采样 Organization_ld 全 0 | ❌ P1 |
| F6 | Breadcrumb schema（工具/内容页）| 我的采样 Breadcrumb_ld 全 0 | ❌ P1 |
| F7 | ItemList schema（/tier-list /items）| 我的采样 ItemList_ld 全 0 | ❌ P1 |
| F8 | 冻结 TDK/DA 逐字使用（05C 冻结「下游不得自行变更」）| lib/routes.ts answer 为冻结 DA 改写（例 /class-quiz 冻结 "Answer 5 questions about how you play..." vs 实现 "Answer five questions about how you play..."）；首页 Title 渲染 88 字符（冻结 54，模板后缀重复追加）| ❌ P1 |
| F9 | 数据页非空壳（owner-release mandatory #3；PRD §3 数据页状态合同）| /items /loot-finder SSR 无物品行（我的采样 td_rows=0）；/map SSR 无 POI 文本；数据仅客户端 fetch | ❌ P1 |
| F10 | 首页 canonical 与 sitemap 统一 | 首页 canonical=https://mistfallhunter.co（无尾斜杠）vs sitemap home loc=带斜杠 | ❌ P2 |

## 4. 已确认的在途修复（无需新建）

10 SEO recheck（t_90060c82）已按 Skill 常见坑「模板型 door page」识别根因并拆卡，修复覆盖 F1–F10 全部：

| 修复卡 | assignee | 状态 | 覆盖 |
|---|---|---|---|
| t_99a2bcf6 逐页唯一正文（45 内容 2000–3000 词 + 10 工具 500–800 词 + 首页模板）| content | RUNNING | F1/F2/F3 |
| t_a249fbb3 schema/冻结 TDK/DA/canonical/数据页 SSR（依赖 t_99a2bcf6）| qianduan | TODO | F4–F10 |

PM 复核结论：这两张卡的验收标准与 PRD V1 §5/§7.2 及 owner-release mandatory acceptance 一致，无需追加 PM 级修复项。

## 5. 风险清单

| 级别 | 风险 | 影响 | 处置 |
|---|---|---|---|
| P0 | 内容页 ~520 词模板克隆（唯一性 11–21%）| 上线即 doorway 拒收/整站降权 | t_99a2bcf6 修复中；修复后 10 复验 + 09 QA 独立复验 |
| P0 | 4 复杂工具页 <500 词 | 违反 owner-release 硬验收 | 同上 |
| P1 | schema 全缺（FAQPage/Organization/Breadcrumb/ItemList）| GEO/AEO 不达标 | t_a249fbb3 修复中 |
| P1 | 冻结文案改写 + 首页 Title 88 字符 | 05C 冻结违约 | 同上 |
| P1 | 数据页 SSR 空壳 | AI/无 JS 爬虫看到薄页 | 同上 |
| P1 | 素材台账（reuse-ledger.md 骨架，8 PNG 未登记）| 违反「先登记后使用」；带缺上线升级 P0 | t_f0ed10f6（design）在途；04R 复核 |
| P2 | 首页 canonical 尾斜杠不一致 | 轻微 | t_a249fbb3 一并修复 |
| P2 | Email Routing / GA4 激活 / 生产部署授权 | 发布硬前置 | 07C + owner 放行（project-control blocked-log）|

## 6. 下游交接（给主控 / 09 QA / 11 launch）

- **主控**：本卡 verdict=[NEEDS_REPAIR]。请勿将 09 QA（t_b291a21d）置为 ready；待 t_99a2bcf6 → t_a249fbb3 完成后，先由 10 SEO 复验（t_90060c82 验收门槛），再重新派发 02P PM 复验，之后才允许 09 QA 启动。
- **09 QA（t_b291a21d）**：必须读取本报告 + outputs/10-seo-recheck/seo-recheck-report.md + 07R2 证据；复验重点 = 正文词数（内容≥2000/工具≥500）、两两 Jaccard<0.40、FAQPage≥53、Organization≥1、Breadcrumb、ItemList、冻结 TDK/DA 逐字、/items /loot-finder /map SSR 非空、canonical 统一。
- **11 launch**：维持锁定（部署/DNS/Cloudflare/Git push/GSC/Bing/IndexNow/分析激活/公开发布均需 owner 单独放行）。
- **不能假设**：不能假设当前 build 满足 PRD V1 内容合同；不能假设修复卡已完成（t_99a2bcf6 RUNNING、t_a249fbb3 TODO）；不能假设 GA4 已激活或 contact@mistfallhunter.co 可收信（Email Routing 未接线）。

## 7. 验收清单

- [x] 58 路由与 PRD V1 Route Contract 一致（10 SEO + 合规 + 我的采样三源一致）
- [x] 10 工具路由存在、H1 匹配、移动端导航/旗舰工具经独立 QA PASS
- [x] 合规面（法律页/非官方声明/无登录付费/无禁用表达）通过
- [ ] 内容页正文 2000–3000 词、工具页 500–800 词（F1/F2 — 修复中）
- [ ] 内容唯一性 ≥60%（F3 — 修复中）
- [ ] FAQPage/Organization/Breadcrumb/ItemList schema（F4–F7 — 修复中）
- [ ] 冻结 TDK/DA 逐字（F8 — 修复中）
- [ ] 数据页 SSR 非空壳（F9 — 修复中）
- [ ] canonical 统一（F10 — 修复中）
- [ ] 素材台账补齐（P1 — t_f0ed10f6 在途）

**状态行：[NEEDS_REPAIR] — 产品骨架与合规面通过；PRD V1 §5 内容合同（词数/唯一性/schema/冻结文案/SSR 数据）未达标，修复卡 t_99a2bcf6 + t_a249fbb3 在途；修复+复验前不放行 09 QA/11 launch。**
