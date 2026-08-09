# 08 Backend / Data Contract — Local-only

Status: `DONE_CODE_AND_LOCAL_VERIFIED` (not deployed)

## Owner release and scope
- Authority: `inputs/00-launch-card/owner-release-07-08-local-implementation-20260808.md`
- Scope: local schemas, deterministic seeds, API interfaces and local validation only.
- Explicitly not performed: Cloudflare mutations, D1/R2 creation or migration, secrets, remote probes, Git push, deploy, DNS, auth, payments, OAuth, or PII collection.

## Frontend integration
1. Copy/import `data-contract.ts` into the Next.js typed data layer.
2. Use `seed/*.json` as the static adapter source during local development/SSR.
3. Implement API adapter behavior from `api-contract.json`; static seed is the required anonymous fail-open fallback.
4. Use `tool-route-contracts.json` for all ten tool routes. Client drafts, quiz outcomes, builds, shares, and checklist state remain local-only.

## V1 non-thin data floor delivered
- 48 browseable items, all with type, rarity, stats, acquisition, Last Verified, and provenance.
- 24 map POIs: 12 each for Hallowgrove and Brandrgarde, including extraction, boss, and loot categories on each map.
- Six classes and two six-node stance trees per class.
- No gameplay facts are represented as official. Seed labels are community/editorial and require future source-ledger verification before factual expansion.

## Verify
```sh
python3 outputs/08-backend-data/generate_seed.py
python3 outputs/08-backend-data/validate_contract.py
```
Expected: JSON `status: pass`, `items: 48`, `pois: 24`, `toolRoutes: 10`, `remoteFetch: false`.

## Later production handoff (not authorized by this release)
Create real D1/R2 resources and bind only as `DB`/`ASSETS`; apply `migrations/0001_game_data.sql`; retain static-seed fallback if D1 is unavailable. A separate Owner release must authorize every remote action.
