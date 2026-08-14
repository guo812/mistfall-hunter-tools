'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

type PlannerPath = {
  classSlug: string; className: string; weaponTypeId: number; pathId: string | null; styleId: number;
  label: string; description: string; role: string; summary: string;
  slotGroups: { name: string; group: string; required: boolean; options: string[] }[];
};
type PlannerData = {
  version: number;
  classes: { slug: string; id: number; name: string; role: string; summary: string }[];
  paths: PlannerPath[];
  talentHints: Record<string, string[]>;
};

const STORAGE_KEY = '***';

function encode(cls: string, pathKey: string, picks: Record<string, string>, stance: string, tone: string, mode: string): string {
  return [cls, pathKey, Object.entries(picks).map(([k, v]) => `${k}=${v}`).join('.'), stance, tone, mode].filter((x) => x !== undefined).join('|');
}
function decode(hash: string): { cls: string; pathKey: string; picks: Record<string, string>; stance: string; tone: string; mode: string } | null {
  try {
    const parts = hash.split('|');
    if (!parts[0] || parts.length < 4) return null;
    const picks: Record<string, string> = {};
    (parts[2] || '').split('.').filter(Boolean).forEach((entry) => {
      const i = entry.indexOf('=');
      if (i > 0) picks[entry.slice(0, i)] = entry.slice(i + 1);
    });
    return { cls: parts[0], pathKey: parts[1] || '', picks, stance: parts[3] || 'Assault', tone: parts[4] || 'Burst', mode: parts[5] || 'Solo' };
  } catch { return null; }
}

export function BuildPlannerPro({ initialClass, initialPath, hideAffixLink = false }: { initialClass?: string; initialPath?: string; hideAffixLink?: boolean }) {
  const [data, setData] = useState<PlannerData | null>(null);
  const [cls, setCls] = useState(initialClass || 'mercenary');
  const [pathKey, setPathKey] = useState(initialPath || '');
  const [picks, setPicks] = useState<Record<string, string>>({});
  const [stance, setStance] = useState('Assault');
  const [tone, setTone] = useState('Burst');
  const [mode, setMode] = useState('Solo');
  const [notice, setNotice] = useState('');

  useEffect(() => {
    fetch('/data/build-planner-pro.json').then((r) => r.json()).then((d: PlannerData) => {
      setData(d);
      const params = new URLSearchParams(window.location.search);
      const hash = params.get('build');
      const stored = (hash ? decode(hash) : null) ?? (() => { try { return decode(localStorage.getItem(STORAGE_KEY) || ''); } catch { return null; } })();
      if (stored && d.classes.some((c) => c.slug === stored.cls)) {
        setCls(stored.cls); setPathKey(stored.pathKey); setPicks(stored.picks);
        setStance(stored.stance || 'Assault'); setTone(stored.tone || 'Burst'); setMode(stored.mode || 'Solo');
      } else if (initialPath) {
        setPathKey(initialPath);
      }
    }).catch(() => setData(null));
  }, [initialPath]);

  const classPaths = useMemo(() => data?.paths.filter((p) => p.classSlug === cls) ?? [], [data, cls]);
  const activePath = useMemo(() => classPaths.find((p) => `${p.weaponTypeId}` === pathKey || p.pathId === pathKey) ?? classPaths[0], [classPaths, pathKey]);

  useEffect(() => {
    if (!data || !activePath) return;
    const state = encode(cls, `${activePath.weaponTypeId}`, picks, stance, tone, mode);
    try { localStorage.setItem(STORAGE_KEY, state); } catch { /* ignore */ }
  }, [data, cls, activePath, picks, stance, tone, mode]);

  if (!data) return <div className="tool tool-rich"><p>Loading the build planner dataset (6 classes · 11 weapon paths)…</p></div>;

  const classEntry = data.classes.find((c) => c.slug === cls) ?? data.classes[0];
  const hints = data.talentHints[cls] ?? [];
  const filledCount = activePath ? activePath.slotGroups.filter((g) => picks[`${activePath.weaponTypeId}:${g.name}`]).length : 0;
  const totalSlots = activePath?.slotGroups.length ?? 0;
  const complete = totalSlots > 0 && filledCount === totalSlots;

  const share = () => {
    if (typeof window === 'undefined' || !activePath) return '';
    const state = encode(cls, `${activePath.weaponTypeId}`, picks, stance, tone, mode);
    return `${window.location.origin}${window.location.pathname}?build=${encodeURIComponent(state)}`;
  };
  const copy = async (text: string) => { try { await navigator.clipboard.writeText(text); return true; } catch { return false; } };
  const reset = () => { setPicks({}); setStance('Assault'); setTone('Burst'); setMode('Solo'); };

  return (
    <div className="tool tool-rich build-planner-pro" aria-label="Build planner interactive tool">
      <p className="label">Unofficial community tool · Community Report · Last Verified Aug 13, 2026</p>

      <section className="bp-step">
        <h3>1 · Pick your class</h3>
        <div className="chip-row" role="radiogroup" aria-label="Choose a class">
          {data.classes.map((c) => (
            <button key={c.slug} type="button" role="radio" aria-checked={cls === c.slug}
              className={cls === c.slug ? 'chip active' : 'chip'}
              onClick={() => { setCls(c.slug); setPicks({}); setPathKey(''); }}>
              {c.name}
            </button>
          ))}
        </div>
        <p className="ao-hint">{classEntry.name} — {classEntry.summary} Role: {classEntry.role}.</p>
      </section>

      <section className="bp-step">
        <h3>2 · Pick your weapon path</h3>
        <div className="chip-row" role="radiogroup" aria-label="Choose a weapon path">
          {classPaths.map((p) => {
            const active = activePath && `${p.weaponTypeId}` === `${activePath.weaponTypeId}`;
            const labelText = p.pathId ? p.label.replace('Path Skills', '').trim() || p.description.split('·')[0].trim() : `${p.label}${p.slotGroups[0] ? '' : ''}`;
            return (
              <button key={p.weaponTypeId} type="button" role="radio" aria-checked={active}
                className={active ? 'chip active' : 'chip'}
                onClick={() => { setPathKey(`${p.weaponTypeId}`); setPicks({}); }}>
                {labelText || `Weapon ${p.weaponTypeId}`}
              </button>
            );
          })}
        </div>
        {activePath ? <p className="ao-hint">{activePath.label}{activePath.description ? ` — ${activePath.description}` : ''}</p> : null}
      </section>

      {activePath ? (
        <section className="bp-step">
          <h3>3 · Fill your skill slots <span className="ao-count">{filledCount}/{totalSlots}</span></h3>
          <div className="bp-slots">
            {activePath.slotGroups.map((group) => {
              const key = `${activePath.weaponTypeId}:${group.name}`;
              return (
                <label key={key}>
                  {group.name}{group.required ? ' *' : ''}
                  <select value={picks[key] ?? ''} onChange={(e) => setPicks((current) => ({ ...current, [key]: e.target.value }))} aria-label={`${classEntry.name} ${group.name} pick`}>
                    <option value="">— choose —</option>
                    {group.options.map((option) => <option key={option} value={option}>{option}</option>)}
                  </select>
                </label>
              );
            })}
          </div>
        </section>
      ) : null}

      <section className="bp-step">
        <h3>4 · Stance · tone · mode</h3>
        <div className="chip-row" role="radiogroup" aria-label="Choose a stance">
          {['Assault', 'Guard'].map((s) => <button key={s} type="button" role="radio" aria-checked={stance === s} className={stance === s ? 'chip active' : 'chip'} onClick={() => setStance(s)}>{s}</button>)}
        </div>
        <div className="chip-row" role="radiogroup" aria-label="Choose a build tone">
          {['Burst', 'Sustain', 'Utility'].map((t) => <button key={t} type="button" role="radio" aria-checked={tone === t} className={tone === t ? 'chip active' : 'chip'} onClick={() => setTone(t)}>{t}</button>)}
        </div>
        <div className="chip-row" role="radiogroup" aria-label="Choose a mode">
          {['Solo', 'Duo', 'Trio'].map((m) => <button key={m} type="button" role="radio" aria-checked={mode === m} className={mode === m ? 'chip active' : 'chip'} onClick={() => setMode(m)}>{m}</button>)}
        </div>
      </section>

      <section className="bp-step">
        <h3>5 · Talent focus hints</h3>
        <div className="ao-hint">{hints.length ? hints.map((h) => h).join(' · ') : 'Pick a class to see talent branch hints.'}</div>
      </section>

      <div className="action-row">
        <button type="button" className="button primary" disabled={!complete} onClick={async () => setNotice(await copy(share()) ? 'Share URL copied.' : `Copy this URL: ${share()}`)}>
          {complete ? 'Copy Share URL' : `Fill all ${totalSlots} slots to share`}
        </button>
        <button type="button" className="button secondary" onClick={reset}>Reset</button>
        {!hideAffixLink ? <Link className="button secondary" href="/affix-optimizer">Match Affixes</Link> : null}
        <span aria-live="polite">{notice}</span>
      </div>
      <p className="ao-hint">Tool data only, no PII — your build is saved in your browser. Skill lists come from the cleaned community dataset; if a patch changes the options, this page is re-verified.</p>
    </div>
  );
}
