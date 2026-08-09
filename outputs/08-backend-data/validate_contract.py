#!/usr/bin/env python3
from __future__ import annotations
import json
from pathlib import Path

ROOT = Path(__file__).parent
SEED = ROOT / "seed"
def load(name):
    return json.loads((SEED / name).read_text())
def check(ok, message):
    if not ok: raise AssertionError(message)

def main():
    items, classes, pois, talents, provenance = (load(n) for n in ["items.json", "classes.json", "map-pois.json", "talent-trees.json", "provenance.json"])
    api = json.loads((ROOT / "api-contract.json").read_text())
    tools = json.loads((ROOT / "tool-route-contracts.json").read_text())
    check(len(items) >= 40, "items must meet V1 non-thin minimum (>=40)")
    check(len(classes) == 6, "six classes required")
    check(len(pois) >= 24, "map must include >=24 POIs")
    check({p['map'] for p in pois} == {'hallowgrove', 'brandrgarde'}, "both maps required")
    for map_name in ('hallowgrove', 'brandrgarde'):
        entries = [p for p in pois if p['map'] == map_name]
        check({'extraction','boss','loot'}.issubset({p['category'] for p in entries}), f"{map_name}: missing core POI categories")
    check(len(talents) == 6 and all(len(t['stances']) == 2 for t in talents), "six classes with two stances required")
    check(len(tools['routes']) == 10, "all 10 tool contracts required")
    check(len({r['route'] for r in tools['routes']}) == 10, "tool routes must be unique")
    check({e['path'] for e in api['endpoints']} >= {'/items','/loot-finder','/map/pois','/classes','/health'}, "core API endpoints missing")
    check(provenance['remoteFetch'] is False, "local release must not perform remote fetch")
    check(all(i['provenanceId'] == 'seed-v1-editorial-2026-08-08' for i in items), "item provenance must be attached")
    print(json.dumps({'status':'pass','items':len(items),'classes':len(classes),'pois':len(pois),'toolRoutes':len(tools['routes']),'remoteFetch':provenance['remoteFetch']}, sort_keys=True))
if __name__ == '__main__': main()
