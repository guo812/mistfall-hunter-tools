#!/usr/bin/env python3
"""04R4 independent compliance audit — mistfall-hunter repaired local build.
Read-only: fetches the local preview server only. No source edits, no public actions."""
import json, re, sys, urllib.request

BASE = "http://127.0.0.1:3144"
PATHS = [
    "/", "/class-quiz", "/settings", "/tier-list", "/loot-finder", "/items", "/checklist",
    "/build-planner", "/squad-builder", "/matchups", "/map",
    "/classes/mercenary", "/classes/sorcerer", "/classes/blackarrow", "/classes/shadowstrix", "/classes/seer", "/classes/withered-knight",
    "/builds/mercenary", "/builds/sorcerer", "/builds/blackarrow", "/builds/shadowstrix", "/builds/seer", "/builds/withered-knight",
    "/tier-list/solo", "/tier-list/trio", "/tier-list/duo", "/tier-list/beginner",
    "/maps/hallowgrove", "/maps/brandrgarde",
    "/bosses/cursed-moonwane", "/bosses/salmar", "/bosses/einherjar",
    "/guides/getting-started", "/guides/first-extraction", "/guides/extraction", "/guides/tips", "/guides/faq",
    "/guides/dual-weapon-stances", "/guides/camp-upgrades", "/guides/scavenger-squads", "/guides/leveling",
    "/guides/keys-treasure", "/guides/pvp-survival", "/guides/pc-settings", "/guides/ps5-settings",
    "/guides/xbox-settings", "/guides/controller-vs-kbm", "/guides/auction-house", "/guides/gold-farming",
    "/guides/duo", "/guides/solo-survival",
    "/codes/rewards", "/codes/how-to-redeem", "/codes/twitch-drops",
    "/about", "/privacy", "/terms", "/contact",
]

CJK = re.compile(r'[\u4e00-\u9fff\u3000-\u303f\uff00-\uffef]')
PLACEHOLDER = re.compile(r'\[DATA-PENDING|\[TODO|\[TBD|lorem ipsum|PLACEHOLDER|XXX|待补|占位', re.I)

def fetch(path):
    req = urllib.request.Request(BASE + path, headers={"User-Agent": "04r4-compliance-audit"})
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.status, r.read().decode("utf-8", "replace")

results = {"routes": {}, "jsonld_total": 0, "jsonld_placeholder_pages": [], "placeholder_pages": [],
           "cjk_pages": [], "trust_checks": {}, "emails": set(), "analytics_scripts": [],
           "canonical_ok": 0, "canonical_fail": [], "status_fail": []}

for path in PATHS:
    try:
        status, html = fetch(path)
    except Exception as e:
        results["status_fail"].append({"path": path, "error": str(e)})
        continue
    rec = {"status": status, "len": len(html)}
    if status != 200:
        results["status_fail"].append({"path": path, "status": status})
    # canonical
    m = re.search(r'<link rel="canonical" href="([^"]+)"', html)
    if m:
        canon = m.group(1)
        if canon == "https://mistfallhunter.co" + (path if path != "/" else ""):
            results["canonical_ok"] += 1
        else:
            results["canonical_fail"].append({"path": path, "canonical": canon})
    # placeholders in visible html
    if PLACEHOLDER.search(html):
        results["placeholder_pages"].append(path)
    # CJK in html
    if CJK.search(html):
        results["cjk_pages"].append(path)
    # JSON-LD
    ld_blocks = re.findall(r'<script type="application/ld\+json">(.*?)</script>', html, re.S)
    rec["jsonld_count"] = len(ld_blocks)
    results["jsonld_total"] += len(ld_blocks)
    for block in ld_blocks:
        try:
            data = json.loads(block)
        except Exception:
            results["jsonld_placeholder_pages"].append({"path": path, "issue": "unparseable jsonld"})
            continue
        text = json.dumps(data, ensure_ascii=False)
        if PLACEHOLDER.search(text):
            results["jsonld_placeholder_pages"].append({"path": path, "issue": "placeholder", "snippet": text[:300]})
        if CJK.search(text):
            results["jsonld_placeholder_pages"].append({"path": path, "issue": "cjk", "snippet": text[:300]})
    # emails
    for em in re.findall(r'[\w.+-]+@[\w-]+\.[\w.]+', html):
        results["emails"].add(em)
    # analytics script tags
    if re.search(r'googletagmanager|gtag\(|gtag/js|G-[A-Z0-9]{6,}|clarity\.ms|plausible\.io|cloudflareinsights', html, re.I):
        results["analytics_scripts"].append(path)
    results["routes"][path] = rec

# Trust page body verification: key frozen phrases must appear
TRUST_EXPECT = {
    "/privacy": [
        "Last updated: August 8, 2026", "1. Overview", "2. No Account, No Personal Data Required",
        "3. Browser-Local Processing", "4. Analytics", "5. Cookies", "6. Hosting and Infrastructure",
        "7. Children", "8. Third-Party Services", "9. Retention", "10. Your Choices and Rights",
        "11. Changes to This Policy", "12. Contact", "contact@mistfallhunter.co",
        "We use Google Analytics 4", "Cloudflare Web Analytics", "banner on first visit",
        "Workers, D1 database, R2",
    ],
    "/terms": [
        "Last updated: August 8, 2026", "1. Acceptance", "2. Unofficial Fan Resource",
        "3. Informational Content Only / Disclaimer", "4. Tools Are Provided As-Is",
        "5. Acceptable Use", "6. Intellectual Property", "7. External Links and Sources",
        "8. Refunds and Payments", "9. Limitation of Liability", "10. Changes", "11. Contact",
        "The Site currently offers no paid products or services", "contact@mistfallhunter.co",
    ],
    "/about": [
        "unofficial fan resource", "Unofficial Fan Resource", "Not affiliated with", "Data Sources",
        "Trust Labels", "Verified: data manually checked", "Community Report: compiled",
        "Needs Update: waiting", "All tools are free to use. No account or sign-up is required.",
        "contact@mistfallhunter.co",
    ],
    "/contact": [
        "Use cases:", "Corrections:", "Data sources:", "Takedown / IP:", "72 hours",
        "contact@mistfallhunter.co", "Response time: we aim to reply within 2 business days.",
    ],
}
for path, phrases in TRUST_EXPECT.items():
    try:
        status, html = fetch(path)
    except Exception as e:
        results["trust_checks"][path] = {"error": str(e)}
        continue
    missing = [p for p in phrases if p not in html]
    results["trust_checks"][path] = {"status": status, "missing_phrases": missing, "html_len": len(html)}

# Footer link check on home
_, home_html = fetch("/")
results["footer_links"] = {l: (f'href="{l}"' in home_html) for l in ["/about", "/privacy", "/terms", "/contact"]}
results["footer_unofficial"] = "Unofficial fan resource. Not affiliated with Bellring Games or Skystone Games." in home_html

# Non-official + disclaimer + forbidden expressions across all pages
FORBIDDEN = ["official site", "official website", "verified by Bellring", "verified by Skystone",
             "guaranteed to win", "100% accurate", "free forever", "open-source", "copyright-free",
             "safe for commercial use", "no-risk", "not affiliated with, endorsed by, or sponsored by"]
results["forbidden_expr"] = {p: [] for p in PATHS}
for path in PATHS:
    _, html = fetch(path)
    low = html.lower()
    for expr in FORBIDDEN:
        if expr in low:
            results["forbidden_expr"][path].append(expr)

results["emails"] = sorted(results["emails"])
print(json.dumps(results, ensure_ascii=False, indent=1))
