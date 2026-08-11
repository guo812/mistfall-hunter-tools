#!/usr/bin/env python3
"""11R4 production smoke: all sitemap routes, social metadata/PNG and JSON-LD parsing."""
from __future__ import annotations

import html
import json
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

HTTPS_ORIGIN = "https://mistfallhunter.co"
HTTP_ORIGIN = "http://mistfallhunter.co"
OUT = Path(__file__).with_name("production-smoke.json")


def fetch(url: str) -> tuple[int, dict[str, str], bytes]:
    request = urllib.request.Request(url, headers={"User-Agent": "11R4-production-smoke"})
    last_error: Exception | None = None
    for attempt in range(3):
        try:
            with urllib.request.urlopen(request, timeout=30) as response:
                return response.status, dict(response.headers.items()), response.read()
        except urllib.error.HTTPError as error:
            last_error = error
            if error.code not in {429, 500, 502, 503, 504} or attempt == 2:
                raise
        except urllib.error.URLError as error:
            last_error = error
            if attempt == 2:
                raise
        time.sleep(2 ** attempt)
    raise RuntimeError(f"fetch failed after retries: {last_error}")


def fetch_without_redirect(url: str) -> tuple[int, dict[str, str]]:
    class NoRedirect(urllib.request.HTTPRedirectHandler):
        def redirect_request(self, request, fp, code, msg, headers, newurl):
            return None
    opener = urllib.request.build_opener(NoRedirect)
    try:
        response = opener.open(urllib.request.Request(url, headers={"User-Agent": "11R4-production-smoke"}), timeout=30)
        return response.status, dict(response.headers.items())
    except urllib.error.HTTPError as error:
        return error.code, dict(error.headers.items())


def header(headers: dict[str, str], name: str) -> str | None:
    return next((value for key, value in headers.items() if key.lower() == name.lower()), None)


def metadata(markup: str, key: str, attribute: str = "property") -> str | None:
    match = re.search(rf'<meta\s+{attribute}="{re.escape(key)}"\s+content="([^"]*)"', markup)
    return html.unescape(match.group(1)) if match else None


def parse_schema(markup: str) -> tuple[list[str], str | None]:
    try:
        blocks = re.findall(r'<script type="application/ld\+json">(.*?)</script>', markup, flags=re.S)
        values = [json.loads(html.unescape(block)) for block in blocks]
        types = [value["@type"] for value in values if isinstance(value, dict) and isinstance(value.get("@type"), str)]
        if not types or len(types) != len(values):
            raise ValueError("JSON-LD object/type invariant failed")
        return types, None
    except (json.JSONDecodeError, ValueError) as exc:
        return [], str(exc)


def main() -> int:
    _, _, sitemap_body = fetch(HTTPS_ORIGIN + "/sitemap.xml")
    paths = [urllib.parse.urlparse(url.decode("utf-8")).path or "/" for url in re.findall(rb"<loc>(.*?)</loc>", sitemap_body)]
    rows, failures = [], []
    for path in paths:
        status, _, body = fetch(HTTPS_ORIGIN + path)
        markup = body.decode("utf-8")
        og = metadata(markup, "og:image")
        tw = metadata(markup, "twitter:image", "name")
        og_type = metadata(markup, "og:type")
        schemas, schema_error = parse_schema(markup)
        image_ok = False
        if og:
            image_status, image_headers, image_body = fetch(og)
            image_ok = image_status == 200 and header(image_headers, "content-type") == "image/png" and image_body.startswith(b"\x89PNG\r\n\x1a\n")
        passed = status == 200 and bool(og and tw) and og_type == "website" and image_ok and not schema_error
        if not passed:
            failures.append(path)
        rows.append({"path": path, "status": status, "og_image": og, "twitter_image": tw, "og_type": og_type, "image_ok": image_ok, "schema_types": schemas, "schema_error": schema_error, "pass": passed})
    redirect_status, redirect_headers = fetch_without_redirect(HTTP_ORIGIN + "/items?origin=11r4")
    redirect_location = header(redirect_headers, "location")
    redirect_ok = redirect_status in {301, 308} and redirect_location == "https://mistfallhunter.co/items?origin=11r4"
    robots_status, _, robots_body = fetch(HTTPS_ORIGIN + "/robots.txt")
    result = {"audit": "11R4 public production smoke", "https_origin": HTTPS_ORIGIN, "route_count": len(paths), "route_pass_count": sum(row["pass"] for row in rows), "route_failures": failures, "http_redirect": {"status": redirect_status, "location": redirect_location, "pass": redirect_ok}, "robots": {"status": robots_status, "sitemap_declared": b"Sitemap: https://mistfallhunter.co/sitemap.xml" in robots_body}, "pass": len(paths) == 58 and not failures and redirect_ok and robots_status == 200, "routes": rows}
    OUT.write_text(json.dumps(result, indent=2) + "\n")
    print(json.dumps({key: result[key] for key in ["route_count", "route_pass_count", "route_failures", "http_redirect", "robots", "pass"]}, indent=2))
    return 0 if result["pass"] else 1

if __name__ == "__main__":
    sys.exit(main())
