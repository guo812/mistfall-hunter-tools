#!/usr/bin/env python3
"""Local-only Playwright proof for 07F mobile navigation and Squad Builder."""
import json
from pathlib import Path
from playwright.sync_api import sync_playwright

BASE = "http://127.0.0.1:3008"
OUT = Path(__file__).parent
WIDTHS = (360, 390, 430)
results = {"base_url": BASE, "viewports": {}, "functional_smoke": {}}

with sync_playwright() as playwright:
    browser = playwright.chromium.launch(executable_path="/usr/bin/chromium-browser", headless=True)
    for width in WIDTHS:
        context = browser.new_context(viewport={"width": width, "height": 800})
        context.grant_permissions(["clipboard-read", "clipboard-write"], origin=BASE)
        page = context.new_page()

        page.goto(f"{BASE}/", wait_until="networkidle")
        page.screenshot(path=str(OUT / f"home-{width}.png"), full_page=False)
        page.locator(".mobile-menu summary").click()
        if not page.locator(".mobile-menu").evaluate("e => e.open") or not page.get_by_role("navigation", name="Mobile menu").is_visible():
            raise AssertionError(f"hamburger menu did not open at {width}")
        page.locator(".mobile-menu summary").click()
        mobile_labels = page.locator(".mobile-nav a").all_inner_texts()
        bottom_rects = page.locator(".mobile-nav a").evaluate_all("els => els.map(e => { const r=e.getBoundingClientRect(); return {text:e.textContent.trim(), width:r.width, height:r.height}; })")
        nav_rect = page.locator(".mobile-nav").evaluate("e => { const r=e.getBoundingClientRect(); return {top:r.top, height:r.height}; }")
        body_padding_bottom = page.evaluate("parseFloat(getComputedStyle(document.body).paddingBottom)")
        header = page.locator(".nav").evaluate("e => ({text:e.textContent, height:e.getBoundingClientRect().height})")
        nav_ok = mobile_labels == ["Home", "Tools", "Guides", "Quiz", "More"] and all(rect["width"] >= 44 and rect["height"] >= 44 for rect in bottom_rects) and body_padding_bottom >= nav_rect["height"]
        if not nav_ok or "Play on Steam" not in header["text"]:
            raise AssertionError(f"mobile navigation contract failed at {width}: {mobile_labels} / {bottom_rects} / {header}")

        page.goto(f"{BASE}/squad-builder", wait_until="networkidle")
        page.screenshot(path=str(OUT / f"squad-builder-{width}.png"), full_page=False)
        page.get_by_label("Trio").check()
        page.locator("#primary").select_option(label="Mercenary")
        page.locator("#secondary").select_option(label="Sorcerer")
        page.locator("#third").select_option(label="Seer")
        page.get_by_role("button", name="Copy share URL").click()
        page.screenshot(path=str(OUT / f"squad-builder-trio-{width}.png"), full_page=False)
        page.wait_for_timeout(100)
        shared_url = page.evaluate("navigator.clipboard.readText()")
        if "mode=trio" not in shared_url or "classes=mercenary%2Csorcerer%2Cseer" not in shared_url:
            raise AssertionError(f"unexpected share URL: {shared_url}")
        evaluation = page.locator(".squad-tool .result").inner_text()
        if "Trio evaluation" not in evaluation or "Seer" not in evaluation or "support" not in evaluation:
            raise AssertionError(f"third class did not affect evaluation: {evaluation}")
        page.goto(shared_url, wait_until="networkidle")
        restored = {
            "mode": page.locator("input[name='squad-mode']:checked").input_value(),
            "primary": page.locator("#primary").input_value(),
            "secondary": page.locator("#secondary").input_value(),
            "third": page.locator("#third").input_value(),
        }
        expected = {"mode": "trio", "primary": "Mercenary", "secondary": "Sorcerer", "third": "Seer"}
        if restored != expected:
            raise AssertionError(f"URL restoration failed: {restored}")
        results["viewports"][str(width)] = {"mobile_nav": mobile_labels, "bottom_target_rects": bottom_rects, "bottom_nav_rect": nav_rect, "body_padding_bottom": body_padding_bottom, "header": header, "squad_restored": restored}
        context.close()

    results["functional_smoke"] = {
        "third_class": "Seer",
        "mode": "trio",
        "share_url": shared_url,
        "evaluation": evaluation,
        "reload_restoration": restored,
        "status": "PASS",
    }
    browser.close()

(OUT / "mobile-remediation-metrics.json").write_text(json.dumps(results, indent=2) + "\n")
print(json.dumps({"status": "PASS", "share_url": shared_url, "restored": restored}))
