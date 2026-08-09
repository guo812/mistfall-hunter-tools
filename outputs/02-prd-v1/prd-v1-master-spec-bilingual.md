# PRD V1 Master Specification — Mistfall Hunter 决策引擎工具+攻略站
# PRD V1 Master Specification — Mistfall Hunter Decision-Engine Tool & Guide Site

> **阶段 Stage**: 02 PRD V1 master specification（产品说明书，非约束汇总）
> **日期 Date**: 2026-08-08
> **作者 Author**: prd（profile=prd），依据 product-definition-prd §6 完整主文档要求
> **上游 Upstream**: outputs/02A-prd-brief/02A-prd-brief-rev2-bilingual.md（已确认 rev2，02B 通过）；inputs/01-research/mistfall-hunter-prd-brief-v2.md（FROZEN）；inputs/02-owner-confirmations/owner-decision-02A-rev-20260808.md
> **状态 Status**: [NEEDS_OWNER_CONFIRM] — 等待 02C owner 确认；确认前 03/04/05S、文案、设计、实现、部署全部锁定
> **语言 Language**: 中英双语。英文 Title/Meta/H1/Route 保留给 SEO/copy/frontend 下游直接使用；中文解释业务含义、状态合同与验收点。
> **Supersedes / 取代**: 本文件是 58 路由、P0 工具与数据/事件合同的唯一主真源；02A rev2 brief 保留为产品边界来源，本文件细化并可执行化。

---

## 0. 结论先行 / Executive Summary

**一句话定位 / One-liner**
EN: "Mistfall Hunter's decision engine — tools that help you pick, build, squad up, and extract smarter."
CN: Mistfall Hunter 的决策引擎 —— 帮你选职业、配 Build、组阵容、更聪明地撤离。

**本 PRD V1 是设计/文案/前后端/QA 的产品说明书**，不是定价、合规、SEO 的汇总页。核心变化 vs rev2 brief：
1. 58 个可索引路由全部回填唯一 Title / Meta description（metadata contract 不留白）；
2. 6 个 V1 工具 + 4 个 V1.5 工具逐项给出 输入/输出/参数/边界/状态合同/移动端验收；
3. Route Contract / Data Contract / Event Contract 三张主表成型，可被 06/07/08 直接消费；
4. P0 真实用户任务与验收标准可执行化，QA 可按任务链复验；
5. 复用台账、Unofficial 声明、logo 原创义务等 owner 决策落为可执行合同与下游不能改项。

**首版范围 / Launch scope**
- 58 可索引路由（1 首页 + 10 工具 + 43 内容 + 4 信任/法务），sitemap ≥ 58 URLs 为硬验收；
- 10 工具分两批：V1 首发 6（Class Quiz / Settings / Tier List / Loot Finder / Items / Checklist）+ V1.5 上线后 2-4 周补 4（Squad Builder / Matchups / Build Planner / Map）；58 路由与 48 内容页全部 V1 存在（V1.5 四个工具页先以 Coming Soon 灰态卡/状态落地）；
- 全部匿名可用、无登录、无付费墙、localStorage 本地状态；Pro/模板变现为 03 定价阶段评估项；
- 域名 domain_pending（mistfallhunter.gg 首选，未注册）；本 PRD 不触发注册/DNS/部署动作。

---

## 1. 基本信息 / Project Info

| 字段 Field | 值 Value |
|---|---|
| 项目 Project | mistfall-hunter |
| 域名 Domain | mistfallhunter.gg（首选，未注册，domain_pending）；候选 mistfallhunter.co（可 301）/ mistfalltools.com |
| 目标市场 Market | US / English |
| 站点类型 Site type | 混合站 hybrid：决策引擎工具站 60% + 攻略内容站 30% + 信任体系 10%；非官方粉丝站 |
| 游戏 Game | Mistfall Hunter（PvPvE extraction ARPG，Bellring Games / Skystone Games，2026-07-29 上线，1M+ 玩家，PC/PS5/Xbox，6 职业 × 2 姿态，Solo/Duo/Trio，赛季 wipe） |
| 技术栈 Tech | Next.js 14 + TypeScript + Tailwind CSS → Cloudflare Workers (OpenNext，不用 Pages) + D1 + R2；GA4 + Cloudflare Web Analytics；静态优先 + 工具页 ISR；next-intl 预留（v1 仅英文） |
| 商业化 Monetization | 首版免费、无登录、无付费墙；Pro/模板变现 03 定价评估 |
| 上游输入 Upstream | 02A rev2 brief（已确认）+ Research Brief V2（FROZEN）+ requirements-trace.md（10 项） |
| 执行人 Agent | prd |

---

## 2. 已确认的产品决策 / Confirmed Product Decisions

### 2.1 定位与差异化 / Positioning & Differentiation
- 定位：**决策引擎**。竞品是"查数据（A）/读攻略（B）/验事实（C）"，我们是"做决策"；用户行为 搜→用工具→决策→回来复用。
- 对标复用策略（owner rev2 决策）：以 A 工具链、B 内容结构、C 信任标签为直接对标基准；**允许汲取/复用竞品与官方的图片、数据、文案方向和主题，必要时可直接用**——逐条进复用台账（inputs/04-compliance/reuse-ledger.md，先登记后使用）；IP/版权/ToS/商标风险交 04 合规评估缓解与 takedown 预案（R8-R11）。
- 独家差异化武器：Squad Comp Builder（阵容构建器）/ Class Quiz（职业测试）/ PvP Matchup Matrix（对局矩阵）/ Settings Recommender（设置推荐器）/ Duo 内容 Hub / Patch Meta Tracker（P1）。
- 竞品对比表仅供内部 benchmark，不上公开页面。

### 2.2 主 ICP 与关键场景 / Primary ICP & Scenarios
| ICP | 占比 | 核心痛点 | 关键场景 / 任务链 |
|---|---|---|---|
| ICP-1 新手 New Player（主） | ~50% | 不知道选什么职业、怎么撤离、从哪开始 | quiz_completed → 职业推荐 → Build 指南 → 撤离教学 |
| ICP-2 进阶 Mid-Core | ~25% | Build 试错成本高、PvP 输因不明、补丁后 Meta 变化 | Build Planner → 分享链接 → Matchup Matrix → 补丁后复查 |
| ICP-3 固定队 Trio/Duo Squad | ~15% | 三人选什么、最优阵容变化、Duo 无官方匹配 | Squad Builder → 角色覆盖评估 → Duo/Trio 攻略 |
| ICP-4 经济玩家 Economy | ~10% | 什么值钱、制造成本、市场波动 | Loot Finder → 获取途径 → 经济攻略 |

### 2.3 成功标准 / Success Criteria（V1）
1. 58 个 indexable URL 全部上线且可访问，sitemap.xml 覆盖 ≥ 58（requirements-trace #1）；
2. 4 个独家工具（Squad Builder / Class Quiz / Matchup Matrix / Settings Recommender）各自独立路由、首屏可操作、移动端 360/390/430 通过（#2）；
3. 每个内容页独立 H1/FAQ Schema/内链 5-15/Last Verified（#5）；
4. 事件埋点 tool_used/quiz_completed/squad_built 等在 GA4 可查（#8）；
5. 部署为 Cloudflare Workers（OpenNext），无 Pages 依赖（#7）。

### 2.4 假设与待确认项 / Assumptions & Open Items
- 域名未注册：Route Contract canonical 标 `待最终域名确认`；不阻塞 PRD，阻塞部署/GSC/DNS（owner 决策项）。
- 游戏数据未结构化：需 08 采集整理 + 台账登记（owner 已放行扒取）。
- 工具未实现：本 PRD 为规格，实现归 07/08。
- 游戏会持续更新：数据新鲜度 SOP 由运营阶段定义。
- 复用素材权属未评估：04 合规 + 台账前置，先登记后使用。

---

## 3. 核心用户任务与流程状态 / Core User Tasks & Flow States

> 通用工具页状态机（所有工具页共用）：`空状态 Empty → 输入中 Inputting → 处理中 Processing → 成功 Success → 失败 Failure / 超限 Quota`；移动端差异单独标注。所有工具 P0 匿名可用、无登录、无付费墙；工具草稿/结果只存 localStorage，不上传服务器。

### P0-T3 Class Quiz 职业测试（V1，🟢）
- **输入 Input**: 5 道选择题（游玩风格/武器偏好/单人 or 组队/难度偏好/外观偏好），全部必答。
- **参数 Params**: 题库 JSON（6 职业 × 每职业映射权重）；本地静态数据，无服务端调用。
- **处理 Processing**: 提交后本地加权计算 → 输出推荐职业 + 理由（2-3 条）+ 推荐 Build 链接。
- **输出 Output**: 结果卡：职业名/图标/适配评分/理由/CTA[查看 Build]；支持 URL 分享（?result=class）。
- **状态合同 States**:
  - 空状态：首屏题目卡 + 进度条 1/5 + 说明文案；360/390/430 首屏显示题目而非说明墙。
  - 输入中：每题单选，可回退上一题；进度条实时更新。
  - 处理中：提交后 ≤300ms 本地计算，显示轻量 spinner；无网络依赖。
  - 成功：结果卡 + 信任标签（Verified/Community）+ CTA 链到 `/builds/[class]`；触发 `quiz_completed`。
  - 失败：题库加载失败（静态 JSON 内联兜底，几乎不可能）→ 显示"暂时无法加载，请刷新"；重试按钮。
  - 超限：无（匿名无限次）。
  - 移动端：单题一屏、按钮 ≥44px、无 hover 依赖；360/390/430 不滚动即可点第一题。
- **验收证据**: 完成 5 题 → 得到推荐职业与理由；刷新后可重做；分享 URL 可复现结果；GA4 收到 `quiz_completed`。

### P0-T5 Settings Recommender 设置推荐器（V1，🟢）
- **输入 Input**: 平台（PC/PS5/Xbox）+ PC 时 GPU 型号/分辨率/目标帧率；PS5/Xbox 为预设档位。
- **参数 Params**: 本地映射表（GPU 性能档 × 分辨率 → 画质预设/缩放/FPS 预期）。
- **处理 Processing**: 本地匹配 → 输出推荐设置组（画质选项/渲染缩放/FPS cap/垂直同步建议）。
- **输出 Output**: 设置卡（可复制文本）+ 说明"基于社区实测，标注 Community Report"+ CTA[看分平台设置指南]。
- **状态合同 States**:
  - 空状态：平台选择 + GPU/分辨率输入；首屏可操作。
  - 输入中：选择器联动（选 PS5/Xbox 隐藏 GPU 输入）。
  - 处理中：本地匹配 ≤300ms。
  - 成功：设置列表 + 复制按钮 + Last Verified 日期；触发 `settings_generated`。
  - 失败：未识别 GPU → 显示最接近档位 + "按中档推荐"降级提示（不阻断）。
  - 超限：无。
  - 移动端：下拉选择器原生控件；结果卡纵向排列。
- **验收证据**: PC/PS5/Xbox 三平台各生成一次设置；未识别 GPU 有降级输出；复制按钮可用；GA4 事件。

### P0-T6 Tier List 梯度榜 Hub + 4 子页（V1，🟢）
- **输入 Input**: 模式切换（Solo/Trio/Duo/Beginner）+ 排序维度（综合/生存/爆发/易上手）。
- **参数 Params**: D1 或静态 JSON：6 职业 × 4 模式 × 评分 + 信任标签（Verified / Community Report / Needs Update）+ Last Verified。
- **处理 Processing**: 客户端筛选/排序；模式切换不刷新页面。
- **输出 Output**: 排行表（S/A/B/C/D 色码，S=金/A=绿/B=蓝/C=灰/D=红）+ 每行理由摘要 + 标签 + CTA[职业指南]。
- **状态合同 States**:
  - 空状态：默认 Solo 榜直接可见（无空态）；首屏显示榜单前 3。
  - 加载中：D1 fetch 期间骨架屏；失败回退静态 JSON。
  - 成功：4 模式可切换，URL hash 记录模式（/tier-list#duo）。
  - 失败：数据加载失败 → 显示缓存版 + "数据更新失败，显示上次缓存"；重试。
  - 超限：无。
  - 移动端：表格横向滚动容器 + 首列 sticky；模式 Tab 置顶。
- **验收证据**: 4 模式切换不刷新；标签与 Last Verified 可见；`tool_used`（tier_list 维度）事件。

### P0-T8 Loot Finder 掉落查询（V1，🟡）
- **输入 Input**: 搜索关键词（物品名/前缀模糊匹配）。
- **参数 Params**: D1 数据：物品名/类型/稀有度/获取途径数组（Boss/宝箱/NPC/制造）+ 来源链接 + Last Verified。
- **处理 Processing**: 服务端（Workers API）或 ISR 静态查询；v1 高频子集（武器/护甲/宝石/消耗品核心）。
- **输出 Output**: 结果卡：物品 + 全部获取途径（Boss 名/宝箱位置/NPC/配方）+ 来源链接 + 标签；CTA[物品库][经济攻略]。
- **状态合同 States**:
  - 空状态：搜索框聚焦态 + 热门物品 chips（快速起点）。
  - 搜索中：debounce 300ms + 骨架屏。
  - 成功：结果列表；无结果 → 空结果卡 + "试试热门物品" chips + 建议。
  - 失败：API 错误 → 提示"暂时无法查询"+ 重试按钮；不丢输入。
  - 超限：v1 数据子集说明（"更多物品持续添加中"）；无硬配额。
  - 移动端：搜索框首屏置顶；结果卡片单列。
- **验收证据**: 搜 3 个已知物品得到正确获取途径；无结果有降级建议；来源链接可点。

### P0-T9 Items Database 物品库（V1，🟡）
- **输入 Input**: 搜索 + 筛选（类型：武器/护甲/宝石/消耗品；稀有度）。
- **参数 Params**: D1 数据（v1 高频子集；字段：name/type/rarity/stats/drop_source/last_verified）。
- **处理 Processing**: 服务端查询 + 客户端筛选 + 分页（每页 20）。
- **输出 Output**: 表格/卡片列表 + 详情展开（属性/获取途径）+ CTA[Loot Finder][Build 指南]。
- **状态合同 States**:
  - 空状态：筛选器 + 热门分类入口。
  - 加载中：骨架屏。
  - 成功：分页列表；无结果 → 空态卡 + 清除筛选按钮。
  - 失败：API 错误 → 重试；保留筛选条件。
  - 超限：分页上限说明（v1 数据子集）。
  - 移动端：筛选器抽屉式；卡片单列；表格在 430 宽度可横向滚动。
- **验收证据**: 按类型/稀有度筛选结果正确；分页可用；详情展开显示获取途径。

### P0-T10 Extraction Checklist 撤离清单（V1，🟢）
- **输入 Input**: 勾选清单项（准备/补给/撤离点确认/战利品规则等，约 15-20 项分组）。
- **参数 Params**: 清单 JSON + localStorage 键 `mh_checklist_v1`。
- **处理 Processing**: 纯前端；勾选即存 localStorage。
- **输出 Output**: 进度条（x/y）+ 分组清单 + 重置按钮 + 复制文本；CTA[新手指南][撤离指南]。
- **状态合同 States**:
  - 空状态：全未勾选 + 进度 0%。
  - 输入中：勾选即时保存，刷新不丢。
  - 成功：100% 时庆祝提示 + 触发 `checklist_completed`。
  - 失败：localStorage 不可用（隐私模式）→ 提示"本环境无法保存，仍可临时使用"+ 会话内保持。
  - 超限：无。
  - 移动端：勾选框 ≥44px；进度条置顶。
- **验收证据**: 勾选 3 项 → 刷新 → 状态保留；重置可清空；100% 触发事件。

### P0-T2 Squad Comp Builder 阵容构建器（V1.5，🔴）
- **输入 Input**: 从 6 职业拖拽/点选 3 个（或 Duo 模式 2 个）进阵容槽。
- **参数 Params**: 职业属性表（角色定位 Frontline/DPS/Support、协同、克制）。
- **处理 Processing**: 客户端实时评估：角色覆盖/缺位/协同推荐/强弱项。
- **输出 Output**: 阵容评估卡（评分/覆盖雷达/缺位提示/推荐替代）+ 分享 URL（编码职业组合）+ CTA[对局矩阵][Duo 指南]。
- **状态合同 States**:
  - 空状态：三个空槽 + 职业卡池；首屏可拖拽（移动端点选）。
  - 输入中：拖拽/点选实时更新评估。
  - 成功：完整阵容评估 + 分享按钮；触发 `squad_built`。
  - 失败：无服务端依赖；本地失败仅 UI 层（拖拽异常 → 点选降级）。
  - 超限：无。
  - 移动端：点选替代拖拽（拖拽仅桌面增强）；槽位大按钮。
- **验收证据**: 3 职业组合生成评估；缺位提示正确；分享 URL 可复现阵容；GA4 事件。

### P0-T4 PvP Matchup Matrix 对局矩阵（V1.5，🔴）
- **输入 Input**: 6×6 矩阵单元格点击（职业 vs 职业）+ Solo/Trio 切换。
- **参数 Params**: 对局内容数据（36 格 × 2 模式；内容为原创/改编自社区与 1000h 视频方向，进台账）。
- **处理 Processing**: 客户端展示；单元格 → 抽屉/面板显示对局分析 + 策略。
- **输出 Output**: 分析面板（优劣势/关键技能/策略提示）+ CTA[职业指南][PvP 指南]。
- **状态合同 States**:
  - 空状态：矩阵直接可见（默认 Solo）；对角格显示"—"。
  - 成功：点击格展开分析；触发 `matchup_viewed`。
  - 失败：内容缺失格 → 显示"待补充（Community Report）"。
  - 移动端：矩阵可横向滚动；点击格 → 底部抽屉。
- **验收证据**: 任取 3 格显示非空分析；Solo/Trio 切换正确；事件触发。

### P0-T1 Build Planner 配装规划器（V1.5，🔴）
- **输入 Input**: 选职业 → 点天赋树节点 → 配武器/护甲/宝石槽。
- **参数 Params**: 天赋树 JSON（6 职业 × 2 姿态）+ 物品数据子集。
- **处理 Processing**: 客户端状态管理；分享 URL 编码 build。
- **输出 Output**: Build 摘要卡 + 分享链接 + CTA[职业指南][物品库]。
- **状态合同 States**:
  - 空状态：职业选择首屏；天赋树可加载。
  - 输入中：节点点亮/取消实时更新。
  - 成功：分享链接生成；触发 `build_shared`。
  - 失败：数据加载失败 → 重试；分享 URL 超长 → 压缩编码。
  - 移动端：天赋树缩放/平移；节点 ≥44px。
- **验收证据**: 完成一个 build；分享链接可复现；GA4 事件。

### P0-T7 Interactive Map 交互地图（V1.5，🔴）
- **输入 Input**: 平移/缩放 + 筛选图层（POI/撤离点/Boss/宝箱）。
- **参数 Params**: 地图瓦片 + POI JSON（Hallowgrove/Brandrgarde；标注为改编/整理数据）。
- **处理 Processing**: 客户端渲染（静态瓦片先行，不做实时服务端）。
- **输出 Output**: 交互地图 + 图例 + 点击 POI 显示详情 + CTA[地图指南]。
- **状态合同 States**:
  - 空状态：默认视图加载地图。
  - 加载中：瓦片懒加载骨架。
  - 成功：筛选切换；POI 详情。
  - 失败：瓦片加载失败 → 重试；降级为静态图。
  - 移动端：双指缩放 + 单指平移；图层按钮可触达。
- **验收证据**: 2 地图可加载；筛选图层生效；POI 详情可开。

### 内容页通用任务 / Content Page Generic Task（48 页）
- **输入 Input**: URL 直达 / 内链 / 工具 CTA 跳转。
- **状态合同**:
  - 空/加载：SSR 直接输出，无空态；加载失败 → 404 页（noindex）。
  - 成功：H1 精确匹配主词 + Last Verified + 信任标签 + TOC + 正文 2000-3000 词（嵌工具 CTA + 5-15 内链）+ FAQ Schema + 相关卡。
  - 失败：404 路由 → `/404`（noindex）+ 相关页推荐。
  - 移动端：TOC 折叠为抽屉；表格横向滚动；CTA 按钮大触区。
- **验收证据**: 每页 H1/Title/Meta 唯一（见 §5 表）；FAQ Schema 可校验；内链计数 5-15；Last Verified 可见。

---

## 4. 功能规格与优先级 / Feature Spec & Priorities

### 4.1 P0 — V1 首发（上线即交付）
| # | 功能 Feature | 复杂度 | 路由 | 关键验收 |
|---|---|---|---|---|
| P0-1 | Class Quiz 职业测试 | 🟢 | /class-quiz | 5 题完成 → 推荐职业+理由+Build 链接；移动端首屏可答 |
| P0-2 | Settings Recommender 设置推荐器 | 🟢 | /settings | PC/PS5/Xbox 三平台输出；未识别 GPU 降级 |
| P0-3 | Tier List Hub + 4 子页 | 🟢 | /tier-list, /tier-list/{solo,trio,duo,beginner} | 4 模式切换；信任标签；Last Verified |
| P0-4 | Loot Finder 掉落查询 | 🟡 | /loot-finder | 高频子集可搜；获取途径完整；无结果降级 |
| P0-5 | Items Database 物品库 | 🟡 | /items | 类型/稀有度筛选 + 分页 + 详情 |
| P0-6 | Extraction Checklist 撤离清单 | 🟢 | /checklist | localStorage 持久；重置；100% 事件 |
| P0-7 | 48 内容页 + 4 信任页 | — | 见 §5 表 | 每页唯一 H1/Title/Meta/FAQ/内链 5-15 |
| P0-8 | 首页 + 全局导航（Mega Menu）+ Footer Unofficial 声明 | — | / | Hero 蒙版动效 + Quick Stats + Tools Grid + Featured Guides + Quick Facts |
| P0-9 | 埋点基线（GA4 + CF Analytics） | — | 全站 | tool_used/quiz_completed/content_read 等可查 |
| P0-10 | sitemap.xml ≥ 58 URLs + robots + canonical | — | 全站 | 提交 GSC 后可抓取 |

### 4.2 P0 — V1.5（上线后 2-4 周，路由随 V1 存在为 Coming Soon）
| # | 功能 Feature | 复杂度 | 路由 | 关键验收 |
|---|---|---|---|---|
| P0-11 | Squad Comp Builder 阵容构建器（独家旗舰） | 🔴 | /squad-builder | 3 职业评估 + 分享 URL |
| P0-12 | PvP Matchup Matrix 对局矩阵（独家） | 🔴 | /matchups | 6×6 交互 + Solo/Trio |
| P0-13 | Build Planner 配装规划器 | 🔴 | /build-planner | 天赋树 + 分享链接 |
| P0-14 | Interactive Map 交互地图 | 🔴 | /map | 双地图 + 图层筛选 + POI |

### 4.3 P1（上线后 2-4 周迭代）
Damage Calculator 伤害计算 / Item Comparison 物品对比 / Crafting Cost 制造成本 / Craft & Flip Profit 倒卖利润 / Gem Optimizer 宝石优化 / **Patch Meta Tracker 补丁 Meta 追踪（独家）** / Boss Timeline Boss 时间轴 / Extraction Route Planner 撤离路线规划 / Newsletter（补丁通知，先过 04 合规）。

### 4.4 P2（1-3 个月）
AI Q&A / 直播嵌入 / 拍卖价格趋势 / 赛季清档计算器 / 键位速查表 / 多语言（日/西/德）/ 社区投稿（审核后发布）。

### 4.5 明确不做 / NOT-DO（rev2 可执行口径，N1-N12 原样保留为产品红线）
| # | 边界 Boundary | 处置 Disposition |
|---|---|---|
| N1 | ❌ 不暗示官方身份；全站页脚 "Unofficial fan resource. Not affiliated with Bellring Games or Skystone Games." | 硬约束，不因 rev2 放宽 |
| N2 | ❌ 不用官方 logo 本体/微调版；✅ 原创类官方风格 logo（原创绘制、可区分，06 出稿 + 04 复核 + 保留原创证据） | owner 决策 |
| N3 | ❌ 不暗示官方背书/授权/合作 | About/Contact 文案 04 定稿 |
| N4 | ❌ 不冒用竞品站名/logo 做本站品牌/域名/主视觉 | 品牌混淆风险 |
| N5 | ✅ 允许扒/采集官方与竞品公开游戏数据（爬取整理入库） | 每条进来源台账；04 评估 ToS 风险 R9 + takedown 预案 |
| N6 | ✅ 允许汲取/复用竞品与官方的图片、数据、文案方向和主题，必要时可直接用 | 逐条进复用台账，先登记后使用；R8/R11 |
| N7 | ❌ 不做视频内容 | YouTube 生态已饱和 |
| N8 | ❌ 不做论坛/社区 | Reddit/Discord 已存在 |
| N9 | ❌ 不做新闻/更新速度竞赛 | 做补丁后 Meta 解读，非快讯 |
| N10 | ❌ 不做商店/电商/代练 | 非方向 |
| N11 | ❌ 不做 P2W 相关内容 | 维护社区信任 |
| N12 | ❌ 首版不做登录/注册/付费墙 | 工具全部匿名可用；变现 03 评估 + owner 闸门 |

---

## 5. 页面与组件合同 / Page & Component Contracts（含逐页 Title/Meta 回填）

> **Metadata contract minimum（本表已满足）**：每个 indexable P0 route 有唯一 Title（目标 50-60 chars，个别 Hub 页可略超）与唯一 Meta description（目标 150-160 chars）。Trust 页 Title/meta 由 compliance/copy 最终定稿，本表给出约束草案并标注责任。
> **通用组件**（复用组件，全站一致）：Header + Mega Menu（Builds / Database / Tools / Reference / Mechanics 五组）、Global Search、Feedback 按钮、Breadcrumb、Tier 色码（S=金/A=绿/B=蓝/C=灰/D=红）、信任标签（Verified=绿/Community=黄/Needs Update=红）、Last Verified 日期、工具 CTA 卡、相关内容卡、Footer（Unofficial 声明 + 法务链接）。
> **canonical**：全部 indexable 路由标 `待最终域名确认`，域名确定后按 https://<final-domain><path> 生成；noindex 路由为 /api/* 与 /404。

### 5.1 Core 核心（1）
| Route | H1 | Title | Meta description | 页面模块 / CTA / 差异化 |
|---|---|---|---|---|
| `/` | Mistfall Hunter Tools, Builds & Tier List | Mistfall Hunter Tools, Builds & Tier List (Updated Aug 2026) | Free Mistfall Hunter tools and guides: class quiz, tier list, squad builder, loot finder, settings and 48 deep guides. Pick, build, squad up and extract smarter. Updated August 2026. | Hero（游戏背景蒙版动效 + 双 CTA [Take the Class Quiz][Browse Tools]）→ Quick Stats Bar（6 Classes/12 Stances/10 Tools/48 Guides）→ 新手 3 步旅程 → Tools Grid（V1 卡 + V1.5 Coming Soon 灰态）→ Featured Guides 6 卡 → Latest Updates → Quick Facts 表 → Codes 倒计时 → Footer。差异化：决策引擎 hub，工具链闭环入口。 |

### 5.2 Tools 工具页（10）
| Route | H1 | Title | Meta description | 批次 | 模块 / CTA / 差异化 |
|---|---|---|---|---|---|
| `/class-quiz` | Mistfall Hunter Class Quiz — Find Your Best Class | Mistfall Hunter Class Quiz — Find Your Best Class (2026) | Answer 5 quick questions about your playstyle and get your best Mistfall Hunter class with reasoning and a recommended build. Free, no sign-up. Updated August 2026. | V1 | 题卡流 + 进度条 + 结果卡 + CTA[Build 指南]；**独家** |
| `/settings` | Mistfall Hunter Best Settings & FPS Guide | Mistfall Hunter Best Settings & FPS Guide (Updated Aug 2026) | Get optimal Mistfall Hunter settings for PC, PS5 and Xbox. Enter your GPU and resolution for a recommended graphics and FPS setup. Community-tested. Updated August 2026. | V1 | 平台选择 + GPU/分辨率 + 设置卡复制 + CTA[分平台设置指南]；**独家** |
| `/tier-list` | Mistfall Hunter Tier List | Mistfall Hunter Tier List — Solo, Trio, Duo & Beginner (Aug 2026) | Mistfall Hunter tier list for Solo, Trio, Duo and Beginner with trust labels and last-verified dates. Compare classes side by side and see the current meta. Updated August 2026. | V1 | Hub：4 子页卡片 + 快速对比 + CTA；Duo 维度独家 |
| `/loot-finder` | Mistfall Hunter Loot Finder | Mistfall Hunter Loot Finder — Where to Find Items (Aug 2026) | Search any Mistfall Hunter item to see every acquisition path: boss drops, chests, NPC vendors and crafting recipes. Free loot database with sources. Updated August 2026. | V1 | 搜索 + 热门 chips + 获取途径卡 + 来源链接 + CTA[物品库]；追平 A |
| `/items` | Mistfall Hunter Items Database | Mistfall Hunter Items Database — Weapons, Armor & Gems (2026) | Browse Mistfall Hunter weapons, armor, gems and consumables with stats, rarity and drop sources. Filter by type and rarity. Free database, mobile-friendly. Updated August 2026. | V1 | 筛选 + 分页 + 详情展开 + CTA[Loot Finder]；追平 A（小而准） |
| `/checklist` | Mistfall Hunter Extraction Checklist | Mistfall Hunter Extraction Checklist (Updated Aug 2026) | Interactive Mistfall Hunter extraction checklist. Tick off your pre-extract objectives, save progress locally, and never lose loot to a careless run. Free to use. Updated August 2026. | V1 | 分组清单 + 进度条 + 重置 + 复制 + CTA[新手指南]；超越 B 静态版 |
| `/build-planner` | Mistfall Hunter Build Planner | Mistfall Hunter Build Planner — Plan & Share Builds (2026) | Plan your Mistfall Hunter build with the interactive talent tree, pick weapons, armor and gems, then share a link with your squad. Free, no sign-up. Updated August 2026. | V1.5 | 天赋树 + 装备槽 + 分享 URL + CTA[职业指南]；追平 A 核心工具 |
| `/squad-builder` | Mistfall Hunter Squad Comp Builder | Mistfall Hunter Squad Comp Builder — Best Trio Comps (2026) | Build your best Mistfall Hunter trio or duo: pick 3 classes, see role coverage, missing roles and synergy recommendations, and share your comp. Free. Updated August 2026. | V1.5 | 拖拽/点选 + 评估卡 + 分享 URL + CTA[对局矩阵]；**独家旗舰** |
| `/matchups` | Mistfall Hunter PvP Matchup Matrix | Mistfall Hunter PvP Matchup Matrix — Solo & Trio (2026) | Interactive 6×6 Mistfall Hunter PvP matchup matrix. Click any class matchup for analysis and strategy tips in Solo and Trio modes. Free to use. Updated August 2026. | V1.5 | 6×6 矩阵 + 分析面板 + Solo/Trio 切换 + CTA[PvP 指南]；**独家** |
| `/map` | Mistfall Hunter Interactive Map | Mistfall Hunter Interactive Map — POIs & Extraction (2026) | Explore Mistfall Hunter maps with POI markers, extraction points and boss locations. Filter layers and plan your route. Free interactive map. Updated August 2026. | V1.5 | 瓦片地图 + 图层筛选 + POI 详情 + CTA[地图指南]；追平 A |

### 5.3 Classes 职业页（6）
H1 模板：`Mistfall Hunter [Class] Class Guide`；Title 模板：`Mistfall Hunter [Class] Class Guide — Strengths & Builds (2026)`；Meta 模板：`Learn the Mistfall Hunter [Class]: strengths, weaknesses, best stance, top builds and beginner tips. Updated [Month] [Year].`（6 页全部 index ✅，逐页唯一）

| Route | Class | Title 唯一化 | Meta 唯一化 |
|---|---|---|---|
| `/classes/mercenary` | Mercenary | Mistfall Hunter Mercenary Class Guide — Strengths & Builds (2026) | Learn the Mistfall Hunter Mercenary: strengths, best stance, top builds and beginner tips for frontline play. Updated August 2026. |
| `/classes/sorcerer` | Sorcerer | Mistfall Hunter Sorcerer Class Guide — Strengths & Builds (2026) | Learn the Mistfall Hunter Sorcerer: spell damage, best stance, top builds and tips for burst play. Updated August 2026. |
| `/classes/blackarrow` | Blackarrow | Mistfall Hunter Blackarrow Class Guide — Strengths & Builds (2026) | Learn the Mistfall Hunter Blackarrow: ranged damage, best stance, top builds and tips for precision play. Updated August 2026. |
| `/classes/shadowstrix` | Shadowstrix | Mistfall Hunter Shadowstrix Class Guide — Strengths & Builds (2026) | Learn the Mistfall Hunter Shadowstrix: mobility, stealth, best stance, top builds and PvP tips. Updated August 2026. |
| `/classes/seer` | Seer | Mistfall Hunter Seer Class Guide — Strengths & Builds (2026) | Learn the Mistfall Hunter Seer: utility and support, best stance, top builds and team-play tips. Updated August 2026. |
| `/classes/withered-knight` | Withered Knight | Mistfall Hunter Withered Knight Class Guide — Strengths & Builds (2026) | Learn the Mistfall Hunter Withered Knight: durability, best stance, top builds and survival tips. Updated August 2026. |

### 5.4 Builds 配装页（6）
H1 模板：`Mistfall Hunter [Class] Build Guide`；Title 模板：`Mistfall Hunter [Class] Build Guide — Best Loadouts (2026)`；Meta 模板：`Best Mistfall Hunter [Class] builds: skills, weapons, armor, gems and playstyle for [stance] stance. Updated [Month] [Year].`（6 页全部 index ✅）

| Route | Class | Title 唯一化 | Meta 唯一化 |
|---|---|---|---|
| `/builds/mercenary` | Mercenary | Mistfall Hunter Mercenary Build Guide — Best Loadouts (2026) | Best Mistfall Hunter Mercenary builds: skills, weapons, armor, gems and frontline playstyle. Updated August 2026. |
| `/builds/sorcerer` | Sorcerer | Mistfall Hunter Sorcerer Build Guide — Best Loadouts (2026) | Best Mistfall Hunter Sorcerer builds: skills, weapons, armor, gems and burst damage playstyle. Updated August 2026. |
| `/builds/blackarrow` | Blackarrow | Mistfall Hunter Blackarrow Build Guide — Best Loadouts (2026) | Best Mistfall Hunter Blackarrow builds: skills, weapons, armor, gems and ranged playstyle. Updated August 2026. |
| `/builds/shadowstrix` | Shadowstrix | Mistfall Hunter Shadowstrix Build Guide — Best Loadouts (2026) | Best Mistfall Hunter Shadowstrix builds: skills, weapons, armor, gems and mobility playstyle. Updated August 2026. |
| `/builds/seer` | Seer | Mistfall Hunter Seer Build Guide — Best Loadouts (2026) | Best Mistfall Hunter Seer builds: skills, weapons, armor, gems and support playstyle. Updated August 2026. |
| `/builds/withered-knight` | Withered Knight | Mistfall Hunter Withered Knight Build Guide — Best Loadouts (2026) | Best Mistfall Hunter Withered Knight builds: skills, weapons, armor, gems and survival playstyle. Updated August 2026. |

### 5.5 Tier List 子页（4）
H1 模板：`Mistfall Hunter [Mode] Tier List`；Title 模板：`Mistfall Hunter [Mode] Tier List (Updated Aug 2026)`；Meta 模板：`Mistfall Hunter [Mode] tier list with trust labels and last-verified dates. See which classes rank S to D in [mode] play. Updated August 2026.`（4 页全部 index ✅）

| Route | Mode | Title | Meta |
|---|---|---|---|
| `/tier-list/solo` | Solo | Mistfall Hunter Solo Tier List (Updated Aug 2026) | Mistfall Hunter Solo tier list with trust labels and last-verified dates. See which classes rank S to D when extracting alone. Updated August 2026. |
| `/tier-list/trio` | Trio | Mistfall Hunter Trio Tier List (Updated Aug 2026) | Mistfall Hunter Trio tier list with trust labels and last-verified dates. See which classes rank S to D in three-man squads. Updated August 2026. |
| `/tier-list/duo` | Duo | Mistfall Hunter Duo Tier List (Updated Aug 2026) | Mistfall Hunter Duo tier list — exclusive to this site. See the best classes for two-man extraction with trust labels. Updated August 2026. |
| `/tier-list/beginner` | Beginner | Mistfall Hunter Beginner Tier List (Updated Aug 2026) | Best Mistfall Hunter classes for beginners, ranked S to D by ease of use and survivability. Trust labels included. Updated August 2026. |

### 5.6 Maps 地图页（2）
| Route | H1 | Title | Meta |
|---|---|---|---|
| `/maps/hallowgrove` | Mistfall Hunter Hallowgrove Map Guide | Mistfall Hunter Hallowgrove Map Guide — POIs & Extraction (2026) | Complete Mistfall Hunter Hallowgrove map guide: POIs, extraction points, boss locations and loot routes. Updated August 2026. |
| `/maps/brandrgarde` | Mistfall Hunter Brandrgarde Map Guide | Mistfall Hunter Brandrgarde Map Guide — POIs & Extraction (2026) | Complete Mistfall Hunter Brandrgarde map guide: POIs, extraction points, boss locations and loot routes. Updated August 2026. |

### 5.7 Bosses（3）
| Route | H1 | Title | Meta |
|---|---|---|---|
| `/bosses/cursed-moonwane` | Mistfall Hunter Cursed Moonwane Boss Guide | Mistfall Hunter Cursed Moonwane Boss Guide — How to Beat (2026) | How to beat Cursed Moonwane in Mistfall Hunter: phases, attacks, best classes and rewards. Updated August 2026. |
| `/bosses/salmar` | Mistfall Hunter Salmar Boss Guide | Mistfall Hunter Salmar Boss Guide — How to Beat (2026) | How to beat Salmar in Mistfall Hunter: phases, attacks, best classes and rewards. Updated August 2026. |
| `/bosses/einherjar` | Mistfall Hunter Einherjar Boss Guide | Mistfall Hunter Einherjar Boss Guide — How to Beat (2026) | How to beat Einherjar in Mistfall Hunter: phases, attacks, best classes and rewards. Updated August 2026. |

### 5.8 Guides 攻略页（17）
H1/Title/Meta 见下表（全部 index ✅；正文 2000-3000 词 + 嵌工具 CTA + FAQ Schema + 内链 5-15 + Last Verified）

| Route | H1 | Title | Meta 唯一化 |
|---|---|---|---|
| `/guides/getting-started` | Mistfall Hunter Beginner Guide | Mistfall Hunter Beginner Guide — Start Strong (Aug 2026) | New to Mistfall Hunter? Start here: pick a class, learn extraction, and avoid common beginner mistakes. Updated August 2026. |
| `/guides/first-extraction` | Mistfall Hunter First Extraction Guide | Mistfall Hunter First Extraction Guide — Survive & Extract (2026) | Survive your first Mistfall Hunter extraction: loadout, routes, objectives and when to leave. Updated August 2026. |
| `/guides/extraction` | How to Extract in Mistfall Hunter | How to Extract in Mistfall Hunter — Complete Guide (2026) | Learn exactly how extraction works in Mistfall Hunter: timers, portals, gear risk and safe exits. Updated August 2026. |
| `/guides/tips` | Mistfall Hunter Tips & Tricks | Mistfall Hunter Tips & Tricks — 25 Pro Tips (Aug 2026) | 25 practical Mistfall Hunter tips and tricks for looting, combat, extraction and economy. Updated August 2026. |
| `/guides/faq` | Mistfall Hunter FAQ | Mistfall Hunter FAQ — Answers to Common Questions (2026) | Frequently asked questions about Mistfall Hunter: classes, extraction, crossplay, season wipes and more. Updated August 2026. |
| `/guides/dual-weapon-stances` | Mistfall Hunter Dual Weapon Stances Guide | Mistfall Hunter Dual Weapon Stances Guide (Updated 2026) | How dual weapon stances work in Mistfall Hunter: swapping, bonuses and when to stance-swap in combat. Updated August 2026. |
| `/guides/camp-upgrades` | Mistfall Hunter Camp Upgrades Guide | Mistfall Hunter Camp Upgrades Guide — Best Order (2026) | Best Mistfall Hunter camp upgrades and the order to buy them for faster progression. Updated August 2026. |
| `/guides/scavenger-squads` | Mistfall Hunter Scavenger Squads Guide | Mistfall Hunter Scavenger Squads Guide (Updated 2026) | How scavenger squads work in Mistfall Hunter and how to team up for efficient loot runs. Updated August 2026. |
| `/guides/leveling` | Mistfall Hunter Leveling Guide | Mistfall Hunter Leveling Guide — Fastest XP (Aug 2026) | The fastest ways to level in Mistfall Hunter: quests, runs, gear and XP tips. Updated August 2026. |
| `/guides/keys-treasure` | Mistfall Hunter Keys & Treasure Rooms | Mistfall Hunter Keys & Treasure Rooms Guide (2026) | Where to find keys and treasure rooms in Mistfall Hunter and what loot they contain. Updated August 2026. |
| `/guides/pvp-survival` | Mistfall Hunter PvP Survival Guide | Mistfall Hunter PvP Survival Guide — Win Fights (2026) | Win more PvP fights in Mistfall Hunter: class matchups, positioning, third-party awareness. Updated August 2026. |
| `/guides/pc-settings` | Mistfall Hunter Best PC Settings & FPS Fix | Mistfall Hunter Best PC Settings & FPS Fix (Aug 2026) | Best Mistfall Hunter PC settings for FPS: graphics, rendering, input and stutter fixes. Updated August 2026. |
| `/guides/ps5-settings` | Mistfall Hunter Best PS5 Settings | Mistfall Hunter Best PS5 Settings — Performance Guide (2026) | Best Mistfall Hunter PS5 settings for smooth performance: graphics modes, FOV, controller and crossplay. Updated August 2026. |
| `/guides/xbox-settings` | Mistfall Hunter Best Xbox Settings | Mistfall Hunter Best Xbox Settings — Performance Guide (2026) | Best Mistfall Hunter Xbox settings for smooth performance: graphics modes, FOV, controller and crossplay. Updated August 2026. |
| `/guides/controller-vs-kbm` | Mistfall Hunter Controller vs Keyboard & Mouse | Mistfall Hunter Controller vs Keyboard & Mouse (2026) | Controller or keyboard and mouse for Mistfall Hunter? Aim assist, binds and the best setup per class. Updated August 2026. |
| `/guides/auction-house` | Mistfall Hunter Auction House Guide | Mistfall Hunter Auction House Guide — Buy & Sell (2026) | Master the Mistfall Hunter auction house: fees, flipping, price trends and gold-making strategies. Updated August 2026. |
| `/guides/gold-farming` | Mistfall Hunter Gold Farming Guide | Mistfall Hunter Gold Farming Guide — Best Methods (2026) | Best Mistfall Hunter gold farming methods: routes, items to flip and profit tips. Updated August 2026. |

### 5.9 Codes（3）
| Route | H1 | Title | Meta |
|---|---|---|---|
| `/codes/rewards` | Mistfall Hunter Codes & Rewards | Mistfall Hunter Codes & Rewards (Updated Aug 2026) | Active Mistfall Hunter codes and rewards with expiry countdowns. Redeem before they expire. Updated August 2026. |
| `/codes/how-to-redeem` | How to Redeem Mistfall Hunter Codes | How to Redeem Mistfall Hunter Codes (2026) | Step-by-step guide to redeeming Mistfall Hunter codes in-game on PC, PS5 and Xbox. Updated August 2026. |
| `/codes/twitch-drops` | Mistfall Hunter Twitch Drops Guide | Mistfall Hunter Twitch Drops Guide (Updated 2026) | How Mistfall Hunter Twitch Drops work: watch requirements, claiming and current drops. Updated August 2026. |

### 5.10 Duo/Solo 专属（2，独家）
| Route | H1 | Title | Meta |
|---|---|---|---|
| `/guides/duo` | Mistfall Hunter Duo Guide | Mistfall Hunter Duo Guide — Best Comps & Tips (2026) | The only dedicated Mistfall Hunter Duo guide: best two-class comps, strategies and how to play without matchmaking. Updated August 2026. |
| `/guides/solo-survival` | Mistfall Hunter Solo Survival Guide | Mistfall Hunter Solo Survival Guide — Extract Alone (2026) | Survive solo in Mistfall Hunter: class picks, loadouts, route discipline and escape tactics. Updated August 2026. |

### 5.11 Trust 信任页（4；Title/meta 由 compliance/copy 最终定稿，本表为约束草案）
| Route | H1 | Title（草案） | Meta（草案） | 责任 |
|---|---|---|---|---|
| `/about` | About Us | About Mistfall Hunter Tools | Unofficial fan resource for Mistfall Hunter with free decision tools and guides. Not affiliated with Bellring Games or Skystone Games. | 04 合规定稿；含 Unofficial 声明 + 数据来源说明 |
| `/privacy` | Privacy Policy | Privacy Policy | How mistfallhunter tools handle data: browser-local processing, analytics and no account. Full privacy policy. | 04 合规定稿；不得过度承诺 |
| `/terms` | Terms of Service | Terms of Service | Terms for using Mistfall Hunter tools and content. Unofficial fan resource; data provided as-is. | 04 合规定稿 |
| `/contact` | Contact | Contact Us | Contact the Mistfall Hunter tools team about corrections, data sources or takedown requests. | 04 合规定稿；含 takedown 联系入口 |

### 5.12 Noindex
`/api/*`（接口）、`/404`（错误页）。其余 58 路由 index ✅。

**薄内容防线 / Thin-content guard**：58 页每页独立搜索意图、独立用户任务、独立 FAQ/内链角色；禁止近义词换词页；后续扩页以 GSC 查询/收录/任务完成信号为依据（requirements-trace #5 口径）。

---

## 6. Route / Data / Event Contract / 路由·数据·事件合同

### 6.1 Route Contract 汇总
- 可索引 indexable：58（Core 1 + Tools 10 + Classes 6 + Builds 6 + TierList 4 + Maps 2 + Bosses 3 + Guides 17 + Codes 3 + Duo/Solo 2 + Trust 4）—— sitemap ≥ 58 URLs 为硬验收（requirements-trace #1）。
- 工具批次：V1 = /class-quiz /settings /tier-list /loot-finder /items /checklist；V1.5 = /build-planner /squad-builder /matchups /map（Coming Soon 状态随 V1 存在，requirements-trace #2 对每个工具按其上线条目逐批验收）。
- canonical：`待最终域名确认`；noindex：/api/*、/404。
- 路由矩阵与 02A rev2 §7 完全一致；本表新增唯一 Title/Meta（§5）。

### 6.2 Data Contract 数据合同
| 项 Item | 合同 Contract |
|---|---|
| 数据来源 Sources | 官方公开数据 + 竞品公开数据（owner rev2 N5 放行扒取）；每关键数据记录来源 URL + 采集日期 + Last Verified |
| 爬取策略 Crawling | 礼貌抓取（rate limit / robots 检查）由 08 后端实现落实；ToS/EULA 暴露面由 04 合规评估（R9）+ takedown 预案 |
| 素材与图片 Assets | 官方/竞品素材复用放行（N6），逐条进复用台账 inputs/04-compliance/reuse-ledger.md（先登记后使用）；**站点 logo 除外：必须原创类官方风格（N2）** |
| 存储 Storage | D1 结构化游戏数据（物品/职业/掉落）；R2 图片素材；静态 JSON 兜底 |
| 客户端状态 Client state | 工具草稿/清单勾选/quiz 结果只存 localStorage，不上传服务器；无账号体系 |
| 保留/删除 Retention | 无服务端用户数据；Newsletter（P1）收集邮箱前必须 04 合规覆盖 Privacy；分析事件不含图片内容/文件名/PII |
| 数据新鲜度 Freshness | 每页 Last Verified；补丁后 24h 内更新 SOP（运营阶段定义）；Needs Update 标签 |
| 不可用条件 Unavailable | 数据抓取失败 → 显示缓存/静态兜底 + 重试；工具依赖的 D1 故障 → 静态兜底，不阻断匿名流程（fail-open） |

### 6.3 Event Contract 事件合同
| Event 事件 | Trigger 触发 | Params 参数（不含图片内容/文件名/PII） | 验收证据 |
|---|---|---|---|
| `tool_used` | 工具交互 | tool_name, class_selected, build_shared | GA4 事件出现 |
| `quiz_completed` | 完成职业测试 | result_class, quiz_duration | 完成 quiz 后事件出现 |
| `squad_built` | 提交阵容 | comp_classes, comp_rating | 生成阵容后事件出现 |
| `matchup_viewed` | 点击对局格 | class_from, class_to | 点击格后事件出现 |
| `settings_generated` | 生成设置 | gpu_model, platform | 生成设置后事件出现 |
| `checklist_completed` | 完成清单 | items_checked, items_total | 100% 后事件出现 |
| `content_read` | 内容页阅读 | page, scroll_depth, time_on_page | 页面滚动 50% 后事件出现 |
| `internal_link_click` | 内链点击 | from_page, to_page | 点击内链后事件出现 |
| `build_shared` | 分享 Build | build_url, share_method | 生成分享链接后事件出现 |
| `newsletter_signup` | 邮件订阅（P1） | source_page（email 仅存后端，不进事件参数） | 订阅后事件出现 |

**事件参数红线**：不得携带图片内容、文件名或 PII（skill 硬约束）。

---

## 7. 下游合同与验收 / Downstream Contracts & Acceptance

### 7.1 设计（06）必须覆盖
- 全部 58 路由页面类型：首页 / 工具页 / 内容页 / Hub 页 / 法务页；
- 工具状态：空/输入/处理/成功/失败/超限（含 V1.5 Coming Soon 灰态卡）；
- 移动端 360/390/430 首屏：工具首屏可操作、Hero 动效不干扰 CTA、Mega Menu 触达；
- 设计系统：深色 #0a0a0f~#1a1a2e + 金 #d4a574~#f0c040；Tier 色码（S=金/A=绿/B=蓝/C=灰/D=红）；信任标签配色与竞品 C 不雷同（06 微调）；
- **Logo：原创类官方风格（N2），保留原创过程证据，04 复核相似度**；
- 游戏背景蒙版动效 Hero（循环、低干扰）。

### 7.2 文案（05）必须冻结
- §5 表全部 H1/Title/Meta description（英文，唯一）；
- FAQ 每页 3-5 条（JSON-LD 可序列化）；
- Last Verified + 信任标签文案；
- Footer/About Unofficial 声明（04 合规定稿）；
- 复用素材先登记后使用（台账）；不得在公开页出现竞品对比表（internal benchmark only）。

### 7.3 前后端（07/08）不能自行变更的边界
- 路由矩阵与 indexability（§5.12：仅 /api/* 与 /404 noindex；58 路由全部 index）；
- 匿名 P0 不可被拦截：无登录/无付费墙/无配额墙（N12）；认证或权益服务故障时基础流程 fail-open；
- 工具状态合同（§3）逐项实现；
- 事件参数红线：不含图片内容/文件名/PII；
- 技术栈：Next.js + Workers (OpenNext) + D1 + R2，不用 Pages（requirements-trace #7）；
- 爬取礼貌策略（rate limit / robots）；素材台账登记；logo 原创（N2）。

### 7.4 QA（09）真实用户任务
| 任务链 | 验收判定 |
|---|---|
| 新手链：quiz_completed → 推荐职业 → Build 指南 → 撤离教学 | 全链路可点通；GA4 事件连续 |
| 进阶链：Build Planner → 分享链接 → Matchup Matrix | V1.5 上线后逐批验收；分享 URL 可复现 |
| 组队链：Squad Builder → 角色覆盖评估 → Duo 攻略 | 3 职业评估正确；Duo 页面可达 |
| 经济链：Loot Finder → 获取途径 → 经济攻略 | 搜索正确；来源链接可点 |
| 移动端：360/390/430 首屏 + 工具可操作 | 每个 V1/V1.5 工具在其上线条目内逐批验收（requirements-trace #2） |
| 数据新鲜度：Last Verified / 信任标签可见 | 每内容页核验 |
| 埋点：tool_used/quiz_completed/squad_built 等 | GA4 实时报告可查 |
| 失败态：D1/API 故障 → 静态兜底 + 重试 | 断网/停 API 模拟验收，匿名流程不中断 |

---

## 8. Owner 确认请求（02C）/ Owner Confirmation Request

**本次同意什么 / What this confirmation approves**
1. 本 PRD V1 主文档作为 58 路由、P0 工具状态、Route/Data/Event Contract、验收标准的唯一主真源；
2. §5 逐页唯一 Title/Meta description 作为 05S SEO / 05 文案 / 06 设计 / 07 前端的基础（Trust 页由 04 合规最终定稿）；
3. §4 NOT-DO N1-N12（rev2 已确认口径）原样保留；
4. V1/V1.5 分批方案（6+4）与 58 路由规模不变；
5. 域名仍为 domain_pending，Route Contract canonical 标"待最终域名确认"；本 PRD 不触发注册/DNS/部署。

**放行什么 / What this releases**
- 仅放行：03 定价 / 04 合规 / 05S SEO 基线 并行启动（每阶段只做本阶段报告）；
- 不放行：05 文案、06 设计、07/08 实现、部署、DNS/GSC、公开发布——各自仍有 owner 闸门（05C/06C/上线前确认）。

**若需修改，回复格式 / Reply format**
- 全部确认：`确认 PRD V1，进入专业基线`
- 部分修改：`修改：<章节>｜<改成什么>｜<原因>`
- 需要讨论：`<章节> 不确定，展开讲讲`

---

**Status**: [NEEDS_OWNER_CONFIRM] — PRD V1 主文档完成，等待 02C owner 确认（t_3b007694）。确认前 03/04/05S、文案、设计、实现、部署全部锁定。
