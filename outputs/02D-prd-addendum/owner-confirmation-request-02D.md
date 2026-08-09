# Owner 确认请求 — 02D PRD Addendum V1.1（mistfall-hunter）
# Owner Confirmation Request — 02D PRD Addendum V1.1

> **Date / 日期**: 2026-08-08
> **From / 请求方**: prd（产品定义 / PRD Agent）
> **To / 确认人**: 站主（Owner）
> **依据 / Basis**: PRD V1 已确认（02C，2026-08-08 放行）；03 pricing / 04 compliance / 05S SEO 基线已完成；本请求把专业基线结论逐项回收进 PRD Addendum V1.1，并列出唯一待决策项。
> **状态 Status**: 🟡 等待 owner 确认 1 项决策；其余已采用修订均为你已明确决定的内容（见下方汇总），无需重复确认。

---

## 一、只需你确认 1 件事（A2：法律页数量）

04 合规建议：V1 新增 **2 个法律页**，保证 GA4 分析披露与免责声明完整：

| 方案 | 内容 | 路由数 | 影响 |
|---|---|---|---|
| **方案 A（合规推荐）** | 新增 `/cookie-policy`（Cookie 政策，+ /cookies 别名）+ `/disclaimer`（免责声明） | 58 → **60** | sitemap ≥60；设计/文案/前端多 2 个页面 |
| **方案 B（不扩路由）** | Cookie / 免责内容并入现有 Privacy / Terms | 保持 **58** | 满足披露，但页面更少、可读性略差 |

**请回复其一**：
- `确认 02D，路由 60`（新增 Cookie Policy + Disclaimer 两个法律页）
- `确认 02D，路由 58`（内容并入 Privacy/Terms，不新增页面）

> 在你确认前，05 文案 / 06 设计 / 07 前端 / 08 后端保持锁定，不会开工。

---

## 二、已自动采用的修订（均来自你已明确拍板的内容）

| # | 变更 | 你的原话 / 来源 |
|---|---|---|
| R1 | 生产域名 canonical = `https://mistfallhunter.co` | 「域名已经注册，.co的。dynadot买的。放行下一步」（02C） |
| R2 | ① 首页 Hero + 工具页加 **Steam 按钮**（Play on Steam）；② **全免费 / 流量导向**，取消 Pro/模板付费方向，N12 增补「不做任何付费功能」 | 「增加进入steem游戏的链接按钮。不做付费，做全免费，主要要流量。」 |
| R3 | **10 个工具全部 V1 上线**，四个复杂工具（Squad Builder / Matchups / Build Planner / Map）做成**非薄页可用页**，全部 index + 进 sitemap；不再有 Coming Soon 灰态 | 「四个工具页要直接做成非薄页上线。要允许抓取。」 |

以上变更已写入 PRD Addendum V1.1 变更日志（R1/R2/R3），来源与原因逐条保留。若以上理解与你意图不符，请指出。

## 三、已采用的执行约束（无需你决策，供知悉）

- Cookie consent banner：默认阻止 GA4，Accept 后加载（合规要求，前端实现）；
- 联系邮箱统一 `contact@mistfallhunter.co`（不用 Gmail/占位邮箱）；
- Terms §8 内置「Refunds and Payments（当前无付费服务）」段落，不单独建退款页；
- 「Free to use」统一文案，不写 Unlimited；工具页无限次，API 可限流但必须 fail-open；
- 信任标签（Verified / Community Report / Needs Update）判定口径入 PRD；
- 爬取礼貌策略 + 复用台账字段契约；logo 原创过程证据链；
- llms.txt 加入 P1；sitemap 结构明确；OG 1200×630 模板；dateModified 同步；metamist.io 加入竞品监控；数据采集优先级 tier list > items > map POI。

## 四、未采用 / 延后（供知悉）

- **/pricing 定价页**：V1 不加（全免费方向下大概率不需要）；未来如需再走变更控制；
- **捐赠链接（Buy Me a Coffee 风格）**：未默认采纳，如你想要需单独说一声，并先过 04 合规确认文案。

## 五、确认后的放行范围

- ✅ 放行：05 文案（copy，05C 前冻结）、06 设计（06C 前确认）、07 前端 / 08 后端（实现）；
- 🔒 仍锁定：05C / 06C / 上线前 owner 确认、DNS/接线/GSC、生产部署、公开发布。

## 六、回复格式 / Reply Format

- 全部同意：`确认 02D，路由 60` 或 `确认 02D，路由 58`
- 有修改：`修改：<章节>｜<改成什么>｜<原因>`
- 需要讨论：`<章节> 不确定，展开讲讲`

---

**参考文件 / References**:
- PRD Addendum V1.1: `outputs/02D-prd-addendum/prd-addendum-v1.1-change-control.md`
- PRD V1 主文档: `outputs/02-prd-v1/prd-v1-master-spec-bilingual.md`
- 04 合规 addendum: `outputs/04-compliance/prd-addendum-compliance-20260808.md`
- 03 定价 addendum: `outputs/03-pricing/prd-addendum-recommendation.md`
- 05S SEO 基线: `outputs/05S-seo-baseline/05S-seo-baseline.md`
