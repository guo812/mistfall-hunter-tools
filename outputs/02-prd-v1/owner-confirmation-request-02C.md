# Owner 确认请求 02C / Owner Confirmation Request — PRD V1

- 项目 Project: mistfall-hunter（board: site-mistfall-hunter）
- 阶段 Stage: 02C owner confirm PRD V1
- 日期 Date: 2026-08-08
- 请求人 Requested by: prd（profile=prd，task t_51143531）
- 确认对象 Object: `outputs/02-prd-v1/prd-v1-master-spec-bilingual.md`（PRD V1 主文档，唯一主真源）
- 上游依据 Upstream: `outputs/02A-prd-brief/02A-prd-brief-rev2-bilingual.md`（02B 已确认 rev2）+ `inputs/01-research/mistfall-hunter-prd-brief-v2.md`（FROZEN）+ `inputs/02-owner-confirmations/owner-decision-02A-rev-20260808.md`
- 关联卡 Related cards: 02C gate = t_3b007694；03/04/05S 依赖本确认

---

## 一、本次同意什么 / What this confirmation approves

1. **PRD V1 主文档为唯一主真源**：58 可索引路由、10 个 P0 工具（V1 六 + V1.5 四）、Route Contract / Data Contract / Event Contract、P0 验收标准与真实用户任务，全部以本文件为准（取代 02A rev2 brief 中未细化的部分，产品边界仍以 rev2 为准）。
2. **逐页 Title / Meta description 回填**：§5 每个 indexable route 已有唯一英文 Title（50–60 chars 目标）与 Meta description（150–160 chars 目标），作为 05S SEO 基线 / 05 文案 / 06 设计 / 07 前端的基础；Trust 页（/about /privacy /terms /contact）Title/meta 为约束草案，最终由 04 合规定稿。
3. **NOT-DO N1-N12 原样保留**：owner 在 02A-rev 已确认的放行口径（N5 扒数据、N6 素材复用台账制、N2 原创类官方风格 logo、N1 非官方声明等）写入 §4.5，作为产品红线；R8-R11 风险登记交 04 合规缓解 + takedown 预案。
4. **V1/V1.5 分批方案不变**：V1 首发 6 工具（Class Quiz / Settings / Tier List / Loot Finder / Items / Checklist）+ 48 内容页全部随 V1 上线；V1.5 上线后 2-4 周补 4 复杂工具（Squad Builder / Matchups / Build Planner / Map），其路由随 V1 以 Coming Soon 灰态存在。
5. **匿名 P0 与未来权益并存**：基础工具流程无登录、无付费墙、无配额墙（N12），状态仅存 localStorage；Pro/模板变现为 03 定价评估项，真实认证/支付另行 owner 闸门。
6. **域名仍为 domain_pending**：mistfallhunter.gg 未注册；Route Contract canonical 标「待最终域名确认」；本确认不触发注册、DNS、Cloudflare、GSC 或任何部署动作。

## 二、放行什么 / What this releases

- ✅ 仅放行：**03 Pricing / 04 Compliance / 05S SEO baseline 并行启动**（每个阶段只输出本阶段报告，不越界）。
- ❌ 不放行（各自仍有独立 owner 闸门）：
  - 05 文案冻结（05C gate，t_9120f304）
  - 06 设计真源（06C gate，t_c4839c48）
  - 07/08 前后端实现（需设计确认后）
  - 生产部署、DNS、域名注册、Cloudflare/GSC/Bing/IndexNow、公开发布（上线前确认）
  - 支付/登录/Newsletter 等真实商业能力（03 定价 + owner 闸门）

## 三、若需修改，回复格式 / Reply format

- **全部确认**：`确认 PRD V1，进入专业基线`
- **部分修改**：`修改：<章节>｜<改成什么>｜<原因>`
- **需要讨论**：`<章节> 不确定，展开讲讲`

## 四、确认后自动动作 / After confirmation

1. 主控把 02C 确认落成 canonical input（`inputs/02-owner-confirmations/owner-confirmation-02C-*.md`）；
2. `project-control.md` 从 `WAITING_02C_OWNER_CONFIRMATION` 更新到 03/04/05S 基线执行态；
3. 并行派发 t_fb0309ae（03 pricing）、t_1431c198（04 compliance）、t_f27ead1f（05S SEO baseline）；
4. 专业基线完成后，PRD 回收为 02D Addendum / Change Control（t_63869527）。

## 五、仍锁定项 / Still locked（无论本确认结果）

- 域名注册与 DNS（等 owner 授权，Spaceship 首年约 $51.20，未注册前存在被抢注风险 R3）
- 任何公开页面、付费、登录、外部投稿与生产部署
- 04 合规对 R8-R11 的缓解措施与 takedown 预案未出前，公开素材复用不能上线

---
**Status**: [NEEDS_OWNER_CONFIRM] — 等待 owner 对 02C 的明确回复。
