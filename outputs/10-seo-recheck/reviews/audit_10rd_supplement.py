#!/usr/bin/env python3
"""10R-D supplementary checks: redirects (no-follow), SSR counts, indexability, schema-type wiring, banned-token family self-test."""
import json
import re
import subprocess
import urllib.request
from collections import Counter
from pathlib import Path

BASE = "http://127.0.0.1:3199"
routes_root = Path("/root/.hermes/projects/shipsolo/mistfall-hunter/outputs/05-copy-repair/routes")
pages = [json.loads(p.read_text(encoding="utf-8")) for p in sorted(routes_root.rglob("*.json"))]
copy_paths = sorted(p["path"] for p in pages)
trust_paths = ["/about", "/privacy", "/terms", "/contact"]
all_paths = copy_paths + trust_paths

out = {"ok": True, "checks": {}}

def fetch(path):
    try:
        with urllib.request.urlopen(BASE + path, timeout=20) as r:
            return r.status, r.read().decode("utf-8", "ignore")
    except urllib.error.HTTPError as e:
        return e.code, e.read().decode("utf-8", "ignore")

# 1. no-follow redirect verification (curl -sI, must not follow)
redirect_checks = {}
for path in ["/privacy", "/terms", "/contact", "/about", "/404", "/robots.txt", "/sitemap.xml"]:
    r = subprocess.run(["curl", "-s", "-I", "-o", "/dev/null", "-w", "%{http_code}|%{redirect_url}", BASE + path], capture_output=True, text=True, timeout=20)
    code, loc = r.stdout.strip().split("|")
    redirect_checks[path] = {"status": int(code), "location": loc}
    # /404 legitimately returns 404 (verified separately); everything else must be 200/308/301
    if path == "/404":
        if code != "404":
            out["ok"] = False
    elif code not in ("200", "308", "301"):
        out["ok"] = False
out["checks"]["redirects_no_follow"] = redirect_checks

# 2. SSR data contracts — real row counts
items_html = fetch("/items")[1]
loot_html = fetch("/loot-finder")[1]
map_html = fetch("/map")[1]
item_rows = len(re.findall(r"<tr[^>]*>", re.sub(r"<(thead|tfoot)[^>]*>.*?</(thead|tfoot)>", "", items_html, flags=re.S)))
loot_rows = len(re.findall(r"<tr[^>]*>", re.sub(r"<(thead|tfoot)[^>]*>.*?</(thead|tfoot)>", "", loot_html, flags=re.S)))
poi_markers = re.findall(r'\\"li\\",\\"[a-z]+-[A-Za-z ]+ \d+\\"', map_html)
poi_names = sorted(set(re.findall(r'\\"li\\",\\"[a-z]+-([A-Za-z ]+ \d+)\\"', map_html)))
seed_pois = json.loads(Path("/root/.hermes/projects/shipsolo/mistfall-hunter/public/data/map-pois.json").read_text())
seed_count = len(seed_pois)
ssr = {
    "/items": {"tr_rows_visible": item_rows, "want": "48 seed rows"},
    "/loot-finder": {"tr_rows_visible": loot_rows, "want": "48 seed rows"},
    "/map": {"poi_li_markers_total": len(poi_markers), "poi_unique_names": len(poi_names), "seed_count": seed_count, "sample": poi_names[:8]},
}
if item_rows < 48 or loot_rows < 48 or len(poi_markers) < seed_count:
    out["ok"] = False
out["checks"]["ssr_contracts"] = ssr

# 3. sitemap composition + all-200 + no 3xx
sitemap = fetch("/sitemap.xml")[1]
locs = re.findall(r"<loc>(.*?)</loc>", sitemap)
sitemap_paths = [re.sub(r"^https://mistfallhunter\.co", "", loc) for loc in locs]
sitemap_status = {}
for p in sitemap_paths:
    code = fetch(p)[0]
    sitemap_status[p] = code
    if code != 200:
        out["ok"] = False
no_404_in_sitemap = "/404" not in sitemap_paths and "/api/" not in sitemap
out["checks"]["sitemap"] = {"loc_count": len(locs), "all_200": all(c == 200 for c in sitemap_status.values()), "no_404_or_api": no_404_in_sitemap, "status_codes": dict(Counter(sitemap_status.values()))}
if len(locs) != 58 or not all(c == 200 for c in sitemap_status.values()) or not no_404_in_sitemap:
    out["ok"] = False

# 4. robots.txt composition
robots = fetch("/robots.txt")[1]
out["checks"]["robots"] = {"allow_root": "Allow: /" in robots, "disallow_api": "Disallow: /api/" in robots, "disallow_404": "Disallow: /404" in robots, "sitemap": "Sitemap: https://mistfallhunter.co/sitemap.xml" in robots}
if not all(out["checks"]["robots"].values()):
    out["ok"] = False

# 5. schema-type wiring per route kind
schema_wiring = {}
type_policy = {
    "home": ["WebSite", "FAQPage", "Organization"],
    "tool": ["WebApplication", "FAQPage", "BreadcrumbList"],
    "content": ["Article", "FAQPage", "BreadcrumbList"],
    "trust": [],  # trust: no FAQPage; about should have Organization
}
by_kind = {}
for p in pages:
    by_kind.setdefault(p["kind"], []).append(p["path"])
by_kind["trust"] = trust_paths
for kind, paths in by_kind.items():
    kind_fail = []
    for path in paths:
        raw = fetch(path)[1]
        types = set(re.findall(r'"@type":"([A-Za-z]+)"', raw))
        required = set(type_policy.get(kind, []))
        missing = required - types
        if kind == "trust" and "FAQPage" in types:
            kind_fail.append((path, "FAQPage-present-on-trust"))
        if missing:
            kind_fail.append((path, f"missing {sorted(missing)}"))
        if kind == "trust" and path == "/about" and "Organization" not in types:
            kind_fail.append((path, "about-missing-Organization"))
    schema_wiring[kind] = {"routes": len(paths), "failures": kind_fail}
    if kind_fail:
        out["ok"] = False
out["checks"]["schema_wiring"] = schema_wiring

# 6. indexability — no noindex on any sitemap route; 404 noindex
noindex_hits = []
for path in all_paths:
    raw = fetch(path)[1]
    m = re.search(r'<meta[^>]+name="robots"[^>]+content="([^"]+)"', raw, re.I)
    if m and "noindex" in m.group(1).lower():
        noindex_hits.append((path, m.group(1)))
status404, html404 = fetch("/definitely-not-a-route-xyz")
noindex404 = "noindex" in html404.lower()
out["checks"]["indexability"] = {"noindex_on_indexable_routes": noindex_hits, "404_status": status404, "404_noindex": noindex404}
if noindex_hits or status404 != 404 or not noindex404:
    out["ok"] = False

# 7. OG/Twitter meta on representative routes
rep = ["/", "/class-quiz", "/guides/tips", "/tier-list", "/about"]
og = {}
for path in rep:
    raw = fetch(path)[1]
    og[path] = {"og:title": 'property="og:title"' in raw, "og:description": 'property="og:description"' in raw, "twitter:card": 'name="twitter:card"' in raw or 'property="twitter:card"' in raw}
out["checks"]["og_twitter"] = og

# 8. Banned-token family self-test: prove variants are actually caught
BANNED = [
    r"\[DATA-PENDING", r"DATA[-_ ]?PENDING", r"\[DATA[:\-]", r"\bTBD\b", r"\bTODO\b",
    r"\bFIXME\b", r"\blorem ipsum\b", r"\bSAMPLE\b", r"\bXXX\b", r"\bplaceholder\b",
    r"\bTBC\b", r"\bCOMING SOON\b", r"\bUNDER CONSTRUCTION\b", r"\bN/A\b", r"[\u4e00-\u9fff]",
]
import re as _re
family = _re.compile("|".join(BANNED), _re.I)
probes = {
    "[DATA-PENDING": True, "DATA-PENDING": True, "DATA_PENDING": True, "DATA PENDING": True,
    "[DATA: xyz]": True, "[DATA-item]": True, "TBD": True, "TODO": True, "FIXME": True,
    "lorem ipsum dolor": True, "SAMPLE TEXT": True, "XXX": True, "TBC": True,
    "COMING SOON": True, "UNDER CONSTRUCTION": True, "N/A": True, "中文": True,
    "Mistfall Hunter is free to play": False, "Trust Labels": False, "Last Verified": False,
    "placeholder attribute test": True,  # visible-text placeholder should flag
}
selftest = {k: bool(family.search(k)) for k, v in probes.items()}
selftest_ok = all(selftest[k] == v for k, v in probes.items())
out["checks"]["banned_token_family_selftest"] = {"probes": selftest, "all_as_expected": selftest_ok}
if not selftest_ok:
    out["ok"] = False

print(json.dumps(out, indent=2))
print("OVERALL_OK:", out["ok"])
raise SystemExit(0 if out["ok"] else 1)
