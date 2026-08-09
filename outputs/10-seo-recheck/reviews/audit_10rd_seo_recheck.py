#!/usr/bin/env python3
"""10R-D independent SEO recheck — mistfall-hunter.

Improvements over the 10R-D frontend rendered audit (audit_10rd_rendered.py):
  1. Banned-token family covers DATA-PENDING variants, not just the literal
     `[DATA-PENDING`: [DATA-PENDING / DATA-PENDING / DATA_PENDING / DATA PENDING /
     [DATA: / [DATA- / TBD / TODO / FIXME / lorem ipsum / SAMPLE / XXX / placeholder-in-text
     / TBC / COMING SOON / UNDER CONSTRUCTION / N/A-marker / 待 / 占位 / Chinese chars.
  2. Banned-token scan runs on (a) visible text extracted from rendered DOM and
     (b) every string value inside parsed JSON-LD — not on raw HTML (so the
     legitimate HTML input placeholder="" attribute is NOT a false positive).
  3. JSON-LD is parsed with json.loads; parse errors are findings; type set per
     route is validated; FAQPage policy (54 copy routes yes / 4 trust no) enforced.
  4. Independent server: caller supplies BASE (default http://127.0.0.1:3199).
"""
from __future__ import annotations

import html
import json
import re
import sys
import urllib.error
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path("/root/.hermes/projects/shipsolo/mistfall-hunter")
BASE = sys.argv[1].rstrip("/") if len(sys.argv) > 1 else "http://127.0.0.1:3199"
ROUTES_ROOT = ROOT / "outputs/05-copy-repair/routes"
TRUST_SOURCE = ROOT / "outputs/05-copy/trust-pages-final-copy.md"
REPORT_DIR = ROOT / "outputs/10-seo-recheck/reviews"
REPORT_JSON = REPORT_DIR / "10rd-fresh-local-seo-review-20260809.json"
REPORT_MD = REPORT_DIR / "10rd-fresh-local-seo-review-20260809.md"

trust_expectations = {
    "/about": ["Unofficial Fan Resource", "Data Sources", "Trust Labels", "contact@mistfallhunter.co"],
    "/privacy": ["1. Overview", "2. No Account, No Personal Data Required", "3. Browser-Local Processing", "4. Analytics", "5. Cookies", "6. Hosting and Infrastructure", "7. Children", "8. Third-Party Services", "9. Retention", "10. Your Choices and Rights", "11. Changes to This Policy", "12. Contact"],
    "/terms": ["1. Acceptance", "2. Unofficial Fan Resource", "3. Informational Content Only / Disclaimer", "4. Tools Are Provided As-Is", "5. Acceptable Use", "6. Intellectual Property", "7. External Links and Sources", "8. Refunds and Payments", "9. Limitation of Liability", "10. Changes", "11. Contact"],
    "/contact": ["Use cases:", "Corrections: tell us about outdated or wrong data", "Data sources: ask about source/verification details", "Takedown / IP: submit copyright or trademark takedown requests", "contact@mistfallhunter.co", "we aim to reply within 2 business days"],
}

# Banned token family: DATA-PENDING variants + classic placeholder markers.
# Scanned case-insensitively against visible text and JSON-LD string values.
BANNED_PATTERNS = [
    r"\[DATA-PENDING",      # canonical A3 marker (repair target)
    r"DATA[-_ ]?PENDING",    # any spacing/underscore/hyphen variant
    r"\[DATA[:\-]",          # generic [DATA: ...] / [DATA- ...] markers
    r"\bTBD\b",
    r"\bTODO\b",
    r"\bFIXME\b",
    r"\blorem ipsum\b",
    r"\bSAMPLE\b",
    r"\bXXX\b",
    r"\bplaceholder\b",      # only fires on visible text (attribute stripped)
    r"\bTBC\b",
    r"\bCOMING SOON\b",
    r"\bUNDER CONSTRUCTION\b",
    r"\bN/A\b",              # 0 hits in frozen copy; flag if rendered
    r"[\u4e00-\u9fff]",      # any CJK leakage
]
BANNED_RE = re.compile("|".join(BANNED_PATTERNS), re.I)


def fetch(path: str) -> str:
    try:
        with urllib.request.urlopen(BASE + path, timeout=20) as response:
            if response.status != 200:
                raise RuntimeError(f"HTTP {response.status}")
            return response.read().decode("utf-8")
    except urllib.error.HTTPError as exc:
        raise RuntimeError(f"HTTP {exc.code}") from exc


TAG_RE = re.compile(r"<[^>]+>")


def visible_text(raw: str) -> str:
    """Strip script/style then tags; unescape; collapse whitespace."""
    body = re.sub(r"<(script|style|noscript)[^>]*>.*?</\1>", " ", raw, flags=re.S | re.I)
    body = TAG_RE.sub(" ", body)
    body = html.unescape(body)
    return re.sub(r"\s+", " ", body).strip()


def jsonld_blocks(raw: str) -> list[str]:
    return re.findall(r'<script[^>]+type="application/ld\+json"[^>]*>(.*?)</script>', raw, re.S)


def jsonld_strings(block: str) -> list[str]:
    """All string leaf values in a JSON-LD block; [] on parse error."""
    try:
        data = json.loads(block)
    except Exception:
        return []
    out: list[str] = []

    def walk(node):
        if isinstance(node, str):
            out.append(node)
        elif isinstance(node, dict):
            for v in node.values():
                walk(v)
        elif isinstance(node, list):
            for v in node:
                walk(v)

    walk(data)
    return out


def jsonld_question_count(block: str) -> int:
    """Count @type Question nodes in a JSON-LD block; 0 on parse error."""
    try:
        data = json.loads(block)
    except Exception:
        return 0
    count = 0

    def walk(node):
        nonlocal count
        if isinstance(node, dict):
            if node.get("@type") == "Question":
                count += 1
            for v in node.values():
                walk(v)
        elif isinstance(node, list):
            for v in node:
                walk(v)

    walk(data)
    return count


def main() -> None:
    pages = [json.loads(p.read_text(encoding="utf-8")) for p in sorted(ROUTES_ROOT.rglob("*.json"))]
    source_by_path = {p["path"]: p for p in pages}
    paths = sorted(source_by_path) + sorted(trust_expectations)
    findings: list[dict] = []
    metrics = {
        "routes_expected": len(paths), "routes_fetched": 0,
        "json_ld_scripts": 0, "json_ld_parse_errors": 0,
        "placeholder_hits_visible": 0, "placeholder_hits_jsonld": 0,
        "chinese_hits": 0, "trust_section_failures": 0, "metadata_failures": 0,
        "canonical_failures": 0, "faq_schema_failures": 0, "h1_failures": 0,
        "route_stats": {},
    }

    for path in paths:
        try:
            raw = fetch(path)
            metrics["routes_fetched"] += 1
        except Exception as exc:
            findings.append({"path": path, "check": "HTTP", "detail": str(exc)})
            continue

        text = visible_text(raw)
        unescaped_raw = html.unescape(raw)
        blocks = jsonld_blocks(raw)
        metrics["json_ld_scripts"] += len(blocks)
        parsed_ok = True
        all_ld_strings: list[str] = []
        for block in blocks:
            try:
                data = json.loads(block)
            except Exception:
                parsed_ok = False
                metrics["json_ld_parse_errors"] += 1
                findings.append({"path": path, "check": "json-ld parse", "detail": block[:120]})
                continue
            all_ld_strings.extend(jsonld_strings(block))

        # --- banned-token audit: visible text ---
        vis_matches = sorted(set(BANNED_RE.findall(text)))
        if vis_matches:
            metrics["placeholder_hits_visible"] += 1
            findings.append({"path": path, "check": "banned-token visible", "detail": str(vis_matches)})
        # --- banned-token audit: JSON-LD string values ---
        ld_matches = sorted({m for s in all_ld_strings for m in BANNED_RE.findall(s)})
        if ld_matches:
            metrics["placeholder_hits_jsonld"] += 1
            findings.append({"path": path, "check": "banned-token jsonld", "detail": str(ld_matches)})
        if re.search(r"[\u4e00-\u9fff]", text):
            metrics["chinese_hits"] += 1
            findings.append({"path": path, "check": "chinese-visible", "detail": "CJK chars in visible text"})

        # --- canonical exact self-reference ---
        expected_canonical = f"https://mistfallhunter.co{path if path != '/' else ''}"
        if f'<link rel="canonical" href="{expected_canonical}"' not in raw:
            metrics["canonical_failures"] += 1
            findings.append({"path": path, "check": "canonical", "detail": f"want {expected_canonical}"})

        # --- indexability: no noindex on sitemap routes ---
        m = re.search(r'<meta[^>]+name="robots"[^>]+content="([^"]+)"', raw, re.I)
        if m and "noindex" in m.group(1).lower():
            findings.append({"path": path, "check": "robots-meta", "detail": m.group(1)})

        page = source_by_path.get(path)
        if page:
            # --- frozen TDK / directAnswer / H1 exact match (against unescaped HTML) ---
            expected = [page["title"], page["meta"], page["h1"], page["directAnswer"]]
            missing = [v for v in expected if v not in unescaped_raw]
            if missing:
                metrics["metadata_failures"] += 1
                findings.append({"path": path, "check": "frozen TDK/H1/direct answer", "detail": f"missing {len(missing)}/4"})
            # --- H1 element check on raw HTML (tag preserved) ---
            h1s = re.findall(r"<h1[^>]*>(.*?)</h1>", raw, re.S)
            norm_h1s = [re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]+>", "", h))).strip() for h in h1s]
            frozen_norm = re.sub(r"\s+", " ", page["h1"]).strip()
            if not any(frozen_norm == nh or frozen_norm in nh for nh in norm_h1s):
                metrics["h1_failures"] += 1
                findings.append({"path": path, "check": "H1", "detail": page["h1"]})
            # --- FAQPage schema policy: present on copy routes ---
            if '"@type":"FAQPage"' not in raw:
                metrics["faq_schema_failures"] += 1
                findings.append({"path": path, "check": "FAQPage", "detail": "missing on frozen copy route"})
            # FAQ count ≥3 via JSON-LD Question nodes
            qcount = sum(jsonld_question_count(b) for b in blocks)
            if qcount and qcount < 3:
                metrics["faq_schema_failures"] += 1
                findings.append({"path": path, "check": "FAQ count", "detail": f"only {qcount} questions"})
            metrics["route_stats"][path] = {
                "words_visible": len(text.split()), "json_ld_scripts": len(blocks), "faq_questions": qcount,
            }
        else:
            # --- trust pages: frozen body fragments + NO FAQPage ---
            for expected in trust_expectations[path]:
                if expected not in raw:
                    metrics["trust_section_failures"] += 1
                    findings.append({"path": path, "check": "trust section", "detail": expected})
            if '"@type":"FAQPage"' in raw:
                metrics["faq_schema_failures"] += 1
                findings.append({"path": path, "check": "FAQPage", "detail": "must not appear on trust page"})

    # --- SSR data contracts ---
    for p, label, needle, want in [
        ("/items", "items SSR rows", "48", 1),
        ("/loot-finder", "loot-finder SSR rows", "48", 1),
        ("/map", "map SSR POIs", "Hallowgrove", 1),
    ]:
        try:
            r = fetch(p)
            if needle not in r:
                findings.append({"path": p, "check": label, "detail": f"missing {needle}"})
        except Exception as exc:
            findings.append({"path": p, "check": label, "detail": str(exc)})

    # --- 404 behavior ---
    try:
        req = urllib.request.Request(BASE + "/definitely-not-a-route-xyz", method="GET")
        with urllib.request.urlopen(req, timeout=15) as resp:
            code = resp.status
            body = resp.read().decode("utf-8", "ignore")
        if code != 404:
            findings.append({"path": "/404", "check": "404-status", "detail": f"got {code}"})
        if "noindex" not in body.lower():
            findings.append({"path": "/404", "check": "404-noindex", "detail": "noindex missing on 404 page"})
    except urllib.error.HTTPError as exc:
        body = exc.read().decode("utf-8", "ignore")
        if "noindex" not in body.lower():
            findings.append({"path": "/404", "check": "404-noindex", "detail": "noindex missing on 404 page"})

    metrics["finding_count"] = len(findings)
    status = "PASS" if not findings and metrics["routes_fetched"] == 58 else "FAIL"
    report = {
        "task_id": "t_c1f9e153",
        "owner_release": "inputs/02-owner-confirmations/owner-release-10R4-readonly-rechecks-20260809.md",
        "base_url": BASE, "build_id": "mJ8NG4CAuq0ehggfgSzoV",
        "timestamp_utc": datetime.now(timezone.utc).isoformat(),
        "banned_token_patterns": BANNED_PATTERNS,
        "status": status, "metrics": metrics, "findings": findings,
    }
    REPORT_DIR.mkdir(parents=True, exist_ok=True)
    REPORT_JSON.write_text(json.dumps(report, indent=2) + "\n", encoding="utf-8")
    lines = ["# 10R-D Fresh Local SEO Recheck — mistfall-hunter", "",
             f"**Status: {status}**", "",
             f"- Base URL: `{BASE}` (independent build, BUILD_ID `mJ8NG4CAuq0ehggfgSzoV`)",
             f"- Routes fetched: {metrics['routes_fetched']}/{metrics['routes_expected']}",
             f"- JSON-LD scripts: {metrics['json_ld_scripts']} (parse errors {metrics['json_ld_parse_errors']})",
             f"- Banned-token visible hits: {metrics['placeholder_hits_visible']}",
             f"- Banned-token JSON-LD hits: {metrics['placeholder_hits_jsonld']}",
             f"- Chinese/CJK hits: {metrics['chinese_hits']}",
             f"- frozen TDK/H1/direct-answer failures: {metrics['metadata_failures']}",
             f"- H1 failures: {metrics['h1_failures']}",
             f"- canonical failures: {metrics['canonical_failures']}",
             f"- trust-section failures: {metrics['trust_section_failures']}",
             f"- FAQ schema policy failures: {metrics['faq_schema_failures']}",
             "", "## Banned-token family covered"]
    lines.extend(f"- `{p}`" for p in BANNED_PATTERNS)
    lines += ["", "## Findings"]
    if findings:
        lines.extend(f"- {item['path']} — {item['check']}: {item['detail']}" for item in findings)
    else:
        lines.append("- None")
    REPORT_MD.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(json.dumps(report, indent=2))
    raise SystemExit(0 if status == "PASS" else 1)


if __name__ == "__main__":
    main()
