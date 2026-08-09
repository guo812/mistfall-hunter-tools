# 定价与商业模型校准报告 — Mistfall Hunter 工具+攻略站
# Pricing & Business Model Calibration Report — Mistfall Hunter Tools & Guide Site

> **阶段 Stage**: 03 pricing calibration（t_fb0309ae）
> **日期 Date**: 2026-08-08
> **执行人 Executor**: dingjia（profile=dingjia）
> **上游 Upstream**: PRD V1（outputs/02-prd-v1/prd-v1-master-spec-bilingual.md，02C 已确认）；Research Brief V2（FROZEN）；02A rev2 brief（已确认）；requirements-trace.md；process-contract.md
> **状态 Status**: [DONE] — 输出可追溯 PRD addendum 建议，不重写 PRD
> **语言 Language**: 中英双语。英文 Title/CTA 供文案下游直接使用；中文解释商业判断与闸门。

---

## 1. 结论先行 / Executive Summary

**一句话结论 / One-liner**
EN: "V1 stays 100% free with no paywall (PRD N12), because every direct competitor is a free fan site; monetization is deferred to a supporter/Pro path that requires auth, Stripe, owner gate and 02D change control — never fake 'Upgrade' CTAs in V1."
CN: V1 保持 100% 免费、无登录、无付费墙（PRD N12）——因为全部直接竞品都是免费粉丝站；变现延迟到「支持者/Pro」路径，必须等登录、Stripe、owner 闸门与 02D 变更控制齐备，V1 不做虚假「升级」CTA。

**核心判断 / Core judgments**
1. **竞品锚点 = 全部免费**：MistfallDB（A）、Mistfall Hunters Wiki（B）、Mistfall Hunters（C）均为免费粉丝站，2026-08-08 实测无付费墙/Pro 层；本站如果上线即做付费墙会失去信任与 SEO 冷启动机会。
2. **游戏价格是唯一真实付费锚点**：Mistfall Hunter 本体 Steam $24.99（首发 10% off $22.49）/ Deluxe $39.98（$35.98）/ Deluxe 升级 $14.99（$13.49），内购仅外观 Fate Coin、承诺 zero P2W。玩家「愿意为游戏相关价值付几十美元」是 Pro 定价的参照系。
3. **V1 边际成本 ≈ $0**：静态优先 + ISR + 客户端 localStorage，工具 V1 全部本地计算；Cloudflare Workers/D1/R2 免费额度足够覆盖冷启动。唯一真实成本风险是 D1 查询滥用（爬虫），用缓存 + rate limit 控制。
4. **变现路径分级**：V1 不做任何付费 UI；P1 可选「支持者/捐赠」入口（Buy Me a Coffee 风格，不锁内容）；Pro/模板变现（订阅/终身）必须等 V1.5 独家工具上线 + 用户信号（复访、build_shared、newsletter）+ 登录/Stripe/entitlement 齐备后走 02D 与 owner 闸门。
5. **不写「无限」**：所有套餐档位额度明确；V1 工具本身匿名无限次，但页面文案用「Free to use / 免费使用」而非「Unlimited / 无限」。

**风险 / Risks**
- P1：若早期强上付费墙（违背 N12），会同时打击 SEO 冷启动、粉丝站信任和竞品对比优势。
- P1：Pro 依赖登录与支付，未实现前出现「Upgrade」按钮 = CTA 与真实路径不一致（质量门槛 FAIL）。
- P2：广告变现（AdSense/Raptive 等）会伤 UX 与信任，且需 04 合规评估；本报告列为不推荐首选。

---

## 2. 上游输入 / Upstream Inputs

| 输入 | 路径 | 用途 |
|---|---|---|
| PRD V1（02C 已确认） | outputs/02-prd-v1/prd-v1-master-spec-bilingual.md | 58 路由、工具状态、N12、Event/Data Contract |
| Research Brief V2（FROZEN） | inputs/01-research/mistfall-hunter-prd-brief-v2.md | 竞品拆解 A-F、ICP、工具清单 |
| 02A rev2 brief（已确认） | outputs/02A-prd-brief/02A-prd-brief-rev2-bilingual.md | 变现评估口径、ICP 付费意愿 |
| 02C owner 确认件 | inputs/02-owner-confirmations/owner-confirmation-02C-20260808.md | 放行 03/04/05S |
| 关键要求追踪 | inputs/00-launch-card/requirements-trace.md | #2 工具、#6 复用、#7 技术栈 |
| 过程合同 | inputs/00-launch-card/process-contract.md | 凭证/闸门/证据规则 |
| 竞品定价实测（本阶段取证） | mistfalldb.com / mistfallhunters.wiki / mistfallhunters.com / Steam App 3282300 | 竞品免费确认 + 游戏价格锚点 |

**关键假设 / Key assumptions**
- 域名已确认：mistfallhunter.co（owner 2026-08-08 注册，Dynadot）；.gg 未注册不再做主域。
- V1 工具全部匿名可用、localStorage 本地状态（PRD §3/§6.2）；无账号 → 无用户级配额，只有站点级滥用防护。
- Newsletter（P1）收集邮箱前必须 04 合规覆盖 Privacy（PRD §6.2）。

**缺失信息 / Missing info（均不阻塞 V1 定价基线）**
- 真实 DAU/使用次数：上线后由 12 data review 采集，V1 阶段用保守假设。
- 支付/登录后台：本项目未配置支付（PRD N12 不启用）；.env.site 存在 Stripe 凭据变量但**本阶段不激活、不输出值**（[REDACTED]）。
- 广告网络资质：未评估，且本报告不推荐首选广告变现。

---

## 3. 竞品锚点 / Competitor Anchors

### 3.1 直接竞品（免费粉丝站，2026-08-08 实测）

| # | 站点 | 类型 | 付费墙/Pro | 变现信号 | 证据 |
|---|---|---|---|---|---|
| A | MistfallDB (mistfalldb.com) | Database + Tools | 无 | 未发现付费/订阅/广告墙；纯免费 | 首页/About 实测（fan-made, not affiliated） |
| B | Mistfall Hunters Wiki (mistfallhunters.wiki) | Content Wiki | 无 | 未发现付费/订阅；纯免费 | 首页实测（Unofficial fan resource） |
| C | Mistfall Hunters (mistfallhunters.com) | Trust + AI | 无 | 未发现付费；信息页开放 | 首页/FAQ 实测 |
| D/E/F | mistfallhunter.wiki / .cc / IGN·Game8·Fextralife | Wiki / 媒体 | 无 | 免费公开；大媒体靠站内广告 | Research Brief V2 §3.5 |

**结论**：直接竞品全部免费。付费墙不是该品类基线，反而是差异化劣势。本站 V1 免费 = 与竞品一致且守住信任与 SEO 冷启动窗口。

### 3.2 游戏本体价格锚点（玩家付费参照系，2026-08-08 Steam 实测）

| 商品 | 原价 | 首发价（10% off，至 Aug 12） |
|---|---|---|
| Mistfall Hunter（标准版） | $24.99 | $22.49 |
| Mistfall Hunter - Deluxe Edition | $39.98 | $35.98 |
| Deluxe 升级包（含 2500 Fate Coin 外观币） | $14.99 | $13.49 |

**结论**：目标用户已为「游戏相关价值」接受 $22-40 档消费；游戏内货币 Fate Coin 为外观向（zero P2W 承诺）。因此本站若未来做 Pro/终身，单次 $29-49 终身价、$4.99-9.99/月订阅均在玩家心理接受区间，且有游戏本体价格作为可比锚点——但**必须先有真实增值内容与登录支付能力，V1 不做**。

### 3.3 替代方案（现状手动成本）

- 玩家现状：看 YouTube 攻略（被动）、翻官方 Discord/Steam 讨论（碎片化）、试错 Build（时间成本高）。
- 本站免费工具替代的是「试错成本 + 信息碎片化」，这也是 02A rev2 定位「决策引擎」的付费意愿基础（ICP-2 中 / ICP-3 中高）。

---

## 4. 成本模型 / Cost Model

### 4.1 V1 固定成本（每月）

| 项 | 成本 | 说明 |
|---|---|---|
| Cloudflare Workers（OpenNext） | $0（免费档 100k req/天） | 静态优先 + ISR，工具页静态 JSON 兜底 |
| Cloudflare D1 | $0（免费档 5GB / 5M 行读 / 100k 行写每天） | tier-list / loot-finder / items 查询 |
| Cloudflare R2 | $0（免费档 10GB 存储） | 图片素材 |
| GA4 + Cloudflare Web Analytics | $0 | 事件埋点 |
| 域名 mistfallhunter.co | ~$10-15/年（Dynadot 已购） | 固定年费 |
| 人工/更新 | 运营阶段定义 | 补丁后 24h 更新 SOP |

**V1 月度固定成本 ≈ $0（不含人工）**。超出免费档才需付费：Workers Paid $5/mo（10M 请求）等——上线后由 12 data review 监控，预计冷启动期远低于门槛。

### 4.2 单位成本 / Marginal Cost

- 单次工具使用（class quiz / checklist / settings recommender / squad builder 等）：**客户端本地计算，$0/次**。
- tier-list / loot-finder / items 查询：D1 读取；免费档 5M 行读/天，单次查询 1-5 行 → **单位成本 ≈ $0**；滥用时按 100k req/天 免费档封顶。
- 分享 URL（build_shared / squad_built）：静态编码 URL，无服务端写入 → $0。
- Newsletter（P1）：邮件服务按量计费（如 1k 封约 $1 档），待 04 合规 + 真实订阅量再定。
- **结论：免费额度能体验价值且不亏穿——V1 全体用户免费使用不产生可感知成本。**

### 4.3 滥用与超限防护 / Abuse & Quota Controls

| 风险 | 控制 | 责任阶段 |
|---|---|---|
| D1 查询爬虫（loot-finder / items） | Workers rate limit（按 IP）+ 静态 JSON 兜底 + 缓存 | 08 后端 |
| 工具本身（本地计算） | 无服务端消耗，无需配额；localStorage 无跨用户攻击面 | 08 后端 |
| 事件埋点刷量 | GA4 不承载业务逻辑，仅分析；不加参数 PII | 07 前端 |
| 邮件订阅滥用（P1） | 04 合规 + 订阅确认（double opt-in）+ 退订 | 04 + 08 |

**不设用户级配额**：PRD N12 匿名无登录，V1 工具不设次数/并发墙；「无配额」≠「无限承诺」，页面文案统一写「Free to use」。

---

## 5. 套餐设计 / Package Design（评估方案，V1 不实施付费）

> 本表是**评估与交接设计**，不是 V1 上线内容。V1 仅实施「Free」栏，且所有付费入口一律不出现（N12）。

| 档位 | 目标用户 | 价值主张 | 额度/功能 | 价格（建议） | 实施条件 | 状态 |
|---|---|---|---|---|---|---|
| **Free（V1）** | 全部 | 免费决策引擎：职业测试/阵容构建/掉落查询/设置推荐 | 10 工具全部可用；localStorage 保存；无登录；无广告（首发） | **$0** | 已含在 PRD V1 | ✅ 上线即交付 |
| **Supporter（P1 可选）** | 高粘性用户 | 支持站务 + 徽章 + 提前看到新增工具预告 | 不锁任何内容；徽章 + 更新预告；无新功能墙 | 一次性 $3-9 或 $1-3/月（Buy Me a Coffee 风格） | 04 合规 + owner 确认 + 接入捐赠链接 | ⏸ 待评估 |
| **Pro（V1.5 后，需 02D）** | ICP-2 进阶 / ICP-3 固定队 | 高级 Build 模板、多设备同步保存、导出、无广告、优先数据更新 | 见 §5.1 额度表 | $4.99-9.99/月 或 $29-49 终身 | 登录 + Stripe + entitlement + 02D 变更 + owner 闸门 | ⏸ 待评估 |
| **Lifetime（Pro 变体）** | 忠实玩家 | 一次买断 Pro 权益 | 同 Pro，限「当前已发布功能」 | $29-49 一次性 | 同上 + 明确边界（不含未来未发布功能） | ⏸ 待评估 |
| 咨询/申请型 | 不适用 | 本产品是工具+内容站，非咨询/代练（PRD N10 不做代练/电商） | — | — | — | 不适用 |

### 5.1 Pro 额度与限制（未来评估草案，明确写额度、不写无限）

| 维度 | Free（V1） | Pro（未来评估） |
|---|---|---|
| 工具访问 | 全部 10 工具 | 全部 + 高级 Build 模板库 |
| 保存 | localStorage 本地 | 云端同步（上限如 50 个保存 Build，明确写数字） |
| 导出 | 复制文本 | JSON/CSV 导出（Build 分享用） |
| 广告 | 首发无广告 | 无广告（若未来引入广告位则 Pro 去广告） |
| 数据更新 | 同站数据 | 优先标注 + 补丁后抢先更新（小时级） |
| 支持 | 公共 FAQ/Contact | 优先邮件支持（48h 响应 SLA，明确不承诺 24h） |
| 历史记录 | localStorage | 云端 90 天历史（明确保留期） |

### 5.2 为什么 V1 不做 Pro（依据）

1. PRD N12 硬闸门：首版不做登录/注册/付费墙。
2. 竞品全部免费：无价格锚点需要追赶，付费墙反而伤害冷启动与信任。
3. 无账号体系：Pro 权益（同步/导出）必须先做登录，属后端大改，不应在 V1 范围。
4. 无用户信号：V1 无真实 DAU/复访/付费意愿数据，Pro 定价是拍脑袋；先免费跑出信号再定。

---

## 6. 转化口径 / Conversion & CTA

### 6.1 V1 转化漏斗（无付费）

`SEO 落地 → 工具使用（quiz/squad/tier）→ 有价值结果 → 分享/书签 → 回访 →（P1）Newsletter 订阅`

- V1 唯一「转化」= 工具使用 + 回访 + 分享 URL（build_shared / squad_built），为 V1.5 与 Pro 评估积累信号。
- P1 可选：Footer/About「Support this fan site」链接（Buy Me a Coffee 风格），**不锁内容**，纯支持性质；上线前需 04 合规 + owner 确认。

### 6.2 定价区文案口径（未来 Pro 页，V1 不出现）

- 先讲价值与适用人群，再讲价格：如「For squads that run Trio every night — Pro syncs your builds across devices and flags the meta the day a patch drops.」
- CTA 与真实路径一致：Pro 未实现 → 只能放 Waitlist/「Coming soon」，**禁止「Upgrade」「Buy」按钮**（质量门槛）。
- 不得出现：unlimited / 无限 / 永久免费承诺过度 / 高客单误导。

### 6.3 V1 站内不得出现的 CTA（QA 验证点）

- ❌ Upgrade to Pro / Buy / Subscribe（无支付路径）
- ❌ 任何要求登录/注册才能用工具的入口（N12）
- ✅ 允许：Free to use / Get the Class Quiz / Build your squad / Share your build / Support this fan site（若 owner 放行）

---

## 7. 后端 entitlement 字段建议（未来 Pro 实施时） / Backend Entitlement Fields

> 当前 V1 无账号无支付，**不实施**。此表供 08 后端在 02D 放行后参考；字段为草案，实施前由 08 + 合规确认。

| 字段 | 类型 | 说明 |
|---|---|---|
| user_id | string (UUID) | 登录后生成（V1 无） |
| plan | enum('free','supporter','pro','lifetime') | 当前档位 |
| plan_status | enum('none','active','canceled','expired') | 订阅状态 |
| entitlement_version | int | 权益清单版本，便于套餐调整不迁移数据 |
| features | jsonb | 功能位：{cloud_sync, export, no_ads, priority_data, templates} |
| plan_expires_at | datetime|null | lifetime=null；订阅=到期日 |
| stripe_customer_id | string | 支付网关客户（值存 Secrets，不落日志） |
| stripe_subscription_id | string | 订阅（lifetime 为 invoice） |
| updated_at | datetime | 变更时间 |
| abuse_flags | jsonb | 滥用标记（rate limit 联动） |

**设计要点**：features 位独立于 plan，避免未来套餐改名迁移；所有支付/订阅字段指向 [REDACTED] 凭据，不进 Git、不进聊天、不进报告。

---

## 8. PRD Addendum 建议（可追溯，不重写 PRD） / Traceable PRD Addendum Recommendation

> 按 02D change control 交付给 prd profile（t_63869527）。每条引用 PRD V1 原文位置，改什么、不改什么、谁验收。

### ADD-03-1：商业化口径（建议新增 PRD §2.4 补丁项）
- **引用**：PRD V1 §2.4「商业化 Monetization：首版免费、无登录、无付费墙；Pro/模板变现 03 定价评估」；N12。
- **建议**：明确「V1 上线零付费 UI；Supporter/Pro/Lifetime 为未来评估项，任何付费功能上线必须满足：真实增值内容 + 登录 + Stripe + entitlement + 04 合规 + owner 闸门 + 02D 变更控制」。
- **不改**：N12 原文；58 路由；工具匿名可用。
- **验收**：文案/前端不出现付费 CTA（QA 09 验证）。

### ADD-03-2：定价页路由（建议新增，P1 后）
- **引用**：PRD §5.12（58 路由 index 清单，无 /pricing）。
- **建议**：V1 不加 /pricing 路由（避免 59 路由破坏 sitemap 硬验收）；Pro 评估通过后新增 /pricing 走 02D + 05 文案 + 07 前端。
- **不改**：V1 58 路由集合。

### ADD-03-3：工具配额口径（建议新增 PRD §3 状态合同补丁）
- **引用**：PRD §3 通用状态机「超限 Quota」。
- **建议**：V1 所有工具「超限=无（匿名无限次）」仅适用于工具本身；站点级 API（loot-finder/items）允许 rate limit（滥用防护），文案不写「无限」，统一「Free to use」。
- **验收**：08 后端 rate limit 不阻断匿名正常使用（fail-open）。

### ADD-03-4：事件信号用于变现评估（建议新增 PRD §6.3 注释）
- **引用**：PRD §6.3 Event Contract（tool_used / build_shared / squad_built / newsletter_signup）。
- **建议**：标注这些事件同时是 Pro/变现评估信号（复访、分享率、订阅率），由 12 data review 阶段输出评估；事件参数红线不变。
- **不改**：事件名与参数。

### ADD-03-5：支持入口（建议新增，P1 可选）
- **引用**：PRD §5.11 Contact/About；N3 不暗示官方。
- **建议**：若 owner 放行「Support this fan site」捐赠链接（Buy Me a Coffee 风格），放在 Footer/About；需 04 合规确认（不暗示官方/不收集不必要数据）；P1 之前不实施。
- **验收**：04 合规 + owner 确认。

### 优先级排序
P0（上线必须）：ADD-03-1、ADD-03-3。
P1（上线后 2-4 周）：ADD-03-4、ADD-03-5。
P2（Pro 评估通过后）：ADD-03-2 及 §5/§7 完整套餐与 entitlement 落地。

---

## 9. 交付物 / Deliverables

- outputs/03-pricing/03-pricing-report-bilingual.md — 本报告（定价报告 + 成本假设表 + 套餐矩阵 + CTA 口径 + entitlement 字段）
- outputs/03-pricing/prd-addendum-recommendation.md — 可追溯 PRD addendum 建议（ADD-03-1..5，交 02D）
- outputs/03-pricing/handoff-03-pricing.md — 下游交接摘要

---

## 10. 验收清单自检 / Acceptance Checklist

- [x] 价格有竞品锚点和成本依据：§3（全部竞品免费）+ §4（成本≈$0）+ Steam 价格锚点
- [x] 免费额度能体验价值但不亏穿：§4.2 单位成本≈$0，免费额度上限明确（CF/D1/R2 免费档）
- [x] 没有「无限」或承诺过度：§5.1 各额度写数字；文案口径「Free to use」；Lifetime 明确边界
- [x] CTA 与真实开通路径一致：§6.3 V1 禁止付费 CTA；Pro 只放 Waitlist；Support 需 owner 放行
- [x] 竞品定价表：§3.1
- [x] 单位成本：§4.2
- [x] Pro 额度上限：§5.1
- [x] 下游可消费：§7 entitlement 字段 + §8 PRD addendum 建议 + handoff-03-pricing.md

---

## 10. 风险 / Risks

- **P0**：无（V1 不实施付费，无支付/退款/税务暴露面；不激活 Stripe）。
- **P1**：
  - 若未来 Pro 落地，支付/退款/税务/Stripe Tax 必须交 04 合规 + 08 后端（本报告已列字段草案）。
  - 若 V1 被误加付费 CTA，违反 N12 与质量门槛 → QA/文案/前端共同把关。
  - D1 滥用（爬虫）若未做 rate limit，免费档行读可能被打满 → 08 后端按 §4.3 落实。
- **P2**：
  - 广告变现未评估（不推荐首选）；若未来引入广告位，需 04 合规 + UX 权衡 + 隐私政策更新。
  - Newsletter 邮件成本随订阅量上升，需 04 + 12 数据复盘再定。

---

## 11. 下游交接 / Downstream Handoff

- 给文案（05）：定价区不出现付费 CTA；V1 免费口径「Free to use」；若 owner 放行支持入口（ADD-03-5），Footer/About 文案先 04 合规确认。
- 给后端（08）：V1 不实施支付/entitlement；rate limit（站点级 API）+ fail-open 按 ADD-03-3 落实；entitlement 字段草案（§7）在 02D 放行后参考。
- 给 QA（09）：验证 V1 无 Upgrade/Buy/Subscribe/登录墙（§6.3）；工具匿名无限次、站点 API 限流 fail-open。
- 给 02D（prd）：按 prd-addendum-recommendation.md 评估 ADD-03-1..5，P0 建议立即采纳。
- 给 04 合规（hegui）：若未来 Pro/捐赠落地，覆盖 Privacy/Terms/退款/Stripe Tax 边界（§7/§10）。
- 给 12 data review（fupan）：事件信号（tool_used/build_shared/squad_built/newsletter_signup）作为变现评估输入（ADD-03-4）。

---

## 12. 状态 / Status

**[DONE]** — 竞品锚点、成本模型、套餐矩阵、转化口径、entitlement 字段、PRD addendum 建议（ADD-03-1..5）齐备；V1 免费基线与 N12 一致；无付费 UI 在 V1 上线。
