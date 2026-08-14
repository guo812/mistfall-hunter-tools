'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { AffixOptimizer } from '@/components/affix-optimizer';
import { BuildPlannerPro } from '@/components/build-planner-pro';

type ClassInfo = { id: string; name: string; role: string; summary: string; stances: string[] };
type Poi = { id: string; map: string; name: string; category: string; x: number; y: number; description: string };
type Item = { id: string; slug: string; name: string; type: string; rarity: string; level: number; summary: string; stats: { power: number; defense: number; value: number }; acquisition: { kind: string; map: string; label: string; confidence: string }[]; lastVerified: string };

const classes: ClassInfo[] = [
  { id: 'mercenary', name: 'Mercenary', role: 'Frontline', summary: 'Durable melee pressure and space control.', stances: ['Assault', 'Guard'] },
  { id: 'sorcerer', name: 'Sorcerer', role: 'Burst', summary: 'Ranged spell pressure and explosive resets.', stances: ['Assault', 'Guard'] },
  { id: 'blackarrow', name: 'Blackarrow', role: 'Ranged', summary: 'Precision pressure from safe angles.', stances: ['Assault', 'Guard'] },
  { id: 'shadowstrix', name: 'Shadowstrix', role: 'Skirmisher', summary: 'Mobility, stealth and flank pressure.', stances: ['Assault', 'Guard'] },
  { id: 'seer', name: 'Seer', role: 'Support', summary: 'Utility, vision and squad sustain.', stances: ['Assault', 'Guard'] },
  { id: 'withered-knight', name: 'Withered Knight', role: 'Tank', summary: 'Durability and survival under pressure.', stances: ['Assault', 'Guard'] },
];
const nameFor = (id: string) => classes.find((entry) => entry.id === id)?.name ?? 'Mercenary';
const copyText = async (text: string) => { try { await navigator.clipboard.writeText(text); return true; } catch { return false; } };
const classImage = (id: string) => `/images/class-${id}.png`;

function BuildPlanner() {
  const [selected, setSelected] = useState('mercenary');
  const [stance, setStance] = useState('assault');
  const [talents, setTalents] = useState(['Pressure', 'Recovery']);
  const [weapon, setWeapon] = useState('Ironfang Blade');
  const [armor, setArmor] = useState('Hallowguard Cuirass');
  const [notice, setNotice] = useState('');
  const share = useMemo(() => typeof window === 'undefined' ? '' : `${window.location.origin}/build-planner?class=${selected}&spec=${stance}&loadout=${encodeURIComponent(`${talents.join(',')}|${weapon}|${armor}`)}`, [selected, stance, talents, weapon, armor]);
  useEffect(() => { const params = new URLSearchParams(window.location.search); const candidate = params.get('class'); if (candidate && classes.some((entry) => entry.id === candidate)) setSelected(candidate); if (params.get('spec')) setStance(params.get('spec')!); }, []);
  const toggleTalent = (talent: string) => setTalents((current) => current.includes(talent) ? current.filter((item) => item !== talent) : [...current, talent].slice(-3));
  const current = classes.find((entry) => entry.id === selected)!;
  return <div className="tool tool-rich planner" aria-label="Build planner interactive tool">
    <div className="class-picker" role="radiogroup" aria-label="Choose a class">{classes.map((entry) => <button type="button" className={entry.id === selected ? 'class-choice active' : 'class-choice'} onClick={() => setSelected(entry.id)} key={entry.id} aria-checked={entry.id === selected}><img src={classImage(entry.id)} alt="" /><span>{entry.name}</span></button>)}</div>
    <div className="tool-grid"><section><p className="label">{current.role} build</p><h2>{current.name} Loadout</h2><p>{current.summary}</p><label htmlFor="stance">Specialization</label><select id="stance" value={stance} onChange={(event) => setStance(event.target.value)}>{current.stances.map((item) => <option key={item} value={item.toLowerCase()}>{item}</option>)}</select>
      <h3>Talents / perks</h3><div className="chip-row">{['Pressure', 'Recovery', 'Mobility', 'Extraction'].map((talent) => <button key={talent} type="button" className={talents.includes(talent) ? 'chip active' : 'chip'} onClick={() => toggleTalent(talent)}>{talent}</button>)}</div></section>
      <section className="equipment-panel"><h3>Weapons</h3><select value={weapon} onChange={(event) => setWeapon(event.target.value)}><option>Ironfang Blade</option><option>Emberstaff</option><option>Ashen Longbow</option><option>Dusk Daggers</option></select><h3>Armor</h3><select value={armor} onChange={(event) => setArmor(event.target.value)}><option>Hallowguard Cuirass</option><option>Ranger&apos;s Mantle</option><option>Runebound Plate</option></select><p className="result"><strong>Build summary:</strong> {stance} {current.name} with {talents.join(', ')}, {weapon}, and {armor}.</p></section></div>
    <div className="action-row"><button type="button" className="button primary" onClick={async () => setNotice(await copyText(share) ? 'Share URL copied.' : `Copy this URL: ${share}`)}>Copy Share URL</button><span aria-live="polite">{notice}</span></div>
  </div>;
}

function SquadBuilder() {
  const [mode, setMode] = useState<'duo' | 'trio'>('duo');
  const [selected, setSelected] = useState<string[]>(['mercenary', 'seer']);
  const [notice, setNotice] = useState('');
  const requiredCount = mode === 'duo' ? 2 : 3;

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const nextMode = params.get('mode') === 'trio' ? 'trio' : 'duo';
    const ids = (params.get('classes') || '').split(',').filter((id) => classes.some((entry) => entry.id === id));
    setMode(nextMode);
    if (ids.length === (nextMode === 'trio' ? 3 : 2)) setSelected(ids);
  }, []);

  const chooseMode = (nextMode: 'duo' | 'trio') => {
    setMode(nextMode);
    setSelected((current) => nextMode === 'duo' ? current.slice(0, 2) : [...current, ...classes.map((entry) => entry.id).filter((id) => !current.includes(id))].slice(0, 3));
  };
  const toggleClass = (id: string) => setSelected((current) => {
    if (current.includes(id)) return current.length > 2 ? current.filter((entry) => entry !== id) : current;
    return current.length < requiredCount ? [...current, id] : [...current.slice(1), id];
  });
  const picks = selected.map((id) => classes.find((entry) => entry.id === id)!).filter(Boolean);
  const covered = Array.from(new Set(picks.map((entry) => entry.role)));
  const missing = ['Frontline', 'Burst', 'Support'].filter((role) => !covered.includes(role));
  const synergy = missing.length ? `Coverage is missing ${missing.join(' and ')}. Consider ${missing.includes('Support') ? 'Seer for utility and sustain' : missing.includes('Frontline') ? 'Mercenary or Withered Knight to hold space' : 'Sorcerer or Blackarrow for reliable pressure'}.` : 'The squad covers frontline, pressure, and support. Assign the engage call, damage angle, and reset decision before queueing.';
  const share = useMemo(() => typeof window === 'undefined' ? '' : `${window.location.origin}/squad-builder?${new URLSearchParams({ mode, classes: selected.join(',') }).toString()}`, [mode, selected]);
  const copyShare = async () => {
    window.history.replaceState(null, '', `/squad-builder?${new URLSearchParams({ mode, classes: selected.join(',') }).toString()}`);
    setNotice(await copyText(share) ? 'Share URL copied. Reload this link to restore the squad.' : `Copy this URL: ${share}`);
  };

  return <div className="tool tool-rich squad-tool" aria-label="Squad Builder interactive tool">
    <fieldset className="mode-toggle"><legend>Squad size</legend>{(['duo', 'trio'] as const).map((entry) => <label key={entry}><input type="radio" name="squad-mode" checked={mode === entry} onChange={() => chooseMode(entry)} /> {entry === 'duo' ? 'Duo' : 'Trio'}</label>)}</fieldset>
    <p className="label">Choose {requiredCount} classes</p><div className="class-picker squad-picker" role="group" aria-label={`Pick ${requiredCount} squad classes`}>{classes.map((entry) => <button key={entry.id} type="button" className={selected.includes(entry.id) ? 'class-choice active' : 'class-choice'} onClick={() => toggleClass(entry.id)} aria-pressed={selected.includes(entry.id)}><img src={classImage(entry.id)} alt="" /><span>{entry.name}</span><small>{entry.role}</small></button>)}</div>
    <div className="result" aria-live="polite"><strong>{mode === 'duo' ? 'Duo' : 'Trio'} coverage:</strong> {picks.map((entry) => entry.name).join(' + ')} cover {covered.join(', ')}.<p>{synergy}</p></div>
    <div className="action-row"><button type="button" className="button primary" onClick={copyShare}>Copy Share URL</button><span className="share-status" aria-live="polite">{notice}</span></div>
  </div>;
}

function ItemExplorer({ variant }: { variant: 'loot' | 'items' }) {
  const [records, setRecords] = useState<Item[]>([]);
  const [query, setQuery] = useState('');
  const [type, setType] = useState('all');
  const [rarity, setRarity] = useState('all');
  const [map, setMap] = useState('all');
  const [expanded, setExpanded] = useState<string | null>(null);
  useEffect(() => { fetch('/data/items.json').then((response) => response.json()).then((data: Item[]) => setRecords(data)).catch(() => setRecords([])); }, []);
  const maps = Array.from(new Set(records.flatMap((item) => item.acquisition.map((path) => path.map))));
  const filtered = records.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()) && (variant === 'loot' ? (map === 'all' || item.acquisition.some((path) => path.map === map)) : (type === 'all' || item.type === type) && (rarity === 'all' || item.rarity === rarity)));
  return <div className="tool tool-rich item-explorer" aria-label={variant === 'loot' ? 'Loot Finder interactive tool' : 'Items database interactive tool'}>
    <div className="filter-grid"><label>Item name<input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={variant === 'loot' ? 'Search e.g. Ironfang' : 'Search items'} /></label>{variant === 'loot' ? <label>Map (optional)<select value={map} onChange={(event) => setMap(event.target.value)}><option value="all">All maps</option>{maps.map((entry) => <option key={entry} value={entry}>{entry}</option>)}</select></label> : <><label>Category<select value={type} onChange={(event) => setType(event.target.value)}><option value="all">All categories</option>{['weapon', 'armor', 'gem', 'consumable'].map((entry) => <option key={entry} value={entry}>{entry}</option>)}</select></label><label>Rarity<select value={rarity} onChange={(event) => setRarity(event.target.value)}><option value="all">All rarities</option>{['common', 'uncommon', 'rare', 'epic', 'legendary'].map((entry) => <option key={entry} value={entry}>{entry}</option>)}</select></label></>}</div>
    <p className="filter-count" aria-live="polite">{filtered.length} of {records.length || 48} items shown</p><div className="table-wrap"><table><thead><tr><th>Item</th><th>Category</th><th>Rarity</th><th>{variant === 'loot' ? 'Acquisition path' : 'Details'}</th></tr></thead><tbody>{filtered.map((item) => <><tr key={item.id}><td><strong>{item.name}</strong><br /><small>{item.summary}</small></td><td>{item.type}</td><td>{item.rarity}</td><td>{variant === 'loot' ? item.acquisition.map((path) => <div key={`${item.id}-${path.label}`}>{path.label} · {path.kind}</div>) : <button type="button" className="detail-button" onClick={() => setExpanded(expanded === item.id ? null : item.id)} aria-expanded={expanded === item.id}>{expanded === item.id ? 'Hide details' : 'View details'}</button>}</td></tr>{variant === 'items' && expanded === item.id ? <tr className="detail-row" key={`${item.id}-detail`}><td colSpan={4}><strong>{item.name} stats</strong> — Power {item.stats.power}, Defense {item.stats.defense}, Value {item.stats.value}. Acquisition: {item.acquisition.map((path) => path.label).join('; ')}. Last verified {item.lastVerified}.</td></tr> : null}</>)}</tbody></table></div>{filtered.length === 0 ? <p className="empty-state">No seed items matched those filters. Clear a filter to return to all 48 records.</p> : null}
  </div>;
}

function MapTool() {
  const [pois, setPois] = useState<Poi[]>([]); const [layers, setLayers] = useState<string[]>(['extraction', 'boss', 'loot', 'poi']); const [scale, setScale] = useState(1); const [offset, setOffset] = useState({ x: 0, y: 0 }); const [drag, setDrag] = useState<{x:number;y:number}|null>(null); const [selected, setSelected] = useState<Poi | null>(null);
  useEffect(() => { fetch('/data/map-pois.json').then((response) => response.json()).then(setPois).catch(() => setPois([])); }, []);
  const visible = pois.filter((poi) => layers.includes(poi.category)); const toggle = (layer: string) => setLayers((current) => current.includes(layer) ? current.filter((item) => item !== layer) : [...current, layer]);
  return <div className="tool tool-rich map-tool"><div className="map-controls"><strong>Interactive route map</strong>{['extraction', 'boss', 'loot', 'poi'].map((layer) => <label key={layer}><input type="checkbox" checked={layers.includes(layer)} onChange={() => toggle(layer)} /> {layer}</label>)}<button type="button" onClick={() => setScale((value) => Math.min(1.7, value + .15))}>Zoom +</button><button type="button" onClick={() => setScale((value) => Math.max(.8, value - .15))}>Zoom −</button></div><div className="map-canvas" role="application" aria-label="Pan and zoom Mistfall Hunter POI map" onPointerDown={(event) => { event.currentTarget.setPointerCapture(event.pointerId); setDrag({ x: event.clientX, y: event.clientY }); }} onPointerMove={(event) => { if (drag) { setOffset((value) => ({ x: value.x + event.clientX - drag.x, y: value.y + event.clientY - drag.y })); setDrag({ x: event.clientX, y: event.clientY }); } }} onPointerUp={() => setDrag(null)}><canvas width="900" height="500" aria-hidden="true" /><div className="map-stage" style={{ transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})` }}><svg className="route-overlay" viewBox="0 0 100 100" preserveAspectRatio="none" aria-label="Extraction route"><polyline points="18,78 38,56 54,68 76,32" /></svg>{visible.map((poi) => <button key={poi.id} type="button" className={`marker ${poi.category}`} style={{ left: `${poi.x}%`, top: `${poi.y}%` }} onClick={() => setSelected(poi)} aria-label={`Open ${poi.name}`}>{poi.category[0].toUpperCase()}</button>)}</div></div><p className="map-caption">Drag to pan. Toggle layers, zoom, and select a marker. The gold route connects a loot approach to an extraction.</p>{selected ? <div className="result"><strong>{selected.name}</strong> · {selected.category}<br />{selected.description}</div> : null}</div>;
}

function Matchups() { const [from, setFrom] = useState('mercenary'); const [to, setTo] = useState('sorcerer'); return <div className="tool tool-rich"><p>Select a cell to open the matchup plan.</p><div className="matrix-wrap"><table className="matrix"><thead><tr><th>Vs</th>{classes.map((entry) => <th key={entry.id}>{entry.name.slice(0, 3)}</th>)}</tr></thead><tbody>{classes.map((attacker) => <tr key={attacker.id}><th>{attacker.name}</th>{classes.map((defender) => <td key={defender.id}><button type="button" className={from === attacker.id && to === defender.id ? 'matrix-cell active' : 'matrix-cell'} onClick={() => { setFrom(attacker.id); setTo(defender.id); }} aria-label={attacker.id === defender.id ? `Open ${attacker.name} mirror matchup plan` : `Open ${attacker.name} versus ${defender.name} matchup plan`}>{attacker.id === defender.id ? '—' : 'View'}</button></td>)}</tr>)}</tbody></table></div><div className="result"><strong>{nameFor(from)} vs {nameFor(to)}</strong><p>Take space where {nameFor(to)} is least comfortable, preserve your exit route, and force the trade on your preferred range. In group play, call the flank before committing.</p></div></div>; }

const questions = [['How do you want to start a fight?', 'Frontline pressure', 'Ranged burst', 'Flank and reset'], ['What matters most?', 'Durability', 'Damage windows', 'Squad utility'], ['Your usual queue?', 'Solo', 'Duo', 'Trio'], ['Which pace fits?', 'Deliberate', 'Fast', 'Adaptive'], ['Your recovery plan?', 'Hold ground', 'Create distance', 'Support teammates']];
function Quiz() { const [answers, setAnswers] = useState<string[]>([]); const [result, setResult] = useState<string | null>(null); const choose = (answer: string) => { const next = [...answers, answer]; setAnswers(next); if (next.length === questions.length) { const picks = next.join(' '); setResult(picks.includes('Squad') || picks.includes('Support') ? 'seer' : picks.includes('Ranged') || picks.includes('distance') ? 'blackarrow' : picks.includes('Flank') || picks.includes('Fast') ? 'shadowstrix' : 'mercenary'); } }; const index = answers.length; return <div className="tool tool-rich quiz">{result ? <div className="result"><p className="label">Your fit score · 88%</p><h2>{nameFor(result)}</h2><ul><li>Matches your preferred decision pace.</li><li>Supports the range and reset plan you selected.</li><li>Gives a clear first build direction.</li></ul><Link className="button primary" href={`/builds/${result}`}>View your build</Link><button type="button" className="button secondary" onClick={() => { setAnswers([]); setResult(null); }}>Retake quiz</button></div> : <><p className="label">Question {index + 1} of 5</p><div className="progress"><span style={{ width: `${(index / 5) * 100}%` }} /></div><h2>{questions[index][0]}</h2><div className="answer-list">{questions[index].slice(1).map((answer) => <button key={answer} type="button" onClick={() => choose(answer)}>{answer}</button>)}</div></>}</div>; }

function Settings() { const [platform, setPlatform] = useState('PC'); const [gpu, setGpu] = useState('Mid-range GPU'); const [resolution, setResolution] = useState('1080p'); const [fps, setFps] = useState('60'); const [output, setOutput] = useState(''); const make = () => setOutput(`${platform} · ${gpu} · ${resolution}: use a Performance preset, render scale 90%, ${fps} FPS cap, motion blur off, and test one visual setting at a time.`); return <div className="tool tool-rich"><div className="form-grid"><label>Platform<select value={platform} onChange={(event) => setPlatform(event.target.value)}><option>PC</option><option>PS5</option><option>Xbox</option></select></label>{platform === 'PC' && <label>GPU<select value={gpu} onChange={(event) => setGpu(event.target.value)}><option>Entry GPU</option><option>Mid-range GPU</option><option>High-end GPU</option></select></label>}<label>Resolution<select value={resolution} onChange={(event) => setResolution(event.target.value)}><option>1080p</option><option>1440p</option><option>4K</option></select></label><label>Target FPS<select value={fps} onChange={(event) => setFps(event.target.value)}><option>60</option><option>90</option><option>120</option></select></label></div><div className="action-row"><button type="button" className="button primary" onClick={make}>Generate preset</button><button type="button" className="button secondary" onClick={() => { setPlatform('PC'); setGpu('Mid-range GPU'); setResolution('1080p'); setFps('60'); setOutput(''); }}>Reset</button></div>{output && <div className="result"><strong>Community Report preset</strong><p>{output}</p><button type="button" className="button secondary" onClick={async () => { await copyText(`${window.location.href}?platform=${platform}&resolution=${resolution}&fps=${fps}`); }}>Copy settings URL</button></div>}</div>; }

function TierList() { const [mode, setMode] = useState('Solo'); const ordered = mode === 'Beginner' ? ['Mercenary', 'Seer', 'Blackarrow', 'Withered Knight', 'Sorcerer', 'Shadowstrix'] : mode === 'Trio' ? ['Seer', 'Mercenary', 'Sorcerer', 'Blackarrow', 'Withered Knight', 'Shadowstrix'] : classes.map((entry) => entry.name); return <div className="tool tool-rich"><div className="tabs" role="tablist">{['Solo', 'Trio', 'Duo', 'Beginner'].map((item) => <button role="tab" aria-selected={mode === item} type="button" key={item} onClick={() => setMode(item)}>{item}</button>)}</div><div className="rank-list">{ordered.map((name, index) => <div className="rank-card" key={name}><strong className={`tier tier-${index}`}>{index < 1 ? 'S' : index < 3 ? 'A' : 'B'}</strong><span><b>#{index + 1} {name}</b><small>Community Report · Last Verified Aug 8, 2026</small></span><p>Reliable {mode.toLowerCase()} plan with room to adapt.</p></div>)}</div></div>; }

const objectives = ['Choose a map and extraction', 'Set a primary route', 'Set a backup extraction', 'Check your weapon', 'Check armor durability', 'Pack healing', 'Pack a mobility option', 'Choose a loot priority', 'Choose a boss threshold', 'Check squad roles', 'Share the route', 'Set a retreat call', 'Set a stop-loss', 'Review settings', 'Check inventory space', 'Confirm the first objective', 'Confirm the final extraction', 'Queue when ready'];
function Checklist() { const [checked, setChecked] = useState<string[]>([]); useEffect(() => { try { setChecked(JSON.parse(localStorage.getItem('mistfall-checklist') || '[]')); } catch {} }, []); const toggle = (item: string) => setChecked((current) => { const next = current.includes(item) ? current.filter((entry) => entry !== item) : [...current, item]; localStorage.setItem('mistfall-checklist', JSON.stringify(next)); return next; }); const pct = Math.round((checked.length / objectives.length) * 100); return <div className="tool tool-rich"><div className="check-progress"><span style={{ width: `${pct}%` }} /></div><p><strong>{checked.length}/{objectives.length}</strong> objectives complete · {pct}%</p><div className="check-grid">{objectives.map((item) => <label key={item}><input type="checkbox" checked={checked.includes(item)} onChange={() => toggle(item)} /> {item}</label>)}</div><div className="action-row"><button type="button" className="button secondary" onClick={() => { localStorage.removeItem('mistfall-checklist'); setChecked([]); }}>Reset checklist</button>{pct === 100 ? <strong className="ready">Ready to extract — all objectives complete.</strong> : null}</div></div>; }

export function ToolPanel({ tool, initialClass, initialPath, hideAffixLink = false }: { tool: string; initialClass?: string; initialPath?: string; hideAffixLink?: boolean }) { if (tool === 'build-planner') return <BuildPlannerPro initialClass={initialClass} initialPath={initialPath} hideAffixLink={hideAffixLink} />; if (tool === 'affix-optimizer') return <AffixOptimizer />; if (tool === 'squad-builder') return <SquadBuilder />; if (tool === 'loot-finder') return <ItemExplorer variant="loot" />; if (tool === 'items') return <ItemExplorer variant="items" />; if (tool === 'map') return <MapTool />; if (tool === 'matchups') return <Matchups />; if (tool === 'class-quiz') return <Quiz />; if (tool === 'settings') return <Settings />; if (tool === 'tier-list') return <TierList />; if (tool === 'checklist') return <Checklist />; return null; }
