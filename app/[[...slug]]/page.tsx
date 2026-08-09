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
const related = [['/guides/getting-started', 'Beginner Guide'], ['/class-quiz', 'Class Quiz'], ['/tier-list/solo', 'Solo Tier List'], ['/squad-builder', 'Squad Builder'], ['/map', 'Interactive Map'], ['/guides/extraction', 'Extraction Guide']];

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
  return { title, description, alternates: { canonical: path }, openGraph: { title, description, url: path } };
}

function Header() {
  return <><header className="shell nav"><details className="mobile-menu"><summary aria-label="Open site menu"><span aria-hidden="true">☰</span></summary><nav aria-label="Mobile menu"><Link href="/guides/tips">Guides</Link><Link href="/tier-list/solo">Tier List</Link><Link href="/classes/mercenary">Classes</Link><Link href="/builds/mercenary">Builds</Link><Link href="/about">About</Link></nav></details><Link className="brand" href="/">MISTFALL HUNTER TOOLS</Link><nav className="navlinks" aria-label="Main navigation"><Link href="/guides/tips">Guides</Link><Link href="/tier-list/solo">Tier List</Link><Link href="/classes/mercenary">Classes</Link><Link href="/class-quiz">Class Quiz</Link><Link href="/builds/mercenary">Builds</Link></nav><a className="button steam steam-top" href={steam} rel="noreferrer">Play on Steam</a></header><nav className="mobile-nav" aria-label="Mobile navigation"><Link href="/">Home</Link><Link href="/squad-builder">Tools</Link><Link href="/guides/tips">Guides</Link><Link href="/class-quiz">Quiz</Link><Link href="/about">More</Link></nav></>;
}

function Footer() {
  return <footer className="footer"><p>Unofficial fan resource. Not affiliated with Bellring Games or Skystone Games.</p><nav><Link href="/about">About</Link><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/contact">Contact</Link></nav><p>© 2026 Mistfall Hunter Tools. All game names and trademarks are property of their respective owners.</p></footer>;
}

function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json">{JSON.stringify(data)}</script>;
}

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
  return <>{copy.sections?.map((section) => <section key={section.h2}><h2>{section.h2}</h2>{section.paragraphs?.map((paragraph, index) => <p key={index}>{paragraph}</p>)}{section.bullets?.length ? <ul>{section.bullets.map((bullet, index) => <li key={index}>{bullet}</li>)}</ul> : null}{section.table ? <div className="table-wrap"><table><thead><tr>{section.table.headers?.map((header) => <th key={header}>{header}</th>)}</tr></thead><tbody>{section.table.rows?.map((row, index) => <tr key={index}>{row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}</tr>)}</tbody></table></div> : null}</section>)}</>;
}

function Faqs({ copy }: { copy: CopyRoute }) {
  return <section id="faq"><h2>Frequently asked questions</h2>{copy.faqs.map((faq) => <div key={faq.q}><h3>{faq.q}</h3><p>{faq.a}</p></div>)}</section>;
}

function Home({ copy }: { copy: CopyRoute }) {
  return <main className="shell"><section className="hero"><div><p className="eyebrow">Unofficial fan resource · Updated August 2026</p><h1>{copy.h1}</h1><p className="lede">{copy.directAnswer}</p><div className="cta-row"><Link className="button primary" href={copy.cta?.primary?.href || '/class-quiz'}>{copy.cta?.primary?.label || 'Take the Class Quiz'}</Link><a className="button steam" href={steam} rel="noreferrer">Play on Steam</a></div></div></section>{copy.quickStats ? <section className="grid four">{copy.quickStats.map(([number, label]) => <div className="card" key={label} style={{ textAlign: 'center' }}><strong style={{ fontSize: 30, color: 'var(--gold-primary)' }}>{number}</strong><p>{label}</p></div>)}</section> : null}{copy.journey ? <section><h2>Start here</h2><div className="grid three">{copy.journey.map((step) => <Link className="card" href={step.href} key={step.href}><span className="label">Step {step.step}</span><h3>{step.title}</h3><p>{step.desc}</p></Link>)}</div></section> : null}{copy.toolCards ? <section><h2>Tools</h2><div className="grid three">{copy.toolCards.map((tool) => <Link className="card" href={tool.href} key={tool.href}><h3>{tool.title}</h3><p>{tool.desc}</p></Link>)}</div></section> : null}<CopySections copy={copy} /><Faqs copy={copy} /></main>;
}

function SsrData({ path }: { path: string }) {
  if (path === '/items' || path === '/loot-finder') return <section><h2>Browse the 48-item seed database</h2><p>This server-rendered reference list is available before interactive filters load. Check each entry&apos;s community status and Last Verified date before relying on it after a patch.</p><div className="table-wrap"><table><thead><tr><th>Item</th><th>Type</th><th>Rarity</th><th>Acquisition</th></tr></thead><tbody>{(items as Item[]).map((item) => <tr key={item.name}><td>{item.name}</td><td>{item.type}</td><td>{item.rarity}</td><td>{item.acquisition[0]?.label || 'Local seed record'}</td></tr>)}</tbody></table></div></section>;
  if (path === '/map') return <section><h2>Server-readable points of interest</h2><p>The interactive map uses the same local seed data shown below. Plan an exit route before committing to a boss or loot marker.</p><ul>{(pois as Poi[]).map((poi) => <li key={`${poi.map}-${poi.name}`}><strong>{poi.name}</strong> — {poi.map}, {poi.category}: {poi.description}</li>)}</ul></section>;
  return null;
}

function Article({ route, copy }: { route: RouteInfo; copy: CopyRoute }) {
  const isTool = toolPaths.has(route.path);
  return <main className="shell"><article className="article"><p className="label">{isTool ? 'Free to use' : 'Guide'} · {copy.trustLabel} · Last Verified {copy.lastVerified}</p><h1>{copy.h1}</h1><p className="direct-answer">{copy.directAnswer}</p>{isTool ? <ToolPanel tool={route.path.slice(1)} /> : null}<CopySections copy={copy} /><SsrData path={route.path} /><Faqs copy={copy} />{copy.related?.length ? <section><h2>Related reading</h2><ul>{copy.related.map((entry) => <li key={entry.href}><Link href={entry.href}>{entry.label}</Link></li>)}</ul></section> : null}</article></main>;
}

function Trust({ route }: { route: RouteInfo }) {
  const trust = trustPages[route.path];
  if (!trust) return null;
  const blocks = trust.body.split('\n\n').slice(1);
  return <main className="shell"><article className="article"><h1>{trust.h1}</h1>{blocks.map((block, index) => {
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
  const copy = copyByPath[path];
  return <><Header/><Schema route={route} frozen={copy}/>{route.kind === 'home' && copy ? <Home copy={copy} /> : route.kind === 'trust' ? <Trust route={route} /> : copy ? <Article route={route} copy={copy} /> : null}<div className="shell"><Footer/></div></>;
}
