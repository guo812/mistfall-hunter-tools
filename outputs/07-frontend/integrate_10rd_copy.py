#!/usr/bin/env python3
"""Generate frontend copy modules from the 10R-D canonical route and trust-page sources."""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
ROUTES_ROOT = ROOT / "outputs/05-copy-repair/routes"
TRUST_SOURCE = ROOT / "outputs/05-copy/trust-pages-final-copy.md"
COPY_OUTPUT = ROOT / "lib/copy.ts"
TRUST_OUTPUT = ROOT / "lib/trust-pages.ts"

COPY_HEADER = """// Generated from the canonical frozen 10R-A3 copy package. Do not hand-edit route values.\nexport type Faq = { q: string; a: string };\nexport type CopySection = { h2: string; paragraphs?: string[]; bullets?: string[]; table?: { headers?: string[]; rows?: string[][] } };\nexport type CopyRoute = { path: string; kind: 'home' | 'tool' | 'content'; h1: string; title: string; meta: string; directAnswer: string; trustLabel: string; lastVerified: string; sections?: CopySection[]; faqs: Faq[]; quickStats?: string[][]; journey?: { step: number; title: string; desc: string; href: string }[]; toolCards?: { href: string; title: string; desc: string }[]; featuredGuides?: { href: string; title: string; desc: string }[]; latestUpdates?: { date: string; text: string; href: string }[]; quickFacts?: { headers: string[]; rows: string[][] }; activeCodes?: { text: string; href: string }; related?: { href: string; label: string }[]; cta?: { primary?: { label: string; href: string }; steam?: boolean } };\n"""

TRUST_METADATA = {
    "/about": {
        "h1": "About Us",
        "title": "About Mistfall Hunter Tools",
        "meta": "Unofficial fan resource for Mistfall Hunter with free decision tools and guides. Not affiliated with Bellring Games or Skystone Games.",
    },
    "/privacy": {
        "h1": "Privacy Policy",
        "title": "Privacy Policy",
        "meta": "How Mistfall Hunter Tools handles data: browser-local processing, analytics and no account. Full privacy policy.",
    },
    "/terms": {
        "h1": "Terms of Service",
        "title": "Terms of Service",
        "meta": "Terms for using Mistfall Hunter Tools. Unofficial fan resource; data provided as-is.",
    },
    "/contact": {
        "h1": "Contact",
        "title": "Contact Us",
        "meta": "Contact the Mistfall Hunter Tools team about corrections, data sources or takedown requests.",
    },
}


def fence_after_heading(markdown: str, heading: str) -> str:
    match = re.search(rf"^## .*{re.escape(heading)}.*?\n\n```text\n(.*?)\n```", markdown, re.M | re.S)
    if not match:
        raise SystemExit(f"could not locate frozen text fence for {heading}")
    return match.group(1).strip()


def main() -> None:
    pages = []
    for source in sorted(ROUTES_ROOT.rglob("*.json")):
        page = json.loads(source.read_text(encoding="utf-8"))
        pages.append(page)
    pages.sort(key=lambda page: page["path"])
    if len(pages) != 54 or len({page["path"] for page in pages}) != 54:
        raise SystemExit("canonical 10R-D route package must contain exactly 54 unique pages")

    copy_map = {page["path"]: page for page in pages}
    COPY_OUTPUT.write_text(
        COPY_HEADER + "export const copyByPath: Record<string, CopyRoute> = " + json.dumps(copy_map, ensure_ascii=False, separators=(",", ":")) + ";\n",
        encoding="utf-8",
    )

    markdown = TRUST_SOURCE.read_text(encoding="utf-8")
    bodies = {
        "/about": fence_after_heading(markdown, "/about"),
        "/privacy": fence_after_heading(markdown, "/privacy"),
        "/terms": fence_after_heading(markdown, "/terms"),
        "/contact": fence_after_heading(markdown, "/contact"),
    }
    trust = {path: {**TRUST_METADATA[path], "body": body} for path, body in bodies.items()}
    TRUST_OUTPUT.write_text(
        "// Generated from outputs/05-copy/trust-pages-final-copy.md. Do not hand-edit disclosure text.\n"
        "export type TrustPage = { h1: string; title: string; meta: string; body: string };\n"
        "export const trustPages: Record<string, TrustPage> = "
        + json.dumps(trust, ensure_ascii=False, separators=(",", ":"))
        + ";\n",
        encoding="utf-8",
    )
    print(json.dumps({"route_pages": len(pages), "copy_output": str(COPY_OUTPUT.relative_to(ROOT)), "trust_output": str(TRUST_OUTPUT.relative_to(ROOT)), "trust_pages": len(trust)}, indent=2))


if __name__ == "__main__":
    main()
