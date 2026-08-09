// Local-only frontend-consumable data contract. No auth, payments, or PII.
export type ItemType = "weapon" | "armor" | "gem" | "consumable";
export type Rarity = "common" | "uncommon" | "rare" | "epic" | "legendary";
export type Confidence = "official" | "community" | "unverified";

export interface Provenanced { lastVerified: string; provenanceId: string; }
export interface Acquisition { kind: "boss" | "chest" | "vendor" | "crafting"; map: "hallowgrove" | "brandrgarde"; label: string; confidence: Confidence; }
export interface Item extends Provenanced { id: string; slug: string; name: string; type: ItemType; rarity: Rarity; level: number; summary: string; stats: Record<"power" | "defense" | "value", number>; acquisition: Acquisition[]; }
export interface HunterClass extends Provenanced { id: string; name: string; role: string; summary: string; stances: [string, string]; }
export interface MapPoi extends Provenanced { id: string; map: "hallowgrove" | "brandrgarde"; name: string; category: "extraction" | "boss" | "loot" | "poi"; x: number; y: number; description: string; }
export interface TalentNode { id: string; name: string; cost: number; tier: number; }
export interface TalentTree { classId: string; stances: { id: string; nodes: TalentNode[] }[]; }

export type ApiErrorCode = "INVALID_QUERY" | "NOT_FOUND" | "RATE_LIMITED" | "DATA_UNAVAILABLE";
export interface ApiError { error: { code: ApiErrorCode; message: string; retryable: boolean; fallback: "static-seed" | "none"; }; }
export interface ListResponse<T> { data: T[]; meta: { source: "static-seed" | "d1"; count: number; nextCursor: string | null; lastVerified: string; }; }
export interface DetailResponse<T> { data: T; meta: { source: "static-seed" | "d1"; lastVerified: string; }; }

// Adapter enables SSR/Workers later without changing components.
export interface MistfallDataAdapter {
  listItems(input?: { q?: string; type?: ItemType; rarity?: Rarity; cursor?: string; limit?: number }): Promise<ListResponse<Item>>;
  getItem(slug: string): Promise<DetailResponse<Item> | ApiError>;
  findLoot(input: { q: string; map?: "hallowgrove" | "brandrgarde" }): Promise<ListResponse<Item> | ApiError>;
  listMapPois(input: { map: "hallowgrove" | "brandrgarde"; category?: MapPoi["category"] }): Promise<ListResponse<MapPoi>>;
  listClasses(): Promise<ListResponse<HunterClass>>;
  getTalentTree(classId: string): Promise<DetailResponse<TalentTree> | ApiError>;
}
