'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { solveAffixes, SOLVER_SLOTS, type AffixGoal, type GemRecord, type PieceRecord, type RarityCap, type WineTier } from '@/lib/affix-solver';

type AffixDef = { id: string; name: string; tone: string; maxLevel: number; description: string };
type OptimizerData = {
  version: number;
  classes: { slug: string; id: number; name: string }[];
  paths: { classSlug: string; className: string; weaponTypeId: number; label: string; description: string }[];
  affixes: AffixDef[];
  rarityOrder: string[];
  rarityCaps: RarityCap;
  wineTiers: WineTier[];
  equipment: PieceRecord[];
  gems: GemRecord[];
};

const TONE_LABEL: Record<string, string> = { offense: 'Offense', defense: 'Defense', utility: 'Utility', neutral: 'Neutral' };
const TONE_CLASS: Record<string, string> = { offense: 'tone-offense', defense: 'tone-defense', utility: 'tone-utility', neutral: 'tone-neutral' };
const STORAGE_KEY = '***';

function encodeState(cls: string, goals: AffixGoal[], rarities: Record<string, string[]>, wine: string): string {
  return [cls, goals.map((g) => `${g.affixId}:${g.targetLevel}`).join('.'),
    Object.entries(rarities).map(([s, r]) => `${s}=${r.join('+')}`).join('~'), wine].filter(Boolean).join('|');
}
function decodeState(hash: string): { cls: string; goals: AffixGoal[]; rarities: Record<string, string[]>; wine: string } | null {
  try {
    const [cls, goalPart, rarityPart, wine] = hash.split('|');
    if (!cls) return null;
    const goals = (goalPart || '').split('.').filter(Boolean).map((g) => {
      const [affixId, level] = g.split(':');
      return { affixId, targetLevel: parseInt(level || '1', 10) || 1 };
    });
    const rarities: Record<string, string[]> = {};
    (rarityPart || '').split('~').filter(Boolean).forEach((entry) => {
      const [slot, r] = entry.split('=');
      if (slot && r) rarities[slot] = r.split('+');
    });
    return { cls, goals, rarities, wine: wine || '' };
  } catch { return null; }
}

export function AffixOptimizer({ initialClass }: { initialClass?: string }) {
  const [data, setData] = useState<OptimizerData | null>(null);
  const [cls, setCls] = useState(initialClass || 'mercenary');
  const [goals, setGoals] = useState<AffixGoal[]>([]);
  const [allowedRarities, setAllowedRarities] = useState<Record<string, string[]>>({});
  const [wineId, setWineId] = useState('warblood');
  const [notice, setNotice] = useState('');

  useEffect(() => {
    fetch('/data/affix-optimizer.json').then((r) => r.json()).then((d: OptimizerData) => {
      setData(d);
      const params = new URLSearchParams(window.location.search);
      const hash = params.get('build');
      const saved = hash ? decodeState(hash) : null;
      const stored = saved ?? (() => { try { return decodeState(localStorage.getItem(STORAGE_KEY) || ''); } catch { return null; } })();
      if (stored && d.classes.some((c) => c.slug === stored.cls)) {
        setCls(stored.cls);
        setGoals(stored.goals.filter((g) => d.affixes.some((a) => a.id === g.affixId)));
        setAllowedRarities(stored.rarities);
        if (stored.wine && d.wineTiers.some((w) => w.id === stored.wine)) setWineId(stored.wine);
      }
      if (!stored || !Object.keys(stored.rarities).length) {
        const defaults: Record<string, string[]> = {};
        SOLVER_SLOTS.forEach((slot) => { defaults[slot] = ['rare', 'excellent', 'epic', 'legendary']; });
        setAllowedRarities((current) => Object.keys(current).length ? current : defaults);
      }
    }).catch(() => setData(null));
  }, []);

  const wineTier = useMemo(() => data?.wineTiers.find((w) => w.id === wineId) ?? data?.wineTiers[2], [data, wineId]);
  const affixMax = useMemo(() => {
    const map: Record<string, number> = {};
    data?.affixes.forEach((a) => { map[a.id] = a.maxLevel; });
    return map;
  }, [data]);

  const result = useMemo(() => {
    if (!data || !wineTier) return null;
    return solveAffixes(data.equipment, data.gems, affixMax, data.rarityCaps, { classSlug: cls, goals, allowedRarities, wineTier });
  }, [data, wineTier, affixMax, cls, goals, allowedRarities]);

  // Persist + share
  useEffect(() => {
    if (!data) return;
    const state = encodeState(cls, goals, allowedRarities, wineId);
    try { localStorage.setItem(STORAGE_KEY, state); } catch { /* ignore */ }
  }, [data, cls, goals, allowedRarities, wineId]);

  const share = useMemo(() => {
    if (typeof window === 'undefined' || !data) return '';
    const state = encodeState(cls, goals, allowedRarities, wineId);
    return `${window.location.origin}${window.location.pathname}?build=${encodeURIComponent(state)}`;
  }, [data, cls, goals, allowedRarities, wineId]);

  if (!data) {
    return <div className="tool tool-rich"><p>Loading the affix optimizer dataset (44 affixes · 1,590 items · 312 gems)…</p></div>;
  }

  const classEntry = data.classes.find((c) => c.slug === cls) ?? data.classes[0];
  const affixName = (id: string) => data.affixes.find((a) => a.id === id)?.name ?? id;

  const toggleGoal = (affix: AffixDef) => {
    setGoals((current) => {
      if (current.some((g) => g.affixId === affix.id)) return current.filter((g) => g.affixId !== affix.id);
      return [...current, { affixId: affix.id, targetLevel: Math.min(3, affix.maxLevel) }];
    });
  };
  const setGoalLevel = (affixId: string, level: number) => {
    const max = affixMax[affixId] ?? 7;
    setGoals((current) => current.map((g) => g.affixId === affixId ? { ...g, targetLevel: Math.max(1, Math.min(max, level)) } : g));
  };
  const toggleRarity = (slot: string, rarity: string) => {
    setAllowedRarities((current) => {
      const set = new Set(current[slot] ?? []);
      if (set.has(rarity)) set.delete(rarity); else set.add(rarity);
      return { ...current, [slot]: [...set] };
    });
  };

  const copy = async (text: string) => { try { await navigator.clipboard.writeText(text); return true; } catch { return false; } };

  return (
    <div className="tool tool-rich affix-optimizer" aria-label="Affix optimizer interactive tool">
      <p className="label">Unofficial community tool · Community Report · Last Verified Aug 13, 2026</p>

      <div className="ao-grid">
        {/* LEFT: inputs */}
        <div className="ao-inputs">
          <section>
            <h3>1 · Class &amp; path</h3>
            <div className="chip-row" role="radiogroup" aria-label="Choose a class">
              {data.classes.map((c) => (
                <button key={c.slug} type="button" role="radio" aria-checked={cls === c.slug}
                  className={cls === c.slug ? 'chip active' : 'chip'} onClick={() => setCls(c.slug)}>{c.name}</button>
              ))}
            </div>
            <p className="ao-hint">
              {classEntry.name} paths: {data.paths.filter((p) => p.classSlug === cls).map((p) => p.label.split(':')[0].trim()).join(' · ') || '—'}
            </p>
          </section>

          <section>
            <h3>2 · Affix goals <span className="ao-count">{goals.length}/8</span></h3>
            <p className="ao-hint">Tap affixes you want, then set a target level. The solver tries to reach every target.</p>
            <div className="ao-affix-grid">
              {data.affixes.map((affix) => {
                const goal = goals.find((g) => g.affixId === affix.id);
                return (
                  <div key={affix.id} className={goal ? `ao-affix picked ${TONE_CLASS[affix.tone]}` : `ao-affix ${TONE_CLASS[affix.tone]}`}>
                    <button type="button" onClick={() => toggleGoal(affix)} aria-pressed={!!goal} title={affix.description}>
                      <strong>{affix.name}</strong>
                      <small>{TONE_LABEL[affix.tone]} · max Lv{affix.maxLevel}</small>
                    </button>
                    {goal ? (
                      <label className="ao-level">Lv
                        <select value={goal.targetLevel} onChange={(e) => setGoalLevel(affix.id, parseInt(e.target.value, 10))} aria-label={`${affix.name} target level`}>
                          {Array.from({ length: affix.maxLevel }, (_, i) => i + 1).map((lvl) => <option key={lvl} value={lvl}>{lvl}</option>)}
                        </select>
                      </label>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </section>

          <section>
            <h3>3 · Allowed rarity per slot</h3>
            <div className="ao-rarity-table">
              {SOLVER_SLOTS.map((slot) => (
                <div key={slot} className="ao-rarity-row">
                  <span className="ao-slot-name">{slot}</span>
                  {data.rarityOrder.map((rarity) => {
                    const on = (allowedRarities[slot] ?? []).includes(rarity);
                    return (
                      <button key={rarity} type="button" onClick={() => toggleRarity(slot, rarity)}
                        className={on ? `ao-rarity ${rarity} on` : `ao-rarity ${rarity}`}
                        aria-pressed={on} aria-label={`${slot} allows ${rarity}`}>{rarity[0].toUpperCase()}</button>
                    );
                  })}
                </div>
              ))}
            </div>
            <p className="ao-hint">D=Damaged C=Common R=Rare E=Excellent P=Epic L=Legendary.</p>
          </section>

          <section>
            <h3>4 · Victory Wine tier</h3>
            <div className="chip-row" role="radiogroup" aria-label="Choose a brew tier">
              {data.wineTiers.map((w) => (
                <button key={w.id} type="button" role="radio" aria-checked={wineId === w.id}
                  className={wineId === w.id ? 'chip active' : 'chip'} onClick={() => setWineId(w.id)}>
                  {w.name} · {w.affixSlots} slot{w.affixSlots > 1 ? 's' : ''}
                </button>
              ))}
            </div>
          </section>
        </div>

        {/* RIGHT: result */}
        <div className="ao-result" aria-live="polite">
          {!goals.length ? (
            <div className="ao-empty"><strong>Pick your affix goals</strong><p>Choose affixes on the left, set target levels, and the solver checks whether a legal loadout can reach them.</p></div>
          ) : result?.ok ? (
            <div className="ao-verdict ok">
              <strong>BUILD LEGAL — all {result.goalsTotal} goals met</strong>
              <p>Total affix level banked: {result.totalLevel} across {result.slotsUsed} equipped slots.</p>
            </div>
          ) : (
            <div className="ao-verdict bad">
              <strong>NOT FULLY REACHABLE</strong>
              <p>{result?.reason}</p>
            </div>
          )}

          {goals.length && result ? (
            <>
              <h3>Affix progress</h3>
              <div className="ao-progress">
                {goals.map((g) => {
                  const have = result.byAffix[g.affixId] ?? 0;
                  const met = have >= g.targetLevel;
                  return (
                    <div key={g.affixId} className={met ? 'ao-goal-row met' : 'ao-goal-row'}>
                      <span>{affixName(g.affixId)}</span>
                      <div className="ao-bar" aria-hidden="true"><span style={{ width: `${Math.min(100, (have / g.targetLevel) * 100)}%` }} /></div>
                      <strong>{have}/{g.targetLevel}{met ? ' ✓' : ''}</strong>
                    </div>
                  );
                })}
              </div>

              <h3>Loadout the solver chose</h3>
              <div className="ao-fills">
                {result.fills.map((fill) => (
                  <div key={fill.slot} className="ao-fill">
                    <span className="ao-slot-name">{fill.slot}</span>
                    {fill.piece ? (
                      <div>
                        <strong>{fill.piece.name}</strong>
                        <small className={`rarity-${fill.piece.rarity}`}>{fill.piece.rarity}</small>
                        {fill.piece.inherent ? <small> inherent {affixName(fill.piece.inherent.affix)} Lv{fill.piece.inherent.level}</small> : null}
                        {fill.gems.length ? <small> · gems: {fill.gems.map((g) => `${g.gem.name}→${affixName(g.affix)}`).join(', ')}</small> : null}
                        {fill.rolled.length ? <small> · rolls: {fill.rolled.map(affixName).join(', ')}</small> : null}
                      </div>
                    ) : <div className="ao-empty-slot">no legal piece for the allowed rarities</div>}
                  </div>
                ))}
                {result.wineAssignments.length ? (
                  <div className="ao-fill">
                    <span className="ao-slot-name">brew</span>
                    <div><strong>{wineTier?.name}</strong><small> +{result.wineAssignments.length} affix slot{result.wineAssignments.length > 1 ? 's' : ''}: {result.wineAssignments.map((w) => affixName(w.affix)).join(', ')}</small></div>
                  </div>
                ) : null}
              </div>
            </>
          ) : null}

          <div className="action-row">
            <button type="button" className="button primary" onClick={async () => setNotice(await copy(share) ? 'Share URL copied.' : `Copy this URL: ${share}`)}>Copy Share URL</button>
            <button type="button" className="button secondary" onClick={() => { setGoals([]); setNotice(''); }}>Clear goals</button>
            <Link className="button secondary" href="/build-planner">Plan in Build Planner</Link>
            <span aria-live="polite">{notice}</span>
          </div>
          <p className="ao-hint">Tool data only, no PII — progress is saved in your browser. Solver is a deterministic greedy model; treat the loadout as a strong starting point, not a guaranteed optimum.</p>
        </div>
      </div>
    </div>
  );
}
