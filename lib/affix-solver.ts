// Affix Optimizer solver — deterministic constraint search over the cleaned game data.
// Data source: public/data/affix-optimizer.json (1590 items, 44 affixes, 312 gems, 11 paths).
// Solver model (documented on-page, Community Report trust label):
//   - Each equipped piece provides: 1 inherent affix (if present) + 1 rolled affix per rarity cap.
//   - Gems socketed into a piece contribute their affix at their gem level.
//   - Victory Wine adds N extra affix slots (brew tier) that can be assigned to goal affixes,
//     each capped by the affix's maxLevel.

export type AffixGoal = { affixId: string; targetLevel: number };
export type RarityCap = Record<string, number>; // rarity -> rolled affix count
export type WineTier = { id: string; name: string; affixSlots: number; note: string };
export type GemRecord = { id: string; name: string; type: string; affixes: Record<string, number> };
export type PieceRecord = {
  id: string; name: string; slot: string; rarity: string; classes: string[];
  inherent: { affix: string; level: number } | null;
  sockets: { type: string; level: number }[];
};
export type SolverInput = {
  classSlug: string;
  goals: AffixGoal[];
  allowedRarities: Record<string, string[]>; // slot -> rarity ids allowed
  wineTier: WineTier;
};
export type SlotFill = {
  slot: string;
  piece: PieceRecord | null;
  rolled: string[];            // affix ids rolled onto the piece
  gems: { gem: GemRecord; affix: string; level: number }[];
};
export type SolverResult = {
  ok: boolean;
  reason?: string;
  totalLevel: number;
  goalsMet: number;
  goalsTotal: number;
  wineAssignments: { affix: string; level: number }[];
  fills: SlotFill[];
  byAffix: Record<string, number>; // affixId -> total level achieved
  slotsUsed: number;
};

export const SOLVER_SLOTS = ['head', 'chest', 'hands', 'legs', 'feet', 'necklace', 'ring', 'primary', 'secondary'];

function levelNeeded(goal: AffixGoal, current: number): number {
  return Math.max(0, goal.targetLevel - current);
}

/**
 * Greedy deterministic solver.
 * Pass 1 — assign wine slots to the goals with the largest remaining deficit (cap at affix maxLevel).
 * Pass 2 — for each slot, pick the class-legal piece (allowed rarities) with the most useful
 *          inherent affix, then socket gems that reduce the remaining deficit, then roll affixes.
 * Pass 3 — report totals per affix and an overall verdict.
 */
export function solveAffixes(
  equipment: PieceRecord[],
  gems: GemRecord[],
  affixMax: Record<string, number>,
  rarityCaps: RarityCap,
  input: SolverInput,
): SolverResult {
  const { classSlug, goals, allowedRarities, wineTier } = input;
  const byAffix: Record<string, number> = {};
  const bump = (affix: string, amount: number) => {
    const cap = affixMax[affix] ?? 7;
    const room = cap - (byAffix[affix] ?? 0);
    const added = Math.min(amount, Math.max(0, room));
    if (added > 0) byAffix[affix] = (byAffix[affix] ?? 0) + added;
    return added;
  };

  if (!goals.length) {
    return { ok: false, reason: 'Pick at least one affix goal to solve for.', totalLevel: 0, goalsMet: 0, goalsTotal: 0, wineAssignments: [], fills: [], byAffix, slotsUsed: 0 };
  }

  // Pass 1 — wine slots
  const wineAssignments: { affix: string; level: number }[] = [];
  let wineLeft = wineTier.affixSlots;
  const deficitOrder = () => [...goals].sort((a, b) => levelNeeded(b, byAffix[b.affixId] ?? 0) - levelNeeded(a, byAffix[a.affixId] ?? 0));
  while (wineLeft > 0) {
    const candidates = deficitOrder().filter((g) => levelNeeded(g, byAffix[g.affixId] ?? 0) > 0);
    if (!candidates.length) break;
    const goal = candidates[0];
    const added = bump(goal.affixId, 1);
    if (added === 0) break; // capped everywhere
    wineAssignments.push({ affix: goal.affixId, level: 1 });
    wineLeft -= 1;
  }

  // Pass 2 — equipment slots
  const legalPieces = equipment.filter((p) => p.classes.includes(classSlug));
  const fills: SlotFill[] = [];
  for (const slot of SOLVER_SLOTS) {
    const allowed = allowedRarities[slot] ?? [];
    const candidates = legalPieces
      .filter((p) => p.slot === slot && allowed.includes(p.rarity))
      // score: inherent usefulness first, then socket count, then rarity cap
      .sort((a, b) => {
        const score = (p: PieceRecord) => {
          let s = 0;
          if (p.inherent) {
            const g = goals.find((x) => x.affixId === p.inherent!.affix);
            if (g && levelNeeded(g, byAffix[g.affixId] ?? 0) > 0) s += 100;
          }
          s += p.sockets.length * 10;
          s += rarityCaps[p.rarity] ?? 0;
          return s;
        };
        return score(b) - score(a);
      });
    const piece = candidates[0] ?? null;
    const fill: SlotFill = { slot, piece, rolled: [], gems: [] };
    if (piece) {
      if (piece.inherent) bump(piece.inherent.affix, piece.inherent.level);
      // gems
      for (const socket of piece.sockets) {
        const best = gems
          .filter((g) => g.type === socket.type)
          .map((g) => {
            const entries = Object.entries(g.affixes);
            const useful = entries
              .map(([affix, lvl]) => {
                const goal = goals.find((x) => x.affixId === affix);
                const usefulAmount = goal ? Math.min(lvl, levelNeeded(goal, byAffix[affix] ?? 0)) : 0;
                return { affix, lvl, usefulAmount };
              })
              .sort((x, y) => y.usefulAmount - x.usefulAmount)[0];
            return { gem: g, affix: useful?.affix ?? entries[0][0], level: useful?.lvl ?? entries[0][1], useful: useful?.usefulAmount ?? 0 };
          })
          .sort((a, b) => b.useful - a.useful)[0];
        if (best && best.useful > 0) {
          bump(best.affix, best.level);
          fill.gems.push({ gem: best.gem, affix: best.affix, level: best.level });
        }
      }
      // rolled affixes per rarity cap
      const rolls = rarityCaps[piece.rarity] ?? 0;
      for (let i = 0; i < rolls; i += 1) {
        const goal = deficitOrder().find((g) => levelNeeded(g, byAffix[g.affixId] ?? 0) > 0);
        if (!goal) break;
        bump(goal.affixId, 1);
        fill.rolled.push(goal.affixId);
      }
    }
    fills.push(fill);
  }

  // Pass 3 — verdict
  const goalsMet = goals.filter((g) => (byAffix[g.affixId] ?? 0) >= g.targetLevel).length;
  const totalLevel = goals.reduce((sum, g) => sum + Math.min(byAffix[g.affixId] ?? 0, g.targetLevel), 0);
  const slotsUsed = fills.filter((f) => f.piece).length;
  const ok = goalsMet === goals.length;
  const reason = ok ? undefined : `${goalsMet}/${goals.length} affix goals fully met. Raise the allowed rarities, pick a higher brew tier, or drop a goal to make the build legal.`;
  return { ok, reason, totalLevel, goalsMet, goalsTotal: goals.length, wineAssignments, fills, byAffix, slotsUsed };
}
