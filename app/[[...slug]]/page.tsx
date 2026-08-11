import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ToolPanel } from '@/components/tool-panel';
import { copyByPath, type CopyRoute } from '@/lib/copy';
import { getRoute, publicPaths, type RouteInfo } from '@/lib/routes';
import { trustPages } from '@/lib/trust-pages';
import items from '@/public/data/items.json';
import pois from '@/public/data/map-pois.json';

const siteUrl = 'https://mistfallhunter.co';
const steam = 'https://store.steampowered.com/app/3282300/Mistfall_Hunter/';
const toolPaths = new Set(['/class-quiz', '/settings', '/tier-list', '/loot-finder', '/items', '/checklist', '/build-planner', '/squad-builder', '/matchups', '/map']);

type Item = { name: string; type: string; rarity: string; level: number; summary: string; acquisition: { label: string }[] };
type Poi = { name: string; map: string; category: string; description: string };

export async function generateStaticParams() {
  return publicPaths.filter((path) => path !== '/').map((path) => ({ slug: path.slice(1).split('/') }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug?: string[] }> }): Promise<Metadata> {
  const { slug } = await params;
  const path = `/${slug?.join('/') ?? ''}`;
  const frozen = copyByPath[path];
  const route = getRoute(path) || getRoute('/');
  const trust = trustPages[path];
  const title = frozen?.title || trust?.title || route?.title || route?.h1;
  const description = frozen?.meta || trust?.meta || route?.answer;
  const socialImage = `/images/og/${path === '/' ? 'home' : path.slice(1).replaceAll('/', '--')}.png`;
  const imageAlt = `${title} | Mistfall Hunter Tools`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, type: 'website', images: [{ url: socialImage, width: 1200, height: 630, alt: imageAlt }] },
    twitter: { card: 'summary_large_image', title, description, images: [{ url: socialImage, alt: imageAlt }] },
  };
}

function Header() {
  return <><header className="shell nav">
    <details className="mobile-menu"><summary aria-label="Open site menu"><span aria-hidden="true">☰</span></summary><nav aria-label="Mobile menu"><Link href="/class-quiz">Find My Class</Link><Link href="/tier-list">Tier List</Link><Link href="/build-planner">Build Planner</Link><Link href="/map">Interactive Map</Link><Link href="/guides/getting-started">Beginner Guide</Link></nav></details>
    <Link className="brand" href="/">MISTFALL HUNTER TOOLS</Link>
    <nav className="navlinks" aria-label="Main navigation"><Link href="/class-quiz">Find My Class</Link><Link href="/tier-list">Tier List</Link><details className="nav-group"><summary>Tools</summary><div className="nav-popover"><Link href="/build-planner">Build Planner</Link><Link href="/squad-builder">Squad Builder</Link><Link href="/loot-finder">Loot Finder</Link><Link href="/map">Interactive Map</Link></div></details><details className="nav-group"><summary>Guides</summary><div className="nav-popover"><Link href="/guides/getting-started">Beginner Guide</Link><Link href="/guides/extraction">Extraction</Link><Link href="/classes/mercenary">Classes</Link><Link href="/builds/mercenary">Builds</Link></div></details></nav>
    <a className="button steam steam-top" href={steam} rel="noreferrer">Play on Steam</a>
  </header><nav className="mobile-nav" aria-label="Mobile navigation"><Link href="/">Home</Link><Link href="/class-quiz">Quiz</Link><Link href="/tier-list">Tier</Link><Link href="/build-planner">Build</Link><Link href="/guides/getting-started">Start</Link></nav></>;
}

function Footer() {
  return <footer className="footer"><p>Unofficial fan resource. Not affiliated with Bellring Games or Skystone Games.</p><nav><Link href="/about">About</Link><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/contact">Contact</Link></nav><p>© 2026 Mistfall Hunter Tools. All game names and trademarks are property of their respective owners.</p></footer>;
}

function JsonLd({ data }: { data: object }) { return <script type="application/ld+json">{JSON.stringify(data)}</script>; }

function Schema({ route, frozen }: { route: RouteInfo; frozen?: CopyRoute }) {
  const url = `${siteUrl}${route.path === '/' ? '' : route.path}`;
  const base = route.kind === 'home'
    ? { '@context': 'https://schema.org', '@type': 'WebSite', name: 'Mistfall Hunter Tools', url: siteUrl, potentialAction: { '@type': 'SearchAction', target: `${siteUrl}/items?q={search_term_string}`, 'query-input': 'required name=search_term_string' } }
    : route.kind === 'tool'
      ? { '@context': 'https://schema.org', '@type': 'WebApplication', name: route.h1, applicationCategory: 'GameApplication', operatingSystem: 'Any', isAccessibleForFree: true, url }
      : { '@context': 'https://schema.org', '@type': 'Article', headline: route.h1, mainEntityOfPage: url };
  const schemas: object[] = [base];
  if (frozen?.faqs?.length) schemas.push({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: frozen.faqs.map((faq) => ({ '@type': 'Question', name: faq.q, acceptedAnswer: { '@type': 'Answer', text: faq.a } })) });
  if (route.path === '/' || route.path === '/about') schemas.push({ '@context': 'https://schema.org', '@type': 'Organization', name: 'Mistfall Hunter Tools', url: siteUrl, description: 'An unofficial fan resource with free Mistfall Hunter decision tools and guides.' });
  if (route.path !== '/' && (route.kind === 'tool' || route.kind === 'content')) schemas.push({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl }, { '@type': 'ListItem', position: 2, name: route.h1, item: url }] });
  if (route.path === '/items') schemas.push({ '@context': 'https://schema.org', '@type': 'ItemList', name: 'Mistfall Hunter items', numberOfItems: items.length, itemListElement: (items as Item[]).map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.name, description: item.summary })) });
  if (route.path === '/tier-list') schemas.push({ '@context': 'https://schema.org', '@type': 'ItemList', name: 'Mistfall Hunter class tier list', itemListElement: ['Mercenary', 'Sorcerer', 'Blackarrow', 'Shadowstrix', 'Seer', 'Withered Knight'].map((name, index) => ({ '@type': 'ListItem', position: index + 1, name })) });
  return <>{schemas.map((schema, index) => <JsonLd key={index} data={schema} />)}</>;
}

function CopySections({ copy }: { copy: CopyRoute }) {
  return <>{copy.sections?.map((section) => {
    const [lead, ...detail] = section.paragraphs || [];
    return <section className="content-section" key={section.h2}><h2>{section.h2}</h2>{lead ? <p className="section-lead">{lead}</p> : null}{section.bullets?.length ? <ul className="key-points">{section.bullets.map((bullet, index) => <li key={index}>{bullet}</li>)}</ul> : null}{detail.length ? <details className="reading-detail"><summary>Read tactical context</summary>{detail.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</details> : null}{section.table ? <div className="table-wrap"><table><thead><tr>{section.table.headers?.map((header) => <th key={header}>{header}</th>)}</tr></thead><tbody>{section.table.rows?.map((row, index) => <tr key={index}>{row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}</tr>)}</tbody></table></div> : null}</section>;
  })}</>;
}

function Faqs({ copy }: { copy: CopyRoute }) { return <section id="faq"><h2>Frequently asked questions</h2>{copy.faqs.map((faq) => <div className="faq-item" key={faq.q}><h3>{faq.q}</h3><p>{faq.a}</p></div>)}</section>; }

function Home({ copy }: { copy: CopyRoute }) {
  const hubs = [{ href: '/class-quiz', title: 'Find Your Class', desc: 'Answer five questions and get a practical build direction.' }, { href: '/tier-list', title: 'Compare the Meta', desc: 'Compare Solo, Duo, Trio and Beginner class rankings.' }, { href: '/build-planner', title: 'Build Your Hunter', desc: 'Choose a class, specialization and a shareable loadout.' }, { href: '/map', title: 'Plan Your Exit', desc: 'Use POI layers and an extraction overlay to plan backward.' }];
  return <main className="shell"><section className="hero"><div><p className="eyebrow">Unofficial fan resource · Updated August 2026</p><h1>{copy.h1}</h1><p className="lede">{copy.directAnswer}</p><div className="cta-row"><Link className="button primary" href="/class-quiz">Find My Class</Link><Link className="button secondary" href="/build-planner">Browse Tools</Link><a className="button steam" href={steam} rel="noreferrer">Play on Steam</a></div></div></section><section><h2>Start with the decision you need to make</h2><div className="grid four">{hubs.map((hub) => <Link className="card intent-card" href={hub.href} key={hub.href}><span className="label">Decision path</span><h3>{hub.title}</h3><p>{hub.desc}</p></Link>)}</div></section><section className="week-section"><div><p className="label">Community Report</p><h2>This Week in Mistfall Hunter</h2><p>Use the squad dungeon route, then adjust your extraction plan to the POI layers and your team&apos;s risk call.</p><Link className="button secondary" href="/guides/scavenger-squads">Read the squad guide</Link></div><img src="/images/guide-squad-dungeon.png" alt="Original Mistfall Hunter Tools squad-planning illustration" /></section><section><h2>What Hunters Are Asking</h2><div className="grid three"><Link className="card" href="/settings"><h3>What settings should I use?</h3><p>Generate a starting preset for PC, PS5 or Xbox.</p></Link><Link className="card" href="/checklist"><h3>Am I ready to extract?</h3><p>Work through a persistent pre-run checklist before queueing.</p></Link><Link className="card" href="/squad-builder"><h3>Which squad fits our plan?</h3><p>Build a Duo or Trio and check role coverage.</p></Link></div></section><CopySections copy={copy} /><Faqs copy={copy} /></main>;
}

function SsrData({ path }: { path: string }) {
  if (path === '/items' || path === '/loot-finder') return <section><h2>Browse the 48-item seed database</h2><p>This server-rendered reference list is available before interactive filters load. Check each entry&apos;s community status and Last Verified date before relying on it after a patch.</p><div className="table-wrap"><table><thead><tr><th>Item</th><th>Type</th><th>Rarity</th><th>Acquisition</th></tr></thead><tbody>{(items as Item[]).map((item) => <tr key={item.name}><td>{item.name}</td><td>{item.type}</td><td>{item.rarity}</td><td>{item.acquisition[0]?.label || 'Local seed record'}</td></tr>)}</tbody></table></div></section>;
  if (path === '/map') return <section><h2>Server-readable points of interest</h2><p>The interactive map uses the same local seed data shown below. Plan an exit route before committing to a boss or loot marker.</p><ul>{(pois as Poi[]).map((poi) => <li key={`${poi.map}-${poi.name}`}><strong>{poi.name}</strong> — {poi.map}, {poi.category}: {poi.description}</li>)}</ul></section>;
  return null;
}

function articleContext(route: RouteInfo) {
  if (route.path.startsWith('/classes/')) return { eyebrow: 'Class snapshot', title: 'Pick a role, then test a build direction', points: ['Role and range', 'Strongest queue context', 'First build path'], cta: { href: `/builds/${route.path.split('/').pop()}`, label: 'Open this class build' }, related: [{ href: '/tier-list', label: 'Compare the tier list' }, { href: '/squad-builder', label: 'Build a squad' }, { href: '/class-quiz', label: 'Retake the class quiz' }] };
  if (route.path.startsWith('/builds/')) return { eyebrow: 'Build snapshot', title: 'Use the guide as a starting loadout', points: ['Choose your class', 'Set a stance priority', 'Plan the extract'], cta: { href: '/build-planner', label: 'Open Build Planner' }, related: [{ href: '/tier-list', label: 'Check the tier context' }, { href: '/squad-builder', label: 'Build a squad' }, { href: '/map', label: 'Plan the route' }] };
  if (route.path.startsWith('/tier-list/')) return { eyebrow: 'Mode snapshot', title: 'Rankings help when they lead to a next action', points: ['Compare the class role', 'Choose a build direction', 'Plan the queue'], cta: { href: '/tier-list', label: 'Compare all modes' }, related: [{ href: '/class-quiz', label: 'Find your class' }, { href: '/build-planner', label: 'Plan a build' }, { href: '/squad-builder', label: 'Build a squad' }] };
  if (route.path.startsWith('/maps/') || route.path.includes('extraction')) return { eyebrow: 'Route snapshot', title: 'Make the exit plan before taking the fight', points: ['Choose an approach', 'Mark a fallback', 'Leave with the loot'], cta: { href: '/map', label: 'Open Interactive Map' }, related: [{ href: '/checklist', label: 'Use the extraction checklist' }, { href: '/loot-finder', label: 'Find loot sources' }, { href: '/guides/first-extraction', label: 'Read first extraction steps' }] };
  return { eyebrow: 'Quick plan', title: 'Turn this answer into the next decision', points: ['Use the short answer first', 'Open the matching decision tool', 'Expand only the context you need'], cta: { href: '/class-quiz', label: 'Find your class' }, related: [{ href: '/guides/getting-started', label: 'Start with the beginner guide' }, { href: '/tier-list', label: 'Compare the tier list' }, { href: '/map', label: 'Plan an extraction' }] };
}

function ArticleVisual({ route, title }: { route: RouteInfo; title: string }) {
  const slug = route.path.split('/').pop() || 'guide';
  const portrait = (route.path.startsWith('/classes/') || route.path.startsWith('/builds/')) ? `/images/class-${slug}.png` : null;
  if (portrait) return <figure className="article-visual portrait"><img src={portrait} alt={`${title} class reference illustration`} /><figcaption>Original Mistfall Hunter Tools class reference</figcaption></figure>;
  return <figure className="article-visual diagram" aria-label={`${title} quick-reference visual`}><svg viewBox="0 0 520 300" role="img" aria-label={`${title} decision path`}><defs><linearGradient id="article-gold" x1="0" x2="1"><stop stopColor="#d4a574"/><stop offset="1" stopColor="#f0c040"/></linearGradient></defs><path d="M55 226 C150 75 254 270 454 72" fill="none" stroke="url(#article-gold)" strokeWidth="7" strokeLinecap="round"/><circle cx="55" cy="226" r="18" fill="#d4a574"/><circle cx="258" cy="171" r="18" fill="#f0c040"/><circle cx="454" cy="72" r="18" fill="#d4a574"/><text x="55" y="270" textAnchor="middle">Answer</text><text x="258" y="215" textAnchor="middle">Plan</text><text x="454" y="116" textAnchor="middle">Extract</text></svg><figcaption>Original quick-reference path · answer → plan → exit</figcaption></figure>;
}

function Article({ route, copy }: { route: RouteInfo; copy: CopyRoute }) {
  const isTool = toolPaths.has(route.path);
  const context = articleContext(route);
  const related = copy.related?.slice(0, 3) || context.related;
  return <main className="shell"><article className="article"><section className="article-intro"><div><p className="label">{isTool ? 'Free to use' : context.eyebrow} · {copy.trustLabel} · Last Verified {copy.lastVerified}</p><h1>{copy.h1}</h1><p className="direct-answer">{copy.directAnswer}</p>{route.path === '/guides/getting-started' ? <Link className="button primary early-tool-cta" href="/class-quiz">Take the 5-question Class Quiz</Link> : null}</div><ArticleVisual route={route} title={copy.h1} /></section>{!isTool ? <section className="quick-plan"><div><p className="label">{context.eyebrow}</p><h2>{context.title}</h2><ul>{context.points.map((point) => <li key={point}>{point}</li>)}</ul></div><Link className="button primary" href={context.cta.href}>{context.cta.label}</Link></section> : null}{isTool ? <ToolPanel tool={route.path.slice(1)} /> : null}<CopySections copy={copy} /><SsrData path={route.path} /><Faqs copy={copy} />{related.length ? <section><h2>Choose your next step</h2><div className="related-grid">{related.map((entry) => <Link className="related-card" href={entry.href} key={entry.href}><span>Next tool or guide</span><strong>{entry.label}</strong><small>Open the relevant decision path →</small></Link>)}</div></section> : null}</article></main>;
}

function Trust({ route }: { route: RouteInfo }) {
  const trust = trustPages[route.path];
  if (!trust) return null;
  const blocks = trust.body.split('\n\n').slice(1);
  return <main className="shell"><article className="article"><h1>{trust.h1}</h1>{blocks.map((block, index) => { const lines = block.split('\n'); const [heading, ...content] = lines; const isSection = /^\d+\. /.test(heading) || ['Unofficial Fan Resource', 'Data Sources', 'Trust Labels', 'Contact', 'Use cases:'].includes(heading); const bullets = content.filter((line) => line.startsWith('- ')).map((line) => line.slice(2)); const prose = (isSection ? content : lines).filter((line) => !line.startsWith('- ')).join(' ').trim(); return <section key={`${heading}-${index}`}>{isSection ? <h2>{heading}</h2> : null}{prose ? <p>{prose}</p> : null}{bullets.length ? <ul>{bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul> : null}</section>; })}</article></main>;
}

export default async function Page({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params;
  const path = `/${slug?.join('/') ?? ''}`;
  const route = getRoute(path);
  if (!route) notFound();
  const copy = copyByPath[path];
  return <><Header/><Schema route={route} frozen={copy}/>{route.kind === 'home' && copy ? <Home copy={copy} /> : route.kind === 'trust' ? <Trust route={route} /> : copy ? <Article route={route} copy={copy} /> : null}<div className="shell"><Footer/></div></>;
}
