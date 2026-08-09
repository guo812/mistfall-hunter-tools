# 关键要求追踪清单 / Requirements Traceability Matrix — mistfall-hunter

来源：用户启动指令 + 找词 PRD Brief V2（owner 与找词专家沟通确认版）

| # | 要求来源 | 要求内容 | 验收标准 | 责任阶段 | 当前状态 |
|---|---------|---------|---------|---------|---------|
| 1 | Brief V2 §8/§10 | 首版 58 个可索引路由（10 工具 + 48 内容） | sitemap.xml >= 58 indexable URLs，app/ 路由矩阵匹配 | 02 PRD → 06 设计 → 07 前端 | [ ] |
| 2 | Brief V2 §8 T2-T5 | 4 个独特工具：Squad Builder / Class Quiz / Matchup Matrix / Settings Recommender | 每个工具独立 route、首屏可操作、移动端 360/390/430 通过 | 02 → 06 → 07 | [ ] |
| 3 | Brief V2 §12 | 游戏背景蒙版动图 Hero，沉浸感 | 设计包含 Hero 动效定义；前端实现循环动效不干扰 CTA | 06 设计 → 07 前端 | [ ] |
| 4 | Brief V2 §12 | 深色主题 + 金色点缀，卡片布局，Mega Menu | 设计系统色板/组件覆盖；前端主题一致 | 06 → 07 | [ ] |
| 5 | Brief V2 §8/§13 | 48 内容页每页独立 H1/FAQ Schema/内链 5-15/Last Verified | 文案 + 前端逐页覆盖，SEO 复核 | 02 → 05 文案 → 07 → 10 SEO | [ ] |
| 6 | Brief V2 §7 NOT-DO → **rev2 修订（owner 2026-08-08 决策）** | 非官方声明保留；「不爬数据」「不抄竞品」「不用官方素材」由 owner 明确放行：允许扒游戏数据、复用竞品/官方图片/数据/文案方向/主题（台账制）；logo 禁官方本体，做类官方风格原创 logo。详见 outputs/02A-prd-brief/02A-prd-brief-rev2-bilingual.md §4 N1-N12 与 inputs/02-owner-confirmations/owner-decision-02A-rev-20260808.md | 合规复核 + 页面 footer/about 声明 + 复用台账 + takedown 预案 | 04 合规 → 05 文案 | [ ] |
| 7 | Brief V2 §11 | Next.js + Cloudflare Workers (OpenNext) + D1 + R2，不用 Pages | 部署证据为 Workers；无 Pages 依赖 | 07/08 → 部署 | [ ] |
| 8 | Brief V2 §14 | 事件埋点：tool_used/quiz_completed/squad_built 等 | GA4 事件配置证据 | 07 → 10 | [ ] |
| 9 | 02C owner 确认（2026-08-08）+ 04 A1 + 05S SEO-A1（PRD Addendum R1） | 生产域名 = **mistfallhunter.co**（已注册，Dynadot，owner 确认）；canonical 终值 `https://mistfallhunter.co<path>` | RDAP 核验 mistfallhunter.co 注册完成；07 前端 canonical/sitemap/robots 使用 .co | 00 setup → 02D → 07C 接线 | [ ] |
| 10 | 02C owner 确认（2026-08-08）+ PRD Addendum R1 | mistfallhunter.gg 是否补注册做 301 备用，由 owner 决定（可选，不阻塞 V1 上线） | owner 决策；若执行，301 指向 .co | 00 setup | [ ] |
