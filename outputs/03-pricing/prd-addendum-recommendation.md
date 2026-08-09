# PRD Addendum 建议 — 03 Pricing（mistfall-hunter）
# PRD Addendum Recommendation — 03 Pricing (mistfall-hunter)

> **用途 Purpose**: 供 02D change control（t_63869527，prd profile）与 owner 决策使用。这是**可追溯的 addendum 建议**，不是 PRD 重写；每条建议引用 PRD V1 原文位置，给出「改什么 / 不改什么 / 谁验收」。
> **来源 Source**: outputs/03-pricing/03-pricing-report-bilingual.md（dingjia，2026-08-08）
> **状态 Status**: [DONE] 本建议已完成；是否采纳与何时采纳由 owner + 02D 决定。

---

## 背景 / Background

- PRD V1 已确认（02C，2026-08-08）：58 路由、10 工具（V1 六 + V1.5 四）、匿名可用、无登录/无付费墙（N12）。
- 03 定价结论：V1 100% 免费；全部直接竞品免费；游戏本体 $24.99 是唯一真实付费锚点；V1 边际成本≈$0；付费功能需登录+Stripe+entitlement+owner 闸门。
- 本文件把 03 结论转成 5 条 PRD addendum 建议，按 P0/P1/P2 排序。

---

## ADD-03-1（P0）商业化口径补丁 / Monetization Stance

- **引用 PRD**：§2.4（商业化 Monetization）；§4.5 N12。
- **改什么**：在 PRD §2.4 商业化行补充一句明确口径：
  > "V1 上线零付费 UI（无 Upgrade/Buy/Subscribe/登录墙）。Supporter / Pro / Lifetime 为未来评估项；任何付费功能上线必须同时满足：真实增值内容 + 登录体系 + Stripe 支付 + entitlement 字段 + 04 合规评估 + owner 确认 + 02D 变更控制。"
- **不改什么**：N12 原文；58 路由集合；工具匿名可用状态机。
- **谁验收**：QA（09）验证上线站无付费 CTA；05 文案冻结稿不出现付费话术；07 前端无支付/登录拦截。

## ADD-03-2（P2）定价页路由 / Pricing Route

- **引用 PRD**：§5.12（58 indexable 路由清单，无 /pricing）；requirements-trace #1（sitemap ≥ 58）。
- **改什么**：V1 不加 /pricing 路由（避免破坏 58 路由硬验收与薄内容防线）；在 PRD §5.12 备注 "若 Pro 评估通过，经 02D 新增 /pricing（index 或 noindex 由 05S/10 SEO 评估）"。
- **不改什么**：V1 58 路由集合。
- **谁验收**：02D + 07 前端 + 10 SEO recheck（若采纳）。

## ADD-03-3（P0）工具配额口径补丁 / Quota Wording

- **引用 PRD**：§3 通用状态机（「超限 Quota」状态）；P0-T3/P0-T5/P0-T6 等「超限：无（匿名无限次）」。
- **改什么**：在 §3 状态机补一句：
  > "「超限=无」仅适用于工具本身（客户端本地计算）；站点级只读 API（/loot-finder、/items 数据查询）允许服务端 rate limit 作为滥用防护，但不得阻断匿名正常使用（fail-open）。页面/文案统一写 Free to use，不写 Unlimited/无限。"
- **不改什么**：工具匿名无限次的现状；fail-open 要求（PRD §7.3）。
- **谁验收**：08 后端（rate limit 实现 + fail-open）；QA（09）断网/限流模拟。

## ADD-03-4（P1）事件信号用于变现评估 / Event Signals for Monetization

- **引用 PRD**：§6.3 Event Contract（tool_used / quiz_completed / squad_built / build_shared / newsletter_signup）。
- **改什么**：在 §6.3 表尾加注释：
  > "上述事件同时作为未来变现/Pro 评估信号（复访率、分享率、订阅率、工具完成率），由 12 data review 输出评估；事件参数红线（不含图片内容/文件名/PII）不变。"
- **不改什么**：事件名、触发、参数。
- **谁验收**：12 data review（fupan）读取；07 前端埋点不变。

## ADD-03-5（P1 可选）支持入口 / Support Entry

- **引用 PRD**：§5.11（/about /contact）；N3（不暗示官方背书）。
- **改什么**：若 owner 放行，允许在 Footer/About/Contact 放「Support this fan site」（Buy Me a Coffee 风格捐赠链接），纯支持、不锁内容；需 04 合规确认文案与数据收集边界后实施。
- **不改什么**：不暗示官方身份；不要求登录；不收集不必要数据。
- **谁验收**：04 合规 + owner 确认 + 05 文案 + 07 前端。

---

## 采纳建议 / Adoption Recommendation

| 优先级 | 建议 | 建议时机 |
|---|---|---|
| P0 | ADD-03-1 商业化口径 | 02D 立即采纳（文案/前端/QA 需要口径） |
| P0 | ADD-03-3 配额口径 | 02D 立即采纳（后端 rate limit 设计需要） |
| P1 | ADD-03-4 事件信号 | V1.5 前采纳（数据收集口径） |
| P1 | ADD-03-5 支持入口 | owner 决定后采纳 |
| P2 | ADD-03-2 定价页 | Pro 评估通过后再采纳 |

## 拒绝采纳的后果 / If Not Adopted

- 无 ADD-03-1/03-3：文案/前端/QA 无统一口径，存在误放付费 CTA、或后端误加用户级配额墙的风险（违反 N12）。
- 无 ADD-03-2：不阻塞 V1；仅影响未来 Pro 落地流程。
- 无 ADD-03-4/03-5：不阻塞 V1；影响变现评估数据与支持入口。
