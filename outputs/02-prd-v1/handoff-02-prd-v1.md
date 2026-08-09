# Handoff — 02 PRD V1（t_51143531）/ Downstream Handoff

- 项目 Project: mistfall-hunter（board: site-mistfall-hunter）
- 阶段 Stage: 02 PRD V1 master specification
- 执行人 Executor: prd（profile=prd）
- 日期 Date: 2026-08-08
- 状态 Status: [NEEDS_OWNER_CONFIRM] — 等待 02C（t_3b007694）；确认前 03/04/05S、文案、设计、实现、部署全部锁定

## 当前结论

- 一句话：PRD V1 主文档完成——58 可索引路由逐页回填唯一 Title/Meta/H1，10 个 P0 工具（V1 六 + V1.5 四）逐项给出输入/参数/处理/输出/空·加载·失败·超限状态合同与移动端验收，Route/Data/Event Contract 三表成型，P0 真实用户任务与验收标准可执行化。
- 02B 闸门：已过（parent t_769dc804 DONE，owner 确认 rev2；本卡 unblock 后执行）。
- 下一步动作：owner 确认 02C 后，由主控放行 03 pricing / 04 compliance / 05S SEO baseline 并行。

## 关键输入

- 项目：mistfall-hunter（决策引擎混合站：工具 60% + 内容 30% + 信任 10%；US/English；非官方粉丝站）
- 当前阶段：02-product
- 上游资料：
  - outputs/02A-prd-brief/02A-prd-brief-rev2-bilingual.md（02B 已确认的 rev2 brief）
  - inputs/01-research/mistfall-hunter-prd-brief-v2.md（FROZEN，1036 行，含竞品深拆与 58 路由草案）
  - inputs/02-owner-confirmations/owner-decision-02A-rev-20260808.md（owner 决策：#2 对标复用型决策引擎、#6 N1-N12、R8-R11 交 04）
  - inputs/00-launch-card/requirements-trace.md（10 项）、inputs/00-launch-card/process-contract.md

## 本阶段交付物

- outputs/02-prd-v1/prd-v1-master-spec-bilingual.md — PRD V1 主文档（504 行，唯一主真源）
- outputs/02-prd-v1/owner-confirmation-request-02C.md — 02C 双语确认请求
- outputs/02-prd-v1/validation-receipt-02-prd-v1.md — 验收回执（本文件）
- 核心判断：
  1. 58 indexable routes（Core 1 + Tools 10 + Classes 6 + Builds 6 + TierList 4 + Maps 2 + Bosses 3 + Guides 17 + Codes 3 + Duo/Solo 2 + Trust 4），sitemap ≥ 58 为硬验收；
  2. 工具 V1（6）：/class-quiz /settings /tier-list /loot-finder /items /checklist；V1.5（4）：/build-planner /squad-builder /matchups /map（Coming Soon 灰态随 V1 存在）；
  3. 4 个独家差异化：Squad Builder（旗舰）/ Class Quiz / Matchup Matrix / Settings Recommender；Duo 内容 Hub 独家；
  4. 全部工具匿名可用、无登录/付费/配额墙（N12），客户端状态只存 localStorage；
  5. 复用策略：扒数据（N5）+ 素材复用台账制（N6）+ 原创类官方风格 logo（N2）+ 非官方声明（N1）落为可执行合同；R8-R11 交 04 合规。
- 已确认项：02B rev2（#1-#8 全部，含 #2/#6 修订口径）
- 待确认项：02C 全部（owner 回复格式见 owner-confirmation-request-02C.md）

## 质量门槛自检

- 通过项：PRD 可开发（逐工具输入/输出/状态/验收）；每 indexable 页有真实价值与任务（58 页逐页）；NOT-DO 明确（N1-N12）；设计/文案/前后端交付边界明确（§7 下游合同）；metadata contract 无空白（58 路由唯一 Title/Meta，Trust 页标注 04 定稿）。
- 未通过项：无（本阶段）。

## 风险

- P0：R3 域名未注册（mistfallhunter.gg，Spaceship 首年约 $51.20，抢注风险）——不阻塞 PRD，阻塞部署/GSC/DNS，等 owner 授权。
- P1：R8-R11（IP/版权、游戏 ToS/EULA、商标/trade dress 相似、竞品反应）——owner 已明确决策接受方向，缓解措施与 takedown 预案为 04 合规必交付项；公开素材复用上线前必须台账 + 04 预案就绪。
- P2：游戏数据结构化与新鲜度（补丁后 24h 更新 SOP 由运营阶段定义）；工具实现复杂度（V1.5 四工具为 🔴 复杂交互，已按分批方案延后 2-4 周）。

## 给下游的最小必要信息

- 下一阶段：03 pricing（t_fb0309ae）、04 compliance（t_1431c198）、05S SEO baseline（t_f27ead1f）——三者 BLOCKED 依赖 02C（t_3b007694）。
- 必须读取：
  1. outputs/02-prd-v1/prd-v1-master-spec-bilingual.md（§5 页面合同 / §6.2 Data Contract / §6.3 Event Contract / §7 下游合同）
  2. outputs/02-prd-v1/owner-confirmation-request-02C.md
  3. outputs/02A-prd-brief/02A-prd-brief-rev2-bilingual.md（§2.2 复用政策 / §4 N1-N12 / §11 R8-R11）
  4. inputs/02-owner-confirmations/owner-decision-02A-rev-20260808.md
- 不能假设：不能假设域名已注册/canonical 已定（domain_pending）；不能假设支付/登录/会员已上线（N12 + 03 定价评估中）；不能假设素材权属已清理（台账制 + 04 缓解措施未出前不得公开使用）；不能假设 58 路由之外的页面可加（先走 GSC 信号 + owner）。
- 建议启动 Prompt：按各自 stage Skill 的一键启动 Prompt，输入本项目 PRD V1 + 02C 确认件。

## 交接契约（下游不能擅自改动）

- 路由矩阵与 indexability：仅 /api/* 与 /404 noindex；58 路由全部 index（§5.12）。
- 匿名 P0 不可被拦截：无登录/无付费墙/无配额墙；认证或权益服务故障时基础流程 fail-open（N12）。
- 事件参数红线：不含图片内容、文件名或 PII（§6.3）。
- 技术栈：Next.js + TS + Tailwind → Cloudflare Workers (OpenNext) + D1 + R2，不用 Pages（requirements-trace #7）。
- 移动端：工具首屏可操作、360/390/430 逐批验收（requirements-trace #2）。
- 视觉：深色 + 金、卡片式、蒙版动效 Hero、Mega Menu；logo 原创类官方风格（N2）。
