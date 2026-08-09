#!/usr/bin/env python3
"""CDP layout checks for 360/390/430px homepage first screens."""
from __future__ import annotations

import json
import urllib.request
from pathlib import Path

import websocket

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "outputs/07-frontend/10r-d-mobile-layout-audit-20260809.json"


def command(ws: websocket.WebSocket, payload: dict) -> dict:
    ws.send(json.dumps(payload))
    while True:
        response = json.loads(ws.recv())
        if response.get("id") == payload["id"]:
            return response


def main() -> None:
    tabs = json.loads(urllib.request.urlopen("http://127.0.0.1:9223/json/list", timeout=5).read())
    tab = next(item for item in tabs if item["type"] == "page")
    ws = websocket.create_connection(tab["webSocketDebuggerUrl"], timeout=15)
    command(ws, {"id": 1, "method": "Page.enable"})
    command(ws, {"id": 2, "method": "Runtime.enable"})
    results = []
    for index, width in enumerate((360, 390, 430), start=10):
        command(ws, {"id": index, "method": "Emulation.setDeviceMetricsOverride", "params": {"width": width, "height": 900, "deviceScaleFactor": 1, "mobile": True}})
        command(ws, {"id": index + 1, "method": "Page.navigate", "params": {"url": "http://127.0.0.1:3100/"}})
        expression = """new Promise(resolve => { const done=()=>{const hero=document.querySelector('.hero'); const primary=document.querySelector('.hero .primary'); const header=document.querySelector('header'); resolve({width:window.innerWidth, scrollWidth:document.documentElement.scrollWidth, hero:hero && hero.getBoundingClientRect().toJSON(), primary:primary && primary.getBoundingClientRect().toJSON(), header:header && header.getBoundingClientRect().toJSON(), pass:document.documentElement.scrollWidth <= window.innerWidth && !!hero && !!primary && primary.getBoundingClientRect().bottom <= window.innerHeight});}; if(document.readyState === 'complete') setTimeout(done, 100); else window.addEventListener('load',()=>setTimeout(done,100),{once:true});})"""
        response = command(ws, {"id": index + 2, "method": "Runtime.evaluate", "params": {"expression": expression, "awaitPromise": True, "returnByValue": True}})
        value = response["result"]["result"]["value"]
        value["viewport"] = width
        results.append(value)
    ws.close()
    report = {"status": "PASS" if all(item["pass"] for item in results) else "FAIL", "checks": results}
    OUT.write_text(json.dumps(report, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(report, indent=2))
    raise SystemExit(0 if report["status"] == "PASS" else 1)


if __name__ == "__main__":
    main()
