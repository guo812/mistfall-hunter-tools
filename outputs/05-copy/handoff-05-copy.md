# 阶段交接摘要 — 05 SEO-Copy Freeze（mistfall-hunter）
# Handoff — 05 SEO-Copy Freeze

## 当前结论
- 状态：**[DONE] — 文案冻结包已交付；等待 05C owner 确认（t_9120f304）；确认前不得进入设计/前端。**
- 一句话结论：基于 PRD V1（02C 确认）+ PRD Addendum V1.1（02D 确认，路由 58）+ 03 pricing + 04 compliance + 05S SEO 基线，冻结 58 路由 TDK/H1/H2/FAQ/schema、CTA 与 10 工具状态文案，并完成禁词扫描与质量自检。

## 关键输入
- 项目：mistfall-hunter（board: site-mistfall-hunter；workspace /root/.hermes/projects/shipsolo/mistfall-hunter；构建 topic thread 4537）
- 当前阶段：05-copy（SEO-Copy Freeze）
- 上游资料：
  - outputs/02-prd-v1/prd-v1-master-spec-bilingual.md（PRD V1 §5 逐页 TDK/H1 唯一真源）
  - outputs/02D-prd-addendum/prd-addendum-v1.1-change-control.md（R1 canonical=.co / R2 Steam CTA+全免费 / R3 10 工具全量非薄页 / R4 cookie consent；E1-E15）
  - inputs/02-owner-confirmations/owner-confirmation-02D-20260808.md（路由 58；A2 方案 B：Cookie/Disclaimer 并入 Privacy/Terms）
  - outputs/04-compliance/legal-pages-baseline-drafts.md（Trust 页事实披露，不得弱化）
  - outputs/05S-seo-baseline/05S-seo-baseline.md + keyword-route-map.md（GEO/AEO 结构、语义词、schema 分配）

## 本阶段交付物（outputs/05-copy/）
1. `seo-copy-freeze.md` — 主文档：58 路由 TDK/H1/DA 冻结 + H2 模板（[T]/[C]/[H]/首页）+ 全局文案规则 + 禁用表达 + 设计落位要求
2. `faq-schema-copy.md` — 54 页 FAQ 3-5 条/页（JSON-LD 可序列化）+ schema 分配说明（FAQPage/ItemList/Article/WebApplication/HowTo/WebSite/Organization/Breadcrumb）
3. `cta-status-copy.md` — 全站 CTA 表 + 10 工具 6 态状态文案（空/输入/处理/成功/失败/超限）+ 信任标签与 Last Verified 文案
4. `trust-pages-final-copy.md` — Trust 4 页定稿（/about /privacy /terms /contact；A2 方案 B：Cookie 并入 Privacy、Disclaimer 并入 Terms；Terms §Refunds and Payments；contact@mistfallhunter.co）
5. `copy-quality-audit.md` — 禁词扫描结果 + 质量门槛自检 + 风险

## 质量门槛自检
- 通过项：TDK/H1 58 路由唯一（PRD §5 + Trust 04 定稿）；DA 逐页唯一；H2 模板覆盖全部页面类型；FAQ 首句直答；CTA 动词+结果；无付费话术/Unlimited/竞品名/个人邮箱；四工具页非薄页 index（R3）；移动端约束写入。
- 未通过项：无。

## 风险
- P0：无（本阶段无部署/支付/DNS/公开动作）。
- P1：[DATA-PENDING: 08] 数据类 FAQ（掉落/数值/Boss 招式/费率）必须由 08 回填或按 Community Report 降级，否则有误导/薄页风险；Trust 页 04R 终检；contact@ 邮箱接线（07C）前不得公开发布。
- P2：竞品（metamist.io 等）监控由 10/12 承接；sitemap/GSC 提交待部署后。

## 给下游的最小必要信息
- 下一阶段：05C owner confirm copy（t_9120f304，assignee=default，硬闸门）→ 06 设计（t_3b745775）→ 07 前端（t_a4cb8776）/ 08 后端（t_716d78ab）。
- 必须读取：
  1. `outputs/05-copy/seo-copy-freeze.md`（主文档）
  2. `outputs/05-copy/faq-schema-copy.md`（FAQ/schema）
  3. `outputs/05-copy/cta-status-copy.md`（CTA/状态）
  4. `outputs/05-copy/trust-pages-final-copy.md`（Trust 4 页）
  5. `outputs/05-copy/copy-quality-audit.md`（禁词/质量证据）
  6. PRD V1 §5/§6/§7 + Addendum V1.1（约束基线）
  7. 05S keyword-route-map.md（语义词，防止双源漂移）
- 不能假设：
  - 不能假设文案已获 owner 确认（05C 未过，设计/前端禁止开工）；
  - 不能假设 /cookie-policy、/disclaimer 独立页存在（A2 方案 B：已并入 Privacy/Terms；Footer 链接集 = About | Privacy | Terms | Contact）；
  - 不能假设任何付费功能/Pro/Unlimited（全免费口径，N12/R2/E1）；
  - 不能假设有游戏数据（[DATA-PENDING: 08] 处必须回填后再上线）；
  - 不能假设域名是 .gg（canonical = https://mistfallhunter.co<path>，R1）。
- 建议启动 Prompt（06 设计）：
  `加载 site-design-student，读取 outputs/05-copy/seo-copy-freeze.md（§3 H2 模板 + §1.8 设计落位）+ PRD V1 §7.1 + Addendum（R2 Steam CTA 入稿、R3 四工具页可用工具设计、E7 logo 原创证据、E13 OG 模板）；深色 #0a0a0f~#1a1a2e + 金 #d4a574~#f0c040；移动端 360/390/430 首屏可操作；不得删减 SEO 冻结内容。`

## 交接契约（下游不能擅自改动）
- 58 路由 TDK/H1（Trust 4 页按 04 定稿，改动需 04R 复核）；
- FAQ/schema/CTA/状态文案按本包冻结；设计不可随意删 SEO 内容，前端不可现场重写；
- 全免费口径 + 禁付费话术 + 禁 Unlimited + 禁竞品名公开页 + 非官方声明（N1）+ contact@mistfallhunter.co；
- canonical = https://mistfallhunter.co<path>；noindex = /api/*、/404；
- 事件参数红线：不含图片内容/文件名/PII。

**状态行**
**[DONE] — 05 SEO-Copy Freeze 交付完成（5 文件 + 证据）。05C（t_9120f304）为 owner 确认硬闸门；确认前 06 设计 / 07 前端 / 08 后端保持锁定。**
