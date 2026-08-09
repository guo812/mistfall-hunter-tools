#!/usr/bin/env python3
"""PM acceptance spot-check for mistfall-hunter local preview (port 3007)."""
import json, re, html, urllib.request

BASE = "http://127.0.0.1:3007"

def fetch(path):
    with urllib.request.urlopen(BASE + path, timeout=10) as r:
        return r.read().decode("utf-8", "ignore")

def body_text(t):
    t = re.sub(r"<script.*?</script>", "", t, flags=re.S)
    t = re.sub(r"<style.*?</style>", "", t, flags=re.S)
    t = re.sub(r"<[^>]+>", " ", t)
    t = html.unescape(t)
    return t

routes = ["/", "/class-quiz", "/settings", "/tier-list", "/loot-finder", "/items",
          "/checklist", "/squad-builder", "/matchups", "/build-planner", "/map",
          "/guides/getting-started", "/classes/mercenary", "/builds/sorcerer",
          "/tier-list/duo", "/maps/hallowgrove", "/bosses/salmar", "/codes/rewards",
          "/guides/duo", "/about", "/privacy", "/terms", "/contact"]

out = {}
for p in routes:
    try:
        t = fetch(p)
        title = re.search(r"<title>([^<]*)</title>", t)
        h1s = re.findall(r"<h1[^>]*>(.*?)</h1>", t, flags=re.S)
        h1 = re.sub(r"<[^>]+>", "", h1s[0]).strip() if h1s else None
        h2s = re.findall(r"<h2[^>]*>(.*?)</h2>", t, flags=re.S)
        h2_clean = [re.sub(r"<[^>]+>", "", h).strip() for h in h2s]
        h3s = re.findall(r"<h3[^>]*>(.*?)</h3>", t, flags=re.S)
        h3_clean = [re.sub(r"<[^>]+>", "", h).strip() for h in h3s]
        words = len(body_text(t).split())
        ld = t.count("application/ld+json")
        ld_types = re.findall(r'"@type":"([^"]*)"', t)
        faq_ld = t.count("FAQPage")
        org_ld = t.count("Organization")
        breadcrumb_ld = t.count("BreadcrumbList")
        itemlist_ld = t.count("ItemList")
        canonical = re.search(r'<link rel="canonical" href="([^"]*)"', t)
        unofficial = "Unofficial fan resource" in t
        td_rows = t.count("<td")
        out[p] = {
            "title_len": len(title.group(1)) if title else None,
            "title": title.group(1) if title else None,
            "h1": h1,
            "h2_count": len(h2_clean),
            "h3_faq_count": len(h3_clean),
            "words_incl_shell": words,
            "ld_blocks": ld,
            "ld_types": ld_types,
            "FAQPage_ld": faq_ld,
            "Organization_ld": org_ld,
            "Breadcrumb_ld": breadcrumb_ld,
            "ItemList_ld": itemlist_ld,
            "canonical": canonical.group(1) if canonical else None,
            "unofficial_footer": unofficial,
            "td_rows": td_rows,
        }
    except Exception as e:
        out[p] = {"error": str(e)}

print(json.dumps(out, indent=2, ensure_ascii=False))
