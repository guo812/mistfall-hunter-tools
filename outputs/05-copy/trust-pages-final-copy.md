# Trust Pages Final Copy — mistfall-hunter（05-copy 配套）

> 阶段 Stage: 05-copy（Trust 页文案定稿）
> 日期 Date: 2026-08-08
> 作者 Author: content（依据 04 compliance legal-pages-baseline-drafts.md + PRD §5.11 + 02D A2 决策）
> 关键决策: **02D owner 确认路由保持 58（A2 方案 B）** —— 不新增 /cookie-policy、/disclaimer 独立页；Cookie 政策内容并入 Privacy，Disclaimer 内容并入 Terms。
> 硬约束: 事实披露与风险表述不得弱化（04 基线为准）；非律师意见；联系邮箱统一 contact@mistfallhunter.co（E3）；Trust 4 页无 FAQ schema。

---

## 0. 页面清单（4 页，index ✅，canonical = https://mistfallhunter.co<path>）

| Route | H1 | Title | Meta | 状态 |
|---|---|---|---|---|
| /about | About Us | About Mistfall Hunter Tools | Unofficial fan resource for Mistfall Hunter with free decision tools and guides. Not affiliated with Bellring Games or Skystone Games. | 定稿 |
| /privacy | Privacy Policy | Privacy Policy | How Mistfall Hunter Tools handles data: browser-local processing, analytics and no account. Full privacy policy. | 定稿（含 Cookie 段） |
| /terms | Terms of Service | Terms of Service | Terms for using Mistfall Hunter Tools. Unofficial fan resource; data provided as-is. | 定稿（含 Disclaimer 段 + §Refunds and Payments） |
| /contact | Contact | Contact Us | Contact the Mistfall Hunter Tools team about corrections, data sources or takedown requests. | 定稿（含 takedown 入口） |

Footer 固定链接集：`About | Privacy | Terms | Contact` + `Unofficial fan resource. Not affiliated with Bellring Games or Skystone Games.` + `© 2026 Mistfall Hunter Tools. All game names and trademarks are property of their respective owners.`

---

## 1. /about — About Us（04 定稿 + 05 润色）

```text
About Mistfall Hunter Tools

Mistfall Hunter Tools is an unofficial fan resource for Mistfall Hunter, the
PvPvE extraction ARPG. We build free decision tools (class quiz, tier lists,
squad builder, loot finder, settings recommender, and more) and deep guides to
help you pick, build, squad up, and extract smarter.

Unofficial Fan Resource
This site is not affiliated with, endorsed by, or sponsored by Bellring Games,
Skystone Games, or any other publisher. "Mistfall Hunter" and related
trademarks belong to their respective owners and are used for identification
and commentary only.

Data Sources
Game data on this site is compiled from official public sources, community
reports, and our own testing. Each dataset is tracked with source URLs and
verification dates. Reused assets are logged in our reuse ledger. See our
Disclaimer (in the Terms of Service) for details.

Trust Labels
- Verified: data manually checked against official sources or tested in-game,
  with a Last Verified date.
- Community Report: compiled from community or video sources, not confirmed by
  the publisher.
- Needs Update: waiting on a re-check after a patch.

All tools are free to use. No account or sign-up is required.

Contact
corrections, data sources, or takedown requests: contact@mistfallhunter.co
```

---

## 2. /privacy — Privacy Policy（04 定稿 + Cookie 政策并入）

> A2 方案 B：原 Cookie Policy 草案并入本节 §5/§6（不新增 /cookie-policy 路由）。

```text
Privacy Policy

Last updated: August 8, 2026

1. Overview
Mistfall Hunter Tools ("we", "our", "us", operated at mistfallhunter.co) is an
unofficial fan resource for the game Mistfall Hunter. We provide free, anonymous
decision tools and guides. We do not sell user data.

2. No Account, No Personal Data Required
All tools on this site are anonymous. You do not need to create an account,
log in, or provide your name or email to use any tool in this version of the
site. We do not collect or store any server-side user accounts.

3. Browser-Local Processing
Tool inputs and results (for example, class quiz answers, tier list filters,
checklist items, build drafts, and squad combinations) are processed in your
browser and stored only in your browser's local storage (localStorage). This
data is not transmitted to our servers and is not shared with third parties.
You can clear it at any time through your browser settings. If localStorage is
unavailable (for example, in private browsing), tools still work but your
progress will not persist.

4. Analytics
We use Google Analytics 4 ("GA4") and Cloudflare Web Analytics to understand how
visitors use the site. These services collect aggregated or pseudonymous usage
data such as pages visited, tool usage events, device type, and approximate
location. Event data does not include your name, email, image content, or file
names. GA4 may set cookies to distinguish visitors; see the Cookies section
below. Cloudflare Web Analytics is cookieless and collects aggregate statistics.
You can opt out of GA4 by using Google's opt-out tools, by rejecting analytics
cookies via our cookie preference controls, or by using browser privacy
features.

5. Cookies
Cookies are small text files stored in your browser. We use the following:
- Analytics cookies (Google Analytics 4): measure how visitors use the site
  (pages visited, tools used). These are only loaded with your consent.
- Preference/consent cookie: remembers your cookie choices.
- Local storage: tool data (quiz answers, checklist, drafts) — stored locally
  in your browser, not transmitted to servers.
- Cloudflare Web Analytics: cookieless; no cookie required.
You can accept or reject analytics cookies using our cookie preference control
(the banner on first visit). You can also block cookies in your browser
settings. Blocking analytics cookies does not affect tool functionality.

6. Hosting and Infrastructure
The site is hosted on Cloudflare infrastructure (Workers, D1 database, R2
storage). Standard server and edge logs may be kept for security and
operations purposes. These logs are not used to identify individual users and
are not sold or shared for advertising.

7. Children
This site is a gaming resource and is not directed at children under 13. We do
not knowingly collect personal information from children under 13. If you
believe a child has provided us personal information, contact us and we will
delete it.

8. Third-Party Services
We may use third-party services in the future (for example, email providers or
payment processors). Before any such service collects your data, this policy
will be updated to disclose it.

9. Retention
Because we do not store server-side user data, there is no user-data retention
period to manage. Analytics data is retained per the analytics provider's
settings (GA4 retention is set to 14 months).

10. Your Choices and Rights
Depending on where you live (for example, California under the CCPA/CPRA), you
may have rights to know, delete, or opt out of "sale"/"sharing" of personal
information. Because we collect minimal data and do not sell data, we have
nothing to sell. You can exercise choices through your browser (local storage,
cookies, analytics opt-out).

11. Changes to This Policy
We may update this policy as features change. The "Last updated" date above
will reflect changes.

12. Contact
Questions about privacy: contact@mistfallhunter.co
```

---

## 3. /terms — Terms of Service（04 定稿 + Disclaimer 并入 + §Refunds and Payments）

> A2 方案 B：原 Disclaimer 草案要点并入 §2/§3/§6/§9（不新增 /disclaimer 路由）；E4：§8 Refunds and Payments 段落保留。

```text
Terms of Service

Last updated: August 8, 2026

1. Acceptance
By using mistfallhunter.co (the "Site"), you agree to these Terms. If you do
not agree, do not use the Site.

2. Unofficial Fan Resource
The Site is an unofficial fan resource. It is not affiliated with, endorsed by,
or sponsored by Bellring Games, Skystone Games, or any other game publisher.
"Mistfall Hunter" and related game names, logos, and trademarks belong to their
respective owners and are used for identification and commentary only.

3. Informational Content Only / Disclaimer
All tools, tier lists, build guides, drop data, settings recommendations, and
other content are provided for general informational purposes only. Game
mechanics change with patches; data is labeled with "Last Verified" dates and
trust labels (Verified / Community Report / Needs Update) but is not guaranteed
to be accurate, complete, or current. Nothing on the Site is legal, financial,
or professional advice. You are responsible for how you use the tools and
content, including compliance with the game's terms of service and applicable
law.

4. Tools Are Provided As-Is
Tools are provided "as is" without warranties of any kind, express or implied.
We do not guarantee that any tool output, recommendation, or data is accurate,
reliable, or suitable for any purpose. Use at your own risk.

5. Acceptable Use
You agree not to: (a) scrape or otherwise access the Site in a way that
violates applicable law, this Site's robots.txt, or the rights of others;
(b) attempt to disrupt, overload, or gain unauthorized access to the Site;
(c) use the Site for any unlawful purpose; (d) copy substantial portions of the
Site's content for republication without attribution.

6. Intellectual Property
Content we create (original text, original logo, original tool interfaces) is
ours. Game content, assets, and trademarks are the property of their owners and
are used here in a transformative, commentary, and fan-resource manner. If you
believe content on the Site infringes your rights, contact us per the Contact
section and we will review and, where appropriate, remove it.

7. External Links and Sources
The Site may link to external sources (official sites, community sources) for
data attribution. We are not responsible for the content of external sites.

8. Refunds and Payments
The Site currently offers no paid products or services. All tools are free to
use. If paid features are introduced in the future, a refund policy will be
published before any charge is made.

9. Limitation of Liability
To the maximum extent permitted by law, we are not liable for any damages
arising from your use of the Site or reliance on its content.

10. Changes
We may update these Terms. Continued use after changes means you accept the
updated Terms.

11. Contact
contact@mistfallhunter.co
```

---

## 4. /contact — Contact Us（04 定稿）

```text
Contact Us

Use cases:
- Corrections: tell us about outdated or wrong data (include the page URL).
- Data sources: ask about source/verification details.
- Takedown / IP: submit copyright or trademark takedown requests; include the
  specific URL, your relationship to the rights, and contact details. We review
  and act within 72 hours where appropriate.

Email: contact@mistfallhunter.co
Response time: we aim to reply within 2 business days.
```

---

## 5. 交付与验收

- 4 页正文冻结如上；Title/Meta/H1 见 §0 表；文案不得在实现阶段自行改写披露事实。
- 04R 复验项：页面正文/JSON-LD/llms.txt/sitemap/robots/footer 邮箱一致；Email Routing 接线（07C）后 contact@ 真实可用；Cookie consent banner 三态（默认/接受/拒绝）实现验收。
- 风险：以上为合规基线草案，非律师意见；若 04R 判定需要微调，仅 Trust 4 页改动，不影响其余 54 页冻结。

**状态行：[DONE] — Trust 4 页文案定稿（A2 方案 B：Cookie/Disclaimer 已并入，路由保持 58）。**
