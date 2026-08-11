#!/usr/bin/env python3
"""Generate deterministic static 1200×630 share cards for every public route."""
from __future__ import annotations

import json
import subprocess
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "images" / "og"


def font(size: int, bold: bool = False):
    name = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
    return ImageFont.truetype(name, size=size)


def filename(path: str) -> str:
    return "home.png" if path == "/" else f"{path.lstrip('/').replace('/', '--')}.png"


def wrap(draw: ImageDraw.ImageDraw, text: str, face, width: int):
    words, lines, current = text.split(), [], ""
    for word in words:
        candidate = f"{current} {word}".strip()
        if draw.textbbox((0, 0), candidate, font=face)[2] <= width:
            current = candidate
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def route_data():
    js = """
const fs=require('fs'), ts=require('typescript'), vm=require('vm');
let src=fs.readFileSync('lib/routes.ts','utf8');
const out=ts.transpileModule(src,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
const sandbox={exports:{}}; vm.runInNewContext(out,sandbox); console.log(JSON.stringify(sandbox.exports.routes));
"""
    raw = subprocess.check_output(["node", "-e", js], cwd=ROOT, text=True)
    return json.loads(raw)


def draw_card(route: dict):
    image = Image.new("RGB", (1200, 630), "#070a12")
    draw = ImageDraw.Draw(image)
    # Layered navy/gold treatment that remains legible in social previews.
    draw.polygon([(0, 0), (1200, 0), (1200, 630), (260, 630)], fill="#101b30")
    draw.ellipse((880, -180, 1340, 280), outline="#c99a3d", width=4)
    draw.ellipse((190, 420, 1050, 970), fill="#34260d")
    eyebrow = "FREE DECISION TOOL" if route["kind"] == "tool" else "MISTFALL HUNTER GUIDE" if route["kind"] == "content" else "UNOFFICIAL FAN RESOURCE"
    draw.text((72, 65), eyebrow, font=font(24, True), fill="#e2b35c", spacing=4)
    title_face = font(59, True)
    title_lines = wrap(draw, route["h1"], title_face, 980)[:3]
    y = 130
    for line in title_lines:
        draw.text((72, y), line, font=title_face, fill="#f6f1df")
        y += 70
    body_face = font(27)
    description_lines = wrap(draw, route["answer"], body_face, 940)[:3]
    y += 26
    for line in description_lines:
        draw.text((72, y), line, font=body_face, fill="#d4d8e1")
        y += 39
    draw.line((72, 560, 1128, 560), fill="#8f6a2d", width=2)
    draw.text((72, 580), "MISTFALLHUNTER.CO  •  TOOLS · BUILDS · GUIDES", font=font(22, True), fill="#e2b35c")
    image.save(OUT / filename(route["path"]), "PNG", optimize=True)


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    routes = route_data()
    for old in OUT.glob("*.png"):
        old.unlink()
    for route in routes:
        draw_card(route)
    print(f"generated {len(routes)} static share cards in {OUT}")


if __name__ == "__main__":
    main()
