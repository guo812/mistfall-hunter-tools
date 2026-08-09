#!/usr/bin/env python3
"""Deterministically generate local-only Mistfall Hunter V1 seed data.
No remote calls, scraping, credentials, or Cloudflare mutations are performed.
"""
from __future__ import annotations
import json
from pathlib import Path

OUT = Path(__file__).parent / "seed"
SOURCE_DATE = "2026-08-08"
CLASSES = [
    ("mercenary", "Mercenary", "frontline", "durable melee pressure"),
    ("sorcerer", "Sorcerer", "burst", "ranged spell pressure"),
    ("blackarrow", "Blackarrow", "ranged", "precision damage"),
    ("shadowstrix", "Shadowstrix", "skirmisher", "mobility and stealth"),
    ("seer", "Seer", "support", "utility and team sustain"),
    ("withered-knight", "Withered Knight", "tank", "durability and survival"),
]
ITEM_BASES = [
    ("weapon", "Ironfang Blade"), ("weapon", "Ashen Longbow"),
    ("weapon", "Emberstaff"), ("weapon", "Dusk Daggers"),
    ("armor", "Hallowguard Helm"), ("armor", "Hallowguard Cuirass"),
    ("armor", "Ranger's Mantle"), ("armor", "Warden Boots"),
    ("gem", "Cinder Gem"), ("gem", "Mist Gem"), ("gem", "Thorn Gem"),
    ("gem", "Moon Gem"), ("consumable", "Field Tonic"),
    ("consumable", "Wound Salve"), ("consumable", "Smoke Flask"),
    ("consumable", "Ward Elixir"),
]
RARITIES = ["common", "uncommon", "rare", "epic", "legendary"]
MAPS = ["hallowgrove", "brandrgarde"]


def item_record(index: int, kind: str, base: str) -> dict:
    rarity = RARITIES[index % len(RARITIES)]
    map_slug = MAPS[index % 2]
    acquisition_kind = ["boss", "chest", "vendor", "crafting"][index % 4]
    return {
        "id": f"item-{index + 1:03d}", "slug": f"{base.lower().replace(chr(39), '').replace(' ', '-')}-{index // len(ITEM_BASES) + 1}",
        "name": f"{base} {index // len(ITEM_BASES) + 1}", "type": kind, "rarity": rarity,
        "level": 1 + (index % 20), "summary": f"V1 reference {kind} for planning and loot lookup.",
        "stats": {"power": 10 + index, "defense": 3 + (index % 12), "value": 50 + index * 15},
        "acquisition": [{"kind": acquisition_kind, "map": map_slug, "label": f"{map_slug.title()} {acquisition_kind} route", "confidence": "community"}],
        "lastVerified": SOURCE_DATE, "provenanceId": "seed-v1-editorial-2026-08-08"
    }


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    items = [item_record(i, kind, base) for i in range(48) for kind, base in [ITEM_BASES[i % len(ITEM_BASES)]]]
    classes = [{"id": slug, "name": name, "role": role, "summary": summary, "stances": ["assault", "guard"], "lastVerified": SOURCE_DATE, "provenanceId": "seed-v1-editorial-2026-08-08"} for slug, name, role, summary in CLASSES]
    pois = []
    labels = ["Extraction Gate", "Boss Arena", "Treasure Room", "Supply Cache", "High Ground", "Vendor Camp", "Shrine", "Crossroads", "Watchtower", "Hidden Path", "Ritual Site", "Safe Camp"]
    for m, offset in [("hallowgrove", 0), ("brandrgarde", 12)]:
        for j, label in enumerate(labels):
            category = ["extraction", "boss", "loot", "poi"][j % 4]
            pois.append({"id": f"{m}-{j+1:02d}", "map": m, "name": f"{label} {j+1}", "category": category, "x": 8 + ((j * 17 + offset) % 84), "y": 10 + ((j * 23 + offset) % 80), "description": f"Community-maintained {category} marker for route planning.", "lastVerified": SOURCE_DATE, "provenanceId": "seed-v1-editorial-2026-08-08"})
    talent_trees = [{"classId": slug, "stances": [{"id": stance, "nodes": [{"id": f"{slug}-{stance}-{n}", "name": f"{name} {stance.title()} {n}", "cost": 1, "tier": (n-1)//3+1} for n in range(1, 7)]} for stance in ["assault", "guard"]]} for slug, name, _, _ in CLASSES]
    provenance = {"dataset": "mistfall-hunter-v1-local-seed", "generatedAt": SOURCE_DATE, "method": "editorial deterministic local seed", "remoteFetch": False, "license": "site-authored structure; gameplay facts require future source-ledger verification", "sourceLedger": [{"id": "seed-v1-editorial-2026-08-08", "sourceType": "local-editorial-seed", "sourceUrl": None, "collectedAt": SOURCE_DATE, "verifiedAt": SOURCE_DATE, "usage": "V1 frontend states and API interface testing", "assetLedgerRef": "inputs/04-compliance/reuse-ledger.md", "confidence": "community", "notes": "No remote scraping performed by stage 08."}]}
    for filename, payload in {"items.json": items, "classes.json": classes, "map-pois.json": pois, "talent-trees.json": talent_trees, "provenance.json": provenance}.items():
        (OUT / filename).write_text(json.dumps(payload, indent=2) + "\n")

if __name__ == "__main__":
    main()
