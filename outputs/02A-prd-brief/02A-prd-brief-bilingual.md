# PRD Brief — Mistfall Hunter 决策引擎工具+攻略站
# PRD Brief — Mistfall Hunter Decision-Engine Tool & Guide Site

> **阶段 Stage**: 02A PRD Brief（产品边界确认件 / product boundary confirmation）
> **日期 Date**: 2026-08-08
> **作者 Author**: prd (moce)，基于已冻结研究 inputs/01-research/mistfall-hunter-prd-brief-v2.md（zhaoci，owner 已确认为研究基线）
> **状态 Status**: [NEEDS_REVIEW] — 等待 owner 确认产品边界（02B 硬闸门）
> **语言 Language**: 中英双语。英文保留关键词/路由/标题供 SEO/copy/frontend 下游直接使用；中文解释业务含义与确认点。

---

## 0. 结论先行 / Executive Summary

**做什么 / What we build (1 sentence)**
A free, unofficial, mobile-first **decision engine** for Mistfall Hunter players — interactive tools (class quiz, squad builder, matchup matrix, settings recommender) plus 48 deep guide pages that help players pick, build, squad up, and extract smarter.

做一个免费、非官方、移动端优先的 Mistfall Hunter **决策引擎**：用互动工具（职业测试、阵容构建器、对局矩阵、设置推荐器）+ 48 页深度攻略，帮玩家选职业、配 Build、组阵容、更聪明地撤离。

**为什么能做 / Why we can win**
- Market timing 市场时机：游戏 2026-07-29 上线仅 10 天，1M+ 玩家，SERP 格局未定型；IGN/Fextralife/Game8 等大站覆盖极浅（各 1-2 篇）。
- Competitor gaps 竞品缺口：3 个主要非官方站各有硬伤——MistfallDB 有数据无引导、mistfallhunters.wiki 有内容无工具、mistfallhunters.com 有信任体系但两者皆弱；6 个高需求缺口无人填补（Squad Builder / Class Quiz / Matchup Matrix / Settings Recommender / Duo Hub / Patch Tracker）。
- Differentiation 差异化：竞品用户行为是"搜→看→走"，我们是"搜→用工具→做决策→回来复用"，粘性来自工具输出可分享、可迭代。

**首版规模 / Launch scope**
- 58 个可索引路由 / 58 indexable routes：1 首页 + 10 工具页 + 43 内容页 + 4 信任/法务页（sitemap ≥ 58 URLs 是硬验收，见 requirements-trace #1）。
- 10 个工具分两批 / 10 tools in two batches：V1 首发 6 个（🟢 简单/🟡 中等复杂度），V1.5 上线后 2-4 周补 4 个（🔴 复杂交互）。分批理由与清单见 §5。
- 域名 Domain：mistfallhunter.gg（首选，未注册；Spaceship 实测可注册，首年约 $51.20，等 owner 注册授权）；候选 mistfallhunter.co（可 301）/ mistfalltools.com。
- 技术栈 Tech：Next.js + TypeScript + Tailwind，部署 Cloudflare Workers (OpenNext)，不用 Pages；D1 存结构化数据，R2 存图。
- 商业化 Monetization：首版全部免费、无登录、无付费墙；Pro/模板变现仅作为 03 定价阶段评估项，本 brief 不做承诺。

---

## 1. 市场概述 / Market Overview

| Attribute 属性 | Detail 详情 |
|---|---|
| Game 游戏 | Mistfall Hunter — PvPvE extraction ARPG（撤离制 ARPG，含玩家对抗） |
| Developer 开发商 | Bellring Games |
| Publisher 发行商 | Skystone Games（David Brevik，暗黑破坏神缔造者） |
| Launch 上线 | 2026-07-29 |
| Platforms 平台 | PC (Steam) / PS5 / Xbox Series X\|S，支持 Crossplay 跨平台 |
| Players 玩家 | 1M+（上线 10 天）；Steam 峰值同时在线约 45K |
| Engine 引擎 | Unreal Engine 5 |
| Modes 模式 | Solo / Duo（无官方匹配）/ Trio / Crossplay |
| Monetization 游戏付费 | 免费 + 外观（非 P2W） |
| Classes 职业 | 6 个：Mercenary 佣兵 / Sorcerer 法师 / Blackarrow 黑箭 / Shadowstrix 影刺 / Seer 先知 / Withered Knight 枯骑士；每职业 2 姿态（Dual Stance 双姿态系统） |
| Seasons 赛季 | 已确认有赛季 wipe（定期清档） |

**市场阶段判断 / Market stage**: 🟢 early opportunity 早期窗口
- SERP 未定型，垂直工具站空位明显；YouTube 创作者生态活跃（build/tier list/1000h 视频多）= 搜索需求强。
- 风险面：游戏若停止更新则搜索量下滑（extraction ARPG 品类通常生命周期长，有赛季制支撑）。

---

## 2. SERP 与竞品分析 / SERP & Competitor Analysis

### 2.1 SERP 现状 / Current SERP positions

| # | Site 站点 | Domain 域名 | Type 类型 | Data 数据深度 | Tools 工具 UX | Content 内容深度 | 强项 strong | 弱项 weak |
|---|---|---|---|---|---|---|---|---|
| A | MistfallDB | mistfalldb.com | 数据库+工具 | ★★★★★ | ★★★★★ | ★★★ | 599 武器/1584 护甲数据、工具链完整 | 无新手引导、无阵容/测试/对局工具 |
| B | Mistfall Hunters Wiki | mistfallhunters.wiki | 内容 Wiki | ★★ | ★★ | ★★★★★ | 60+ 页内容、Hub-Spoke 结构、SEO 成熟 | 工具仅 4 个且极简，无交互深度 |
| C | Mistfall Hunters | mistfallhunters.com | 信任+AI | ★★★ | ★★ | ★★★ | 事实可信度标签体系、来源标注 | 数据量小、Tier List 过期（Jun 17） |
| D | Mistfall Hunter Wiki | mistfallhunter.wiki | 社区 Wiki | ★★ | ★ | ★★ | MediaWiki 生态 | 工具极弱、移动端差 |
| E | mistfallhunter.cc | mistfallhunter.cc | 攻略 Wiki | ★★★ | ★★ | ★★★ | 分平台设置指南（PC/PS5/Xbox） | MediaWiki、工具弱 |
| F | IGN / Game8 / Fextralife | — | 大媒体 | ★ | ★ | ★★ | 域名权重高 | 各仅 1-2 篇，不垂直 |

### 2.2 逐竞品拆解 / Per-competitor analysis（借鉴点 / 可超越点 / 风险点）

**A — MistfallDB（主竞品，工具标杆 / tool benchmark）**
- 定位：查数据（search→view→leave）。
- 可借鉴 borrow：工具链互链（A1）、首页数据规模展示（A2）、Loot Finder 反向查获取途径（A3）、Build 分享 URL（A9）、Mega Menu 五组导航（A7）、卡片式首页（A8）、全局搜索（A10）、反馈按钮（A11）。
- 可超越 surpass：它没有 Squad Builder / Class Quiz / Matchup Matrix / Codes 追踪 / 补丁时间线 / 新手引导 / Duo 内容——这 7 项全是我们的 P0/P1。
- 风险点 risk：599 武器 / 1584 护甲的数据护城河短期追不上 → 不比数据量，比决策工具；数据页 v1 只做高频子集。
- 对产品边界影响：我们的 Item Database v1 明确"小而准"，不做全量复刻（NOT-DO）。

**B — mistfallhunters.wiki（内容标杆 / content SEO benchmark）**
- 定位：读攻略（search→read→leave）。
- 可借鉴 borrow：Hub→Spoke 内容组织（B2）、每页 FAQ Schema（B6）、5-15 条内链密度（B7）、Title/Meta 格式带时间戳（B8/B12）、Quick Stats Bar（B4）、Featured Guides（B9）、限时奖励倒计时（B3）、新手 7 步引导（B1，我们升级为可点击交互版）。
- 可超越 surpass：工具几乎为零（仅 Class Picker 对比表）→ 我们用互动工具承接同样流量；其纯文本内容缺交互体验。
- 风险点 risk：60+ 页内容量领先 → v1 48 页以质取胜 + 每页嵌工具 CTA。
- 对产品边界影响：48 页内容矩阵的 Hub 结构直接沿用其信息架构。

**C — mistfallhunters.com（信任体系标杆 / trust benchmark）**
- 定位：验事实（search→verify→leave）。
- 可借鉴 borrow（选择性）：可信度标签简化版（Verified / Community Report / Needs Update，只用于 Tier List 和关键数据，C1）、来源标注（C2）、每页 Last Verified 日期（C3）、首页 Fast Facts 表（C7）。
- 可超越 surpass：其数据量、工具、内容深度、更新频率全弱；Tier List 已过期。
- 风险点 risk：AI Q&A / 直播嵌入是其差异点，列 P2 观察。
- 对产品边界影响：信任标签是我们"诚实非官方站"定位的落地机制（合规友好）。

**D/E — 两个 Wiki（次要 / secondary）**：借鉴 E 的分平台设置指南思路（PC/PS5/Xbox 各一页 + 手柄 vs 键鼠对比页）；其余以工具+内容正面超越。
**F — 大媒体（IGN/Game8/Fextralife）**：不构成垂直竞争；其存在反而验证搜索需求。

**internal benchmark only / 仅内部对标声明**：以上竞品名称、对比结论只用于内部产品决策；公开页面（landing/SEO copy/about）不得出现竞品名、竞品对比表或替代关系表述，只表达本站能力、差异化与免费/非官方承诺。（合规硬约束，04 阶段复核。）

### 2.3 竞品共性弱点（= 我们的机会）/ Common weaknesses
1. 无人做互动阵容构建（Squad Builder）与 PvP 对局矩阵（Matchup Matrix）。
2. 无人做职业测试（Class Quiz）——新手最大痛点"不知道选什么职业"。
3. 无人做交互式设置推荐（Settings Recommender）——5+ 家媒体写设置文章证明需求存在。
4. 无人做 Duo 专属内容（游戏无官方 Duo 匹配，Reddit 大量抱怨 = 内容缺口）。
5. 无人做补丁后 Tier 变动追踪（Patch Meta Tracker）。
6. 全部竞品移动端体验一般；玩家大量在游戏间隙用手机搜索。

---

## 3. 目标用户 / Target Users (ICP)

### ICP-1 新手玩家 New Player（主 ICP，约 50%）
- 画像：刚入坑，不知道选什么职业、怎么撤离、怎么配装。
- 痛点：信息过载 / 怕选错职业 / 不知从哪开始。
- 搜索词：`mistfall hunter best class` / `mistfall beginner guide` / `mistfall hunter how to extract` / `mistfall hunter tips`。
- 我们给什么：Class Quiz 测职业 → 职业页 → Build 指南 → 撤离教学 → 交互式新手旅程。
- 付费意愿：低（贡献流量与 SEO 权重）。

### ICP-2 进阶玩家 Mid-Core Player（约 25%）
- 画像：10-50 小时，想优化 Build、懂 Meta、提升 PvP。
- 痛点：试错成本高 / 不知道为什么 PvP 输 / 不知道补丁后 Meta 变化。
- 搜索词：`mistfall hunter build` / `mistfall hunter tier list` / `mistfall hunter pvp` / `mistfall hunter matchup`。
- 我们给什么：Build Planner → PvP Matchup Matrix → Patch Meta Tracker（P1）。
- 付费意愿：中（可能为高级 Build 模板付费 → 03 定价评估项）。

### ICP-3 三排/双排固定队 Trio/Duo Fixed Squad（约 15%）
- 画像：有固定队友，要优化阵容。
- 痛点：不知道三人选什么 / 补丁后最优阵容变化 / Duo 无官方匹配。
- 搜索词：`mistfall hunter best trio comp` / `mistfall hunter team composition` / `mistfall hunter duo`。
- 我们给什么：Squad Comp Builder → 阵容评估 → Duo 专属 Hub。
- 付费意愿：中高。竞品空白市场。

### ICP-4 经济玩家 Economy Player（约 10%）
- 画像：拍卖行倒卖、刷金、制造利润。
- 痛点：不知道什么值钱 / 算不清制造成本 / 市场价波动。
- 搜索词：`mistfall hunter gold farming` / `mistfall hunter auction house` / `mistfall hunter flipping`。
- 我们给什么：Loot Finder → 经济攻略 →（P1：制造成本/利润计算器）。
- 付费意愿：中。

**核心用户任务链 / Core user task chains（产品主骨架）**
1. 新手链：`quiz_completed → 职业推荐 → Build 指南 → 撤离教学`（ICP-1）
2. 进阶链：`Build Planner → 分享链接 → Matchup Matrix → 补丁后复查`（ICP-2）
3. 组队链：`Squad Builder → 角色覆盖评估 → Duo/Trio 攻略`（ICP-3）
4. 经济链：`Loot Finder → 获取途径 → 经济攻略`（ICP-4）
每条链的每一步都有下一步 CTA（工具链互链，借鉴 A1）。

---

## 4. 产品定位 / Product Positioning

### One-liner 一句话定位
> EN: **"Mistfall Hunter's decision engine — tools that help you pick, build, squad up, and extract smarter."**
> CN: "Mistfall Hunter 的决策引擎 —— 帮你选职业、配 Build、组阵容、更聪明地撤离。"

### 定位对比 / Differentiation

| Dimension 维度 | MistfallDB | mistfallhunters.wiki | mistfallhunters.com | **Us 我们** |
|---|---|---|---|---|
| Core value 核心价值 | 查数据 | 读攻略 | 验事实 | **做决策** |
| User behavior 用户行为 | 搜→看→走 | 搜→读→走 | 搜→验→走 | 搜→用工具→决策→复用 |
| Stickiness 粘性 | 低 | 低 | 低 | **高**（输出可分享/迭代） |
| Data depth 数据深度 | ★★★★★ | ★★ | ★★★ | ★★★（v1 小而准，逐步补） |
| Tool UX 工具体验 | ★★★★★ | ★★ | ★★ | ★★★★★（+4 独家工具） |
| Trust 信任体系 | ★★★ | ★★★ | ★★★★★ | ★★★★（简化标签） |

### 站点类型 / Site type
混合站 hybrid：决策引擎工具站 60% + 攻略内容站 30% + 信任体系 10%。
工具与内容不是两个模块拼接，而是互链闭环：每个工具页挂攻略 CTA，每篇攻略嵌工具入口。

### NOT-DO 明确不做（产品边界红线）
| # | NOT-DO 不做 | 原因 |
|---|---|---|
| 1 | ❌ 不暗示官方身份；全站页脚标注 "Unofficial fan resource. Not affiliated with Bellring Games or Skystone Games." | 启动卡硬约束 + DMCA/UDRP 风险 |
| 2 | ❌ 不使用官方 logo / 官方素材做站点品牌 | 版权风险（启动卡硬约束） |
| 3 | ❌ 不自动爬取游戏数据 | 启动卡硬约束；数据一律人工整理 + 来源标注 |
| 4 | ❌ 不复制竞品文案/图表/设计/配色编码；同题可写，表达必须原创 | 启动卡硬约束 |
| 5 | ❌ 不做视频内容 | YouTube 生态已饱和 |
| 6 | ❌ 不做论坛/社区 | Reddit/Discord 已存在 |
| 7 | ❌ 不做新闻/更新速度竞赛 | wiki 类站已覆盖；我们做补丁后的"Meta 解读"而非快讯 |
| 8 | ❌ 不做商店/电商/代练 | 非产品方向 |
| 9 | ❌ 不做 P2W 相关内容 | 游戏非 P2W，维护社区信任 |
| 10 | ❌ v1 不做全量物品数据库 | MistfallDB 数据护城河短期追不上；只覆盖高频物品 |
| 11 | ❌ v1 不做多语言、AI Q&A、直播嵌入、社区投稿 | 列 P2，避免首版失焦 |
| 12 | ❌ 首版不做登录/注册/付费墙 | 全部工具匿名可用；变现由 03 定价阶段单独评估并走 owner 闸门 |

---

## 5. 功能规划 / Feature Plan

### 5.0 工具复杂度分层（分批依据）/ Complexity tiers
- 🟢 简单 Simple：表单 + 静态 JSON + 输出展示（Class Quiz / Settings Recommender / Tier List / Checklist）
- 🟡 中等 Medium：搜索 + 多条件筛选 + 分页（Loot Finder / Items Database）
- 🔴 复杂 Complex：拖拽/画布/实时状态管理（Squad Builder / Matchup Matrix / Build Planner / Interactive Map）

### 5.1 P0-A：V1 首发工具（6 个）/ V1 launch tools
| # | Tool 工具 | Route 路由 | User task 用户任务 | Tier 复杂度 | Differentiation 差异化 |
|---|---|---|---|---|---|
| T3 | Class Quiz 职业测试 | `/class-quiz` | 答 5 题 → 推荐最适职业 + 理由 + 推荐 Build 链接 | 🟢 | **独家**（超越 B 的对比表 Picker） |
| T5 | Settings Recommender 设置推荐器 | `/settings` | 输入 GPU/分辨率/平台 → 输出最优画质/FPS 设置（PC/PS5/Xbox） | 🟢 | **独家**（无竞品有此交互工具） |
| T6 | Tier List 梯度榜 | `/tier-list` | Solo/Trio/**Duo**/Beginner 四维排名 + 并排对比切换 | 🟢 | Duo 维度独家 + 信任标签 |
| T8 | Loot Finder 掉落查询 | `/loot-finder` | 搜物品 → 显示全部获取途径（Boss/宝箱/NPC/制造） | 🟡 | 追平 A（必备工具） |
| T9 | Items Database 物品库 | `/items` | 武器/护甲/宝石/消耗品可搜索列表（v1 高频子集） | 🟡 | 追平 A（小而准） |
| T10 | Extraction Checklist 撤离清单 | `/checklist` | 交互清单（勾选、localStorage 保存） | 🟢 | 超越 B 的静态可打印版 |

### 5.2 P0-B：V1.5 工具（上线后 2-4 周，4 个）/ V1.5 tools
| # | Tool 工具 | Route 路由 | User task 用户任务 | Tier 复杂度 | 说明 |
|---|---|---|---|---|---|
| T2 | **Squad Comp Builder 阵容构建器** | `/squad-builder` | 拖拽 3 职业组队 → 评估强弱/角色覆盖/缺位/协同推荐 | 🔴 | **独家旗舰**；需要拖拽交互打磨 |
| T4 | **PvP Matchup Matrix 对局矩阵** | `/matchups` | 6×6 交互矩阵，点格看对局分析与策略，Solo/Trio 切换 | 🔴 | **独家**；需要逐对局内容撰写 |
| T1 | Build Planner 配装规划器 | `/build-planner` | 点天赋、配 Build、生成分享链接 | 🔴 | 追平 A 核心工具；天赋树交互复杂 |
| T7 | Interactive Map 交互地图 | `/map` | 平移/缩放/筛选 + POI/撤离点/Boss 标记 | 🔴 | 需要地图素材与标注工作量 |

**分批理由 / Phasing rationale**：
1. V1 六个工具全部 🟢/🟡，可在约 1 周内高质量上线，抢先占住 SERP 窗口；
2. 四个 🔴 工具（含 2 个独家旗舰）需要拖拽/画布/内容打磨，放 V1.5 保证质量，V1.5 上线本身触发 Google 再抓取 = 二次曝光；
3. 全部 10 个工具的路由、H1、sitemap 在 V1 就存在（V1.5 四个先落"预告卡片 + Coming Soon 状态"或随 V1 直接可交互，见 owner 确认项 #4）；内容页 48 页全部随 V1 上线，SEO 不受分批影响。
4. requirements-trace #2 的验收口径（4 独家工具独立路由/首屏可操作/移动端 360/390/430）对每个工具在其上线批次（V1 或 V1.5）逐批验收。

### 5.3 P0 内容（48 页，全部随 V1 上线）/ Content pages
| # | 类型 Type | 页数 | Route pattern 路由 | 用户任务/差异 |
|---|---|---|---|---|
| C1 | Class guides 职业页 | 6 | `/classes/[class]` | 每职业深度指南 + 嵌 Class Quiz 结果链接 |
| C2 | Build guides 配装页 | 6 | `/builds/[class]` | 每职业 Build + 嵌 Build Planner CTA |
| C3 | Tier List 子页 | 4 | `/tier-list/[mode]` | solo/trio/duo/beginner；Duo 独家 + 信任标签 |
| C4 | Map guides 地图页 | 2 | `/maps/[name]` | Hallowgrove / Brandrgarde + 嵌交互地图 |
| C5 | Boss guides Boss 页 | 3 | `/bosses/[name]` | Cursed Moonwane / Salmar / Einherjar |
| C6 | System guides 系统攻略 | 10 | `/guides/[topic]` | 撤离/技巧/双姿态/营地/升级/钥匙/PvP 等 + 工具嵌入 |
| C7 | Codes 兑换码 | 3 | `/codes/[topic]` | 奖励/兑换方法/Twitch Drops + 倒计时 |
| C8 | Beginner 新手 | 3 | `/guides/[beginner]` | 入门/首次撤离/FAQ + 交互旅程 |
| C9 | Settings 设置 | 3 | `/guides/[settings]` | PC/PS5/Xbox 分平台 + 嵌 Settings Recommender |
| C10 | Economy 经济 | 2 | `/guides/[economy]` | 拍卖行/刷金 + 嵌 Loot Finder |
| C11 | Duo/Solo 专属 | 2 | `/guides/[mode]` | **独家**（Duo 无官方匹配痛点） |
| C12 | Trust pages 信任页 | 4 | `/about` `/privacy` `/terms` `/contact` | 含 Unofficial 声明（04 合规阶段定稿） |
| | **合计 Total** | **48** | | |

### 5.4 P1（上线后 2-4 周迭代）/ Post-launch sprint
Damage Calculator 伤害计算 / Item Comparison 物品对比 / Crafting Cost 制造成本 / Craft & Flip Profit 倒卖利润 / Gem Optimizer 宝石优化 / Patch Meta Tracker 补丁 Meta 追踪（独家）/ Boss Timeline Boss 时间轴 / Extraction Route Planner 撤离路线规划。

### 5.5 P2（1-3 个月）/ Future
AI Q&A / 直播嵌入 / 拍卖价格趋势 / 赛季清档计算器 / 键位速查表 / 多语言（日/西/德）/ 社区投稿（审核后发布）。

### 5.6 数据合同基线 / Data contract baseline（细节在 PRD V1）
- 游戏数据来源：**人工整理**（官方补丁说明/商店页/社区验证），不爬取；每条关键数据带来源链接与 Last Verified 日期。
- 客户端状态：工具草稿/清单勾选只存 localStorage，不上传服务器；无账号体系。
- 图片：自制截图或有权属保障的素材；不使用官方 logo 与竞品图（素材权属由 04 合规 + 06 设计复核）。
- Newsletter（补丁通知邮件）：列 P1，收集邮箱前必须过 04 合规（Privacy 覆盖邮件订阅）。

---

## 6. 页面信息架构 / Page Information Architecture

**Homepage `/` 首页**（融合 B 的 Hero+Stats+引导 / A 的工具卡片 / C 的 Fast Facts）：
Hero（游戏背景蒙版动效 + 品牌口号 + 双 CTA [Take the Class Quiz] [Browse Tools]）→ Quick Stats Bar（6 Classes | 12 Stances | 10 Tools | 48 Guides）→ 交互式新手 3 步旅程 → Tools Grid（V1 工具卡 + V1.5 Coming Soon 灰态卡）→ Featured Guides 6 卡 → Latest Updates → Quick Facts 表 → Codes 倒计时 → Footer（含 Unofficial 声明）。

**Tool pages 工具页**：H1=工具名+Mistfall Hunter → 首屏即可操作的交互区（不滚动就能用，移动端 360/390/430 硬验收）→ How to Use 2-3 步 → 下一步 CTA（工具链互链）→ FAQ 3-5 条（JSON-LD）→ 相关工具/攻略卡。

**Content pages 内容页**：H1 精确匹配主词 → 副题 Last Verified + 信任标签 → TOC 锚点 → 正文 2000-3000 词（嵌工具 CTA + 5-15 内链）→ FAQ Schema → 相关攻略/工具卡。

**Hub pages Hub 页**：主题 H1 + 100-200 词导语 + 子页卡片网格 + FAQ。

---

## 7. Route Contract 路由合同（58 indexable，草案）

> 每页唯一 H1 已定；唯一 Title/Meta description 按 §11 格式在 PRD V1（02）逐页回填（metadata contract 字段已预留，不留白给下游）。

#### Core 核心（1）
| Route 路由 | H1 | Index |
|---|---|---|
| `/` | Mistfall Hunter Tools, Builds & Tier List | ✅ |

#### Tools 工具页（10）
| Route | H1 | 中文用途 | Batch 批次 | Index |
|---|---|---|---|---|
| `/build-planner` | Mistfall Hunter Build Planner | 配装规划器 | V1.5 | ✅ |
| `/squad-builder` | Mistfall Hunter Squad Comp Builder | 阵容构建器（独家） | V1.5 | ✅ |
| `/class-quiz` | Mistfall Hunter Class Quiz — Find Your Best Class | 职业测试（独家） | V1 | ✅ |
| `/matchups` | Mistfall Hunter PvP Matchup Matrix | 对局矩阵（独家） | V1.5 | ✅ |
| `/settings` | Mistfall Hunter Best Settings & FPS Guide | 设置推荐器（独家） | V1 | ✅ |
| `/tier-list` | Mistfall Hunter Tier List | 梯度榜 Hub | V1 | ✅ |
| `/map` | Mistfall Hunter Interactive Map | 交互地图 | V1.5 | ✅ |
| `/loot-finder` | Mistfall Hunter Loot Finder | 掉落查询 | V1 | ✅ |
| `/items` | Mistfall Hunter Items Database | 物品库 | V1 | ✅ |
| `/checklist` | Mistfall Hunter Extraction Checklist | 撤离清单 | V1 | ✅ |

#### Classes 职业（6）
`/classes/mercenary` `/classes/sorcerer` `/classes/blackarrow` `/classes/shadowstrix` `/classes/seer` `/classes/withered-knight`
H1 模板：`Mistfall Hunter [Class] Class Guide`（6 页全部 index ✅）

#### Builds 配装（6）
`/builds/mercenary` `/builds/sorcerer` `/builds/blackarrow` `/builds/shadowstrix` `/builds/seer` `/builds/withered-knight`
H1 模板：`Mistfall Hunter [Class] Build Guide`（6 页全部 index ✅）

#### Tier List 子页（4）
`/tier-list/solo` `/tier-list/trio` `/tier-list/duo` `/tier-list/beginner`
H1 模板：`Mistfall Hunter [Mode] Tier List`（4 页全部 index ✅）

#### Maps 地图（2）
`/maps/hallowgrove` `/maps/brandrgarde` — H1：`Mistfall Hunter [Name] Map Guide` ✅

#### Bosses（3）
`/bosses/cursed-moonwane` `/bosses/salmar` `/bosses/einherjar` — H1：`Mistfall Hunter [Name] Boss Guide` ✅

#### Guides 攻略（17）
`/guides/getting-started`（新手入门）/ `/guides/first-extraction`（首次撤离）/ `/guides/extraction`（怎么撤离）/ `/guides/tips`（技巧）/ `/guides/faq`（FAQ）/ `/guides/dual-weapon-stances`（双姿态）/ `/guides/camp-upgrades`（营地升级）/ `/guides/scavenger-squads`（拾荒队）/ `/guides/leveling`（升级）/ `/guides/keys-treasure`（钥匙与宝库）/ `/guides/pvp-survival`（PvP 生存）/ `/guides/pc-settings`（PC 设置）/ `/guides/ps5-settings`（PS5 设置）/ `/guides/xbox-settings`（Xbox 设置）/ `/guides/controller-vs-kbm`（手柄 vs 键鼠）/ `/guides/auction-house`（拍卖行）/ `/guides/gold-farming`（刷金）
（17 页全部 index ✅，H1 见 Brief V2 §10 原文）

#### Codes 兑换码（3）
`/codes/rewards`（奖励码汇总）/ `/codes/how-to-redeem`（兑换方法）/ `/codes/twitch-drops`（Twitch Drops）✅

#### Duo/Solo 专属（2）
`/guides/duo`（双人指南，独家）/ `/guides/solo-survival`（单人生存）✅

#### Trust 信任页（4）
`/about` `/privacy` `/terms` `/contact` ✅（文案由 04 合规定稿；Title/meta 合规阶段收口，不得过度承诺）

#### Noindex 不收录
`/api/*`（接口）/ `/404`（错误页）

**薄内容防线 / Thin-content guard**：58 页每页有独立搜索意图、独立用户任务、独立 FAQ/内链角色；禁止近义词换词页。后续扩页以 GSC 查询/收录/任务完成信号为依据。

---

## 8. 域名与技术栈 / Domain & Tech Stack

### Domain 域名（待 owner 注册授权，本阶段不做任何注册/DNS 动作）
| Priority | Domain | 说明 |
|---|---|---|
| 🥇 | mistfallhunter.gg | .gg 游戏社区认知度最高；Spaceship 实测可注册，首年约 $51.20 |
| 🥈 | mistfallhunter.co | 可选，注册后 301 到主域（待 owner 决定） |
| 🥉 | mistfalltools.com | .com 权威但词根弱 |

**状态 Status**: `domain_pending` — Route Contract/canonical/GSC/DNS 等章节在最终域名确认前一律标"待最终域名确认"；不触发付费注册、DNS 变更、Cloudflare zone 绑定或任何公开发布。

### Tech stack 技术栈
| Layer | Choice | Reason |
|---|---|---|
| Frontend | Next.js 14 + TypeScript + Tailwind CSS | SSR/SSG 灵活；用户偏好 |
| Deploy | **Cloudflare Workers (OpenNext)，不用 Pages** | 用户硬偏好 |
| Database | Cloudflare D1 | 结构化游戏数据 |
| Storage | Cloudflare R2 | 图片素材 |
| Analytics | GA4 + Cloudflare Web Analytics | 转化追踪 |
| SEO | 静态优先 + 工具页 ISR | 性能与新鲜度平衡 |
| i18n | 预留 next-intl 架构，v1 仅英文 | P2 多语言准备 |

---

## 9. 视觉风格方向 / Visual Style Direction
- **色板 Palette**：深色底 #0a0a0f~#1a1a2e（暗黑奇幻）；金色点缀 #d4a574~#f0c040（Gyldenblood/Gyldenmist 主题）；Tier 编码 S=金/A=绿/B=蓝/C=灰/D=红；信任标签 绿=Verified/黄=Community/红=Needs Update（配色编码不与竞品 C 雷同，06 设计阶段微调）。
- **设计语言**：卡片式布局（游戏 wiki 标准范式）；**游戏背景蒙版动效 Hero**（owner 要求：沉浸感，动效循环不干扰 CTA）；工具首屏可操作；mobile-first（320~1920 全断点，重点 360/390/430）；Mega Menu 五组导航。
- **Must avoid 禁止**：不抄 MistfallDB 组件代码/布局；不抄 mistfallhunters.com 信任标签配色编码；不用竞品原创图表截图；不用官方 logo。

---

## 10. 转化漏斗与埋点 / Conversion Funnel & Events
漏斗 Funnel：`SEO 落地 → 工具使用 → 有价值结果 → 分享/书签 → 回访`（分支：Newsletter 订阅，P1）。

| Event 事件 | Trigger 触发 | Params 参数（不含任何图片内容/文件名/PII） |
|---|---|---|
| `tool_used` | 工具交互 | tool_name, class_selected, build_shared |
| `quiz_completed` | 完成职业测试 | result_class, quiz_duration |
| `squad_built` | 提交阵容 | comp_classes, comp_rating |
| `matchup_viewed` | 点击对局格 | class_from, class_to |
| `settings_generated` | 生成设置 | gpu_model, platform |
| `checklist_completed` | 完成清单 | items_checked, items_total |
| `content_read` | 内容页阅读 | page, scroll_depth, time_on_page |
| `internal_link_click` | 内链点击 | from_page, to_page |
| `build_shared` | 分享 Build | build_url, share_method |
| `newsletter_signup` | 邮件订阅（P1） | source_page（email 仅存后端，不进事件参数） |

---

## 11. 风险评估 / Risk Assessment

**P0（必须处理）**
| # | Risk 风险 | Mitigation 缓解 |
|---|---|---|
| R1 | 品牌 DMCA / UDRP（域名含游戏名） | 全站 Unofficial 声明；不用官方 logo；About 明示非官方；04 合规复核 |
| R2 | 数据准确性（玩家信任崩塌） | 每页 Last Verified；信任标签；补丁后 24h 内更新机制（运营阶段定 SOP） |
| R3 | 域名未注册（mistfallhunter.gg 随时可能被抢） | owner 尽快决策注册；本 brief 不触发注册动作 |

**P1（需要关注）**
| # | Risk | Mitigation |
|---|---|---|
| R4 | MistfallDB 数据护城河 | 工具差异化竞争；数据小而准逐步补 |
| R5 | 内容量差距（对手 60+ 页） | v1 48 页以质取胜 + 每页工具 CTA |
| R6 | 新域 SEO 冷启动 3-6 个月 | 高内链密度 + FAQ Schema + 工具页天然吸链 |
| R7 | V1.5 分批若独家旗舰工具延期，差异化空窗 | 分批方案为 owner 确认项；若 owner 要求全量首发则重排工期 |

**P2（可承受）**：大媒体下场（通常不做垂直工具站）；竞品跟进（先发+持续迭代）。

---

## 12. 交接摘要 / Downstream Handoff

| Stage 下游 | Must read 必读 | Key input 关键输入 |
|---|---|---|
| 03 定价 | 本 brief §0/§3/§4（免费为主 + ICP 付费意愿） | 判断 Pro/模板变现是否成立 |
| 04 合规 | §4 NOT-DO + §5.6 数据合同 + §11 R1/R2 | Privacy/Terms/Cookie/Disclaimer/素材权属 |
| 05S SEO | §7 Route Contract + §13→本 brief §7/§10 格式 | Title/Meta/Schema/Sitemap 执行基线 |
| 05 文案 | §3 ICP + §5/§6/§7 | 58 页文案（英文） |
| 06 设计 | §6/§9 + §5 工具交互 | 视觉真源 + 移动端首屏 |
| 07/08 前后端 | §8 技术栈 + §7 Route Contract + §5.6 数据合同 | Next.js + Workers (OpenNext) + D1/R2 |

**不能假设 / Cannot assume**：域名已注册；游戏数据已结构化（需人工整理）；工具已实现；游戏不会更新。
**仍锁定 / Still locked**：PRD V1、定价、合规、SEO 基线、文案、设计、实现、部署、一切公开动作——全部等 02B/02C 及后续 owner 闸门。

---

## Owner 确认清单 / Owner Confirmation Checklist（02B）

请逐项确认；这是产品边界的唯一确认依据。确认后才进入 PRD V1 完整文档（02）。

| # | 确认项 | 当前方向 | 确认 |
|---|---|---|---|
| 1 | 站点类型 Site type | 决策引擎混合站：工具 60% + 内容 30% + 信任体系 10%，非官方粉丝站 | ✅ / ❌ |
| 2 | 产品定位 Positioning | "决策引擎"：借鉴 A 工具链 + B 内容结构 + C 信任标签，竞品对比仅内部使用，不上公开页面 | ✅ / ❌ |
| 3 | 独家差异化工具 Differentiators | Squad Builder / Class Quiz / Matchup Matrix / Settings Recommender / Duo 内容 / Patch Tracker | ✅ / ❌ |
| 4 | 首版工具分批 Tool phasing | **V1 首发 6 个**（Class Quiz / Settings / Tier List / Loot Finder / Items / Checklist）+ **V1.5 上线后 2-4 周 4 个**（Squad Builder / Matchup Matrix / Build Planner / Interactive Map）；58 路由与 48 内容页全部 V1 存在。备选：10 个全量首发（工期 +1~2 周） | ✅ / ❌ |
| 5 | 首版页面规模 Page count | 58 个可索引路由（10 工具 + 44 内容/信任页），每页独立意图/H1/FAQ/内链，不做薄页 | ✅ / ❌ |
| 6 | NOT-DO 红线 | §4 十二条：非官方声明、不爬数据、不抄竞品、不用官方 logo、无登录付费墙、无视频/论坛/新闻/商店等 | ✅ / ❌ |
| 7 | 域名方向 Domain | 首选 mistfallhunter.gg（未注册，等 owner 注册授权，本阶段不注册）；.co 可选 301 | ✅ / ❌ |
| 8 | 技术栈与视觉 Tech & visual | Next.js + Cloudflare Workers (OpenNext, 不用 Pages) + D1 + R2；深色+金、卡片式、蒙版动效 Hero、mobile-first | ✅ / ❌ |

**回复格式 / Reply format**
- 全部确认：`确认，进入 PRD V1`
- 部分修改：`修改 [编号] 为 [新方向]，其余确认`
- 需要讨论：`[编号] 不确定，展开讲讲`

---

**Status**: [NEEDS_REVIEW] — 02A 产物已就绪，等待 owner 在 02B 确认产品边界；未确认前不启动 PRD V1 及任何下游。
