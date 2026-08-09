# Handoff — 03 Pricing Calibration（t_fb0309ae）/ Downstream Handoff

- 项目 Project: mistfall-hunter（board: site-mistfall-hunter）
- 阶段 Stage: 03 pricing calibration
- 执行人 Executor: dingjia（profile=dingjia）
- 日期 Date: 2026-08-08
- 状态 Status: [DONE]

## 当前结论

- 一句话：V1 保持 100% 免费、无登录、无付费墙（PRD N12）——全部直接竞品均为免费粉丝站（2026-08-08 实测），游戏本体 Steam $24.99 是唯一真实付费锚点；V1 边际成本≈$0（客户端本地计算 + CF/D1/R2 免费档）；Supporter/Pro/Lifetime 为未来评估项，须登录+Stripe+entitlement+owner 闸门+02D 变更控制后落地。
- 交付物：outputs/03-pricing/03-pricing-report-bilingual.md（主报告）+ outputs/03-pricing/prd-addendum-recommendation.md（可追溯 PRD addendum 建议 ADD-03-1..5）+ 本 handoff。
- 无 BLOCKED：本阶段不激活支付、不改 PRD、不新增路由、不实施付费 UI，符合 N12 与 owner 02C 放行范围。

## 关键输入

- 项目：mistfall-hunter（决策引擎混合站；US/English；非官方粉丝站；域名 mistfallhunter.co 已注册）
- 当前阶段：03-pricing
- 上游资料：
  - outputs/02-prd-v1/prd-v1-master-spec-bilingual.md（PRD V1，02C 已确认）
  - inputs/01-research/mistfall-hunter-prd-brief-v2.md（FROZEN，竞品 A-F）
  - outputs/02A-prd-brief/02A-prd-brief-rev2-bilingual.md（已确认，含付费意愿）
  - inputs/02-owner-confirmations/owner-confirmation-02C-20260808.md
  - inputs/00-launch-card/requirements-trace.md、process-contract.md
  - 竞品实测（2026-08-08）：mistfalldb.com / mistfallhunters.wiki / mistfallhunters.com / Steam App 3282300

## 本阶段交付物

- outputs/03-pricing/03-pricing-report-bilingual.md — 定价主报告（竞品锚点/成本模型/套餐矩阵/转化口径/entitlement 字段）
- outputs/03-pricing/prd-addendum-recommendation.md — PRD addendum 建议（ADD-03-1..5，02D 可直接消费）
- outputs/03-pricing/handoff-03-pricing.md — 本交接文件
- 核心判断：
  1. 竞品全部免费 → V1 免费是信任/SEO 冷启动的基线，不是让步；
  2. 游戏本体 $24.99 / Deluxe $39.98 是 Pro/终身定价参照系（$4.99-9.99/月、$29-49 终身建议区间）；
  3. V1 单位成本≈$0；D1 滥用用 rate limit + fail-open 控制，不设用户级配额；
  4. V1 零付费 UI；Pro 未实现前禁止 Upgrade/Buy CTA（质量门槛）；
  5. entitlement 字段草案（plan/features/stripe 等）供 08 后端未来参考，V1 不实施。

## 质量门槛自检

- 通过项：竞品定价表（§3.1/§3.2）；单位成本（§4.2）；Pro 额度上限（§5.1）；无「无限/unlimited」；CTA 与真实路径一致（§6.3）；下游可消费合同（§7/§8）；无编造价格（全部带来源与日期）。
- 未通过项：无。

## 风险

- P0：无（V1 不实施付费，无支付/退款/税务暴露面）。
- P1：未来 Pro 落地时支付/税务/退款交 04 合规 + 08 后端；D1 爬虫滥用需 rate limit；付费 CTA 误放需 QA/文案/前端共同把关。
- P2：广告变现不推荐首选；Newsletter 成本随订阅量上升，需 04 + 12 数据复盘再定。

## 给下游的最小必要信息

- 下一阶段（并行）：04 compliance（t_1431c198，hegui）、05S SEO baseline（t_f27ead1f，seo）、02D addendum（t_63869527，prd，BLOCKED 待 owner）。
- 必须读取：
  1. outputs/03-pricing/03-pricing-report-bilingual.md
  2. outputs/03-pricing/prd-addendum-recommendation.md
  3. PRD V1 §2.4/§3/§4.5 N12/§5.12/§6.3（addendum 引用位置）
- 不能假设：不能假设 V1 有付费功能（N12 硬约束）；不能假设 Stripe 已启用（.env.site 存在变量但本阶段不激活，[REDACTED]）；不能假设广告变现已评估（未推荐）；不能假设 /pricing 路由存在（V1 无）。
- 启动 Prompt：
  - 04 compliance：按 student-site-compliance-pipeline 执行，重点覆盖若未来 Pro/捐赠落地时的 Privacy/Terms/退款/Stripe Tax 边界（本报告 §7/§10）。
  - 05S SEO：pricing 页不在 V1 路由，无 SEO 动作；若 owner 采纳 ADD-03-5 支持入口，确认 footer 链接 nofollow 处理。
  - 02D（prd）：按 prd-addendum-recommendation.md 的 ADD-03-1..5 评估采纳；P0 建议立即采纳作为文案/后端/QA 口径。

## 交接契约（下游不能擅自改动）

- V1 零付费 UI：任何 Upgrade/Buy/Subscribe/登录墙入口在 V1 禁止（N12 + 本报告 §6.3）。
- 工具匿名无限次仅限工具本身；站点级 API 可 rate limit 但必须 fail-open（ADD-03-3）。
- 路由集合保持 58 条；不新增 /pricing（ADD-03-2 P2 前）。
- 事件参数红线不变；事件同时是变现评估信号（ADD-03-4）。
- 若 owner 放行捐赠链接，先 04 合规确认（ADD-03-5）。
