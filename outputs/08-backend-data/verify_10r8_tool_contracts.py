#!/usr/bin/env python3
"""Read-only verification for the 10R8 local-only seven-tool data contract.

The script reads the canonical local seed/route contracts plus the current tool UI
surface. It writes 10r8-contract-check.json without mutating application data.
"""
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).parent
PROJECT = ROOT.parent.parent
SEED = ROOT / "seed"
REPORT = ROOT / "10r8-contract-check.json"
TOOL_UI = PROJECT / "components" / "tool-panel.tsx"


def load(path: Path):
    return json.loads(path.read_text(encoding="utf-8"))


def row(tool, *, fields, shareable_url_shape, storage_contract, checks, gaps, evidence):
    passed = all(checks.values()) and not gaps
    return {
        "tool": tool,
        "status": "pass" if passed else "gap",
        "pass": passed,
        "data_fields_present": fields,
        "shareable_url_shape": shareable_url_shape,
        "storage_contract": storage_contract,
        "checks": checks,
        "gaps": gaps,
        "evidence": evidence,
    }


def main():
    classes = load(SEED / "classes.json")
    items = load(SEED / "items.json")
    talents = load(SEED / "talent-trees.json")
    pois = load(SEED / "map-pois.json")
    provenance = load(SEED / "provenance.json")
    tool_routes = load(ROOT / "tool-route-contracts.json")["routes"]
    ui = TOOL_UI.read_text(encoding="utf-8")

    class_ids = {entry["id"] for entry in classes}
    tree_ids = {entry["classId"] for entry in talents}
    item_types = {entry["type"] for entry in items}
    categories = {entry["category"] for entry in pois}
    routes = {entry["route"]: entry for entry in tool_routes}

    # Sample a formal Mercenary encode/decode round-trip using the contract shape
    # required by the 10R8 release. Current UI does not implement this shape; this
    # demonstrates that no claim is made for an absent production implementation.
    sample = {
        "class": "mercenary",
        "specialization": "assault",
        "talents": ["mercenary-assault-1", "mercenary-assault-4"],
        "weapon": "weapon-01",
        "armor": "armor-01",
    }
    encoded = "&".join(f"{key}={','.join(value) if isinstance(value, list) else value}" for key, value in sample.items())
    decoded = {key: value.split(",") if key == "talents" else value for key, value in (part.split("=", 1) for part in encoded.split("&"))}
    sample_round_trip = decoded == sample

    results = []
    build_checks = {
        "six_classes": len(class_ids) == 6 and tree_ids == class_ids,
        "talent_nodes": all(len(tree.get("stances", [])) == 2 and all(stance.get("nodes") for stance in tree["stances"]) for tree in talents),
        "weapon_and_armor_seed": {"weapon", "armor"}.issubset(item_types),
        "required_share_url_implemented_in_ui": all(token in ui for token in ["specialization", "talents", "weapon", "armor"]),
        "mercenary_contract_shape_round_trips": sample_round_trip,
    }
    results.append(row(
        "/build-planner",
        fields=["classes.id/name/stances", "talent-trees.classId/stances/nodes", "items.type=weapon|armor"],
        shareable_url_shape="required: ?class=<id>&specialization=<id>&talents=<csv>&weapon=<id>&armor=<id>; current UI: none for build planner",
        storage_contract="tool-route-contracts: local share state; no specific localStorage key declared",
        checks=build_checks,
        gaps=["No specialization/perk/loadout fields in the local seed contract.", "Current UI does not encode/decode the required build-planner URL fields; only the proposed contract sample round-trips."],
        evidence=["seed/classes.json", "seed/talent-trees.json", "seed/items.json", "components/tool-panel.tsx"],
    ))

    map_checks = {
        "poi_count_at_least_24": len(pois) >= 24,
        "four_local_categories": {"poi", "extraction", "boss", "loot"}.issubset(categories),
        "coordinates_in_percent_bounds": all(0 <= poi["x"] <= 100 and 0 <= poi["y"] <= 100 for poi in pois),
        "pan_zoom_bounds_declared": False,
    }
    results.append(row(
        "/map",
        fields=["id/map/name/category/x/y/description", "categories: poi/extraction/boss/loot"],
        shareable_url_shape="none declared",
        storage_contract="local seed read only; no localStorage key declared",
        checks=map_checks,
        gaps=["No pan/zoom bounds contract is declared.", "No explicit Event layer; fourth layer is local category `loot` (not Event)."],
        evidence=["seed/map-pois.json", "tool-route-contracts.json"],
    ))

    results.append(row(
        "/matchups",
        fields=["classes.id/name/role/summary only"],
        shareable_url_shape="none declared",
        storage_contract="tool-route-contracts says frontend editorial matchup copy; no persisted client state declared",
        checks={"six_classes": len(class_ids) == 6, "matrix_6x6_present": False, "all_36_cells_have_analysis": False},
        gaps=["No 6×6 matchup matrix artifact exists.", "No per-cell analysis text contract exists."],
        evidence=["seed/classes.json", "tool-route-contracts.json", "components/tool-panel.tsx"],
    ))

    results.append(row(
        "/class-quiz",
        fields=["classes.id/name/role/summary"],
        shareable_url_shape="recommended build target required: /builds/<class>; current contract does not declare quiz result link state",
        storage_contract="anonymous local answers/results only per tool-route-contracts storageBoundary; no key declared",
        checks={"five_questions_present": False, "weighted_scoring_present": False, "reasons_list_present": False, "recommended_build_link_contract_present": False},
        gaps=["No five-question bank or weighted scoring data exists.", "No reasons-list data or recommended build-link contract exists."],
        evidence=["seed/classes.json", "tool-route-contracts.json"],
    ))

    results.append(row(
        "/settings",
        fields=["no settings seed/rules artifact"],
        shareable_url_shape="required URL-encoded platform/gpu/resolution/fps state; none declared",
        storage_contract="tool-route-contracts says local rules only; no key declared",
        checks={"pc_ps5_xbox_presets": False, "gpu_buckets": False, "resolution_buckets": False, "target_fps_buckets": False, "share_url": False},
        gaps=["No platform preset, GPU/resolution/FPS bucket, or encoded-share contract exists."],
        evidence=["tool-route-contracts.json"],
    ))

    results.append(row(
        "/tier-list",
        fields=["classes.id/name/role/summary only"],
        shareable_url_shape="none declared",
        storage_contract="frontend editorial ranking stated; no persistence key declared",
        checks={"four_modes": False, "six_classes_per_mode": False, "rationale_per_ranking": False},
        gaps=["No Solo/Trio/Duo/Beginner ranking data artifact exists.", "No per-class rationale data exists."],
        evidence=["seed/classes.json", "tool-route-contracts.json"],
    ))

    results.append(row(
        "/checklist",
        fields=["no checklist objectives artifact"],
        shareable_url_shape="not applicable",
        storage_contract="required: named localStorage key, serialized checked ids, reset removeItem path; current contract only says local checklist",
        checks={"objective_count_15_to_20": False, "grouped_objectives": False, "local_storage_key_documented": False, "reset_path_documented": False},
        gaps=["No 15–20 objective list or grouping data exists.", "No localStorage key/value/reset contract is documented."],
        evidence=["tool-route-contracts.json", "components/tool-panel.tsx"],
    ))

    report = {
        "schema_version": "10r8-tool-contract-check/v1",
        "scope": "read-only local contract audit; no remote fetch or Cloudflare resource mutation",
        "remoteFetch": provenance.get("remoteFetch"),
        "tool_route_count": len(routes),
        "results": results,
        "summary": {
            "tools_checked": len(results),
            "pass_count": sum(1 for result in results if result["pass"]),
            "gap_count": sum(1 for result in results if result["status"] == "gap"),
            "gap_tools": [result["tool"] for result in results if result["status"] == "gap"],
            "mercenary_build_planner_contract_sample_round_trip": sample_round_trip,
            "production_build_planner_share_url_round_trip": False,
        },
    }
    REPORT.write_text(json.dumps(report, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(report["summary"], sort_keys=True))


if __name__ == "__main__":
    main()
