# 合规与基础法律页面交接摘要 — mistfall-hunter（04 compliance baseline）

## 当前结论
- 状态：**[DONE]**（04 基线交付；上线前存在 P0/P1 修复项，实现后需 04R 复验）
- 一句话结论：基于已确认 PRD V1（02C 已放行）输出完整合规基线——数据清单、第三方映射、P0/P1/P2 风险、法律页 route contract（新增 /cookie-policy + /disclaimer 待 owner 02D 确认）、禁用表达、IP/来源政策与 takedown 预案、可追溯 PRD addendum A1-A10。

## 关键输入
- 项目：mistfall-hunter（board: site-mistfall-hunter）
- 生产域名：**mistfallhunter.co**（Dynadot 已注册，owner 2026-08-08 确认；注意 PRD §1 仍写 .gg 为陈旧口径，见 Addendum A1）
- 当前阶段：04-compliance
- 上游资料：PRD V1（02C 确认）、02A rev2 brief、owner-decision-02A-rev-20260808.md、requirements-trace.md、process-contract.md、project-control.md

## 本阶段交付物
- `outputs/04-compliance/mistfall-hunter-compliance-baseline-20260808.md` — 主报告（数据清单/第三方映射/风险分级/route contract/禁用表达/IP 政策+takedown）
- `outputs/04-compliance/legal-pages-baseline-drafts.md` — Privacy/Terms/Cookie/Refund/Disclaimer/About/Contact 基线草稿（英文）
- `outputs/04-compliance/prd-addendum-compliance-20260808.md` — 可追溯 PRD addendum（A1-A10，owner 决策项 A1/A2/A4/A5）
- `inputs/04-compliance/reuse-ledger.md` — 复用台账骨架（先登记后使用，06/08/05 填充）
- `outputs/04-compliance/handoff-04-compliance.md` — 本交接摘要

## 验收清单 / Quality Gate 自检
- 通过项：法律页与实际数据一致（无登录/无支付/无上传/无 AI，全部匿名 + localStorage）；第三方全披露（GA4、CF Web Analytics、CF 托管）；IP 风险有台账+takedown 预案；route contract 覆盖 canonical 与别名；联系方式使用域名邮箱（接线前置）；非律师意见声明；不承诺未实现能力。
- 未通过项/待办：cookie consent banner（07 前端，P1-1）；Email Routing 接线（07C，P1-2）；新增 2 法律页需 owner 02D 决策（A2）；支付/Newsletter/AI 上线前 04R（P1-3/P1-4/P2-1）。

## 风险
- P0：非官方声明缺失；官方 logo 使用；未登记复用；法律页 404；个人邮箱/占位邮箱（均已在基线给出处置，上线前验证）
- P1：Cookie consent；Email Routing；Newsletter 上线前 Privacy 更新；支付上线前 Refund；logo 相似度复核；爬取礼貌策略
- P2：AI Q&A 合规增补；多语言法律页；社区投稿条款；Google Fonts self-host；GA4 保留期确认

## 下游交接 / Downstream Handoff（给下游的最小必要信息）
- 下一阶段：05S SEO 基线 → 05 文案（05C owner 确认）→ 06 设计 → 07/08 实现 → 04R 合规复验 → QA。
- 必须读取：本交接 + baseline 主报告 + legal-pages-baseline-drafts.md + prd-addendum-compliance-20260808.md + reuse-ledger.md。
- 不能假设：
  - 不能假设域名是 .gg（实际 mistfallhunter.co）；
  - 不能假设 /cookie-policy /disclaimer 已获 owner 批准（需 02D）；
  - 不能假设支付/Newsletter/AI 已启用（均未启用，V1 匿名免费）；
  - 不能假设联系邮箱已接线（07C 前置）。
- 建议启动 Prompt（下游 05 文案）：
  `加载 student-site-compliance-pipeline 交接（outputs/04-compliance/handoff-04-compliance.md），按 legal-pages-baseline-drafts.md 定稿 Privacy/Terms/Cookie/Disclaimer/About/Contact 文案，不得弱化 P0/P1 披露；同时读取 prd-addendum-compliance-20260808.md 的 A1-A10 约束。`

## 状态行
**[DONE]** — 04 compliance baseline 交付完成；owner 决策项 A1/A2/A4/A5 待 02D；实现后由 04R 复验。
