#!/usr/bin/env python3
"""10R-B local static-output SEO audit; no network or deployment actions."""
import html
import json
import re
import urllib.request
from itertools import combinations
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
NEXT = ROOT / '.next/server/app'
COPY_ROOT = ROOT / 'outputs/05-copy-repair/routes'
SITE = 'https://mistfallhunter.co'
OUT_JSON = Path(__file__).with_name('10r-b-integration-audit.json')
OUT_MD = Path(__file__).with_name('10r-b-integration-audit.md')

def normalized(value: str) -> str:
    return re.sub(r'\s+', ' ', value).strip()

def text(markup: str) -> str:
    markup = re.sub(r'<(script|style)[^>]*>.*?</\1>', ' ', markup, flags=re.I | re.S)
    return normalized(html.unescape(re.sub(r'<[^>]+>', ' ', markup)))

def shingles(value: str, k: int = 5):
    words = re.findall(r"[a-z0-9']+", value.lower())
    return {tuple(words[i:i+k]) for i in range(max(0, len(words)-k+1))}

def jaccard(a, b):
    return len(a & b) / len(a | b) if a and b else 0.0

LOCAL_ORIGIN = 'http://127.0.0.1:3100'

def route_html(path: str) -> str:
    with urllib.request.urlopen(f'{LOCAL_ORIGIN}{path}', timeout=20) as response:
        return response.read().decode('utf-8')

def extract(markup: str, tag: str) -> str:
    match = re.search(fr'<{tag}[^>]*>(.*)</{tag}>', markup, flags=re.I | re.S)
    return match.group(1) if match else markup

def schema_types(markup: str):
    blocks = re.findall(r'<script type="application/ld\+json">(.*?)</script>', markup, flags=re.S)
    types = []
    for block in blocks:
        try:
            types.append(json.loads(html.unescape(block)).get('@type'))
        except (json.JSONDecodeError, AttributeError):
            types.append('PARSE_ERROR')
    return types

def editorial_fragments(page: dict) -> list[str]:
    parts = [page.get('h1', ''), page.get('directAnswer', '')]
    for section in page.get('sections', []):
        parts.append(section.get('h2', ''))
        parts.extend(section.get('paragraphs', []))
        parts.extend(section.get('bullets', []))
        table = section.get('table')
        if table:
            parts.extend(table.get('headers', []))
            for row in table.get('rows', []):
                parts.extend(row)
    for faq in page.get('faqs', []):
        parts.extend([faq.get('q', ''), faq.get('a', '')])
    return [part for part in parts if part]

def editorial_body(page: dict) -> str:
    return ' '.join(editorial_fragments(page))

copies = {}
for source in COPY_ROOT.rglob('*.json'):
    record = json.loads(source.read_text())
    copies[record['path']] = record
routes = []
rendered = {}
for path, frozen in sorted(copies.items()):
    markup = route_html(path)
    title = re.search(r'<title>(.*?)</title>', markup, flags=re.S)
    desc = re.search(r'<meta name="description" content="([^"]*)"', markup)
    canonical = re.search(r'<link rel="canonical" href="([^"]*)"', markup)
    types = schema_types(markup)
    content = extract(markup, 'main' if path == '/' else 'article')
    # Data listings prove SSR availability but are not part of the frozen editorial word-spec body.
    content = re.sub(r'<section><h2>(?:Browse the 48-item seed database|Server-readable points of interest)</h2>.*?</section>', ' ', content, flags=re.S)
    rendered[path] = text(content)
    words = len(re.findall(r"[A-Za-z0-9']+", editorial_body(frozen)))
    rendered_words = len(re.findall(r"[A-Za-z0-9']+", rendered[path]))
    expected_min, expected_max = (500, 800) if frozen['kind'] == 'tool' else (2000, 3000)
    word_ok = True if frozen['kind'] == 'home' else expected_min <= words <= expected_max
    routes.append({
        'path': path, 'kind': frozen['kind'], 'status': 200, 'words': words, 'rendered_words': rendered_words,
        'word_spec': 'home-exempt' if frozen['kind'] == 'home' else f'{expected_min}-{expected_max}',
        'word_ok': word_ok, 'faq_count': len(frozen['faqs']), 'faq_schema': 'FAQPage' in types,
        'title_exact': bool(title and html.unescape(title.group(1)) == frozen['title']),
        'meta_exact': bool(desc and html.unescape(desc.group(1)) == frozen['meta']),
        'direct_answer_exact': frozen['directAnswer'] in text(markup),
        'all_frozen_editorial_fragments_rendered': all(normalized(fragment) in text(markup) for fragment in editorial_fragments(frozen)),
        'canonical': canonical.group(1) if canonical else None,
        'canonical_ok': bool(canonical and canonical.group(1) == (SITE if path == '/' else SITE + path)),
        'schema_types': types,
    })

# Trust routes complete the 58-route sitemap and must retain canonical + Organization for /about.
trust = {}
for path in ['/about', '/privacy', '/terms', '/contact']:
    markup = route_html(path)
    canonical = re.search(r'<link rel="canonical" href="([^"]*)"', markup)
    types = schema_types(markup)
    trust[path] = {'canonical_ok': bool(canonical and canonical.group(1) == SITE + path), 'schema_types': types}

pairs = []
for left, right in combinations(sorted(rendered), 2):
    pairs.append((jaccard(shingles(rendered[left]), shingles(rendered[right])), left, right))
max_pair = max(pairs, default=(0.0, '', ''))
items_html = route_html('/items')
loot_html = route_html('/loot-finder')
map_html = route_html('/map')
summary = {
    'copy_routes': len(routes), 'sitemap_routes_expected': len(routes) + len(trust),
    'word_spec_pass': sum(route['word_ok'] for route in routes), 'word_spec_failures': [route['path'] for route in routes if not route['word_ok']],
    'faq_at_least_3_pass': sum(route['faq_count'] >= 3 for route in routes), 'faqpage_count': sum(route['faq_schema'] for route in routes),
    'frozen_title_exact_pass': sum(route['title_exact'] for route in routes), 'frozen_meta_exact_pass': sum(route['meta_exact'] for route in routes), 'frozen_direct_answer_exact_pass': sum(route['direct_answer_exact'] for route in routes),
    'frozen_editorial_fragments_exact_pass': sum(route['all_frozen_editorial_fragments_rendered'] for route in routes),
    'canonical_exact_pass': sum(route['canonical_ok'] for route in routes) + sum(route['canonical_ok'] for route in trust.values()),
    'organization_home': 'Organization' in next(route['schema_types'] for route in routes if route['path'] == '/'),
    'organization_about': 'Organization' in trust['/about']['schema_types'],
    'breadcrumb_count': sum('BreadcrumbList' in route['schema_types'] for route in routes),
    'itemlist_paths': [route['path'] for route in routes if 'ItemList' in route['schema_types']],
    'items_ssr_rows': items_html[items_html.index('Browse the 48-item seed database'):].count('<tr>') - 1,
    'loot_finder_ssr_rows': loot_html[loot_html.index('Browse the 48-item seed database'):].count('<tr>') - 1,
    'map_ssr_poi_names': sum(poi in map_html for poi in ['Extraction Gate 1', 'Boss Arena 2', 'Treasure Room 3', 'Crossroads 8']),
    'max_rendered_jaccard': round(max_pair[0], 4), 'max_rendered_jaccard_pair': [max_pair[1], max_pair[2]],
}
summary['pass'] = all([
    summary['copy_routes'] == 54, summary['sitemap_routes_expected'] == 58, summary['word_spec_pass'] == 54,
    summary['faq_at_least_3_pass'] == 54, summary['faqpage_count'] == 54,
    summary['frozen_title_exact_pass'] == 54, summary['frozen_meta_exact_pass'] == 54, summary['frozen_direct_answer_exact_pass'] == 54,
    summary['frozen_editorial_fragments_exact_pass'] == 54,
    summary['canonical_exact_pass'] == 58, summary['organization_home'], summary['organization_about'],
    summary['breadcrumb_count'] == 53, set(summary['itemlist_paths']) == {'/items', '/tier-list'},
    summary['items_ssr_rows'] == 48, summary['loot_finder_ssr_rows'] == 48, summary['map_ssr_poi_names'] == 4,
    summary['max_rendered_jaccard'] < 0.40,
])
report = {'audit': '10R-B local rendered Next production audit', 'source': LOCAL_ORIGIN, 'summary': summary, 'routes': routes, 'trust': trust}
OUT_JSON.write_text(json.dumps(report, indent=2))
lines = ['# 10R-B Frontend SEO Integration — Local Rendered Audit', '', f"- Result: **{'PASS' if summary['pass'] else 'FAIL'}**", '- Source: local production Next server at `127.0.0.1:3100`, started from `.next` generated by the fresh `npm run build` (local only).', '', '## Evidence summary', '```json', json.dumps(summary, indent=2), '```', '', '## Scope', '- Frozen A3 copy package rendered for 54 copy routes; the 4 trust routes complete sitemap coverage to 58.', '- No deployment, Git, DNS, Cloudflare, GSC/Bing, IndexNow, or public action was performed.']
OUT_MD.write_text('\n'.join(lines) + '\n')
print(json.dumps(summary, indent=2))
