#!/usr/bin/env python3
"""11R4 local-only release validation: metadata, social-card and JSON-LD syntax."""
from __future__ import annotations

import html
import json
import re
import sys
import urllib.parse
import urllib.request
from pathlib import Path

ORIGIN = "http://127.0.0.1:3114"
OUT = Path(__file__).with_name("local-validation.json")


def get(path: str) -> tuple[int, dict[str, str], bytes]:
    request = urllib.request.Request(ORIGIN + path, headers={"User-Agent": "11R4-local-validator"})
    with urllib.request.urlopen(request, timeout=30) as response:
        return response.status, dict(response.headers.items()), response.read()


def meta(markup: str, key: str, attribute: str = "property") -> str | None:
    match = re.search(rf'<meta\s+{attribute}="{re.escape(key)}"\s+content="([^"]*)"', markup)
    return html.unescape(match.group(1)) if match else None


def schema_types(markup: str) -> list[str]:
    blocks = re.findall(r'<script type="application/ld\+json">(.*?)</script>', markup, flags=re.S)
    types: list[str] = []
    for block in blocks:
        value = json.loads(html.unescape(block))
        if not isinstance(value, dict) or not isinstance(value.get("@type"), str):
            raise ValueError("JSON-LD block is not an object with string @type")
        types.append(value["@type"])
    if not types:
        raise ValueError("no JSON-LD blocks")
    return types


def main() -> int:
    _, _, sitemap = get("/sitemap.xml")
    paths = [urllib.parse.urlparse(url.decode("utf-8")).path or "/" for url in re.findall(rb"<loc>(.*?)</loc>", sitemap)]
    records = []
    failures = []
    for path in paths:
        status, _, body = get(path)
        markup = body.decode("utf-8")
        try:
            schemas = schema_types(markup)
            schema_error = None
        except (json.JSONDecodeError, ValueError) as exc:
            schemas, schema_error = [], str(exc)
        og_image = meta(markup, "og:image")
        twitter_image = meta(markup, "twitter:image", "name")
        og_type = meta(markup, "og:type")
        og_ok = bool(og_image and og_image.startswith("https://mistfallhunter.co/og?path="))
        twitter_ok = bool(twitter_image and twitter_image.startswith("https://mistfallhunter.co/og?path="))
        image_status = None
        image_type = None
        if og_image:
            target = urllib.parse.urlparse(og_image)
            image_status, image_headers, image_body = get(target.path + ("?" + target.query if target.query else ""))
            image_type = next((value for key, value in image_headers.items() if key.lower() == "content-type"), None)
            if image_status != 200 or image_type != "image/png" or not image_body.startswith(b"\x89PNG\r\n\x1a\n"):
                og_ok = False
        passed = status == 200 and og_ok and twitter_ok and og_type == "website" and not schema_error
        if not passed:
            failures.append(path)
        records.append({"path": path, "status": status, "og_image": og_image, "twitter_image": twitter_image, "og_type": og_type, "image_status": image_status, "image_type": image_type, "schema_types": schemas, "schema_error": schema_error, "pass": passed})
    result = {"audit": "11R4 local metadata/schema validation", "origin": ORIGIN, "route_count": len(paths), "pass_count": sum(record["pass"] for record in records), "failure_paths": failures, "records": records}
    OUT.write_text(json.dumps(result, indent=2) + "\n")
    print(json.dumps({key: result[key] for key in ["route_count", "pass_count", "failure_paths"]}, indent=2))
    return 0 if not failures and len(paths) == 58 else 1


if __name__ == "__main__":
    sys.exit(main())
