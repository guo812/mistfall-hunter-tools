'use client';

import { Suspense, useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const classNames = ['Mercenary', 'Sorcerer', 'Blackarrow', 'Shadowstrix', 'Seer', 'Withered Knight'];
const roles: Record<string, string> = {
  Mercenary: 'frontline',
  Sorcerer: 'DPS',
  Blackarrow: 'DPS',
  Shadowstrix: 'DPS',
  Seer: 'support',
  'Withered Knight': 'frontline',
};
const roleDetails: Record<string, string> = {
  Mercenary: 'frontline space control',
  Sorcerer: 'burst damage and pressure',
  Blackarrow: 'safe ranged pressure',
  Shadowstrix: 'mobility and flank pressure',
  Seer: 'utility and squad support',
  'Withered Knight': 'durable frontline anchor',
};
const slugify = (name: string) => name.toLowerCase().replace(/\s+/g, '-');
const fromSlug = (name: string | null, fallback: string) => classNames.find((entry) => slugify(entry) === name) ?? fallback;

type RecordRow = { name: string; type?: string; rarity?: string; summary?: string; category?: string; label?: string };

function SquadBuilder() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initialMode = searchParams.get('mode') === 'trio' ? 'trio' : 'duo';
  const initialClasses = searchParams.get('classes')?.split(',') ?? [];
  const [mode, setMode] = useState<'duo' | 'trio'>(initialMode);
  const [primary, setPrimary] = useState(() => fromSlug(initialClasses[0] ?? null, 'Mercenary'));
  const [second, setSecond] = useState(() => fromSlug(initialClasses[1] ?? null, 'Sorcerer'));
  const [third, setThird] = useState(() => fromSlug(initialClasses[2] ?? null, 'Seer'));
  const [shareStatus, setShareStatus] = useState('');

  const selected = mode === 'trio' ? [primary, second, third] : [primary, second];
  const selectedKey = selected.map(slugify).join(',');
  const shareUrl = useMemo(() => {
    const params = new URLSearchParams({ mode, classes: selectedKey });
    if (typeof window === 'undefined') return `${pathname}?${params.toString()}`;
    return `${window.location.origin}${pathname}?${params.toString()}`;
  }, [mode, pathname, selectedKey]);

  useEffect(() => {
    const params = new URLSearchParams({ mode, classes: selectedKey });
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [mode, pathname, router, selectedKey]);

  const coverage = new Set(selected.map((entry) => roles[entry]));
  const missing = ['frontline', 'DPS', 'support'].filter((role) => !coverage.has(role));
  const duplicates = selected.filter((entry, index) => selected.indexOf(entry) !== index);
  const score = Math.max(42, 58 + coverage.size * 12 - duplicates.length * 8 + (mode === 'trio' ? 6 : 0));
  const recommendation = missing.length
    ? `Add ${missing[0] === 'support' ? 'Seer' : missing[0] === 'frontline' ? 'Mercenary or Withered Knight' : 'Sorcerer, Blackarrow, or Shadowstrix'} to cover ${missing[0]}.`
    : 'All three core roles are covered. Assign the frontline call, pressure angle, and reset decision before queueing.';

  async function copyShareUrl() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setShareStatus('Share URL copied. Reloading this link restores this squad.');
    } catch {
      setShareStatus(`Copy unavailable. Use this URL: ${shareUrl}`);
    }
  }

  return <div className="tool squad-tool" aria-label="Squad Builder interactive tool">
    <fieldset className="mode-toggle">
      <legend>Squad size</legend>
      <label><input type="radio" name="squad-mode" value="duo" checked={mode === 'duo'} onChange={() => setMode('duo')} /> Duo</label>
      <label><input type="radio" name="squad-mode" value="trio" checked={mode === 'trio'} onChange={() => setMode('trio')} /> Trio</label>
    </fieldset>
    <label htmlFor="primary">First class</label>
    <select id="primary" value={primary} onChange={(event) => setPrimary(event.target.value)}>{classNames.map((entry) => <option key={entry}>{entry}</option>)}</select>
    <label htmlFor="secondary">Second class</label>
    <select id="secondary" value={second} onChange={(event) => setSecond(event.target.value)}>{classNames.map((entry) => <option key={entry}>{entry}</option>)}</select>
    {mode === 'trio' && <><label htmlFor="third">Third class</label><select id="third" value={third} onChange={(event) => setThird(event.target.value)}>{classNames.map((entry) => <option key={entry}>{entry}</option>)}</select></>}
    <div className="result" aria-live="polite"><strong>{mode === 'trio' ? 'Trio' : 'Duo'} evaluation · {score}/100:</strong> {selected.join(' + ')} cover {Array.from(coverage).join(', ')}. {recommendation}</div>
    <button className="button secondary share-button" type="button" onClick={copyShareUrl}>Copy share URL</button>
    <p className="share-status" aria-live="polite">{shareStatus}</p>
  </div>;
}

export function ToolPanel({ tool }: { tool: string }) {
  const [value, setValue] = useState('Mercenary');
  const [second, setSecond] = useState('Sorcerer');
  const [query, setQuery] = useState('');
  const [done, setDone] = useState(false);
  const [records, setRecords] = useState<RecordRow[]>([]);

  useEffect(() => {
    const source = tool === 'map' ? '/data/map-pois.json' : '/data/items.json';
    if (['map', 'loot-finder', 'items'].includes(tool)) fetch(source).then((response) => response.json()).then(setRecords).catch(() => setRecords([]));
  }, [tool]);

  const output = useMemo(() => tool === 'class-quiz'
    ? `${value} is a sensible starting direction if you value ${roleDetails[value]}. Read the class guide before treating this as a final build.`
    : tool === 'settings'
      ? 'Start with a performance-first preset, then raise one visual setting at a time while checking consistency. Keep your preferred input and visibility settings stable.'
      : tool === 'loot-finder' || tool === 'items'
        ? `Local seed search: ${query || 'type an item name'} — use the database filters to compare rarity, listed sources and Last Verified notes.`
        : tool === 'map'
          ? `Showing ${value} planning mode: use POI filters to choose an extraction, then build your route backward from it.`
          : tool === 'matchups'
            ? `${value} versus ${second}: identify the range advantage, deny the opponent's preferred space, and keep an exit route before committing.`
            : tool === 'build-planner'
              ? `${value} draft: start with one reliable stance, match gear to your intended role, and keep two slots flexible for what you find.`
              : tool === 'checklist'
                ? (done ? 'Checklist saved locally for this session. Reset it before the next run.' : 'Check your kit, route, exit condition and squad plan before you extract.')
                : `Browse the local data for ${value}.`, [tool, value, second, query, done]);

  if (tool === 'squad-builder') return <Suspense fallback={<div className="tool">Loading Squad Builder…</div>}><SquadBuilder /></Suspense>;

  return <div className="tool" aria-label={`${tool} interactive tool`}>
    {tool === 'checklist' ? <><label><input type="checkbox" checked={done} onChange={(event) => setDone(event.target.checked)} style={{ width: 20, minHeight: 20, marginRight: 10 }} />I checked my route, kit and extraction condition.</label><button className="button primary" onClick={() => setDone(true)}>Save checklist state</button></> : <>
      {(tool === 'loot-finder' || tool === 'items') ? <><label htmlFor="query">Search the local seed database</label><input id="query" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try a weapon, gem, armor or consumable" /></> : <><label htmlFor="primary">Choose a primary class or map</label><select id="primary" value={value} onChange={(event) => setValue(event.target.value)}>{classNames.map((entry) => <option key={entry}>{entry}</option>)}</select>{tool === 'matchups' && <><label htmlFor="secondary">Compare against</label><select id="secondary" value={second} onChange={(event) => setSecond(event.target.value)}>{classNames.map((entry) => <option key={entry}>{entry}</option>)}</select></>}</>}
      <div className="result"><strong>Local-only result:</strong> {output}</div>{['map', 'loot-finder', 'items'].includes(tool) && <div className="table-wrap" style={{ marginTop: 14 }}><table><thead><tr><th>{tool === 'map' ? 'Point of interest' : 'Item'}</th><th>Type</th><th>Notes</th></tr></thead><tbody>{records.filter((record) => !query || record.name.toLowerCase().includes(query.toLowerCase())).slice(0, 8).map((record, index) => <tr key={`${record.name}-${index}`}><td>{record.name || record.label}</td><td>{record.type || record.category || 'POI'}</td><td>{record.summary || 'Local seed record — verify after patches.'}</td></tr>)}</tbody></table></div>}
    </>}
  </div>;
}
