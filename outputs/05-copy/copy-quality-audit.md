# Copy Quality Audit — mistfall-hunter（05-copy 配套）

> 阶段 Stage: 05-copy（禁词扫描 + 质量门槛自检）
> 日期 Date: 2026-08-08
> 作者 Author: content
> 方法: 脚本扫描 outputs/05-copy/*.md 的公开文案 + 人工复核；禁词基线 = 04 compliance §5 + 03 pricing §6.3。

---

## 1. 禁词扫描结果

| 禁词/模式 | 命中数 | 处置 |
|---|---|---|
| Unlimited / free forever / 100% free / open-source | 全部为「禁词文档本身」或「禁止说明」 | ✅ 公开文案 0 命中；页面统一 `Free to use. No account needed.` |
| Upgrade / Buy / Subscribe（付费 CTA） | 3 处 | ✅ 均为合法语境：camp upgrades 游戏机制（FAQ）、auction house buy/sell 游戏机制、以及禁词文档本身；**站内付费 CTA 0 处** |
| Premium / Lifetime / Pro（付费套餐） | 0（仅禁词文档） | ✅ |
| guaranteed / no-risk / always correct / 100% accurate | 均为禁词文档 | ✅ 公开文案 0 命中；FAQ 用 `not a guarantee` 否定口径 |
| official site（自称官方） | 1 处（Terms §7 外链段落） | ✅ 合法：`may link to external sources (official sites...)` 指外部官方来源，非自称 |
| endorsed / sponsored / affiliated（非否定句） | 全部是否定句（Not affiliated with, endorsed by, or sponsored by） | ✅ |
| 竞品名 mistfalldb / metamist | 仅内部监控/台账说明 | ✅ 公开正文/Meta/FAQ 0 处 |
| Gmail / 个人邮箱 | 0 | ✅ 统一 contact@mistfallhunter.co |
| paywall / login wall / signup wall | 0（仅禁词文档） | ✅ |
| Learn More（泛化 CTA） | 0 | ✅ 全部 CTA 为动词+结果 |

**结论：公开文案零违规；全部命中为禁词文档、否定句或游戏机制语境。**

## 2. 质量门槛自检（Skill 验收清单）

- [x] 5 秒内知道 What/Who/Why/CTA：H1 + DA 首屏结论块 + 主 CTA（§2 逐路由 DA 表）
- [x] 每个页面文案可直接给设计排版：H2 模板（[T]/[C]/[H]）+ CTA/状态文案逐条冻结
- [x] 没有空泛 AI 话术：短句、具体、数字给范围、无证据标 [DATA-PENDING: 08]
- [x] 禁词和合规风险已处理：见 §1 扫描；Unofficial 声明、信任标签、Free to use 口径收口
- [x] FAQ 首句直答：faq-schema-copy.md 全部 Q&A 首句给答案
- [x] CTA 动词+结果：Take/Build/Get/Open/Find/Browse/Explore/Plan/Copy + Steam CTA（Play on Steam）
- [x] 每页 TDK/H1 唯一：58 路由对照 PRD §5（Trust 4 页按 04 定稿），无重复
- [x] 四工具页（R3）非薄页正文冻结：500-800 词 + FAQ + 内链，index + sitemap
- [x] 移动端可读性：首屏工具可操作、表格横向滚动、TOC 折叠、触区 ≥44px 约束写入

## 3. 风险登记

- P0：无（本阶段无部署/支付/DNS/公开动作；仅文案冻结）。
- P1：`[DATA-PENDING: 08]` 标记的数据类 FAQ（掉落/数值/Boss 招式/费率）若 08 不回填即上线 → 薄页/误导风险；实现阶段必须回填或按 Community Report 降级。
- P2：Trust 页 Title/Meta 需 04R 终检；域名邮箱接线（07C）前不得公开发布。

## 4. 证据

- 扫描脚本输出：全部命中行号与上下文已人工复核（本文件 §1）。
- 交付物清单：outputs/05-copy/ 下 5 个文件（见 handoff-05-copy.md）。

**状态行：[DONE] — 禁词扫描通过、质量门槛全部满足；等待 05C owner 确认。**
