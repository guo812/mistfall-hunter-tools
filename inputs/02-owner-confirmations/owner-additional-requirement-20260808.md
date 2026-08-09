# Owner Additional Requirement — 2026-08-08（mistfall-hunter）

- **Date / 日期**: 2026-08-08
- **Owner / 确认人**: 站主（Telegram 群「做站流水线」mistfall-hunter topic）
- **Recorded by / 记录**: 小郭龙虾壹号（主控 default）
- **Status / 状态**: ✅ RECORDED — 已下发相关执行线

## 原始要求 / Original message

> 「补充要求:增加进入steem游戏的链接按钮。
> 不做付费，做全免费，主要要流量。」

## 决策分解 / Breakdown

1. **Steam 入口按钮 / Steam CTA**
   - 站点增加进入 Steam 游戏页的链接按钮。
   - 官方 Steam 页（已核验 2026-08-08）：https://store.steampowered.com/app/3282300/Mistfall_Hunter/
   - 开发商：Bellring Games；游戏为 Free-to-Play；App ID 3282300。
   - 落点：首页 Hero + 工具页/相关内容页 CTA 按钮「Play on Steam / 在 Steam 上游玩」；设计（06）与前端（07）阶段实现，QA 验收含链接可用性。
   - 外链属性：Steam 为官方域名，SEO 阶段给 rel 属性建议（跟随/不跟随由 seo 评估）。

2. **不做付费 / 全免费 / 流量导向**
   - 取消 PRD V1 §5 中「Pro/模板变现评估」方向：站点全部功能免费、无付费墙、无订阅/终身版/咨询型收费。
   - 变现策略改为**流量导向**：以获取流量、收录、自然增长为首要目标；后续流量变现（广告/联盟等）为上线后评估项，不在本期做任何付费功能。
   - 影响：03 pricing 校准改为「全免费 + 流量导向 + 成本最小化」口径，不再产付费套餐方案；05S SEO 以流量/收录为核心 KPI；04 合规的 Terms 不含付费条款。

## 影响范围 / Impact

- 🔄 03 pricing calibration（dingjia）：改为全免费方案（无付费墙），只做成本与流量变现展望
- 🔄 05S SEO strategy baseline（seo）：流量/收录导向，Steam 外链纳入规划
- 🔄 04 compliance baseline（hegui）：Terms 无付费条款；外链 Steam 官方无合规问题
- 📝 PRD V1：按变更流程记入 02D change control / PRD addendum（Steam CTA + 全免费口径）
- 📝 设计（06）：Hero + 工具页 Steam CTA 按钮入设计稿
