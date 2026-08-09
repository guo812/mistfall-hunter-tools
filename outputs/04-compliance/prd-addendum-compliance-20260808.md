# PRD Addendum 建议 — mistfall-hunter（04 compliance baseline）

- 日期: 2026-08-08
- 执行: hegui（04 compliance）
- 目的: 只输出**可追溯的 addendum 建议**，不改写 PRD V1。每条给出：来源依据 / 建议 / 影响范围 / 需要 owner 或下游决策的点。
- 状态: 建议清单；A1-A4 需要 owner 决策（02D addendum 闸门），其余为下游执行约束。

---

## A1. 生产域名口径更新（需要 owner 确认）

- **来源依据**: project-control.md（事实源）：「域名：mistfallhunter.co（已注册，Dynadot，owner 2026-08-08 确认）」；PRD V1 §1/§5.1/§6.1 仍写 `mistfallhunter.gg（首选，未注册，domain_pending）`，与事实源矛盾。
- **建议**: PRD V1 域名字段更新为：`生产域名 mistfallhunter.co（已注册，Dynadot，owner 2026-08-08 确认）；mistfallhunter.gg 是否补注册做 301 由 owner 决策（可选）`；canonical 占位 `待最终域名确认` → `https://mistfallhunter.co`。
- **影响范围**: §1 基本信息、§5.1 canonical、§6.1 Route Contract、requirements-trace #9/#10、07 前端 canonical/sitemap/robots。
- **决策点**: owner 确认 mistfallhunter.co 为最终生产域名；.gg 是否 301（不影响 v1 上线）。

## A2. 信任页路由增加 /cookie-policy 与 /disclaimer（需要 owner 决策）

- **来源依据**: 本合规基线 §4（P0-4 法律页完整性、P0-5 联系方式）；PRD §5.11 原定 4 个信任页（about/privacy/terms/contact）。
- **建议**: 新增 2 个 indexable 法律页：`/cookie-policy`（+ /cookies 308 别名）、`/disclaimer`；信任页 4 → 6；路由总数 58 → 60（sitemap ≥ 60）。
- **影响范围**: §5.11 信任页表、§6.1 路由计数（58 → 60）、§2.3 成功标准 #1（sitemap ≥ 58 → ≥ 60）、06 设计信任页模板、07 前端路由、footer 链接集。
- **决策点**: owner 在 02D 确认「新增 Cookie Policy + Disclaimer 两个法律页」。若否决，折衷：Cookie/Disclaimer 内容并入 Privacy/Terms（仍满足披露，但 route 更少、可读性略差）。

## A3. Contact/法律页联系邮箱固定为域名邮箱（执行约束，不需要 owner 决策）

- **来源依据**: 本基线 P1-2 + 合规 skill「域名与联系方式守卫」。
- **建议**: /contact、/about、/privacy、/terms、/disclaimer、/cookie-policy 及 footer 统一使用 `contact@mistfallhunter.co`；Email Routing 接线列为撤 noindex/公开发布硬前置；禁止 Gmail/个人邮箱/占位符。
- **影响范围**: 05 文案、07 前端、07C 域名接线、QA。

## A4. Refund 策略依赖 03 定价决策（条件性 addendum）

- **来源依据**: PRD §4.4 N12（首版无付费）+ 本基线 P1-4。
- **建议**: v1 在 Terms §8 内置「Refunds and Payments（当前无付费服务）」段落，不单独建页；若 03 定价确认 Pro/模板/credits 变现，则在支付上线前创建 `/refund-policy` 页 + Privacy/Terms 增补支付服务商披露 + 失败任务不扣费条款，并过 04R 闸门。
- **影响范围**: 03 定价 → 04R recheck → 07/08 支付实现 → QA。

## A5. Cookie Consent 纳入前端实现范围（执行约束）

- **来源依据**: 本基线 P1-1（GA4 需披露+控制；Cloudflare Web Analytics cookieless）。
- **建议**: 07 前端实现 cookie consent banner：默认阻止 GA4，Accept 后加载，Reject 不加载，可修改偏好；偏好存 cookie/localStorage；不含 GA4 时工具功能不受影响。
- **影响范围**: §4.1 P0-9 埋点基线、07 前端、QA 验收（consent 默认/接受/拒绝三态）。

## A6. Newsletter（P1）上线前合规闸门

- **来源依据**: PRD §6.2 保留/删除行、§6.3 newsletter_signup 事件。
- **建议**: 收集邮箱前必须：① Privacy 更新披露邮件服务商/存储/保留/退订；② 事件参数不含 email（PRD 已红线，保持）；③ 04R 复验后放行。
- **影响范围**: P1 迭代、08 后端、Privacy 更新、04R。

## A7. AI Q&A（P2）上线前合规增补

- **来源依据**: PRD §4.4 P2（AI Q&A）。
- **建议**: AI 功能上线前补 AI Content Policy（provider、数据共享、不保证原创/准确/无侵权、用户提示词权利）并同步 Privacy/Terms；04 增补模板见合规 skill `references/ai-upload-payment-ip-addendum-pattern.md`。
- **影响范围**: P2 迭代、后端、04R。

## A8. 信任标签定义入 PRD（执行约束）

- **来源依据**: 本基线 §5（禁止「无证据的 Verified」）。
- **建议**: 在 PRD §5 通用组件或 §6.2 Data Contract 补信任标签定义（Verified / Community Report / Needs Update 的判定口径），防止文案/数据实现阶段滥用。
- **影响范围**: 05 文案、08 数据、QA。

## A9. 爬取礼貌策略与来源台账字段契约

- **来源依据**: PRD §6.2 爬取策略 + rev2 §11 R9。
- **建议**: PRD §6.2 明确：robots.txt 检查、rate limit、来源台账字段（来源 URL/采集日期/Last Verified/权属状态）由 08 后端落实，台账先于数据上线（04 已建骨架 `inputs/04-compliance/reuse-ledger.md`）。
- **影响范围**: 08 后端、04R、QA。

## A10. Logo 原创证据链

- **来源依据**: PRD §4.2 N2 + rev2 §11 R10。
- **建议**: 06 设计交付时附原创过程证据（草图/迭代/源文件）；04R 对最终 logo 做相似度复核并记录判定。
- **影响范围**: 06 设计、04R。

---

### 决策汇总（owner 需要回复的项）

| # | 决策 | 建议默认 |
|---|---|---|
| A1 | 生产域名确认为 mistfallhunter.co，canonical 使用该域名 | 确认 |
| A2 | 新增 /cookie-policy + /disclaimer 两个法律页（58→60 路由） | 确认（或并入 Privacy/Terms 折衷） |
| A4 | 03 定价若确认付费变现，支付上线前建 /refund-policy + 04R | 确认 |
| A5 | 前端实现 cookie consent banner（默认阻止 GA4） | 确认 |
