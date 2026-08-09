# Compliance Baseline — mistfall-hunter（04 compliance baseline）

- 项目 Project: mistfall-hunter（board: site-mistfall-hunter）
- 生产域名 Production domain: **mistfallhunter.co**（Dynadot 已注册，owner 2026-08-08 确认；事实源 project-control.md；PRD §1 仍写 domain_pending/.gg 首选为陈旧口径，见 Addendum A1）
- 目标市场 Market: US / English
- 阶段 Stage: 04-compliance（baseline，非 recheck）
- 执行 Agent: hegui（合规审查）
- 日期 Date: 2026-08-08
- 上游输入 Upstream: PRD V1（outputs/02-prd-v1/prd-v1-master-spec-bilingual.md，02C owner 已确认，t_3b007694 done）、02A rev2 brief（outputs/02A-prd-brief/02A-prd-brief-rev2-bilingual.md）、owner-decision-02A-rev-20260808.md、requirements-trace.md、process-contract.md、project-control.md、RESEARCH-FREEZE.md
- 状态 Status: **[DONE]**（基线交付；上线前存在 P0/P1 修复项与 04R 复验闸门，见 §5）

> 声明：本报告为合规基线建议，不是律师意见。正式上线前建议对最终法律页做一次独立复核（04R）。

---

## 1. 数据清单 / Data Inventory

按 PRD V1 §3/§6.2/§6.3 与 N12（首版无登录/无付费墙）逐项盘点：

| 类别 | 明细 | 是否服务端存储 | 披露页面 |
|---|---|---|---|
| 账号/PII | 无登录、无注册、无个人资料 | 否 | Privacy（"We do not require an account"） |
| 用户上传 | V1 无上传功能 | 否 | — |
| 工具草稿/结果 | checklist 勾选、quiz 结果、build 草稿、squad 组合 | **仅 localStorage，不上传** | Privacy（browser-local processing） |
| 分析事件 | GA4 事件：tool_used / quiz_completed / squad_built / matchup_viewed / settings_generated / checklist_completed / content_read / internal_link_click / build_shared；Cloudflare Web Analytics 聚合统计 | 是（第三方） | Privacy §Analytics + Cookie Policy |
| 事件参数红线 | 不含图片内容、文件名、PII（PRD §6.3 硬约束） | — | Privacy（disclose collected event fields） |
| 邮件 | V1 无；Newsletter 为 P1（PRD §6.2/§6.3） | 否（V1） | Privacy 预留；上线前必须更新（见 §5 P1-3） |
| Cookie | GA4 的 _ga/_ga_* 类 cookie；若加 consent banner 则有偏好 cookie | 浏览器端 | Cookie Policy |
| 支付数据 | V1 无支付（N12；Stripe 凭据存在于共享 .env.site 但未启用） | 否 | Refund section；支付上线前必须补（见 §5 P1-4） |
| 服务端日志 | Cloudflare edge/Workers 日志（基础设施级，无业务 PII） | 是（基础设施） | Privacy §Hosting |
| 游戏数据 | D1 结构化数据（物品/职业/掉落）、R2 图片素材——**非用户数据** | 是（自有） | About/Data Sources + Terms |

## 2. 第三方服务映射 / Third-Party Map

| 服务 | 用途 | 数据流出 | 保留 | 退出/控制 | 披露位置 |
|---|---|---|---|---|---|
| Google Analytics 4（Google LLC，US） | 行为分析事件 | 匿名事件（无 PII/图片/文件名） | GA4 默认 14 个月（可调，建议 14 个月并写入 Privacy） | 浏览器扩展禁用、GA4 隐私设置；Cookie Consent 拒绝后不加载 | Privacy + Cookie Policy |
| Cloudflare Web Analytics（Cloudflare，Inc.） | 无 cookie 聚合访问统计 | 聚合、cookieless | Cloudflare 策略 | 无需 cookie 同意；隐私政策披露即可 | Privacy |
| Cloudflare D1 / R2 / Workers（Cloudflare，Inc.） | 托管、游戏数据、图片素材 | 非用户数据 | — | — | Privacy §Hosting |
| Google Fonts（设计阶段如使用） | 字体 | 客户端请求字体文件（IP 注：OFL 1.1 可商用；建议 self-host） | — | — | Privacy 可选；技术侧建议 self-host（P2） |
| 未启用（V1 不激活） | Microsoft Clarity / Plausible / Stripe / Newsletter provider / AI API | 共享凭据文件存在但 PRD 未启用；**启用即触发 Privacy/Cookie/Refund 更新闸门** | — | — | 见 §5 P1-3/P1-4/P2-1 |

**无**：登录/认证服务、支付服务商（V1）、AI 服务商（V1）、邮件服务商（V1）、第三方广告网络（V1）。

## 3. 风险分级 / Risk Grading

### P0（上线前必须完成，不能带病上线）
1. **N1 非官方声明缺失**：全站页脚 + About + Terms 必须包含 `Unofficial fan resource. Not affiliated with Bellring Games or Skystone Games.`（硬约束，不因 rev2 放宽）。
2. **N2 官方 logo 本体使用**：禁止官方 logo 原图/微调版；只能用原创类官方风格 logo，且 06 出稿后 04 复核相似度（R10）。
3. **复用素材无台账**：任何官方/竞品图片、数据、文案方向、主题在公开页使用前必须已在 `inputs/04-compliance/reuse-ledger.md` 登记（先登记后使用，N5/N6）。
4. **法律页缺失或 404**：/privacy /terms /cookie-policy /disclaimer /about /contact 及 footer 链接全部可达；别名 308。
5. **联系邮箱为个人邮箱/占位符**：必须 `contact@mistfallhunter.co`；Email Routing 接线是撤 noindex/公开发布的硬前置（见 P1-2）。

### P1（上线前修复或明确披露）
1. **Cookie Consent**：GA4 在 US 市场需披露 + 用户控制；建议实现 consent banner（默认阻止 GA4，Accept 后加载，Reject 不加载，可修改偏好）。Cloudflare Web Analytics cookieless 无需同意。
2. **Email Routing 接线**：contact@mistfallhunter.co 需在 07C DNS 阶段接线；未接线前不得公开发布（法律页联系入口必须真实可用）。
3. **Newsletter（P1 功能）**：收集邮箱前必须更新 Privacy（服务商/存储/退订方式/保留期），事件参数不得含 email（PRD 已红线）；04 复验后放行。
4. **支付/Pro 上线（03 定价决策后）**：上线前补 /refund-policy + 支付服务商披露 + 失败任务不扣费/自动退 credits 条款（见 Legal drafts Refund）；04R 闸门。
5. **Logo 相似度复核**：06 出稿后对照官方 logo 检查可区分度，保留原创过程证据；不达标改稿（R10）。
6. **爬取礼貌策略**：08 后端落实 rate limit / robots 检查；来源台账每条含来源 URL + 采集日期 + Last Verified（R9）。

### P2（上线后跟进，不阻塞 v1）
1. **AI Q&A（P2）**：上线前补 AI Content Policy + Privacy 增补（provider/数据共享/不保证条款）。
2. **多语言（P2）**：i18n 上线时法律页同步翻译。
3. **社区投稿（P2）**：用户内容上线前补用户内容条款（权利归属/审核/下架）。
4. **Google Fonts self-host**：避免运行时外部请求与字体许可审计负担。
5. **GA4 保留期**：确认 14 个月设置并在 Privacy 写明，避免与实际不符。

## 4. 法律页合同 / Legal Route Contract

| Canonical | 别名（308） | 状态 | 内容责任 |
|---|---|---|---|
| /privacy | /privacy-policy（可选） | V1 | 04 草稿 → 05 文案定稿 |
| /terms | /terms-of-service（可选） | V1 | 04 草稿 → 05 文案定稿 |
| /cookie-policy | /cookies | V1（新增，需 owner 在 02D 确认） | 04 草稿 → 05 文案定稿 |
| /disclaimer | — | V1（新增，需 owner 在 02D 确认） | 04 草稿 → 05 文案定稿 |
| /refund-policy | /refunds | 支付上线前创建；V1 先在 Terms 内 Refund section | 04 草稿 → 03 定价决策后激活 |
| /about | — | V1（PRD 已有） | 04 定稿 Unofficial 声明 + 数据来源说明 |
| /contact | — | V1（PRD 已有） | 04 定稿：联系邮箱 + takedown 入口 |

> 路由数影响：PRD §5.11 原 4 个信任页（about/privacy/terms/contact）。本基线建议新增 /cookie-policy 与 /disclaimer 两个 indexable 法律页 → 58 → 60 路由。该变化必须走 02D addendum 决策（见 Addendum A2），不静默改 PRD。

Footer 固定链接集（每页可见，QA 验收）：About / Privacy / Terms / Cookie Policy / Disclaimer / Contact。

## 5. 禁用表达 / Prohibited Expressions（给 05 文案 + 前端）

| 类别 | 禁止 | 替代/说明 |
|---|---|---|
| 官方身份 | official, official site, verified by Bellring/Skystone, endorsed, sponsored, affiliated（除否定句） | 只用 "Unofficial fan resource. Not affiliated with Bellring Games or Skystone Games." |
| 绝对化 | 100% accurate, guaranteed, always correct, best tier list (无证据), no risk | "based on community reports", "as of [Last Verified]", 信任标签（Verified/Community Report/Needs Update）必须有定义与来源 |
| 免费/开源 | free forever, 100% free, open-source | 工具免费可用可写 "free tools, no sign-up"（真实）；"open-source" 除非真实开源否则禁用 |
| 官方素材 | official logo, official artwork, 官方截图（无授权） | 复用素材先台账；logo 用原创 |
| 保证类 | guaranteed to win, no-risk extraction, guaranteed drops | 禁用 |
| 版权承诺 | copyright-free, no copyright risk, safe for commercial use | 禁用（R8） |
| 法律/专业 | legal advice, professional advice | Terms/Disclaimer 声明内容不构成法律/专业意见 |
| 竞品品牌 | MistfallDB 等竞品站名/logo 用作本站品牌/主视觉 | N4 硬约束；页面正文不提竞品对比表（internal benchmark only） |

信任标签定义（Privacy/Terms/About 需给出，防止虚假 "Verified"）：
- **Verified**：数据经人工核验官方来源或游戏内实测，且有 Last Verified 日期。
- **Community Report**：社区/视频来源汇总，未经官方确认。
- **Needs Update**：补丁后待更新。

## 6. IP / 来源政策与 takedown 预案 / IP & Source Policy + Takedown Plan（R8-R11 缓解）

依据 owner-decision-02A-rev（owner 明确决策接受 IP/版权/ToS/商标方向风险，缓解与预案为 04 必交付）。

### 6.1 复用台账（R8/R11 缓解）
- 文件：`inputs/04-compliance/reuse-ledger.md`（本交付已建骨架，待 06/08 填充；**先登记后使用**）。
- 字段：asset_id / 来源 URL / 复用位置（route）/ 复用方式（原样|改编）/ 权属状态（official|competitor|community|cc-license|unknown）/ 登记日期 / 处置备注。
- 审计口径：任何公开页出现未登记素材 = P0；台账与线上素材逐条可对账（04R 复核项）。
- 优先级：直接复用项优先官方来源；竞品来源项标注并评估投诉路径（R11）。

### 6.2 数据采集（R9 缓解）
- 礼貌抓取：rate limit、robots.txt 检查、不绕过登录墙/反爬（08 落实）。
- 每条关键数据：来源 URL + 采集日期 + Last Verified；页面展示 Last Verified 与信任标签。
- 游戏 ToS/EULA 暴露面：公开页持续标注非官方/非背书；收到官方通知即按 takedown SOP 处置。

### 6.3 Logo（R10 缓解）
- 原创绘制、类官方风格但图形可区分；禁用官方 logo 本体/微调版。
- 06 出稿 + 04R 相似度复核；保留设计过程证据（草稿/迭代记录）。

### 6.4 Takedown SOP（R1/R8/R9/R11 预案）
1. **接收**：contact@mistfallhunter.co 统一入口；DMCA/官方/竞品投诉均走同一队列。
2. **定位**：按投诉中的素材/页面描述查复用台账与站点路由，确认资产与来源。
3. **处置**（72h 内）：
   - 台账可定位 → 下架/替换该素材，更新台账状态；
   - 无法定位 → 全站搜索关键词，隔离相关页（noindex 或下线）；
   - 官方/法律通知 → 优先合规处置，不争论。
4. **回复**：24h 内确认收悉，说明处置结果。
5. **复盘**：记入 blocked-log/合规复盘；高频类型回写台账审计规则。
6. **兜底**：若收到 UDRP/DMCA 针对域名（R1），保留 Unofficial 声明与原创证据包，必要时按 owner 决策应对。

## 7. 验收清单 / Acceptance Checklist

- [x] 法律页与实际数据收集一致（数据清单 §1 逐项对应草稿）
- [x] 第三方服务全部披露（§2 表；V1 无支付/登录/AI/邮件）
- [x] 高风险素材/IP 有免责声明或替代方案（§6 台账 + takedown + Disclaimer 草稿）
- [x] footer/legal route 不会 404（route contract §4；前端实现后 04R 复验）
- [x] 公开联系方式无个人邮箱暴露：本阶段尚无线上页面；P1-2 要求 contact@mistfallhunter.co 接线；04R 将复验页面正文/JSON-LD/llms.txt/sitemap/robots/footer
- [x] 非法律意见声明（本报告 + 法律页草稿均标注）
- [x] 不得承诺未实现能力（免费/无登录/无支付为 V1 真实状态；Pro/Newsletter/AI 均按未来项披露）

## 8. 本阶段交付物清单

| 文件 | 说明 |
|---|---|
| `outputs/04-compliance/mistfall-hunter-compliance-baseline-20260808.md` | 本报告 |
| `outputs/04-compliance/legal-pages-baseline-drafts.md` | Privacy/Terms/Cookie/Refund/Disclaimer/About/Contact 基线草稿（英文，供 05 文案定稿） |
| `outputs/04-compliance/prd-addendum-compliance-20260808.md` | 可追溯 PRD addendum 建议（A1-A10，不改写 PRD） |
| `inputs/04-compliance/reuse-ledger.md` | 复用台账骨架（先登记后使用，06/08 填充） |
| `outputs/04-compliance/handoff-04-compliance.md` | 下游交接摘要 |

## 9. 下游交接 / Downstream Handoff（给下游的最小必要信息）

- 下一阶段：05S SEO baseline → 05 文案（05C owner 确认）→ 06 设计 → 07/08 实现 → 04R 合规复验 → QA。
- 必须读取：本报告 + legal-pages-baseline-drafts.md + prd-addendum-compliance-20260808.md + reuse-ledger.md。
- 不能假设：不能假设已注册域名是 .gg（实际是 mistfallhunter.co）；不能假设 Cookie/Refund/Disclamer 页面已获 owner 批准（新增 2 路由需 02D）；不能假设支付/Newsletter/AI 已启用（均未启用）。
- 状态行：**[DONE]**（04 基线完成；上线前需完成 §5 P0/P1 项，04R 复验在实现后执行）
