# Reuse Ledger 复用台账 — mistfall-hunter

- 文件用途: 依据 owner rev2 决策（N5/N6）与 PRD §6.2 Data Contract，所有官方/竞品/社区来源的图片、数据、文案方向、主题在公开页使用前**必须先登记**（先登记后使用）。
- 建立: 04 compliance（hegui，2026-08-08）
- 填充: 06 设计（素材）由 task t_a4929b94 完成，2026-08-08
- 数据侧: 08 后端（数据）、05 文案（文案方向/主题）按需追加
- 04R 合规复验对账: outputs/04-compliance/mistfall-hunter-compliance-recheck-20260808.md §4.2
- 审计口径: 公开页出现未登记素材 = P0；台账与线上素材逐条可对账。

## 登记字段

| 字段 | 说明 |
|---|---|
| asset_id | 唯一编号，REUSE-001..008 |
| source_type | design-generated（Stitch 设计生成）/ original（本地创作） |
| source reference | 来源包/版本引用 |
| 登记日期 | YYYY-MM-DD |
| 复用位置 | 本站 route / 页面 / 组件 |
| 复用方式 | as-is（原样使用）|
| 权属状态 | owned（自有）/ no third-party official material |
| Last Verified | 核验日期 |
| 处置备注 | 用途、文件大小、是否可替换 |

## 台账条目 — 8 张公开页 PNG（06R3 设计包原创图）

| asset_id | source_type | source reference | 登记日期 | 复用位置 | 复用方式 | 权属状态 | Last Verified | 处置备注 |
|---|---|---|---|---|---|---|---|---|
| REUSE-001 | design-generated | 06R3 design package (Stitch project 9396881770990256405) | 2026-08-08 | `/` homepage hero background; OpenGraph `og:image` (app/layout.tsx); all 58 routes (OG fallback) | as-is | owned — no third-party official material | 2026-08-08 | Hero atmospheric visual (2.13 MB). Source: Stitch-generated dark fantasy original. No official game screenshot. Frontend may swap for authorized game screenshot per owner authorization. |
| REUSE-002 | design-generated | 06R3 design package (Stitch project 9396881770990256405) | 2026-08-08 | `/classes/mercenary`, `/builds/mercenary` | as-is | owned — no third-party official material | 2026-08-08 | Mercenary class page visual (1.96 MB). Design-generated original; not loaded in current frontend build — registered for future class content page enrichment. |
| REUSE-003 | design-generated | 06R3 design package (Stitch project 9396881770990256405) | 2026-08-08 | `/classes/sorcerer`, `/builds/sorcerer` | as-is | owned — no third-party official material | 2026-08-08 | Sorcerer class page visual (1.95 MB). See REUSE-002 note. |
| REUSE-004 | design-generated | 06R3 design package (Stitch project 9396881770990256405) | 2026-08-08 | `/classes/blackarrow`, `/builds/blackarrow` | as-is | owned — no third-party official material | 2026-08-08 | Blackarrow class page visual (1.70 MB). See REUSE-002 note. |
| REUSE-005 | design-generated | 06R3 design package (Stitch project 9396881770990256405) | 2026-08-08 | `/classes/shadowstrix`, `/builds/shadowstrix` | as-is | owned — no third-party official material | 2026-08-08 | Shadowstrix class page visual (1.72 MB). See REUSE-002 note. |
| REUSE-006 | design-generated | 06R3 design package (Stitch project 9396881770990256405) | 2026-08-08 | `/classes/seer`, `/builds/seer` | as-is | owned — no third-party official material | 2026-08-08 | Seer class page visual (2.10 MB). See REUSE-002 note. |
| REUSE-007 | design-generated | 06R3 design package (Stitch project 9396881770990256405) | 2026-08-08 | `/classes/withered-knight`, `/builds/withered-knight` | as-is | owned — no third-party official material | 2026-08-08 | Withered Knight class page visual (2.24 MB). See REUSE-002 note. |
| REUSE-008 | design-generated | 06R3 design package (Stitch project 9396881770990256405) | 2026-08-08 | `/squad-builder` tool page, `/guides/extraction` guide page | as-is | owned — no third-party official material | 2026-08-08 | Squad dungeon scene visual (2.36 MB). Design-generated original. Not loaded in current frontend build — registered for future tool/guide page enrichment. |

## 红线（不得登记后直接用）

1. 官方 logo 本体/微调版 — 禁用（N2），只能原创类官方风格 logo。
2. 竞品站名/logo 用作本站品牌/域名/主视觉 — 禁用（N4）。
3. 未评估权属的素材不得上线；unknown 来源需在 04R 前确认或替换。
4. 直接复用项优先官方来源；竞品来源项标注并保留投诉路径（R11）。
