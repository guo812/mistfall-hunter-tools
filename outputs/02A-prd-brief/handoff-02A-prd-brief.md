# 产品定义与 PRD 交接摘要 — mistfall-hunter 02A（rev2）

## 当前结论
- 状态：[NEEDS_REVIEW]（02A-rev 修订完成，等待 owner 对 rev2 的 #2/#6 做最终确认 = 02B 硬闸门）
- 一句话结论：Mistfall Hunter 决策引擎混合站（工具 60% + 内容 30% + 信任体系 10%），首版 58 可索引路由（10 工具分 V1/V1.5 两批 + 48 内容页），非官方、免费、无登录、mobile-first；rev2 按 owner 决策放行"扒游戏数据 + 复用竞品/官方素材（台账制）+ 类官方风格原创 logo"，IP/版权/ToS/商标风险进风险登记交 04 合规。

## rev2 修订记录（t_28675e89，2026-08-08）
- owner 部分修改确认：#1/#3/#4/#5/#7/#8 原样确认；#2 定位与 #6 NOT-DO 修订（见 inputs/02-owner-confirmations/owner-decision-02A-rev-20260808.md）。
- 修订点 M1（定位）：对标复用型决策引擎——允许汲取/复用竞品与官方的图片、数据、文案方向和主题，必要时可直接用；肯定要有游戏数据。
- 修订点 M2（NOT-DO）：12 条重写为 N1-N12 可执行口径；扒数据放行（N5）、素材复用放行（N6，复用台账先登记后使用）、logo 禁官方本体但做类官方风格原创 logo（N2）；v1 #10"不做全量物品库"移出红线改为数据量策略。
- 修订点 M3（风险登记）：§11 新增 R8 IP/版权、R9 游戏 ToS/EULA、R10 商标/trade dress 相似、R11 竞品反应；均为 owner 明确决策接受的方向性风险，缓解措施与 takedown 预案为 04 合规阶段必交付项。
- 连带一致性修改：§0 摘要、§2.2 复用政策、§5.6 数据合同、§9 Must avoid、§12 交接摘要；其余章节（§1/§3/§5.0-5.5/§6/§7/§8/§10）保持 v1 原文。

## 关键输入
- 项目：mistfall-hunter（board: site-mistfall-hunter）
- 当前阶段：02-product（02A-rev PRD brief 修订）
- 上游资料：inputs/02-owner-confirmations/owner-decision-02A-rev-20260808.md（canonical owner 决策）；inputs/01-research/mistfall-hunter-prd-brief-v2.md（FROZEN 研究基线）；inputs/01-research/RESEARCH-FREEZE.md；inputs/00-launch-card/requirements-trace.md（#6 已按 rev2 更新）；inputs/00-launch-card/process-contract.md

## 本阶段交付物
- 文件/内容：
  - outputs/02A-prd-brief/02A-prd-brief-rev2-bilingual.md（rev2 双语 brief，12 章 + 确认清单，当前唯一确认依据）
  - outputs/02A-prd-brief/02A-prd-brief-bilingual.md（v1，历史版本，不再作为确认依据）
  - inputs/02-owner-confirmations/owner-decision-02A-rev-20260808.md（owner 决策记录）
- 核心判断：
  1. 定位"决策引擎"不变；对标策略由"仅内部对标"升级为"可复用对标"（owner 授权），复用逐条进台账（inputs/04-compliance/reuse-ledger.md，04 阶段建立）。
  2. 数据策略由"不爬取、纯人工"改为"允许扒取官方与竞品公开数据 + 来源台账 + 礼貌抓取"。
  3. logo：原创、类官方风格、禁官方本体；06 设计保留原创过程证据，04 评估相似度。
  4. 4 独家工具 + Duo 内容 + Patch Tracker 差异化不变；V1/V1.5 分批与 58 路由规模不变。
  5. 域名 domain_pending 不变；本阶段零注册/DNS/公开动作。
- 已确认项：owner 确认清单 #1/#3/#4/#5/#7/#8（2026-08-08）。
- 待确认项：#2 定位 rev2 口径、#6 NOT-DO N1-N12 口径（owner 回复"确认 rev2，进入 PRD V1"即放行）。

## 质量门槛自检
- 通过项：
  - [x] rev2 仅修订 owner 指认章节 + 最小一致性同步，其余章节原文保留（逐章 diff 自查）
  - [x] owner 三项指令全部落成可执行口径（N2/N5/N6 + 复用台账字段 + R8-R11 缓解归属）
  - [x] IP/版权/游戏 ToS/商标相似风险写入风险登记，owner 决策归属与 04 交付要求明确
  - [x] 中英双语；英文关键词/路由/标题保留给下游
  - [x] 确认清单状态精确：6 项已确认、2 项待终确，回复格式给出
- 未通过项：无。遗留 gap：复用台账实体文件由 04 阶段建立（本阶段只定义规范）；58 路由逐页 Title/Meta 仍待 PRD V1 回填。

## 风险
- P0：R1 品牌 DMCA/UDRP；R2 数据准确性；R3 域名未注册；**R8 IP/版权（复用官方/竞品素材）**；**R9 游戏 ToS/EULA（扒数据+复用素材）**；**R10 商标/trade dress（类官方 logo+含游戏名域名）**；**R11 竞品反应**。R8-R11 为 owner 明确决策接受，缓解与 takedown 预案交 04 合规。
- P1：数据护城河、内容量差距、SEO 冷启动、V1.5 旗舰工具延期。
- P2：大媒体下场、竞品跟进。

## 给下游的最小必要信息
- 下一阶段：02B owner confirm brief（t_769dc804，硬闸门，确认对象改为 rev2）→ 02 PRD V1（t_51143531）。
- 必须读取：outputs/02A-prd-brief/02A-prd-brief-rev2-bilingual.md；inputs/02-owner-confirmations/owner-decision-02A-rev-20260808.md；inputs/01-research/mistfall-hunter-prd-brief-v2.md。
- 不能假设：v1 口径仍有效（已被 rev2 取代）；域名已注册；复用素材权属已评估（04 合规 + 台账前置）；工具已实现；owner 已确认 #2/#6。
- 建议启动 Prompt（02B 确认后）：按 product-definition-prd §6 产出 PRD V1 主文档，含逐页 Title/Meta、Route/Data/Event Contract、复用台账合同、P0 验收任务与移动端 360/390/430 口径；未过 02C 不得启动 03/04/05S。
