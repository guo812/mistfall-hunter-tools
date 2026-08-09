-- Local migration specification only; do not apply remotely without a later Owner release.
CREATE TABLE IF NOT EXISTS items (
  id TEXT PRIMARY KEY, slug TEXT NOT NULL UNIQUE, name TEXT NOT NULL,
  item_type TEXT NOT NULL CHECK (item_type IN ('weapon','armor','gem','consumable')),
  rarity TEXT NOT NULL, level INTEGER NOT NULL, payload_json TEXT NOT NULL,
  last_verified TEXT NOT NULL, provenance_id TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS items_type_rarity_idx ON items(item_type, rarity);
CREATE TABLE IF NOT EXISTS map_pois (
  id TEXT PRIMARY KEY, map_slug TEXT NOT NULL, category TEXT NOT NULL,
  name TEXT NOT NULL, x REAL NOT NULL, y REAL NOT NULL, payload_json TEXT NOT NULL,
  last_verified TEXT NOT NULL, provenance_id TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS map_pois_map_category_idx ON map_pois(map_slug, category);
CREATE TABLE IF NOT EXISTS data_provenance (
  id TEXT PRIMARY KEY, source_type TEXT NOT NULL, source_url TEXT,
  collected_at TEXT NOT NULL, verified_at TEXT NOT NULL, asset_ledger_ref TEXT NOT NULL,
  notes TEXT NOT NULL
);
-- Deliberately absent: users, sessions, oauth_accounts, payments, orders, or PII tables.
