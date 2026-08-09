# 阶段交接摘要 — 05S SEO Strategy Baseline（mistfall-hunter）

## 当前结论
- 状态：[DONE]
- 一句话结论：58 路由 SEO/GEO/AEO 基线完成——主词映射、canonical 终值、schema 分配、indexability 约束与 8 条 PRD addendum 建议已交付；SERP 实测确认 Duo/Squad/Checklist/Codes 等 19 页空位窗口。

## 输入来源
- 上游阶段：02 PRD V1（t_51143531，owner 02C 已确认 t_3b007694）
- 关键材料：prd-v1-master-spec-bilingual.md（§5 逐页 Title/Meta/H1）；mistfall-hunter-prd-brief-v2.md（§3 竞品/§13 SEO/§10 Route Contract）；owner-decision-02A-rev-20260808.md；owner-confirmation-02C-20260808.md；project-control.md
- 待确认项：
  - SEO-A2：V1.5 Coming Soon 四路由 index 策略（noindex 推荐）→ 需主控/owner 决策
  - SEO-A1：canonical 终值替换 → 07 实现前必须落地
  - 域名：mistfallhunter.co（已确认）；.gg 是否补注册做 301（可选，不阻塞）

## 本阶段交付物
- 文件/链接：
  - `outputs/05S-seo-baseline/05S-seo-baseline.md`（主文档：基线 + 约束 + addendum）
  - `outputs/05S-seo-baseline/keyword-route-map.md`（58 路由 × 主词 × 次词 × SERP 竞争 × 可进入性）
  - 本文件 `outputs/05S-seo-baseline/handoff-05S-seo.md`
- 核心判断：
  1. 可进入性最高集群（🟢 19 页）：duo/squad-builder/matchups/checklist/codes×3/bosses×3/maps×2 等——冷启动优先资源；
  2. 新竞品 metamist.io 已上线（builds/tier list/class guides UGC），Brief V2 未记录，需竞品监控；
  3. V1.5 Coming Soon 若保持 index 会污染初始抓取（placeholder 薄页），必须决策 noindex；
  4. loot/items 词被 mistfalldb 数据护城河压制，v1 走"高频子集小而准"追平策略。
- 证据：2026-08-08 实测 SERP（品牌词官方占 Top8；tier list 被 Gamespot/Gamerant/Mobalytics 等覆盖；duo/matchup 无专门英文页；metamist.io 在线）。

## 风险分级
- P0：V1.5 Coming Soon 页 index 污染初始抓取 → SEO-A2 决策（推荐 noindex）
- P0：canonical 占位未解析即上线 → SEO-A1 07 前落地
- P1：大媒体 + metamist 竞速 tier list/build/settings；Cloudflare Managed robots 可能默认 Disallow AI 爬虫（GEO 目标）
- P2：品牌词被官方长期占据 → 长尾集群 + 工具分享获客

## 给下一阶段的最小必要信息
- 下一阶段：05 文案（t_832b553a）、06 设计（t_3b745775）、07 前端（t_a4cb8776）、08 后端（t_716d78ab）；并行 03 定价 / 04 合规
- 必须读取：
  - 05 文案：`keyword-route-map.md`（逐页主词 → Direct Answer 与正文角度）+ `05S-seo-baseline.md` §3（GEO 结构要求）
  - 07 前端：`05S-seo-baseline.md` §4（canonical/schema/indexability 硬约束）+ §5 SEO-A1/A2（决策后落地）
  - 06 设计：§4.4 OG 模板（SEO-A6）；logo 原创（N2）
  - 04 合规：Trust 页 index ✅ + takedown/复用台账口径
- 不能改动：
  - 58 路由 indexability 边界（仅 /api/*、/404 noindex）——除非 SEO-A2 决策修改 V1.5 四页
  - PRD §5 逐页唯一 Title/Meta/H1（Trust 页由 04 定稿除外）
  - 事件参数红线：不含图片内容/文件名/PII
- 建议启动 Prompt：见 seo-launch-workflow SKILL.md「一键启动 Prompt」，项目 = mistfall-hunter，上游 = outputs/05S-seo-baseline/ + outputs/02-prd-v1/。
