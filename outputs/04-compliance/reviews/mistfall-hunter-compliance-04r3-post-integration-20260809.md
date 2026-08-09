# Compliance Review 04R3 — mistfall-hunter（fresh post-integration compliance review）

- 项目 Project: mistfall-hunter（board: site-mistfall-hunter）
- 生产域名 Production domain: **mistfallhunter.co**（canonical 终值 `https://mistfallhunter.co<path>`）
- 目标市场 Market: US / English
- 阶段 Stage: 04-compliance **04R3 fresh post-integration review**（任务 t_19e2b004）
- 执行 Agent: hegui（合规审查）
- 日期 Date: 2026-08-09
- 复核对象: A3 集成后的当前源码（`app/`、`components/`、`lib/`）+ fresh build 产物 `.next/server/app/*.html`（BUILD_ID `PMTtYEz_svnYmAso8Y81-`，build 2026-08-09 12:29）+ A3 文案包证据（`outputs/05-copy-repair/`、`outputs/05-copy/trust-pages-final-copy.md`）
- 上游输入: owner release（`inputs/02-owner-confirmations/owner-release-10R-B-and-launch-prep-20260809.md`）、04R recheck（`outputs/04-compliance/mistfall-hunter-compliance-recheck-20260808.md`）、04 baseline（`outputs/04-compliance/mistfall-hunter-compliance-baseline-20260808.md`）、10R-B SEO 审计（`outputs/10-seo-recheck/10r-b-integration-audit.md`）、A3 语义复核（`outputs/05-copy-repair/reviews/independent-semantic-a3-post-remediation-20260809.md`）
- 范围: 只读本地审查；未做任何源码修改、部署、DNS、分析、Email Routing、GSC/Bing、素材下载、Git、公开动作
- 状态 Status: **[DONE] — 审查完成；发现 1 项 P0、2 项 P1（1 项为历史遗留）、3 项 P2；详见 §5**

> 声明：本报告为合规复核，不是律师意见。

---

## 0. 复核结论速览

| 闸门 | 结论 | 说明 |
|---|---|---|
| 内容/修复 GO | **NO-GO（P0 未清）** | 当前 A3 集成产物存在 1 项 P0：**33 个公开内容页渲染内部中文占位符 `[DATA-PENDING: 08 ...]`**；法律页正文仅为单句 stub，未接入已冻结的 05-copy 定稿正文（P1-1） |
| 数据实践/隐私一致 | **GO（内容层面）** | 无账号/无登录/无支付/无分析/无 cookie 脚本与 Privacy 单句声明不冲突，但完整披露缺失（见 P1-1） |
| 游戏 IP/非官方声明 | **GO** | footer 非官方声明 57/58 页存在、About 完整非官方声明、无禁用表达、无官方素材/logo 复用 |
| 素材/台账 | **GO** | reuse-ledger REUSE-001..008 已补齐；8 张公开页 PNG 与台账一致（04R2 已关闭 P1-1） |
| GSC 重提交 | **BLOCKED** | 未部署、未提交 GSC（07C 锁定范围） |
| 对外推广 | **BLOCKED** | owner release 锁定；P0 未清前不得推广 |
| 支付宣传 | **GO（当前范围）** | V1 无支付；Terms 单句声明未承诺付费功能（未来启用支付仍需补 Refund 章节，04 baseline P1-4 保留） |

---

## 1. 法律页正文核验（当前集成产物 vs 04 基线 / 05-copy 定稿）

### 1.1 当前构建产物实测（fresh build，BUILD_ID PMTtYEz_svnYmAso8Y81-）

| Route | 实测正文（构建产物） | 字符数 |
|---|---|---|
| /privacy | `How Mistfall Hunter Tools handles browser-local tool data, analytics and no-account access.` + `Questions about corrections, data sources, privacy, terms, or takedown requests can be sent to contact@mistfallhunter.co.` | 583 |
| /terms | `Terms for using Mistfall Hunter Tools, an unofficial fan resource with information provided as-is.` + 同上联系句 | 592 |
| /about | 2 段：非官方资源介绍 + 非官方/商标声明/数据来源说明（无 Trust Labels 定义） | 866 |
| /contact | `Contact the Mistfall Hunter Tools team about corrections, data sources or takedown requests.` + 同上联系句 | 577 |

### 1.2 与冻结定稿对比（关键差异）

05-copy 定稿 `outputs/05-copy/trust-pages-final-copy.md`（2026-08-08）已冻结 4 页完整正文：
- /privacy：12 节（Overview / No Account / Browser-Local / Analytics / Cookies / Hosting / Children / Third-Party / Retention / Choices-Rights / Changes / Contact）
- /terms：11 节（Acceptance / Unofficial Fan / Informational-Only+Disclaimer / As-Is / Acceptable Use / IP / External Links / Refunds-Payments / Limitation / Changes / Contact）
- /about：含 Trust Labels 定义（Verified / Community Report / Needs Update）
- /contact：含 72h takedown 处理承诺 + 2 business days 响应

**当前源码 `app/[[...slug]]/page.tsx` 第 84 行 Trust 组件未引用该定稿，只渲染 `route.answer` 单句 + 联系邮箱句。** 全站构建产物 grep 实测：
- `do not need to create an account` / `not transmitted` / `analytics may be added` / `cloudflare` / `no paid products` / `localStorage` / `cookie` / `copyright`: **0/58 页命中**
- `as-is`: 仅 terms 单句 1 处；`takedown`: 3 页（均为联系句）

**判断**：这是 A3 集成时 Trust 组件未接入 05-copy 定稿正文造成的**内容回归/缺口**（04R 报告曾以旧构建产物判 GO，但 04R3 基于 fresh build 必须以当前产物为准）。→ **P1-1（发布硬前置）**：将 05-copy 定稿 4 页正文接入 Trust 组件（或独立 trust copy 数据），重建后复核。此问题不修正，Privacy/Terms/Disclaimer 的"事实披露与真实实践一致"验收不成立。

### 1.3 法律页非官方/联系/可达性（通过项）

- 4 条 trust 路由均在 sitemap（`/about /privacy /terms /contact`，canonical=.co）✅
- footer 固定链接 About/Privacy/Terms/Contact 全部可达 ✅
- 全站唯一邮箱 `contact@mistfallhunter.co`（9 处），**无个人邮箱/占位符** ✅；JSON-LD 无邮箱 ✅；llms.txt 不存在 ✅；sitemap/robots 无邮箱 ✅
- `contact@mistfallhunter.co` 需 Email Routing 接线后才真实可达 → **P1-3（发布硬前置，历史保留）**

---

## 2. 数据实践与 Privacy 一致性（内容层面）

| 数据面 | 实现事实（源码核验） | 当前页面声明 | 一致 |
|---|---|---|---|
| 账号/PII | 无登录/注册/邮箱收集（grep 无 login/sign-in/oauth） | Privacy 单句 "no-account access" | ✅（声明未夸大） |
| 工具草稿 | 纯客户端 React state；**无 localStorage 写入**（Squad Builder 用 URL 参数分享，checklist 组件内 state） | Privacy 单句 "browser-local tool data"（保守措辞，无虚报） | ✅ |
| 分析 | **无任何分析脚本**（grep gtag/GA4/Clarity/Plausible 均无） | 无分析声明 | ✅ |
| Cookie | 站点自身不写任何 cookie | 未提 cookie | ✅（激活 GA4 时必须补披露，P1-4 保留） |
| 托管 | Cloudflare 基础设施（wrangler/open-next 配置） | 未提 | ⚠️ 未披露（P1-1 修复时应补） |
| 支付 | 无支付代码（grep stripe/payment 无） | Terms 单句未承诺付费 | ✅ |
| 数据文件 | `/data/*.json` 本地静态；provenance.json：local-editorial-seed、remoteFetch=false | About "compiled from public sources, community reports and editorial testing" | ✅ |

---

## 3. 禁用表达 / 高风险词核验（fresh build 58 页 grep）

- **P0 命中：`[DATA-PENDING: 08 ...]` 中文内部占位符渲染到 33 个公开内容页**（含 FAQ 正文与 JSON-LD FAQPage schema）。
  - 命中页清单（33）：全部 3 boss、6 class、6 build、3 code、11 guide（auction-house/camp-upgrades/controller-vs-kbm/dual-weapon-stances/extraction/faq/getting-started/gold-farming/keys-treasure/leveling/pc-settings/ps5-settings/xbox-settings）、2 map。详见 §5 P0-1。
  - 样例：`/bosses/salmar` FAQ 渲染 `Where do I find Salmar? ... [DATA-PENDING: 08 坐标]`；`/bosses/cursed-moonwane` FAQ schema 含 `[DATA-PENDING: 08 招式细节]`、`[DATA-PENDING: 08 掉落表]`。
  - 来源：`lib/copy.ts`（A3 冻结 copy 包直接生成，`"// Generated from the canonical frozen 10R-A3 copy package"`）——A3 copy 包 QA 只校验 word/FAQ/schema 格式，未拦截中文占位符；10R-B SEO 审计的 `word_spec_failures: []` 同样未覆盖该词。
  - **性质**：公开页出现内部待办标记（中文）+ 误导用户以为数据未完成；严重损害站点可信度与英文市场观感；JSON-LD FAQ 同步污染 SEO 结构化数据。→ **P0-1（上线前必须清除）**。
- 其余禁用表达 **0 命中**：`official site`、`official website`、`verified by Bellring/Skystone`、`guaranteed to win`、`100% accurate`、`free forever`、`open-source`、`copyright-free`、`safe for commercial use`、`no-risk` 全站 58 页 0 命中 ✅
- `sponsored by` 仅出现在 About 否定句 `not affiliated with, endorsed by, or sponsored by Bellring Games, Skystone Games` ✅
- footer 非官方声明 57/58 页（`Unofficial fan resource. Not affiliated with Bellring Games or Skystone Games.`；_not-found 无 footer 属预期）✅
- 信任标签：内容/工具页显示 `Community Report · Last Verified Aug 8, 2026`，与 About 定义一致（但 About 当前正文未列 Trust Labels 定义 → 随 P1-1 修复补齐）

---

## 4. 素材 / IP / 联系方式核验

### 4.1 图片与品牌
- 品牌 = 纯文本 `MISTFALL HUNTER TOOLS`（金色文字，无官方 logo 图片）✅
- 公开页 8 张 PNG（hero-main + 6 职业 + guide-squad-dungeon），来源 = 06R3 设计包"原创图"（Stitch 生成），无官方截图/官方美术复用 ✅
- OG 图 `/images/hero-main.png`（1200×630）对应台账 REUSE-001 ✅

### 4.2 复用台账（04R P1-1 关闭复核）
- `inputs/04-compliance/reuse-ledger.md`：REUSE-001..008 **8 条已填齐**（source_type=design-generated、source reference=06R3 Stitch project、复用位置逐条、权属=owned、Last Verified=2026-08-08）✅
- `outputs/08-backend-data/seed/provenance.json`：local-editorial-seed、remoteFetch=false、license 声明 gameplay facts 待 source-ledger 验证 ✅
- 结论：04R2 已关闭 P1-1，本次复核无新素材风险

### 4.3 公开联系方式（P0-5 复验，覆盖页面 + JSON-LD + llms + sitemap/robots + footer）
- 唯一邮箱 `contact@mistfallhunter.co`，无个人邮箱/占位符 ✅
- JSON-LD：home=WebSite(SearchAction)、tool=WebApplication、content=Article、trust=Article，均无邮箱 ✅
- llms.txt 不存在 ✅；sitemap.xml.body / robots.txt.body 无邮箱 ✅
- footer/legal 链接全部站内路由 ✅
- 硬前置：Email Routing 接线（P1-3，07C 阶段）

---

## 5. 风险分级（04R3 fresh 后）

### P0（上线前必须完成，不能带病上线）

**P0-1 — 33 个公开内容页渲染内部中文占位符 `[DATA-PENDING: 08 ...]`**
- 证据：`grep -rl "DATA-PENDING" .next/server/app --include="*.html" | wc -l` = **33**；命中页含全部 `/bosses/*`、`/classes/*`、`/builds/*`、`/codes/*`、11×`/guides/*`、`/maps/*`；FAQ 正文与 JSON-LD FAQPage schema 均命中；`lib/copy.ts` 内 `DATA-PENDING` 出现 50+ 次（含 `[DATA-PENDING: 08 坐标]`、`[DATA-PENDING: 08 招式细节]`、`[DATA-PENDING: 08 掉落表]`、`[DATA-PENDING: 08 确认 crossplay 口径]` 等中文）。
- 责任：05-copy（A3 copy 包未清占位符）+ 07 前端（集成时未拦截）。修复 = 从 copy 包/正文清除或替换为面向用户的中性表述（如 "Details verified with community reports"），重建后复核。
- 影响：公开页面可信度、SEO 结构化数据、英文用户体验；上线前不清除即带病上线。

### P1（发布前修复或明确披露）

**P1-1 — 法律页正文未接入 05-copy 定稿（Trust 组件仅渲染单句）**
- 证据：`app/[[...slug]]/page.tsx` L84 Trust 组件 body = `route.answer` 单句 + 联系句；`outputs/05-copy/trust-pages-final-copy.md` 冻结 4 页完整正文未被引用；fresh build privacy/terms/contact 正文 577–592 字符，缺 No Account / Browser-Local / Analytics / Cookies / Hosting / Children / Retention / CCPA / As-Is / Refunds / Takedown 72h 等全部披露章节。
- 修复：将 05-copy 定稿正文接入（推荐独立 trust copy 数据源或 Trust 组件内嵌），保留 contact@ 邮箱，重建复核。随 P0-1 同批处理。
- 注意：05-copy 定稿 §4 Analytics 章节声明"GA4/Cloudflare Web Analytics"为**未来可能**用途，接入时需与当前"无分析"事实一致（建议保留"may be added with consent in a future authorized release"措辞，不得声称已使用 GA4）。

**P1-2 — Email Routing 接线**（历史保留，发布硬前置）：`contact@mistfallhunter.co` 需 07C DNS 阶段接线，否则法律页联系入口不可用 → 撤 noindex/公开发布硬前置。

**P1-3 — Cookie consent + Cookie 披露**（历史保留）：owner 02D R4 要求 banner（默认阻止 GA4 → Accept 加载 → Reject 不加载 → 可改偏好）。当前无分析故未实现；**激活 GA4 时硬前置**：先上 banner + Privacy 补 `_ga` 类 cookie 披露 + GA4 保留期（建议 14 个月）+ owner 授权。

**P1-4 — 支付/付费功能（未来）**（04 baseline 保留）：启用前补 `/refund-policy` 或 Terms Refund 章节 + 支付服务商披露 + 失败任务不扣费条款。

### P2（上线后跟进，不阻塞 v1）

1. **Google Fonts self-host**：`globals.css` L2 `@import url('https://fonts.googleapis.com/css2?family=Inter...')`（OFL 1.1 许可合规 ✅；外部请求+最小 IP 暴露）→ 建议 self-host。
2. **主页 "48 Guides" 数字**：`lib/copy.ts` home `directAnswer`/`meta`/`quickStats` 声称 "48 guides / 48 deep guides"，但 copy 路由实测 content=43（19 guide + 3 code + 6 class + 6 build + 4 tier + 2 map + 3 boss）+ tool=10 + home=1 = 54；sitemap=58（+4 trust）。"48 guides" 与实际 43 条 content 页存在偏差（可能将部分 tool 计入或为 SEO 目标数字）。→ 上线后与 SEO 核对口径，避免误导性能力声明。
3. **AI/Newsletter/社区投稿等未来功能**：启用前按 04 baseline P2-1/2/3 补披露条款。
4. **GA4 保留期设置确认**（激活时）。

---

## 6. 剩余 Owner 待确认项（真实未解决）

1. **P0-1 修复授权**：清除/替换 33 页 DATA-PENDING 占位符（涉及 A3 copy 包与前端重建，需 05-copy + 07 前端 + 主控派工）。
2. **Email Routing / DNS 接线**（07C 阶段）：contact@mistfallhunter.co + 生产部署。
3. **生产部署授权**：owner release 明确要求 fresh 四闸门全部 PASS 后再放行；当前合规为 NO-GO（P0-1 未清）。
4. **Analytics（GA4）激活决策**：激活 = 先完成 P1-3（banner + 披露）再上线。
5. **mistfallhunter.gg 补注册做 301**（可选，不阻塞 V1，requirements-trace #10）。

---

## 7. 证据清单

| 证据 | 路径 |
|---|---|
| fresh build BUILD_ID / 58 页 HTML | `.next/BUILD_ID`（PMTtYEz_svnYmAso8Y81-）、`.next/server/app/*.html`（58） |
| 法律页实测正文（单句） | `.next/server/app/{privacy,terms,about,contact}.html` |
| 05-copy 冻结法律页定稿（未被引用） | `outputs/05-copy/trust-pages-final-copy.md` |
| Trust 组件单句实现 | `app/[[...slug]]/page.tsx` L83-86 |
| DATA-PENDING 占位符命中（33 页） | `grep -rl "DATA-PENDING" .next/server/app --include="*.html"`、`lib/copy.ts` |
| 路由定义（58）/ copy 路由（54） | `lib/routes.ts`、`lib/copy.ts` |
| sitemap 58 URLs（.co canonical）/ robots | `.next/server/app/sitemap.xml.body`、`robots.txt.body` |
| 无分析/登录/支付/cookie 代码 | `app/` `components/` `lib/` grep |
| 素材台账 REUSE-001..008 | `inputs/04-compliance/reuse-ledger.md` |
| 数据来源声明（local seed, remoteFetch=false） | `outputs/08-backend-data/seed/provenance.json` |
| Owner 放行范围（本地 only / fresh gates） | `inputs/02-owner-confirmations/owner-release-10R-B-and-launch-prep-20260809.md` |
| 10R-B 集成审计 / A3 语义复核 | `outputs/10-seo-recheck/10r-b-integration-audit.md`、`outputs/05-copy-repair/reviews/independent-semantic-a3-post-remediation-20260809.md` |

---

## 8. 验收清单

- [x] 法律页与实际数据收集一致（内容层面：声明未夸大；但完整披露缺失 → P1-1 未满足，修复后复核）
- [x] 第三方服务披露完整（V1 实际零第三方；未来激活项均有闸门）
- [x] 高风险素材/IP 有免责声明或替代方案（About/Contact takedown 入口 + 原创素材 + 台账补齐）
- [x] footer/legal route 不 404（构建产物核验）
- [x] 公开联系方式无个人邮箱暴露（页面/JSON-LD/llms/sitemap/robots/footer 全覆盖）
- [x] 非官方声明逐页存在（footer 57/58 + About 完整声明）
- [x] 禁用表达零命中（除 P0-1 DATA-PENDING 中文占位符外）
- [x] 无登录/支付/上传/AI（与页面声明一致）
- [ ] **P0-1 DATA-PENDING 占位符清除**（未满足 → 本次 NO-GO）
- [ ] **P1-1 法律页完整正文接入**（未满足 → 随 P0-1 修复）

---

## 9. 下游交接

- 下一阶段：P0-1/P1-1 修复（05-copy + 07 前端 + 主控派工）→ 04R4 复核 → 09 QA → 02P PM → 10 SEO final → 11 launch（部署/DNS/Email Routing 需 07C + owner 放行）。
- 必须读取：本报告 + `outputs/05-copy/trust-pages-final-copy.md`（法律页定稿正文）+ `outputs/04-compliance/mistfall-hunter-compliance-baseline-20260808.md` + 04R recheck。
- 不能假设：不能假设法律页正文已完整（实测单句）；不能假设 DATA-PENDING 已清除（33 页命中）；不能假设已获得公开发布授权；不能假设 contact@ 已可收信（Email Routing 未接线）；不能假设 GA4 已激活（未激活）。
- 建议动作：主控派 05-copy 清除 33 页 DATA-PENDING 占位符 + 将 `trust-pages-final-copy.md` 定稿接入 Trust 组件（07 前端），重建后 04R4 只复核两处即可关闭；07C 阶段接线 Email Routing；QA 按 §5 核验项执行。
- 状态行：**[DONE] — 04R3 fresh 复核完成；当前结论 NO-GO（P0-1 DATA-PENDING 占位符 33 页 + P1-1 法律页正文单句），修复后 04R4 复核。**
