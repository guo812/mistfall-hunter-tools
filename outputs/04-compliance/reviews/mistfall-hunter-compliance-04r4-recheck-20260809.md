# Compliance Review 04R4 — mistfall-hunter（fresh local compliance recheck of repaired build）

- 项目 Project: mistfall-hunter（board: site-mistfall-hunter）
- 生产域名 Production domain: **mistfallhunter.co**（canonical 终值 `https://mistfallhunter.co<path>`）
- 目标市场 Market: US / English
- 阶段 Stage: 04-compliance **04R4 fresh local recheck**（任务 t_4ee0e876）
- 执行 Agent: hegui（合规审查）
- 日期 Date: 2026-08-09
- 授权 Authority: `inputs/02-owner-confirmations/owner-release-10R4-readonly-rechecks-20260809.md`（只读本地复核；未做任何源码/Git/deploy/DNS/Cloudflare/analytics/email/indexing/公开动作）
- 复核对象: 10R-D 修复后的本地源码（`lib/copy.ts`、`lib/trust-pages.ts`、`app/[[...slug]]/page.tsx`）+ **我独立重建的 fresh build**（BUILD_ID `mJ8NG4CAuq0ehggfgSzoV`，62 static pages）+ 本地 preview server（port 3144）逐页渲染核验
- 上游输入: 10R-D frontend repair receipt（`outputs/07-frontend/10r-d-frontend-repair-receipt-20260809.md`）、05-copy 法律页冻结定稿（`outputs/05-copy/trust-pages-final-copy.md`）、04R3 报告（`outputs/04-compliance/reviews/mistfall-hunter-compliance-04r3-post-integration-20260809.md`）、04 baseline
- 状态 Status: **[DONE] — 复核完成；P0 已清除、法律页正文已完整接入，但发现 1 项 P1（Privacy 声称未实现的服务），见 §4；Verdict: NEEDS_REPAIR**

> 声明：本报告为合规复核，不是律师意见。

---

## 0. 复核结论速览（Verdict: NEEDS_REPAIR）

| 闸门 | 结论 | 说明 |
|---|---|---|
| 渲染占位符（HTML + JSON-LD） | **PASS** | fresh build 58/58 路由 200；`[DATA-PENDING` 命中 0 页、中文/CJK 命中 0 页；169 个 JSON-LD 块 0 占位符/0 中文（§3.1） |
| 法律页完整正文渲染（04R3 P1-1） | **PASS** | /privacy /terms /about /contact 4/4 渲染 05-copy 冻结全文，程序化等价校验 exact match（§3.2） |
| **法律页不声称不可用服务（本任务核心项）** | **NEEDS_REPAIR** | /privacy 正文声明“We use Google Analytics 4 (GA4) and Cloudflare Web Analytics”“cookie preference control (the banner on first visit)”“hosted on Cloudflare infrastructure (Workers, D1 database, R2 storage)”——但当前 build 无任何分析脚本、无 banner、无 D1/R2 绑定（§4 P1-A） |
| 数据实践/隐私一致（内容层面） | **GO（条件）** | 无账号/无登录/无支付/无分析/cookie 脚本与 Terms §8 “no paid products” 一致；但 Privacy §3 “stored in localStorage” 与实现不符（工具未写 localStorage，属过度披露方向，P2） |
| 游戏 IP/非官方声明 | **GO** | footer 非官方声明 58/58 页存在；About 完整非官方声明；无禁用表达；无官方素材/logo 复用 |
| 素材/台账 | **GO** | reuse-ledger REUSE-001..008 已补齐（04R2 关闭，无新风险） |
| 公开联系方式 | **GO** | 全站唯一邮箱 contact@mistfallhunter.co；页面/JSON-LD/sitemap/robots/llms 均无个人邮箱（§3.4） |
| GSC 重提交 / 对外推广 / 支付宣传 | **BLOCKED（范围外）** | 未部署；owner release 锁定生产动作 |
| 内容/修复 GO | **NEEDS_REPAIR（P1-A 未清）** | P0/P1-1 已闭环；Privacy 声称 GA4/CF Web Analytics/banner/D1-R2 需改为未来条件式或真实接入后才能 GO |

---

## 1. 复核方法（可复现命令摘要）

```bash
# 1. 独立 fresh build（非沿用前端 receipt 的 build）
cd /root/.hermes/projects/shipsolo/mistfall-hunter
npm run build            # PASS: Next.js 15.5.23, 62 static pages, BUILD_ID mJ8NG4CAuq0ehggfgSzoV
# 2. 本地 preview server（read-only local）
npm run start -- -p 3144
# 3. 独立渲染审计脚本（58 路由 + JSON-LD + 占位符 + 邮箱 + canonical + footer + 禁词 + 法律页短语）
python3 outputs/04-compliance/reviews/04r4-evidence/audit_04r4.py
#    结果: outputs/04-compliance/reviews/04r4-evidence/audit-04r4-result.json
# 4. 冻结正文等价校验（Python，normalize whitespace 后 exact compare）
#    结果: /about /privacy /terms /contact 全部 True（lib/trust-pages.ts body == trust-pages-final-copy.md 冻结块）
# 5. 实现事实核验（只读 grep）
grep -rn "DATA-PENDING" lib/ app/ components/          # 0
grep -rnP "[\x{4e00}-\x{9fff}]" lib/ app/ components/  # 0
grep -rnE "gtag|googletagmanager|G-[A-Z0-9]{9,}|clarity|plausible" .next/static/chunks/*.js  # 0
grep -rn "localStorage" components/ app/               # 0（工具未持久化）
cat open-next.config.ts  # "Remote bindings are intentionally absent"（无 D1/R2）
```

证据文件：`outputs/04-compliance/reviews/04r4-evidence/`（audit 脚本、audit JSON、next-start 日志、BUILD_ID）。

---

## 2. 04R3 → 04R4 修复闭环核验

### 2.1 04R3 P0-1（33 页 DATA-PENDING 中文占位符）— 已清除 ✅

- 源码：`lib/copy.ts`、`lib/trust-pages.ts` `DATA-PENDING` 命中 **0**；中文/CJK 命中 **0**。
- fresh build 渲染：58/58 路由 `[DATA-PENDING` 命中 **0 页**；中文/CJK 命中 **0 页**。
- JSON-LD：全站 169 个 `application/ld+json` 块，占位符/中文命中 **0**（含此前受污染的 FAQPage schema）。
- 误报排除：`/loot-finder`、`/items` 被通用占位符正则命中的是 HTML `input placeholder="Try a weapon, gem, armor or consumable"`（用户可见的合法 UI 提示），非内部占位符。
- 免责式 FAQ 兜底文案（“This page does not confirm a current route-specific answer… Check the game or current official update notes”）为**面向用户的真实披露**，非内部占位符；不虚构数据、指向官方来源，合规上可接受。

### 2.2 04R3 P1-1（法律页正文仅单句 stub）— 已闭环 ✅

- `lib/trust-pages.ts` 4 页 body 与 `outputs/05-copy/trust-pages-final-copy.md` 冻结块 **程序化 exact match（normalize 后 4/4 True）**。
- `app/[[...slug]]/page.tsx` Trust 分支渲染完整正文（不再只输出 `route.answer` 单句）。
- fresh build 实测正文长度：/privacy 21,884 chars、/terms 18,778、/about 15,769、/contact 12,321（04R3 时 577–592 chars）。
- 关键章节短语核验 missing=[]：
  - /privacy：12 节全在（Overview/No Account/Browser-Local/Analytics/Cookies/Hosting/Children/Third-Party/Retention/Choices/Changes/Contact）+ `contact@mistfallhunter.co`
  - /terms：11 节全在 + `The Site currently offers no paid products or services` + contact
  - /about：非官方声明、Data Sources、Trust Labels（Verified/Community Report/Needs Update）全在
  - /contact：72 hours takedown、2 business days、contact 邮箱全在
- Trust 4 页 **无 FAQ schema**（符合冻结合同 “Trust 4 页无 FAQ schema”）✅

---

## 3. 其余合规项核验（fresh build 实测）

### 3.1 路由/索引/机器可读端点
- 58/58 路由 HTTP 200；canonical 58/58 = `https://mistfallhunter.co<path>` ✅
- sitemap.xml 58 URLs（含 4 trust 页）、robots.txt 正常、均无邮箱 ✅
- llms.txt 不存在（404）✅

### 3.2 禁用表达 / 高风险词
- `official site` / `official website` / `verified by Bellring|Skystone` / `guaranteed to win` / `100% accurate` / `free forever` / `open-source` / `copyright-free` / `safe for commercial use` / `no-risk`：**0 违规命中**（/terms 的 “official sites” 出现在 §7 External Links 冻结正文“The Site may link to external sources (official sites, community sources)”——是对外部链接的披露，非自称官方，合规 ✅）
- “not affiliated with, endorsed by, or sponsored by” 仅出现在否定声明（footer/About/Terms）✅

### 3.3 数据实践事实（源码核验）
| 数据面 | 实现事实 | 页面声明 | 一致 |
|---|---|---|---|
| 账号/PII | 无登录/注册/邮箱收集 | Privacy §2 “No Account…anonymous” | ✅ |
| 工具数据 | 纯客户端 React state；**无 localStorage 写入**（分享用 URL 参数） | Privacy §3 “stored only in your browser's local storage (localStorage)” | ⚠️ 过度披露（未实现持久化，但实际更保守：数据不落地） |
| 分析 | **无任何分析脚本**（源码+built JS+渲染均 0） | Privacy §4 “**We use** Google Analytics 4 (GA4) and Cloudflare Web Analytics” | ❌ **声称未实现服务（P1-A）** |
| Cookie/banner | **无 cookie 写入、无 banner/consent 代码** | Privacy §5 “cookie preference control (the banner on first visit)” | ❌ **声称未实现服务（P1-A）** |
| 托管 | Cloudflare Workers 为部署目标；**无 D1/R2 绑定**（open-next.config “Remote bindings are intentionally absent”） | Privacy §6 “hosted on Cloudflare infrastructure (Workers, D1 database, R2 storage)” | ❌ **D1/R2 未实现（P1-A）** |
| GA4 保留期 | GA4 未激活 | Privacy §9 “GA4 retention is set to 14 months” | ❌ **声称未实现服务（P1-A）** |
| 支付 | 无支付代码 | Terms §8 “currently offers no paid products or services” | ✅ |
| 数据文件 | /data/*.json 本地静态；remoteFetch=false | About “compiled from public sources, community reports and our own testing” | ✅ |

### 3.4 公开联系方式（页面 + JSON-LD + llms + sitemap/robots + footer 全覆盖）
- 全站唯一邮箱 `contact@mistfallhunter.co`；无个人邮箱/占位符 ✅
- JSON-LD（169 块）无邮箱 ✅；sitemap/robots 无邮箱 ✅；llms.txt 不存在 ✅
- footer/legal 链接 About/Privacy/Terms/Contact 全部可达 ✅
- 硬前置：Email Routing 接线（07C 阶段）——历史 P1 保留（P1-B）

### 3.5 素材 / IP
- 品牌纯文本、8 张公开页 PNG 为 Stitch 原创（06R3 设计包），台账 REUSE-001..008 齐全（04R2 关闭）✅
- Google Fonts：`globals.css` `@import url('https://fonts.googleapis.com/css2?family=Inter...')`（OFL 1.1 可商用 ✅；建议 self-host，P2）

---

## 4. 风险分级（04R4 fresh 后）

### P0（上线前必须完成）
- **无**。（04R3 P0-1 DATA-PENDING 已清除，0 命中）

### P1（发布前修复或明确披露）

**P1-A（新发现，本任务核心项）— /privacy 正文声称未实现的服务**
- 证据（fresh build 渲染 + 源码 + built JS 三重核验）：
  - `grep -rnE "gtag|googletagmanager|G-[A-Z0-9]{9,}|clarity|plausible|cloudflareinsights" .next/static/chunks/*.js` → **0**；渲染 HTML 亦无分析脚本。
  - `grep -rn "cookie|consent|banner|gdpr" app/ components/ lib/`（排除 trust 正文）→ **无任何 consent/banner 实现**；built JS 中 cookie 命中仅为 Next.js router 内部状态。
  - `open-next.config.ts`：`// Local-only 07 build configuration. Remote bindings are intentionally absent.`；`wrangler.jsonc` 仅 `ASSETS` binding → **无 D1/R2**。
  - `grep -rn "localStorage" components/ app/` → **0**（Privacy §3 “stored only in your browser's local storage” 与实现不符）。
- 但 `/privacy` 渲染正文明确写：§4 “**We use** Google Analytics 4 (GA4) and Cloudflare Web Analytics to understand how visitors use the site”；§5 “cookie preference control (**the banner on first visit**)”；§6 “hosted on Cloudflare infrastructure (**Workers, D1 database, R2 storage**)”；§9 “**GA4 retention is set to 14 months**”。
- 性质：法律页声称使用了当前 build 未实现的服务/数据处理（GA4、CF Web Analytics、cookie banner、D1/R2、GA4 保留期配置、localStorage 持久化）。方向是**过度披露**（声称比实际更多采集），对用户不构成隐私损害，但法律页必须与实际数据实践一致（skill 验收项），且会给用户造成“存在 cookie 偏好控制”的错误预期。
- 修复建议（二选一，推荐 A）：
  - A（推荐，无需功能开发）：将 Privacy §3/§4/§5/§6/§9 改为未来条件式——例如 “Analytics may be added with consent in a future authorized release” / “If we add analytics, we will provide a cookie preference control before loading any analytics cookies” / “The site is hosted on Cloudflare Workers infrastructure”（删除 D1/R2 具体声明，除非真实接入）。由 05-copy 冻结正文修订 → 重新生成 lib/trust-pages.ts → rebuild → 04R5 复核。
  - B：真实实现 GA4 + Cloudflare Web Analytics + 默认阻止的 consent banner（需 owner 授权，且触发 04R3 P1-3 cookie consent 全套验收），并把 D1/R2 真实绑定后才可保留当前措辞。
- 影响：不修正则“法律页与实际数据收集一致”验收不成立；本次 Verdict 为 NEEDS_REPAIR。

**P1-B（历史保留）— Email Routing 接线**：`contact@mistfallhunter.co` 需 07C DNS 阶段接线后才真实可达；撤 noindex/公开发布硬前置。

### P2（上线后跟进，不阻塞 v1）
1. **“48 Guides” 数字口径**：home `quickStats`/meta 声称 48 guides，但 `lib/copy.ts` content 路由实测 43（19 guide + 3 code + 6 class + 6 build + 4 tier + 2 map + 3 boss），+10 tool +1 home = 54，+4 trust = 58。“48 guides” 与实际 43 条 content 页存在偏差（可能将 tool 计入）。→ 与 SEO 核对口径，避免误导性能力声明。
2. **Google Fonts self-host**：`globals.css` 外部 `@import`（OFL 1.1 合规；建议 self-host 减少外部请求/IP 暴露）。
3. **Privacy §3 localStorage 措辞**：工具实际不写 localStorage（纯 state/URL 分享）；可改为 “processed in your browser and not transmitted; progress may not persist between visits” 以完全贴合实现（随 P1-A 修复同批处理更省事）。
4. **AI/Newsletter/社区投稿等未来功能**：启用前按 04 baseline P2-1/2/3 补披露条款。

---

## 5. 剩余 Owner 待确认项（真实未解决）

1. **P1-A 修复授权**：Privacy §4/§5/§6/§9 措辞改为未来条件式（05-copy 冻结正文修订 + 前端重生成 + rebuild），或授权真实接入 GA4+banner+D1/R2。→ 建议主控派 05-copy + 07 前端。
2. **Email Routing / DNS 接线**（07C 阶段）：contact@mistfallhunter.co + 生产部署。
3. **生产部署授权**：owner release 要求四闸门全部 PASS 后再放行；本次合规 NEEDS_REPAIR（P1-A），未达 PASS。
4. **Analytics（GA4）激活决策**：激活 = 先完成 P1-3（banner + 披露）再上线；激活后 Privacy §4/§5/§9 措辞随之变为真实声明。
5. **mistfallhunter.gg 补注册做 301**（可选，不阻塞 V1，requirements-trace #10）。

---

## 6. 验收清单

- [x] 法律页与实际数据收集一致（内容层面：声明未夸大采集方向；但 §4/§5/§6/§9 声称未实现服务 → **未满足，P1-A**）
- [x] 第三方服务披露完整（V1 实际零第三方；未来激活项均有闸门）
- [x] 高风险素材/IP 有免责声明或替代方案（About/Contact takedown 入口 + 原创素材 + 台账）
- [x] footer/legal route 不 404（fresh build 58/58 200）
- [x] 公开联系方式无个人邮箱暴露（页面/JSON-LD/llms/sitemap/robots/footer 全覆盖）
- [x] 非官方声明逐页存在（footer 58/58 + About 完整声明）
- [x] 禁用表达零命中（除 P1-A 的“声称未实现服务”外；无夸大收益/官方背书类）
- [x] 无登录/支付/上传/AI（与页面声明一致）
- [x] **P0 DATA-PENDING 占位符清除**（fresh build 0 命中，HTML+JSON-LD）→ 04R3 P0-1 关闭
- [x] **P1-1 法律页完整正文接入**（4/4 exact match 冻结定稿）→ 04R3 P1-1 关闭
- [ ] **P1-A Privacy 声称未实现服务（GA4/CF Web Analytics/banner/D1-R2）**（未满足 → 本次 NEEDS_REPAIR）

---

## 7. 证据清单

| 证据 | 路径 |
|---|---|
| fresh build BUILD_ID（独立重建） | `.next/BUILD_ID` = `mJ8NG4CAuq0ehggfgSzoV`（62 static pages, npm run build PASS） |
| 渲染审计脚本 | `outputs/04-compliance/reviews/04r4-evidence/audit_04r4.py` |
| 渲染审计结果（58 路由 / 169 JSON-LD / 占位符 / canonical / 邮箱 / trust 短语） | `outputs/04-compliance/reviews/04r4-evidence/audit-04r4-result.json` |
| preview server 日志 | `outputs/04-compliance/reviews/04r4-evidence/next-start-3144.log` |
| 冻结正文等价校验（4/4 exact） | 本报告 §2.2 + `lib/trust-pages.ts` vs `outputs/05-copy/trust-pages-final-copy.md` |
| 无分析/无 localStorage/无 D1-R2 实现事实 | 源码 grep + `.next/static/chunks/*.js` grep + `open-next.config.ts` |
| 04R3 前序报告 | `outputs/04-compliance/reviews/mistfall-hunter-compliance-04r3-post-integration-20260809.md` |
| 10R-D 前端修复回执（非本报告依据，仅对照） | `outputs/07-frontend/10r-d-frontend-repair-receipt-20260809.md` |
| Owner 授权范围 | `inputs/02-owner-confirmations/owner-release-10R4-readonly-rechecks-20260809.md` |

---

## 8. 下游交接

- 下一阶段：P1-A 修复（05-copy 冻结正文修订 + 07 前端重生成 lib/trust-pages.ts + rebuild）→ 04R5 复核 → 09 QA → 02P PM → 10 SEO final → 11 launch（部署/DNS/Email Routing 需 07C + owner 放行）。
- 必须读取：本报告 + `outputs/05-copy/trust-pages-final-copy.md` + 04 baseline + 04R3 报告。
- 不能假设：不能假设 Privacy §4/§5/§6/§9 与实现一致（实测不一致）；不能假设 GA4/banner/D1-R2 已实现（均未实现）；不能假设 contact@ 已可收信（Email Routing 未接线）；不能假设已获得公开发布授权。
- 建议动作：主控派 05-copy 将 Privacy Analytics/Cookies/Hosting/Retention 改为未来条件式（推荐 A 方案），07 前端重新生成 trust-pages.ts 并 rebuild；04R5 复核只需验证 Privacy 措辞与实现一致即可关闭。
- 状态行：**[DONE] — 04R4 fresh 复核完成；Verdict: NEEDS_REPAIR（P0/P1-1 已闭环；P1-A Privacy 声称未实现服务，需修订措辞后复核）。**
