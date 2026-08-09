#!/usr/bin/env python3
"""mistfall-hunter stage-10 SEO recheck — local preview audit.
Audits the locally running Next.js preview (default 127.0.0.1:3007):
- robots.txt, sitemap.xml shape
- per-route: status, title, meta description, canonical, robots meta, h1 count,
  JSON-LD types, direct-answer, Last Verified, word count, FAQ h3 count,
  internal link count
- 404/noindex behavior, /api/ exclusion
- pairwise content similarity (route-unique threshold)
Outputs: seo-recheck.json + seo-recheck-report.md in the script dir.
"""
import json, re, sys, html as html_mod, urllib.request, urllib.error
from collections import Counter

BASE = sys.argv[1] if len(sys.argv) > 1 else "http://127.0.0.1:3007"
SITE = "https://mistfallhunter.co"
OUT = sys.argv[2] if len(sys.argv) > 2 else "/root/.hermes/projects/shipsolo/mistfall-hunter/outputs/10-seo-recheck"

def fetch(path, timeout=20):
    req = urllib.request.Request(BASE + path, headers={"User-Agent": "Mozilla/5.0 (compatible; SEO-recheck/1.0)"})
    try:
        with urllib.request.urlopen(req, timeout=timeout) as r:
            return r.status, r.read().decode("utf-8", "replace"), dict(r.headers)
    except urllib.error.HTTPError as e:
        return e.code, e.read().decode("utf-8", "replace"), dict(e.headers)
    except Exception as e:
        return -1, str(e), {}

def get(html, pattern, flags=re.I):
    m = re.search(pattern, html, flags)
    return m.group(1).strip() if m else None

def visible_text(html):
    # strip scripts/styles then tags
    t = re.sub(r"<(script|style)[^>]*>.*?</\1>", " ", html, flags=re.S | re.I)
    t = re.sub(r"<[^>]+>", " ", t)
    t = html_mod.unescape(t)
    t = re.sub(r"\s+", " ", t)
    return t.strip()

def shingles(text, k=5):
    words = re.findall(r"[a-z0-9']+", text.lower())
    if len(words) < k:
        return set(words)
    return set(tuple(words[i:i+k]) for i in range(len(words) - k + 1))

def jaccard(a, b):
    if not a or not b:
        return 0.0
    return len(a & b) / len(a | b)

# 1. robots.txt
st, robots_body, _ = fetch("/robots.txt")
robots = {
    "status": st,
    "body": robots_body[:2000],
    "allow_root": bool(re.search(r"User-agent:\s*\*\s*Allow:\s*/", robots_body)),
    "disallow_api": bool(re.search(r"Disallow:\s*/api/", robots_body)),
    "disallow_404": bool(re.search(r"Disallow:\s*/404", robots_body)),
    "sitemap_line": get(robots_body, r"Sitemap:\s*(\S+)"),
}

# 2. sitemap.xml
st, sitemap_body, _ = fetch("/sitemap.xml")
locs = re.findall(r"<loc>(.*?)</loc>", sitemap_body, re.S)
sitemap = {"status": st, "loc_count": len(locs), "locs": locs}

# 3. per-route audit
paths = []
for loc in locs:
    p = loc.replace(SITE, "")
    if p and p not in paths:
        paths.append(p)
if "/" not in paths:
    paths.insert(0, "/")

results = []
for p in sorted(paths):
    st, body, hdrs = fetch(p)
    title = get(body, r"<title[^>]*>(.*?)</title>", re.S | re.I)
    meta_desc = get(body, r'<meta\s+name="description"\s+content="([^"]*)"')
    canonical = get(body, r'<link\s+rel="canonical"\s+href="([^"]*)"')
    robots_meta = get(body, r'<meta\s+name="robots"\s+content="([^"]*)"')
    h1s = re.findall(r"<h1[^>]*>(.*?)</h1>", body, re.S | re.I)
    ldjs = re.findall(r'<script\s+type="application/ld\+json"[^>]*>(.*?)</script>', body, re.S | re.I)
    ld_types = []
    for ld in ldjs:
        try:
            parsed = json.loads(ld)
        except Exception:
            try:
                parsed = json.loads(ld.replace("&quot;", '"'))
            except Exception:
                parsed = None
        if isinstance(parsed, dict):
            ld_types.append(parsed.get("@type"))
        elif isinstance(parsed, list):
            ld_types += [x.get("@type") for x in parsed if isinstance(x, dict)]
    text = visible_text(body)
    words = len(re.findall(r"[a-zA-Z0-9']+", text))
    h3s = re.findall(r"<h3[^>]*>(.*?)</h3>", body, re.S | re.I)
    faq_ld = 1 if any(t == "FAQPage" for t in ld_types) else 0
    links = re.findall(r'<a\s+[^>]*href="(/[^"]*)"', body)
    internal_links = [l for l in links if not l.startswith("//")]
    expected_canonical = SITE + ("" if p == "/" else p.rstrip("/") if p != "/" else "")
    if p == "/":
        expected_canonical = SITE + "/"
    results.append({
        "path": p, "status": st,
        "title": title, "title_len": len(title) if title else 0,
        "meta_desc_present": bool(meta_desc), "meta_desc_len": len(meta_desc) if meta_desc else 0,
        "canonical": canonical, "canonical_ok": canonical == expected_canonical,
        "robots_meta": robots_meta, "noindex": bool(robots_meta and "noindex" in robots_meta),
        "h1_count": len(h1s),
        "ld_types": ld_types, "ld_count": len(ldjs),
        "faq_ld": faq_ld,
        "direct_answer": bool(re.search(r"direct-answer", body)),
        "last_verified": bool(re.search(r"Last Verified", body)),
        "word_count": words, "h3_count": len(h3s), "internal_links": len(internal_links),
    })

# 4. 404 + api probes
st404, body404, _ = fetch("/definitely-not-a-route-xyz")
stapi, bodyapi, _ = fetch("/api/probe")
notfound = {
    "status": st404,
    "noindex": bool(get(body404, r'<meta\s+name="robots"\s+content="([^"]*)"') and "noindex" in (get(body404, r'<meta\s+name="robots"\s+content="([^"]*)"') or "")),
    "robots_meta": get(body404, r'<meta\s+name="robots"\s+content="([^"]*)"'),
}
api = {"status": stapi}

# 5. similarity matrix
shingle_map = {r["path"]: shingles(visible_text(fetch(r["path"])[1])) for r in results}
max_sim = {}
for a in shingle_map:
    best = 0.0
    for b in shingle_map:
        if a == b:
            continue
        best = max(best, jaccard(shingle_map[a], shingle_map[b]))
    max_sim[a] = round(best, 4)

report = {
    "base": BASE, "site": SITE,
    "robots": robots, "sitemap": sitemap,
    "routes": results,
    "notfound": notfound, "api": api,
    "max_similarity": max_sim,
    "summary": {
        "route_count": len(results),
        "sitemap_ok": sitemap["status"] == 200 and sitemap["loc_count"] == 58,
        "all_200": all(r["status"] == 200 for r in results),
        "canonical_all_ok": all(r["canonical_ok"] for r in results),
        "noindex_on_public": [r["path"] for r in results if r["noindex"]],
        "missing_canonical": [r["path"] for r in results if not r["canonical_ok"]],
        "missing_desc": [r["path"] for r in results if not r["meta_desc_present"]],
        "bad_h1": [r["path"] for r in results if r["h1_count"] != 1],
        "no_ld": [r["path"] for r in results if r["ld_count"] == 0],
        "no_faq_ld": [r["path"] for r in results if r["faq_ld"] == 0],
        "no_direct_answer": [r["path"] for r in results if not r["direct_answer"]],
        "no_last_verified": [r["path"] for r in results if not r["last_verified"]],
        "tools_below_500": [r["path"] for r in results if r["word_count"] < 500],
        "content_below_2000": [r["path"] for r in results if r["word_count"] < 2000],
        "low_unique_gt40sim": [p for p, s in max_sim.items() if s > 0.40],
        "top_similar": sorted(max_sim.items(), key=lambda x: -x[1])[:12],
    },
}

import os
os.makedirs(OUT, exist_ok=True)
with open(os.path.join(OUT, "seo-recheck.json"), "w") as f:
    json.dump(report, f, indent=2, ensure_ascii=False)
print(json.dumps(report["summary"], indent=2, ensure_ascii=False))
