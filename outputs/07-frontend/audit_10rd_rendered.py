#!/usr/bin/env python3
"""Local rendered-route acceptance audit for the owner-authorized 10R-D repair."""
from __future__ import annotations

import html
import json
import re
import sys
import urllib.error
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
BASE = sys.argv[1].rstrip("/") if len(sys.argv) > 1 else "http://127.0.0.1:3100"
ROUTES_ROOT = ROOT / "outputs/05-copy-repair/routes"
REPORT_JSON = ROOT / "outputs/07-frontend/10r-d-rendered-route-audit-20260809.json"
REPORT_MD = ROOT / "outputs/07-frontend/10r-d-rendered-route-audit-20260809.md"

trust_expectations = {
    "/about": ["Unofficial Fan Resource", "Data Sources", "Trust Labels", "contact@mistfallhunter.co"],
    "/privacy": ["1. Overview", "2. No Account, No Personal Data Required", "3. Browser-Local Processing", "4. Analytics", "5. Cookies", "6. Hosting and Infrastructure", "7. Children", "8. Third-Party Services", "9. Retention", "10. Your Choices and Rights", "11. Changes to This Policy", "12. Contact"],
    "/terms": ["1. Acceptance", "2. Unofficial Fan Resource", "3. Informational Content Only / Disclaimer", "4. Tools Are Provided As-Is", "5. Acceptable Use", "6. Intellectual Property", "7. External Links and Sources", "8. Refunds and Payments", "9. Limitation of Liability", "10. Changes", "11. Contact"],
    "/contact": ["Use cases:", "Corrections: tell us about outdated or wrong data", "Data sources: ask about source/verification details", "Takedown / IP: submit copyright or trademark takedown requests", "contact@mistfallhunter.co", "we aim to reply within 2 business days"],
}


def fetch(path: str) -> str:
    try:
        with urllib.request.urlopen(BASE + path, timeout=15) as response:
            if response.status != 200:
                raise RuntimeError(f"HTTP {response.status}")
            return response.read().decode("utf-8")
    except urllib.error.HTTPError as exc:
        raise RuntimeError(f"HTTP {exc.code}") from exc


def main() -> None:
    pages = [json.loads(path.read_text(encoding="utf-8")) for path in sorted(ROUTES_ROOT.rglob("*.json"))]
    paths = sorted(page["path"] for page in pages) + list(trust_expectations)
    source_by_path = {page["path"]: page for page in pages}
    findings: list[dict[str, str]] = []
    metrics = {"routes_expected": len(paths), "routes_fetched": 0, "json_ld_scripts": 0, "placeholder_hits": 0, "chinese_hits": 0, "trust_section_failures": 0, "metadata_failures": 0, "canonical_failures": 0, "faq_schema_failures": 0}

    for path in paths:
        try:
            raw = fetch(path)
            metrics["routes_fetched"] += 1
        except Exception as exc:
            findings.append({"path": path, "check": "HTTP", "detail": str(exc)})
            continue
        text = html.unescape(raw)
        json_ld = re.findall(r'<script[^>]+type="application/ld\+json"[^>]*>(.*?)</script>', raw, re.S)
        metrics["json_ld_scripts"] += len(json_ld)
        if not json_ld:
            findings.append({"path": path, "check": "json-ld", "detail": "no JSON-LD script rendered"})
        if re.search(r"\[DATA-PENDING", text, re.I):
            metrics["placeholder_hits"] += 1
            findings.append({"path": path, "check": "placeholder", "detail": "[DATA-PENDING found in rendered HTML/JSON-LD"})
        if re.search(r"[\u4e00-\u9fff]", text):
            metrics["chinese_hits"] += 1
            findings.append({"path": path, "check": "placeholder", "detail": "Chinese text found in rendered HTML/JSON-LD"})
        expected_canonical = f'https://mistfallhunter.co{path if path != "/" else ""}'
        if f'<link rel="canonical" href="{expected_canonical}"' not in raw:
            metrics["canonical_failures"] += 1
            findings.append({"path": path, "check": "canonical", "detail": expected_canonical})

        page = source_by_path.get(path)
        if page:
            expected = [page["title"], page["meta"], page["h1"], page["directAnswer"]]
            missing = [value for value in expected if value not in text]
            if missing:
                metrics["metadata_failures"] += 1
                findings.append({"path": path, "check": "frozen TDK/H1/direct answer", "detail": f"missing {len(missing)} values"})
            if '"@type":"FAQPage"' not in raw:
                metrics["faq_schema_failures"] += 1
                findings.append({"path": path, "check": "FAQPage", "detail": "missing on frozen copy route"})
        else:
            for expected in trust_expectations[path]:
                if expected not in text:
                    metrics["trust_section_failures"] += 1
                    findings.append({"path": path, "check": "trust section", "detail": expected})
            if '"@type":"FAQPage"' in raw:
                metrics["faq_schema_failures"] += 1
                findings.append({"path": path, "check": "FAQPage", "detail": "must not appear on trust page"})

    metrics["finding_count"] = len(findings)
    status = "PASS" if not findings and metrics["routes_fetched"] == 58 else "FAIL"
    report = {"task_id": "t_774f96be", "owner_release": "inputs/02-owner-confirmations/owner-release-10R-D-local-repair-20260809.md", "base_url": BASE, "timestamp_utc": datetime.now(timezone.utc).isoformat(), "status": status, "metrics": metrics, "findings": findings}
    REPORT_JSON.write_text(json.dumps(report, indent=2) + "\n", encoding="utf-8")
    lines = ["# 10R-D rendered route audit", "", f"**Status: {status}**", "", f"- Base URL: `{BASE}`", f"- Routes: {metrics['routes_fetched']}/{metrics['routes_expected']}", f"- JSON-LD scripts: {metrics['json_ld_scripts']}", f"- [DATA-PENDING hits: {metrics['placeholder_hits']}", f"- Chinese placeholder hits: {metrics['chinese_hits']}", f"- frozen TDK/H1/direct-answer failures: {metrics['metadata_failures']}", f"- canonical failures: {metrics['canonical_failures']}", f"- trust-section failures: {metrics['trust_section_failures']}", f"- FAQ schema policy failures: {metrics['faq_schema_failures']}", "", "## Findings"]
    lines.extend([f"- {item['path']} — {item['check']}: {item['detail']}" for item in findings] or ["- None"])
    REPORT_MD.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(json.dumps(report, indent=2))
    raise SystemExit(0 if status == "PASS" else 1)


if __name__ == "__main__":
    main()
