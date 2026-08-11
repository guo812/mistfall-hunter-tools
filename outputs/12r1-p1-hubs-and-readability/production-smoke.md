# 12R1 P1 Hubs + Readability — Final Production Evidence

Production URL: https://mistfallhunter.co/
Worker Version: caca3901-9c9f-4791-a504-250f50b3b657
Branch: release/11r4-growth-p0
Commit: 3008e4b feat(seo+p1): 6 hubs + readability improvements

## Hub routes online (HTTP 200)
- /classes 200
- /builds 200
- /maps 200
- /bosses 200
- /guides 200
- /codes 200
- /codes/rewards 200

## Inner pages online (HTTP 200)
- /classes/mercenary 200
- /builds/mercenary 200
- /bosses/cursed-moonwane 200
- /maps/hallowgrove 200
- /guides/getting-started 200
- /tier-list 200
- /build-planner 200
- /map 200

## SEO signals
- sitemap URL count: 61
- sitemap excludes /privacy /terms /contact: 0 entries
- sitemap lastmod dynamic: <lastmod>2026-08-11T15:13:13.813Z</lastmod>
- /privacy meta robots: <meta name="robots" content="noindex, follow"/>
- /codes/rewards title: <title>Mistfall Hunter Codes &amp; Rewards — No Active Codes (Aug 2026)</title>

## Hub info-cards
- /classes 3 info-cards
- /builds 3 info-cards
- /maps 3 info-cards
- /bosses 3 info-cards
- /guides 3 info-cards
- /codes 3 info-cards

## Article visuals (portrait / phase-svg / route-svg / decision-svg)
- /classes/mercenary visual=1
- /builds/mercenary visual=1
- /bosses/cursed-moonwane visual=1
- /maps/hallowgrove visual=1
- /guides/getting-started visual=1

## Concurrency (n=20 rounds × 10 URLs = 200 requests)
- failures: 0
- all 200 (verified by curl loop)

## www subdomain (platform action required)
- http://www.mistfallhunter.co/  -> 520 (CF zone not bound to www)
- https://www.mistfallhunter.co/ -> 522 (same)
- middleware in middleware.ts already does www -> apex 308 once www is bound
- required owner action: add www as Custom Domain on the Worker (or as Route)
