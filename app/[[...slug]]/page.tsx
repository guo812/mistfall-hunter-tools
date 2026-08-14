import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ToolPanel } from '@/components/tool-panel';
import { copyByPath, type CopyRoute } from '@/lib/copy';
import { classBuildCopyByPath, classBuildRoutes } from '@/lib/class-build-routes';
import { getRoute, publicPaths, type RouteInfo } from '@/lib/routes';
import { trustPages } from '@/lib/trust-pages';
import items from '@/public/data/items.json';

const siteUrl = 'https://mistfallhunter.co';
const steam = 'https://store.steampowered.com/app/3282300/Mistfall_Hunter/';
const toolPaths = new Set(['/class-quiz', '/settings', '/tier-list', '/loot-finder', '/items', '/checklist', '/build-planner', '/affix-optimizer', '/squad-builder', '/matchups', '/map', ...classBuildRoutes.map((route) => route.path)]);
const nonIndexable = new Set(['/privacy', '/terms', '/contact']);

type Item = { name: string; type: string; rarity: string; level: number; summary: string; acquisition: { label: string }[] };

export async function generateStaticParams() {
  return publicPaths.filter((path) => path !== '/').map((path) => ({ slug: path.slice(1).split('/') }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug?: string[] }> }): Promise<Metadata> {
  const { slug } = await params;
  const path = `/${slug?.join('/') ?? ''}`;
  const frozen = classBuildCopyByPath[path] || copyByPath[path];
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
    robots: nonIndexable.has(path) ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: { title, description, url: path, type: 'website', images: [{ url: socialImage, width: 1200, height: 630, alt: imageAlt }] },
    twitter: { card: 'summary_large_image', title, description, images: [{ url: socialImage, alt: imageAlt }] },
  };
}

function Header({ hideAffixLink = false }: { hideAffixLink?: boolean }) {
  return <><header className="shell nav">
    <details className="mobile-menu"><summary aria-label="Open site menu"><span aria-hidden="true">☰</span></summary><nav aria-label="Mobile menu"><Link href="/class-quiz">Find My Class</Link><Link href="/tier-list">Tier List</Link><Link href="/classes">Classes</Link><Link href="/builds">Builds</Link><Link href="/maps">Maps</Link><Link href="/bosses">Bosses</Link><Link href="/guides">Guides</Link><Link href="/codes">Codes</Link><Link href="/about">About</Link></nav></details>
    <Link className="brand" href="/">MISTFALL HUNTER TOOLS</Link>
    <nav className="navlinks" aria-label="Main navigation"><Link href="/class-quiz">Find My Class</Link><Link href="/tier-list">Tier List</Link><details className="nav-group"><summary>Tools</summary><div className="nav-popover"><Link href="/build-planner">Build Planner</Link>{!hideAffixLink ? <Link href="/affix-optimizer">Affix Optimizer</Link> : null}<Link href="/squad-builder">Squad Builder</Link><Link href="/loot-finder">Loot Finder</Link><Link href="/map">Interactive Map</Link></div></details><details className="nav-group"><summary>Hubs</summary><div className="nav-popover"><Link href="/classes">Classes Hub</Link><Link href="/builds">Builds Hub</Link><Link href="/maps">Maps Hub</Link><Link href="/bosses">Bosses Hub</Link><Link href="/guides">Guides Hub</Link><Link href="/codes">Codes Hub</Link></div></details></nav>
    <a className="button steam steam-top" href={steam} rel="noreferrer">Play on Steam</a>
  </header><nav className="mobile-nav" aria-label="Mobile navigation"><Link href="/">Home</Link><Link href="/class-quiz">Quiz</Link><Link href="/tier-list">Tier</Link><Link href="/guides">Guides</Link><Link href="/build-planner">Build</Link></nav></>;
}

function Footer() {
  return <footer className="footer"><p>Unofficial fan resource. Not affiliated with Bellring Games or Skystone Games.</p><nav><Link href="/about">About</Link><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/contact">Contact</Link></nav><p className="footer-stub">Verify in Affix Optimizer — planned for a future release.</p><p>© 2026 Mistfall Hunter Tools. All game names and trademarks are property of their respective owners.</p></footer>;
}

function JsonLd({ data }: { data: object }) { return <script type="application/ld+json">{JSON.stringify(data)}</script>; }

function Schema({ route, frozen }: { route: RouteInfo; frozen?: CopyRoute }) {
  const url = `${siteUrl}${route.path === '/' ? '' : route.path}`;
  const base = route.kind === 'home'
    ? { '@context': 'https://schema.org', '@type': 'WebSite', name: 'Mistfall Hunter Tools', url: siteUrl, potentialAction: { '@type': 'SearchAction', target: `${siteUrl}/items?q={search_term_string}`, 'query-input': 'required name=search_term_string' } }
    : route.kind === 'tool'
      ? { '@context': 'https://schema.org', '@type': 'WebApplication', name: route.h1, applicationCategory: 'GameApplication', operatingSystem: 'Web', isAccessibleForFree: true, dateModified: frozen?.lastVerified, author: { '@type': 'Organization', name: 'Mistfall Hunter Tools' }, offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }, url }
      : { '@context': 'https://schema.org', '@type': 'Article', headline: route.h1, mainEntityOfPage: url };
  const schemas: object[] = [base];
  if (frozen?.faqs?.length) schemas.push({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: frozen.faqs.map((faq) => ({ '@type': 'Question', name: faq.q, acceptedAnswer: { '@type': 'Answer', text: faq.a } })) });
  if (route.path.startsWith('/build-planner/')) schemas.push({ '@context': 'https://schema.org', '@type': 'HowTo', name: `How to use ${route.h1}`, step: ['Review the route-specific skills.', 'Choose compatible planner slots and priorities.', 'Save a browser-local draft or copy its share URL.'].map((text, position) => ({ '@type': 'HowToStep', position: position + 1, text })) });
  if (route.path === '/' || route.path === '/about') schemas.push({ '@context': 'https://schema.org', '@type': 'Organization', name: 'Mistfall Hunter Tools', url: siteUrl, description: 'An unofficial fan resource with free Mistfall Hunter decision tools and guides.' });
  if (route.path !== '/' && (route.kind === 'tool' || route.kind === 'content')) schemas.push({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl }, { '@type': 'ListItem', position: 2, name: route.h1, item: url }] });
  if (route.path === '/items') schemas.push({ '@context': 'https://schema.org', '@type': 'ItemList', name: 'Mistfall Hunter items', numberOfItems: items.length, itemListElement: (items as Item[]).map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.name, description: item.summary })) });
  if (route.path === '/tier-list') schemas.push({ '@context': 'https://schema.org', '@type': 'ItemList', name: 'Mistfall Hunter class tier list', itemListElement: ['Mercenary', 'Sorcerer', 'Blackarrow', 'Shadowstrix', 'Seer', 'Withered Knight'].map((name, index) => ({ '@type': 'ListItem', position: index + 1, name })) });
  return <>{schemas.map((schema, index) => <JsonLd key={index} data={schema} />)}</>;
}

function CopySections({ copy }: { copy: CopyRoute }) {
  return <>{copy.sections?.map((section) => {
    const [lead, ...detail] = section.paragraphs || [];
    const hasCards = Array.isArray(section.cards) && section.cards.length > 0;
    return <section className="content-section" key={section.h2}>
      <h2>{section.h2}</h2>
      {lead ? <p className="section-lead">{lead}</p> : null}
      {hasCards ? (
        <div className="info-cards">
          {section.cards!.map((card, idx) => (
            card.href
              ? <Link key={idx} className="info-card" href={card.href}><span className="info-label">{card.label}</span><strong>{card.value}</strong></Link>
              : <div key={idx} className="info-card"><span className="info-label">{card.label}</span><strong>{card.value}</strong></div>
          ))}
        </div>
      ) : null}
      {section.bullets?.length ? <ul className="key-points">{section.bullets.map((bullet, index) => <li key={index}>{bullet}</li>)}</ul> : null}
      {detail.length ? <details className="reading-detail"><summary>Read full tactical context</summary>{detail.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</details> : null}
      {section.table ? <div className="table-wrap"><table><thead><tr>{section.table.headers?.map((header) => <th key={header}>{header}</th>)}</tr></thead><tbody>{section.table.rows?.map((row, index) => <tr key={index}>{row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}</tr>)}</tbody></table></div> : null}
    </section>;
  })}</>;
}

function Faqs({ copy }: { copy: CopyRoute }) {
  return <section id="faq" className="faq-block"><h2>Frequently asked questions</h2><div className="faq-grid">{copy.faqs.map((faq) => <details className="faq-item" key={faq.q}><summary>{faq.q}</summary><p>{faq.a}</p></details>)}</div></section>;
}

function Hub({ copy }: { copy: CopyRoute }) {
  const hubCards: Record<string, { label: string; value: string; href: string }[]> = {
    '/classes': [{ label: 'Start', value: 'Take the Class Quiz', href: '/class-quiz' }, { label: 'Compare', value: 'Tier List Hub', href: '/tier-list' }, { label: 'Build', value: 'Build Planner', href: '/build-planner' }],
    '/builds': [{ label: 'Pick', value: 'Class Quiz', href: '/class-quiz' }, { label: 'Plan', value: 'Build Planner', href: '/build-planner' }, { label: 'Squad', value: 'Squad Builder', href: '/squad-builder' }],
    '/maps': [{ label: 'Plan', value: 'Interactive Map', href: '/map' }, { label: 'Pre-extract', value: 'Checklist', href: '/checklist' }, { label: 'Find loot', value: 'Loot Finder', href: '/loot-finder' }],
    '/bosses': [{ label: 'Squad', value: 'Squad Builder', href: '/squad-builder' }, { label: 'Trio ranks', value: 'Trio Tier List', href: '/tier-list/trio' }, { label: 'Find drops', value: 'Loot Finder', href: '/loot-finder' }],
    '/guides': [{ label: 'Start', value: 'Beginner Guide', href: '/guides/getting-started' }, { label: 'Plan', value: 'Checklist', href: '/checklist' }, { label: 'Pick', value: 'Class Quiz', href: '/class-quiz' }],
    '/codes': [{ label: 'Status', value: 'Codes & Rewards', href: '/codes/rewards' }, { label: 'Redeem', value: 'How to Redeem', href: '/codes/how-to-redeem' }, { label: 'Drops', value: 'Twitch Drops', href: '/codes/twitch-drops' }]
  };
  const cards = hubCards[copy.path] || [];
  return <main className="shell"><article className="article hub-page">
    <section className="article-intro"><div>
      <p className="label">Hub · {copy.trustLabel} · Last Verified {copy.lastVerified}</p>
      <h1>{copy.h1}</h1>
      <p className="direct-answer">{copy.directAnswer}</p>
      {cards.length ? (
        <div className="info-cards">
          {cards.map((card) => <Link key={card.label} className="info-card" href={card.href}><span className="info-label">{card.label}</span><strong>{card.value}</strong></Link>)}
        </div>
      ) : null}
      <div className="cta-row">
        {copy.cta?.primary ? <Link className="button primary" href={copy.cta.primary.href}>{copy.cta.primary.label}</Link> : null}
        <a className="button steam" href={steam} rel="noreferrer">Play on Steam</a>
      </div>
    </div></section>
    <CopySections copy={copy} />
    <Faqs copy={copy} />
    {copy.related?.length ? <section><h2>Next steps</h2><div className="related-grid">{copy.related.map((entry) => <Link className="related-card" href={entry.href} key={entry.href}><span>Next</span><strong>{entry.label}</strong><small>Open the matching page →</small></Link>)}</div></section> : null}
  </article></main>;
}

function Home({ copy }: { copy: CopyRoute }) {
  const hubs = [
    { href: '/class-quiz', title: 'Find Your Class', desc: 'Answer five questions and get a practical build direction.', tag: 'Decision path' },
    { href: '/tier-list', title: 'Compare the Meta', desc: 'Solo, Duo, Trio and Beginner class rankings.', tag: 'Reference' },
    { href: '/build-planner', title: 'Build Your Hunter', desc: 'Choose a class, specialization and a shareable loadout.', tag: 'Decision path' },
    { href: '/affix-optimizer', title: 'Validate Your Affixes', desc: 'Check whether a legal loadout can reach your affix goals.', tag: 'Decision path' },
    { href: '/map', title: 'Plan Your Exit', desc: 'POI layers and an extraction overlay to plan backward.', tag: 'Decision path' },
    { href: '/squad-builder', title: 'Build a Squad', desc: 'Trio and Duo comps with role coverage check.', tag: 'Decision path' },
    { href: '/loot-finder', title: 'Find Loot', desc: 'Search any item for every acquisition path.', tag: 'Reference' }
  ];
  return <main className="shell"><section className="hero"><div><p className="eyebrow">Unofficial fan resource · Updated August 2026</p><h1>{copy.h1}</h1><p className="lede">{copy.directAnswer}</p><div className="cta-row"><Link className="button primary" href="/class-quiz">Find My Class</Link><Link className="button secondary" href="/guides/getting-started">Browse Guides</Link><Link className="button primary" href="/build-planner">See 15 Class Builds</Link></div></div></section>
  <section><h2>Start with the decision you need to make</h2><div className="grid three hub-tiles">{hubs.map((hub) => <Link className="card intent-card" href={hub.href} key={hub.href}><span className="label">{hub.tag}</span><h3>{hub.title}</h3><p>{hub.desc}</p><small className="card-cta">Open →</small></Link>)}</div></section>
  <section className="week-section"><div><p className="label">This week</p><h2>Plan your route, then commit to it</h2><p>Pick the map, mark your exit on the Interactive Map, then run the Extraction Checklist before queueing. Squad dungeon routes work best when every player knows the plan.</p><Link className="button secondary" href="/guides/scavenger-squads">Read the squad guide</Link></div><img loading="lazy" src="/images/guide-squad-dungeon.png" alt="Original Mistfall Hunter Tools squad planning illustration" /></section>
  <section><h2>Browse by hub</h2><div className="grid three hub-tiles"><Link className="card" href="/classes"><h3>Classes</h3><p>Six class guides in one place — roles, stances, strengths.</p></Link><Link className="card" href="/builds"><h3>Builds</h3><p>Six class build guides with starters and tool links.</p></Link><Link className="card" href="/maps"><h3>Maps</h3><p>Hallowgrove, Brandrgarde and the Interactive Map tool.</p></Link><Link className="card" href="/bosses"><h3>Bosses</h3><p>Cursed Moonwane, Salmar and Einherjar guides.</p></Link><Link className="card" href="/guides"><h3>Guides</h3><p>19 guides covering beginner, PvP, Duo, settings and more.</p></Link><Link className="card" href="/codes"><h3>Codes &amp; Rewards</h3><p>No active codes for August 2026 — verified status.</p></Link></div></section>
  <CopySections copy={copy} />
  <Faqs copy={copy} />
  </main>;
}

function articleContext(route: RouteInfo) {
  if (route.path.startsWith('/classes/')) return { eyebrow: 'Class snapshot', title: 'Pick a role, then test a build direction', points: ['Role and range', 'Strongest queue context', 'First build path'], cta: { href: `/builds/${route.path.split('/').pop()}`, label: 'Open this class build' }, related: [{ href: '/tier-list', label: 'Compare the tier list' }, { href: '/squad-builder', label: 'Build a squad' }, { href: '/class-quiz', label: 'Retake the class quiz' }] };
  if (route.path.startsWith('/builds/')) return { eyebrow: 'Build snapshot', title: 'Use the guide as a starting loadout', points: ['Choose your class', 'Set a stance priority', 'Plan the extract'], cta: { href: '/build-planner', label: 'Open Build Planner' }, related: [{ href: '/tier-list', label: 'Check the tier context' }, { href: '/squad-builder', label: 'Build a squad' }, { href: '/map', label: 'Plan the route' }] };
  if (route.path.startsWith('/tier-list/')) return { eyebrow: 'Mode snapshot', title: 'Rankings help when they lead to a next action', points: ['Compare the class role', 'Choose a build direction', 'Plan the queue'], cta: { href: '/tier-list', label: 'Compare all modes' }, related: [{ href: '/class-quiz', label: 'Find your class' }, { href: '/build-planner', label: 'Plan a build' }, { href: '/squad-builder', label: 'Build a squad' }] };
  if (route.path.startsWith('/maps/') || route.path.includes('extraction')) return { eyebrow: 'Route snapshot', title: 'Make the exit plan before taking the fight', points: ['Choose an approach', 'Mark a fallback', 'Leave with the loot'], cta: { href: '/map', label: 'Open Interactive Map' }, related: [{ href: '/checklist', label: 'Use the extraction checklist' }, { href: '/loot-finder', label: 'Find loot sources' }, { href: '/guides/first-extraction', label: 'Read first extraction steps' }] };
  if (route.path.startsWith('/bosses/')) return { eyebrow: 'Boss snapshot', title: 'Read the phases before you commit to the fight', points: ['Phases and tells', 'Best class comp', 'Plan the exit'], cta: { href: '/squad-builder', label: 'Build a boss squad' }, related: [{ href: '/tier-list/trio', label: 'Trio tier list' }, { href: '/loot-finder', label: 'Loot finder' }, { href: '/maps', label: 'Map hub' }] };
  return { eyebrow: 'Quick plan', title: 'Turn this answer into the next decision', points: ['Use the short answer first', 'Open the matching decision tool', 'Expand only the context you need'], cta: { href: '/class-quiz', label: 'Find your class' }, related: [{ href: '/guides/getting-started', label: 'Start with the beginner guide' }, { href: '/tier-list', label: 'Compare the tier list' }, { href: '/map', label: 'Plan an extraction' }] };
}

function ArticleVisual({ route, title }: { route: RouteInfo; title: string }) {
  const slug = route.path.split('/').pop() || 'guide';
  if (route.path.startsWith('/classes/') || route.path.startsWith('/builds/')) {
    return <figure className="article-visual portrait"><img loading="lazy" src={`/images/class-${slug}.png`} alt={`${title} class reference illustration`} /><figcaption>Original Mistfall Hunter Tools class reference</figcaption></figure>;
  }
  if (route.path.startsWith('/bosses/')) {
    return <figure className="article-visual diagram" aria-label={`${title} quick-reference visual`}><svg viewBox="0 0 520 300" role="img" aria-label={`${title} phase path`}><defs><linearGradient id="article-gold" x1="0" x2="1"><stop stopColor="#d4a574"/><stop offset="1" stopColor="#f0c040"/></linearGradient></defs><rect x="40" y="60" width="120" height="56" rx="10" fill="#1d1d2a" stroke="#d4a574" strokeWidth="2"/><rect x="200" y="60" width="120" height="56" rx="10" fill="#1d1d2a" stroke="#f0c040" strokeWidth="2"/><rect x="360" y="60" width="120" height="56" rx="10" fill="#1d1d2a" stroke="#d4a574" strokeWidth="2"/><path d="M160 88 L200 88" stroke="#d4a574" strokeWidth="3"/><path d="M320 88 L360 88" stroke="#d4a574" strokeWidth="3"/><rect x="40" y="170" width="440" height="86" rx="10" fill="#141420" stroke="#2a2a3a"/><text x="60" y="200" fill="#d4a574" fontSize="16" fontWeight="700">Phase 1 · Learn the tells</text><text x="60" y="226" fill="#a9a4b2" fontSize="13" fontWeight="500">Watch, reposition, survive.</text><text x="280" y="200" fill="#f0c040" fontSize="16" fontWeight="700">Phase 2 · Hit the windows</text><text x="280" y="226" fill="#a9a4b2" fontSize="13" fontWeight="500">Cycle damage, protect the support.</text><text x="60" y="245" fill="#a9a4b2" fontSize="12" fontWeight="500">Plan the exit before the fight.</text></svg><figcaption>Phase 1 → Phase 2 → exit — the boss fight cycle.</figcaption></figure>;
  }
  if (route.path.startsWith('/maps/')) {
    return <figure className="article-visual diagram" aria-label={`${title} route visual`}><svg viewBox="0 0 520 300" role="img" aria-label={`${title} route map`}><defs><linearGradient id="article-gold" x1="0" x2="1"><stop stopColor="#d4a574"/><stop offset="1" stopColor="#f0c040"/></linearGradient></defs><rect width="520" height="300" fill="#0f1620"/><path d="M40 240 C 140 80 260 250 480 60" fill="none" stroke="url(#article-gold)" strokeWidth="6" strokeLinecap="round"/><circle cx="40" cy="240" r="14" fill="#3fb950"/><circle cx="180" cy="150" r="14" fill="#f0c040"/><circle cx="320" cy="190" r="14" fill="#58a6ff"/><circle cx="480" cy="60" r="14" fill="#d4a574"/><text x="40" y="270" textAnchor="middle" fill="#3fb950" fontSize="14" fontWeight="700">Drop in</text><text x="180" y="180" textAnchor="middle" fill="#f0c040" fontSize="14" fontWeight="700">Loot</text><text x="320" y="220" textAnchor="middle" fill="#58a6ff" fontSize="14" fontWeight="700">Boss</text><text x="480" y="90" textAnchor="middle" fill="#d4a574" fontSize="14" fontWeight="700">Extract</text></svg><figcaption>Drop → Loot → Boss → Extract, in that order.</figcaption></figure>;
  }
  return <figure className="article-visual diagram" aria-label={`${title} quick-reference visual`}><svg viewBox="0 0 520 300" role="img" aria-label={`${title} decision path`}><defs><linearGradient id="article-gold" x1="0" x2="1"><stop stopColor="#d4a574"/><stop offset="1" stopColor="#f0c040"/></linearGradient></defs><path d="M55 226 C150 75 254 270 454 72" fill="none" stroke="url(#article-gold)" strokeWidth="7" strokeLinecap="round"/><circle cx="55" cy="226" r="18" fill="#d4a574"/><circle cx="258" cy="171" r="18" fill="#f0c040"/><circle cx="454" cy="72" r="18" fill="#d4a574"/><text x="55" y="270" textAnchor="middle">Answer</text><text x="258" y="215" textAnchor="middle">Plan</text><text x="454" y="116" textAnchor="middle">Extract</text></svg><figcaption>Answer → Plan → Extract — the decision path on every guide.</figcaption></figure>;
}

function Article({ route, copy }: { route: RouteInfo; copy: CopyRoute }) {
  const isTool = toolPaths.has(route.path);
  const isClassBuildRoute = route.path.startsWith('/build-planner/');
  const context = articleContext(route);
  const related = copy.related?.slice(0, 3) || context.related;
  return <main className="shell"><article className="article">
    <section className="article-intro"><div>
      <p className="label">{isTool ? 'Free to use' : context.eyebrow} · {copy.trustLabel} · Last Verified {copy.lastVerified}</p>
      <h1>{copy.h1}</h1>
      <p className="direct-answer">{copy.directAnswer}</p>
      <div className="quick-meta">
        <div><span className="info-label">Decision</span><strong>{context.title}</strong></div>
        <div><span className="info-label">Snapshot</span><strong>{context.points.join(' · ')}</strong></div>
      </div>
      {route.path === '/guides/getting-started' ? <Link className="button primary early-tool-cta" href="/class-quiz">Take the 5-question Class Quiz</Link> : null}
    </div>{!isClassBuildRoute ? <ArticleVisual route={route} title={copy.h1} /> : null}</section>
    {!isTool ? <section className="quick-plan"><div><p className="label">{context.eyebrow}</p><h2>{context.title}</h2><ul>{context.points.map((point) => <li key={point}>{point}</li>)}</ul></div><Link className="button primary" href={context.cta.href}>{context.cta.label}</Link></section> : null}
    {isTool ? <ToolPanel tool={isClassBuildRoute ? 'build-planner' : route.path.slice(1)} initialClass={classBuildCopyByPath[route.path]?.initialClass} initialPath={classBuildCopyByPath[route.path]?.initialPath} hideAffixLink={isClassBuildRoute} /> : null}
    <CopySections copy={copy} />
    <Faqs copy={copy} />
    {related.length ? <section className="related-block"><h2>Choose your next step</h2><div className="related-grid">{related.map((entry) => <Link className="related-card" href={entry.href} key={entry.href}><span>Next tool or guide</span><strong>{entry.label}</strong><small>Open the relevant decision path →</small></Link>)}</div></section> : null}
  </article></main>;
}

function Trust({ route }: { route: RouteInfo }) {
  const trust = trustPages[route.path];
  if (!trust) return null;
  const blocks = trust.body.split('\n\n').slice(1);
  return <main className="shell"><article className="article"><section className="article-intro"><div><p className="label">Legal · Last updated 2026-08-10</p><h1>{trust.h1}</h1><p className="direct-answer">{trust.meta}</p></div></section>{blocks.map((block, index) => {
    const lines = block.split('\n');
    const [heading, ...content] = lines;
    const isSection = /^\d+\. /.test(heading) || ['Unofficial Fan Resource', 'Data Sources', 'Trust Labels', 'Contact', 'Use cases:'].includes(heading);
    const bullets = content.filter((line) => line.startsWith('- ')).map((line) => line.slice(2));
    const prose = (isSection ? content : lines).filter((line) => !line.startsWith('- ')).join(' ').trim();
    return <section key={`${heading}-${index}`}>{isSection ? <h2>{heading}</h2> : null}{prose ? <p>{prose}</p> : null}{bullets.length ? <ul>{bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul> : null}</section>;
  })}</article></main>;
}

export default async function Page({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params;
  const path = `/${slug?.join('/') ?? ''}`;
  const route = getRoute(path);
  if (!route) notFound();
  const copy = classBuildCopyByPath[path] || copyByPath[path];
  const isHub = path === '/classes' || path === '/builds' || path === '/maps' || path === '/bosses' || path === '/guides' || path === '/codes';
  return <><Header hideAffixLink={path.startsWith('/build-planner/')}/><Schema route={route} frozen={copy}/>{route.kind === 'home' && copy ? <Home copy={copy} /> : isHub && copy ? <Hub copy={copy} /> : route.kind === 'trust' ? <Trust route={route} /> : copy ? <Article route={route} copy={copy} /> : null}<div className="shell"><Footer/></div></>;
}
