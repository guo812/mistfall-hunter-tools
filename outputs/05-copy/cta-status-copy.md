# CTA & Status Copy — mistfall-hunter（05-copy 配套）

> 阶段 Stage: 05-copy（CTA + 状态文案冻结）
> 日期 Date: 2026-08-08
> 作者 Author: content
> 用途: 全站 CTA 文案与 10 工具状态机文案（空/输入/处理/成功/失败/超限）；CTA 必须是动词+结果；禁止 Upgrade/Buy/Subscribe/Learn More 泛化；禁止付费话术与 Unlimited。
> 依据: PRD V1 §3 状态合同 + §5 模块/CTA + 02D（R2 Steam CTA、E1 Free to use 口径）+ 03 pricing（V1 零付费 UI）。

---

## 1. 全局 CTA 规范

| 场景 | CTA 文案（冻结） | 目标 | 备注 |
|---|---|---|---|
| 首页 Hero 主 CTA | Browse Guides | /guides/tips | 动词+结果；承接搜索意图（看攻略） |
| 首页 Hero 次 CTA | Explore Classes | /classes/mercenary | 承接搜索意图（角色/职业） |
| 首页/工具页/内容页 Steam CTA | Play on Steam | https://store.steampowered.com/app/3282300/Mistfall_Hunter/ | R2；外链；rel 由 10 SEO 评估 |
| 首屏搜索意图直达（4 卡） | Guides & Tips / Classes & Builds / Bosses & Walkthroughs / Meta & Tier List | /guides/tips · /classes/mercenary · /bosses/cursed-moonwane · /tier-list/solo | 承接玩家搜索需求 |
| 导航栏（Desktop） | Guides · Tier List · Classes · Class Quiz · Builds | 对应路由 | Quiz 由首屏移至导航栏 |
| 导航栏（Mobile Bottom） | Home · Tools · Guides · Quiz · More | 对应路由 | Quiz 由首屏移至底部导航 |
| 工具卡（通用） | Open Tool | 对应工具路由 | 10 张工具卡 |
| 内容页 CTA 区（通用） | Try a Tool / Play on Steam | 相关工具 + Steam | 每页至少一个工具 CTA + Steam |
| Footer | Free to use. No account needed. | — | 全免费口径行 |
| 移动端 | 按钮触区 ≥44px；不使用 hover-only | — | QA 验收 |

### 每工具具体 CTA
| 工具 | 主 CTA | 次 CTA | 结果态 CTA |
|---|---|---|---|
| /class-quiz | Start the Quiz | — | View [Class] Build → /builds/[class] |
| /settings | Get My Settings | — | Copy Settings（可复制）+ View Platform Guides |
| /tier-list | Open Tier List | Take the Class Quiz | View Class Guide（每行） |
| /loot-finder | Find an Item | — | Browse the Items Database |
| /items | Browse Items | — | Open Loot Finder |
| /checklist | Start the Checklist | — | Read the Beginner Guide / Extraction Guide |
| /build-planner | Plan a Build | — | Copy Build Link / Share Build |
| /squad-builder | Build a Squad | — | Copy Comp Link / View Matchup Matrix |
| /matchups | Explore Matchups | — | View Class Guide / Read PvP Guide |
| /map | Open the Map | — | Read the Map Guide |

---

## 2. 工具状态机文案（10 工具，统一 6 态）

> 通用状态机：Empty → Inputting → Processing → Success → Failure / Quota。所有工具 P0 匿名可用、无登录、无付费墙；草稿/结果只存 localStorage。

### 2.1 /class-quiz（V1）
- **Empty 空状态**: `Find your best Mistfall Hunter class in 5 questions.` + 进度条 `1 of 5` + 说明行 `Answer based on how you actually play — there are no wrong answers.`
- **Input 输入中**: 每题单选；`Back` 可回退；进度 `2 of 5`…`5 of 5`；`Next` / 末题 `See My Result`。
- **Processing 处理中**: `Matching your playstyle…`（≤300ms 本地计算，轻量 spinner）。
- **Success 成功**: `Your best class: [Class]` + 理由 2-3 条 + `Fit score: [N]%`（本地计算）+ CTA `View [Class] Build` + 分享 `Share result`（?result=class）。
- **Failure 失败**: `The quiz couldn't load. Refresh and try again.` + `Retry`（题库静态 JSON 内联兜底，几乎不可能触发）。
- **Quota 超限**: 无（匿名无限次；页面不写 Unlimited，写 `Free to use. Retake as often as you like.`）。

### 2.2 /settings（V1）
- **Empty**: `Choose your platform to get recommended settings.` + 平台选择（PC / PS5 / Xbox）。
- **Input**: PC → `Select your GPU` + `Resolution` + `Target FPS`；PS5/Xbox → `Select your mode`（质量/性能预设）。
- **Processing**: `Matching settings for your hardware…`（≤300ms）。
- **Success**: `Recommended settings`（列表：画质选项/渲染缩放/FPS cap/V-sync）+ `Copy Settings` + `Last Verified: 2026-08-08` + `Community Report` 标签 + CTA `View Platform Guides`。
- **Failure 降级**: `GPU not recognized — showing the closest tier.` + 说明 `Treat this as a mid-range starting point.`（不阻断）。
- **Quota**: 无（匿名无限次）。

### 2.3 /tier-list（V1，Hub）
- **Empty**: 默认 Solo 榜直接可见（无空态）；Tab `Solo | Trio | Duo | Beginner` 置顶。
- **Input**: Tab/排序切换（综合/生存/爆发/易上手），不刷新页面；URL hash 记录模式（#duo）。
- **Processing**: D1 fetch 骨架屏（失败回退静态 JSON）。
- **Success**: 排行表（S/A/B/C/D 色码）+ 每行理由摘要 + 信任标签 + `Last Verified: 2026-08-08` + CTA `View Class Guide`。
- **Failure**: `Data update failed — showing the last cached version.` + `Retry`。
- **Quota**: 无（匿名；读接口 rate limit 仅防滥用，fail-open）。

### 2.4 /loot-finder（V1）
- **Empty**: 搜索框聚焦态 + `Try a popular item:` + 热门 chips（热门物品名，[DATA-PENDING: 08]）。
- **Input**: 输入即 debounce 300ms；`Searching…` 骨架屏。
- **Success**: 结果卡（物品 + 全部获取途径 + 来源链接 + 信任标签 + Last Verified）+ CTA `Browse the Items Database`。
- **No result**: `No items matched "[query]".` + `Try one of these popular items:` + chips + `More items are added continuously.`（V1 子集说明）。
- **Failure**: `We couldn't query the loot database right now.` + `Retry`（不丢输入）。
- **Quota**: 无硬配额；页面显示 `Free to use.`（服务端 rate limit 仅防滥用）。

### 2.5 /items（V1）
- **Empty**: 筛选器 + `Browse by category:`（武器/护甲/宝石/消耗品）。
- **Input**: 类型/稀有度筛选；`Loading…` 骨架屏。
- **Success**: 分页列表（20/页）+ 详情展开（属性/获取途径）+ CTA `Open Loot Finder`。
- **No result**: `No items match your filters.` + `Clear Filters`。
- **Failure**: `Couldn't load items right now.` + `Retry`（保留筛选条件）。
- **Quota**: 分页上限说明 `Showing the V1 subset — more items are added continuously.`

### 2.6 /checklist（V1）
- **Empty**: `Tick your pre-extract objectives.` + 进度 `0 / [N]`。
- **Input**: 勾选即存 localStorage；`Saved locally` 提示；分组标题（准备/补给/撤离点/战利品规则）。
- **Success 100%**: `Extraction-ready. Good luck out there.` + `Reset` + `Copy list`。
- **Failure (localStorage 不可用)**: `Saving isn't available in this browser — you can still use the checklist for this session.`（不阻断）。
- **Quota**: 无。

### 2.7 /build-planner（V1，R3 可用工具）
- **Empty**: `Choose a class to start planning.` + 6 职业卡。
- **Input**: 天赋树节点点亮/取消 + 装备槽（武器/护甲/宝石）；`Changes saved locally.`
- **Processing**: 分享链接生成 `Creating your build link…`。
- **Success**: Build 摘要卡 + `Copy Build Link` / `Share with squad` + CTA `View Class Guide`。
- **Failure**: `The planner couldn't load.` + `Retry`；分享 URL 超长 → 压缩编码。
- **Quota**: 无（匿名无限次）。

### 2.8 /squad-builder（V1，R3 可用工具）
- **Empty**: `Pick 3 classes for your Trio — or switch to Duo for 2.` + 槽位 3/2 + 6 职业卡池。
- **Input**: 拖拽/点选实时评估；`Evaluating role coverage…`；移动端点选降级。
- **Success**: 阵容评估卡（评分/覆盖雷达/缺位提示/推荐替代）+ `Copy Comp Link` + `Share` + CTA `View Matchup Matrix`。
- **Failure**: 无服务端依赖；仅 UI 降级 `Tap a class to add it.`（拖拽异常）。
- **Quota**: 无。

### 2.9 /matchups（V1，R3 可用工具）
- **Empty**: 6×6 矩阵直接可见（默认 Solo）；对角格 `—`；`Click any matchup for analysis.`
- **Input**: Solo/Trio 切换（不刷新）。
- **Success**: 分析面板（优劣势/关键技能/策略提示）+ CTA `View Class Guide` / `Read the PvP Guide`。
- **Content missing**: `Pending community report.`（内容缺失格）。
- **Failure**: 无服务端依赖；内容缺失降级如上。
- **Quota**: 无。

### 2.10 /map（V1，R3 可用工具）
- **Empty**: 默认视图加载地图 + 图例 + `Filter layers:`（POI/撤离点/Boss/宝箱）。
- **Input**: 平移/缩放；图层筛选切换。
- **Success**: 点击 POI 显示详情卡（名称/类型/说明 + Last Verified）+ CTA `Read the Map Guide`。
- **Failure**: `Map tiles failed to load.` + `Retry`；降级静态图。
- **Quota**: 无。

---

## 3. 信任标签与 Last Verified 文案

- 标签显示：`Verified`（绿） / `Community Report`（黄） / `Needs Update`（红）——配色由 06 微调，不雷同竞品 C。
- 行内格式：`Last Verified: 2026-08-08`（每内容页/工具页可见）。
- 标签定义（E5）固定入 About/Privacy/Terms：
  - Verified = 数据经人工核验官方来源或游戏内实测，且有 Last Verified 日期。
  - Community Report = 社区/视频来源汇总，未经官方确认。
  - Needs Update = 补丁后待更新。

## 4. 状态文案质量门槛自检
- [x] CTA 全部动词+结果（Take/Build/Get/Open/Find/Browse/Explore/Plan/Copy）
- [x] 无 Learn More 泛化
- [x] 无 Upgrade/Buy/Subscribe/Pro/Lifetime 付费话术
- [x] 无 Unlimited / free forever / 100% free
- [x] 每工具 6 态齐全（无配额态则显式说明）
- [x] 失败态均提供 Retry 或降级路径，不丢用户输入

**状态行：[DONE] — CTA 与状态文案冻结完成；移动端触区与 hover 降级约束已写入。**
