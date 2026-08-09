# Compliance Recheck — mistfall-hunter（04R compliance recheck）

- 项目 Project: mistfall-hunter（board: site-mistfall-hunter）
- 生产域名 Production domain: **mistfallhunter.co**（Dynadot 已注册，owner 2026-08-08 确认；canonical 终值 `https://mistfallhunter.co<path>`）
- 目标市场 Market: US / English
- 阶段 Stage: 04-compliance **recheck**（任务 t_c4af41bb，04R）
- 执行 Agent: hegui（合规审查）
- 日期 Date: 2026-08-08
- 复核对象: 最新本地实现（07 前端 t_a4cb8776 验收通过后的源码 + 本地构建产物 `.next/server/app/*.html`）；生产 URL 尚不存在（owner release 明确锁定部署/DNS/公开动作），故以构建产物 + 源码为证据源
- 上游输入: 04 baseline（outputs/04-compliance/mistfall-hunter-compliance-baseline-20260808.md）、02D owner 确认（inputs/02-owner-confirmations/owner-confirmation-02D-20260808.md，路由 58 方案 B）、owner release（inputs/00-launch-card/owner-release-07-08-local-implementation-20260808.md）、requirements-trace.md、process-contract.md、project-control.md
- 状态 Status: **[DONE]**（本地实现合规性复核通过；公开发布前存在 P1 台账补齐项与硬前置，见 §5/§6）

> 声明：本报告为合规复核，不是律师意见。

---

## 0. 复核结论速览

| 闸门 | 结论 | 说明 |
|---|---|---|
| 内容/修复 GO | **GO**（含 1 项 P1 前置） | 法律页正文与真实数据实践一致，无内容修复需求；发布前需补齐素材台账 |
| GSC 重提交 | **BLOCKED** | 未部署、未提交 GSC（部署/DNS 属 07C 锁定范围） |
| 对外推广 | **BLOCKED** | owner release 明确锁定（未授权公开发布/推广） |
| 支付宣传 | **GO（当前范围）** | V1 无支付；Terms 明示无付费产品；若未来启用支付必须先补 Refund 条款与披露 |

---

## 1. 法律页实现核验（对照 02D A2 方案 B）

owner 02D 确认：**路由保持 58**，不新增 `/cookie-policy` `/disclaimer` 独立页，Cookie/免责内容并入 Privacy/Terms。实现与决策一致。

| Canonical | 实现 | 构建产物证据 | 内容覆盖 |
|---|---|---|---|
| /privacy | ✅ Trust 页 | `.next/server/app/privacy.html`，200 内容，无 `__next_error__` | 匿名无账号、localStorage 草稿不传输、分析未来经同意启用、Cloudflare 托管、不出售数据、联系邮箱 |
| /terms | ✅ Trust 页 | `.next/server/app/terms.html` | as-is、不保证准确、无付费产品（变更前先更新政策）、版权/商标 takedown 入口 |
| /about | ✅ Trust 页 | `.next/server/app/about.html` | 非官方声明、信任标签定义（Verified/Community Report/Needs Update）、数据来源说明 |
| /contact | ✅ Trust 页 | `.next/server/app/contact.html` | 纠错/来源/知识产权 takedown 入口、72h 处理承诺、非发行商客服声明 |
| /cookie-policy | N/A（02D 方案 B 不新增） | — | Cookie/分析披露并入 Privacy（"Analytics may be added with consent in a future authorized release."） |
| /disclaimer | N/A（02D 方案 B 不新增） | — | 免责内容并入 Terms（as-is、不保证、非官方） |

- 路由总数：`lib/routes.ts` 实算 **58**（1 home + 10 tool + 6 class + 6 build + 4 tier + 2 map + 3 boss + 19 guide + 3 code + 4 trust）；构建 sitemap `.next/server/app/sitemap.xml.body` = **58 URLs**，全部 `https://mistfallhunter.co<path>`。✅
- Footer 固定链接（构建产物逐页核验）：About / Privacy / Terms / Contact 全可达，无 404。✅（02D 方案 B 下 Cookie/Disclaimer 不再单列 footer 链接，符合确认口径）
- 短别名：本实现无 `/privacy-policy` 等别名路由（58 路由契约未要求），无 redirect 陷阱。✅

## 2. 数据实践与 Privacy 一致性

| 数据面 | 实现事实（源码核验） | Privacy 声明 | 一致 |
|---|---|---|---|
| 账号/PII | 无登录/注册/邮箱收集（grep 无 login/sign-in/oauth/email 收集代码） | "do not need to create an account or provide a name or email" | ✅ |
| 工具草稿 | 纯客户端 React state；**未实际写入 localStorage**（Squad Builder 用 URL 参数分享；checklist 仅组件内 state） | "may be stored in browser local storage and are not transmitted"（保守措辞，无虚报） | ✅ |
| 分析 | **无任何分析脚本**（grep gtag/GA4/Clarity/Plausible/Fathom 均无）；GA4/CF Web Analytics 未激活（owner release 锁定） | "Analytics may be added with consent in a future authorized release." | ✅ |
| Cookie | 站点自身不写任何 cookie（无 banner、无 cookie 设置代码） | 未逐字提 cookie 名；分析激活前无实际 cookie | ✅（激活 GA4 时必须补披露，见 §5 P1-2） |
| 托管 | Cloudflare 基础设施（wrangler/open-next 配置） | "hosted on Cloudflare infrastructure" | ✅ |
| 支付 | 无支付代码（grep stripe/payment/checkout 无） | "no paid products or services" | ✅ |
| 数据文件 | `/data/*.json` 本地静态资源；`provenance.json`：local-editorial-seed、`remoteFetch: false` | Terms 披露数据为社区/编辑整理 + 信任标签 | ✅ |

## 3. 禁用表达 / 高风险词核验（构建产物 grep）

- 全站 58 页构建 HTML grep：**未发现** `official site`、`official website`、`verified by Bellring/Skystone`、`guaranteed to win`、`100% accurate`、`free forever`、`open-source`、`copyright-free`、`safe for commercial use`、`no-risk` 等禁用表达。
- `sponsored by` 仅出现在否定句 `not affiliated with, endorsed by, or sponsored by Bellring Games, Skystone Games...`（要求中的非官方声明）。✅
- 信任标签：工具/内容页显示 `Community Report · Last Verified Aug 8, 2026`，与 About 中标签定义一致。✅
- Footer 非官方声明逐页存在：`Unofficial fan resource. Not affiliated with Bellring Games or Skystone Games.` ✅

## 4. 素材 / IP / 联系方式核验

### 4.1 Logo 与图片素材
- 品牌 = 纯文本 `MISTFALL HUNTER TOOLS`（金色文字，无官方 logo 图片/微调版）✅
- 公开页使用 8 张 PNG（hero-main + 6 职业 + guide-squad-dungeon），来源 = 06R3 设计包"原创图"（06R3 handoff 声明原创，`outputs/06-design/` 有设计源与 stitch 记录）。未发现官方截图/官方美术直接复用。✅（但见 P1-1 台账缺口）

### 4.2 复用台账对账（04R 必查项）
- `inputs/04-compliance/reuse-ledger.md` **仍为骨架**：REUSE-001/002/003 全空。
- `outputs/06-design/reusable-asset-library.md` 仅登记 6 项 CSS/Material Symbols 资产；**8 张公开页 PNG 未登记**（06R3 新增图片后未回填台账）。
- `outputs/08-backend-data/seed/provenance.json` 已声明数据为本地编辑种子、无远程抓取。
- 判断：素材为原创/自产（无第三方权属风险），实质合规；但台账未逐条登记，违反"先登记后使用"流程。→ **P1**（公开发布前必须补齐；若带缺上线，按审计口径升级 P0）。

### 4.3 公开联系方式（P0-5 复验，覆盖页面正文 + JSON-LD + llms.txt + sitemap/robots + footer）
- 源码全量 grep：唯一邮箱 `contact@mistfallhunter.co`，**无个人邮箱/占位符**。✅
- JSON-LD：home=WebSite(SearchAction)、tool=WebApplication、content=Article，**均不含邮箱**。✅
- `llms.txt`：不存在（无需检查）。✅
- sitemap.xml.body / robots.txt.body：无邮箱。✅
- footer/legal 链接：全部指向站内路由。✅
- 条件：`contact@mistfallhunter.co` 域名邮箱需 Email Routing 接线后才真实可达 → **发布硬前置**（§5 P1-3）。

## 5. 风险分级（Recheck 后）

### P0（上线前必须完成，不能带病上线）
- 无新增 P0。baseline 原 P0-1/2/4/5 已在实现中关闭：非官方声明 ✅、原创 logo ✅、法律页可达 ✅、域名邮箱统一 ✅。P0-3（台账）以 P1 形式保留（见下）。

### P1（发布前修复或明确披露）
1. **素材台账补齐**：`reuse-ledger.md` 逐条登记 8 张公开页 PNG（来源类型=原创/AI 生成、复用位置=各路由、权属=自有无第三方）或同步更新 `reusable-asset-library.md`；数据侧 `provenance.json` 已满足。责任：06 设计 + 08 后端；04R 对账结论待回填后复核。
2. **Cookie consent + Cookie 披露**：owner 02D R4 要求 banner（默认阻止 GA4 → Accept 加载 → Reject 不加载 → 可改偏好）。当前无分析故未实现，**激活 GA4 时硬前置**：先上 banner + Privacy 补 `_ga` 类 cookie 披露 + GA4 保留期（建议 14 个月）写入 + 激活必须走 owner 授权。
3. **Email Routing 接线**：`contact@mistfallhunter.co` 需在 07C DNS 阶段接线，否则法律页联系入口不可用 → 撤 noindex/公开发布硬前置。
4. **支付/付费功能（未来）**：启用前补 `/refund-policy` 或 Terms Refund 章节 + 支付服务商披露 + 失败任务不扣费条款（baseline P1-4 仍有效）。

### P2（上线后跟进，不阻塞 v1）
1. **Google Fonts self-host**：Inter 经 `fonts.googleapis.com` CDN 引入（OFL 1.1 许可合规 ✅，但产生外部请求与最小 IP 暴露）；发布前或发布后建议 self-host 并可在 Privacy 可选披露。Material Symbols 未实际使用。
2. AI/Newsletter/社区投稿等未来功能：启用前按 baseline P2-1/2/3 补披露条款。
3. GA4 保留期设置确认（激活时）。

## 6. 剩余 Owner 待确认项（真实未解决，不含已修复项）

1. **Email Routing / DNS 接线**（07C 阶段）：contact@mistfallhunter.co + 生产部署。
2. **生产部署授权**：owner release 明确锁定，需单独放行。
3. **Analytics（GA4）激活决策**：激活 = 先完成 P1-2（banner + 披露）再上线。
4. **mistfallhunter.gg 补注册做 301**（可选，不阻塞 V1，requirements-trace #10）。

## 7. 证据清单

| 证据 | 路径 |
|---|---|
| 路由定义（58） | `lib/routes.ts` |
| 法律页源码（Trust 组件） | `app/[[...slug]]/page.tsx` |
| 构建产物（法律页正文/无 __next_error__/canonical） | `.next/server/app/{privacy,terms,about,contact,index}.html` |
| sitemap 58 URLs（.co canonical） | `.next/server/app/sitemap.xml.body` |
| robots（Allow all；Disallow /api/ /404） | `.next/server/app/robots.txt.body` + `app/robots.ts` |
| 无分析脚本/无登录支付代码 | `app/` `components/` `lib/` grep 结果 |
| 工具客户端逻辑（无 cookie/无传输） | `components/tool-panel.tsx` |
| 数据来源声明（local seed, remoteFetch=false） | `outputs/08-backend-data/seed/provenance.json` |
| 素材台账（待补齐） | `inputs/04-compliance/reuse-ledger.md`、`outputs/06-design/reusable-asset-library.md` |
| Owner 决策（58 路由方案 B / R4 banner） | `inputs/02-owner-confirmations/owner-confirmation-02D-20260808.md` |
| Owner 放行范围（本地 only） | `inputs/00-launch-card/owner-release-07-08-local-implementation-20260808.md` |

## 8. 验收清单

- [x] 法律页与实际数据收集一致（§2 逐项）
- [x] 第三方服务披露完整（V1 实际零第三方；未来激活项均有闸门）
- [x] 高风险素材/IP 有免责声明或替代方案（Terms/About/Contact takedown 入口 + 原创素材；台账 P1 待补齐）
- [x] footer/legal route 不 404（构建产物核验）
- [x] 公开联系方式无个人邮箱暴露（页面/JSON-LD/llms/sitemap/robots/footer 全覆盖）
- [x] 非官方声明逐页存在（footer + About + Terms）
- [x] 禁用表达零命中（构建产物 grep）
- [x] 无登录/支付/上传/AI（与 Privacy/Terms 声明一致）

## 9. 下游交接

- 下一阶段：09 QA → 02P PM 验收 → 10 SEO recheck → 11 launch（部署/DNS/Email Routing 需 07C + owner 放行）。
- 必须读取：本报告 + baseline（`outputs/04-compliance/mistfall-hunter-compliance-baseline-20260808.md`）+ 02D 确认文件。
- 不能假设：不能假设已获得公开发布授权；不能假设 contact@mistfallhunter.co 已可收信（Email Routing 未接线）；不能假设 GA4 已激活（未激活，激活需先做 P1-2）。
- 建议动作：主控派 06 设计/08 后端补齐 `reuse-ledger.md` 8 条素材登记（P1-1），完成后 04R 仅复核台账即可关闭；07C 阶段接线 Email Routing；QA 按 §5 核验项执行。
- 状态行：**[DONE]**（本地实现合规复核通过；公开发布前需完成 §5 P1 项与 §6 owner 确认）
