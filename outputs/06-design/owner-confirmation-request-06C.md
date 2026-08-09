# Owner Confirmation Request — 06C 设计确认（mistfall-hunter）

- **Stage / 阶段**: 06C owner confirm design
- **Date / 日期**: 2026-08-08
- **Requested by / 发起**: design（06 设计主管，profile=design）+ 主控小郭龙虾壹号
- **Gate / 闸门**: 硬闸门 — 只有你明确确认设计后，才放行 07 前端 / 08 后端实现

## 本次同意什么 / What this confirmation releases

1. **视觉风格**: Dark Tool-Forward Minimalist — 暗色空间灰（bg #0a0a0f）+ 暖琥珀金（#d4a574）点缀，Material Design 3 深色主题；工具面金色高亮与内容面视觉区分。
2. **设计真源**: Stitch Project `9396881770990256405` 生成的 5 个屏幕（首页 desktop+mobile、class-quiz 工具页、mercenary 内容页），4 套页面模板（Homepage / Tool / Content / Hub / Trust），58 路由 100% 覆盖（5 Stitch + 53 模板覆盖）。
3. **移动端要求**: 360/390/430 三视口首屏可操作、底部导航、44px 触摸目标、表格横向滚动，已作为 07 前端硬验收项。
4. **前端 handoff 修正清单**: 已知 8 项前端修正（PATHFINDER→Mistfall Hunter、移除 Sign In、版权 2026、非官方声明 Bellring/Skystone、Steam CTA、canonical=.co 等），由 07 前端执行。

## 核心确认文件（请至少看这几个）

- `owner-confirmation-request-06C.md` —— 本文件（同意范围）
- `visual-style-rationale.md` —— 3 种风格对比与选定理由
- `content-fit-matrix.md` —— 58 路由 → 模板映射（覆盖率证据）
- `stitch-receipt.md` —— Stitch 生成回执（5 screens + project ID）
- `stitch-export/homepage-mobile.png`、`tool-classquiz.png`、`content-mercenary.png` —— 关键页面截图
- `design-system.css` —— 完整 CSS tokens（前端直接引入）
- `handoff-06-design.md` —— 下游交接与已知修正项

## 同意时请回复（任选其一，直接复制）

- 全部确认：`确认设计，进入前端实现`
- 部分修改：`设计修改：<页面>｜<改成什么>｜<原因>`
- 需要讨论：`<页面/模块> 不确定，展开讲讲`

## 确认后系统会自动做什么

1. 放行 07 前端实现（t_a4cb8776）与 08 后端/数据契约（t_716d78ab）并行；
2. 前端将按 design-system.css + Stitch HTML 真源 + content-fit matrix 还原 58 路由；
3. 之后仍依次经过 10 SEO / 04R 合规 / 02P PM / 09 QA 复核，最后上线前还需你确认生产部署与公开发布。

## 无论本确认结果如何，以下仍锁定

- 生产域名接线（mistfallhunter.co 已注册，DNS/Cloudflare/GSC 待 07C 接线）
- 任何公开页面、付费、登录、外部投稿与生产部署
- 04 合规 R8-R11 缓解措施与 takedown 预案未出前，公开素材复用不能上线
