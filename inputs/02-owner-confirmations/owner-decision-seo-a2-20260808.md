# Owner Decision — SEO-A2（V1.5 四工具页 index 策略）｜mistfall-hunter｜2026-08-08

- **Date / 日期**: 2026-08-08
- **Owner / 确认人**: 站主（Telegram 群「做站流水线」mistfall-hunter topic）
- **Recorded by / 记录**: 小郭龙虾壹号（主控 default）
- **决策项 / Decision item**: SEO baseline addendum SEO-A2（V1.5 四个工具页 Coming Soon 与 indexability 冲突）

## Owner 原话 / Original message

> 「四个工具页要直接做成非薄页上线。要允许抓取。」

## 决策 / Decision

- ❌ 否决「noindex 至功能上线」
- ❌ 否决「Coming Soon 灰态占位」
- ✅ **V1 直接上线四个工具页，且为非薄页（substantive）内容**：
  - Squad Builder（/tools/squad-builder）
  - Matchup Matrix（/tools/matchups）
  - Build Planner（/tools/build-planner）
  - Interactive Map（/tools/map）
- ✅ 允许抓取：四页全部 index、进 sitemap（≥58 URLs 含四页）
- 页面内容要求：每页必须提供实质内容（功能可用性 + 结构化数据 + 指南正文 + FAQ + 内链），不得是 placeholder/pending 占位页；交互复杂度可分级实现（P0 核心可用，P1 增强），但页面内容必须非薄页
- 原 PRD「V1 首发 6 + V1.5 补 4」的分批口径作废 → 改为 **V1 全部 10 工具路由上线（4 个复杂工具按 P0 核心功能优先实现，页面内容非薄页）**；复杂交互增强仍可后续迭代

## 影响 / Impact

- 🔄 PRD V1 §5.2：工具分批口径修改（02D change control 必收）
- 🔄 SEO baseline addendum SEO-A2：状态 → owner 已决策（index + 非薄页 + 进 sitemap）
- 🔄 06 设计 / 07 前端：四页按可用工具设计实现（P0 核心），非 Coming Soon
- 🔄 05 文案：四页配实质正文/FAQ
- 🔄 10 SEO recheck：验收四页 index + 非薄页
