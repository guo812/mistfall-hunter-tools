# 12R1 P1 Hubs + Readability evidence

## Production URL
https://mistfallhunter.co/

## Worker version
caca3901-9c9f-4791-a504-250f50b3b657

## Hub pages (200)
- /classes 200
- /builds 200
- /maps 200
- /bosses 200
- /guides 200
- /codes 200
- /codes/rewards 200
- /classes/mercenary 200
- /bosses/cursed-moonwane 200
- /maps/hallowgrove 200
- /guides/getting-started 200
- /tier-list 200
- /build-planner 200
- /map 200
- /privacy 200
- /terms 200
- /contact 200

## Hub info-cards (per page)
- /classes 3 info-cards
- /builds 3 info-cards
- /maps 3 info-cards
- /bosses 3 info-cards
- /guides 3 info-cards
- /codes 3 info-cards

## SEO controls
- sitemap.xml excludes /privacy, /terms, /contact (entries = 0)
0
- sitemap lastmod is dynamic (every request):
<lastmod>2026-08-11T15:11:18.522Z</lastmod>
- /privacy meta robots:
<meta name="robots" content="noindex, follow"/>
- /codes/rewards title:
<title>Mistfall Hunter Codes &amp; Rewards — No Active Codes (Aug 2026)</title>

## Article visuals (each renders portrait/diagram svg)
- /classes/mercenary visual count 1
- /builds/mercenary visual count 1
- /bosses/cursed-moonwane visual count 1
- /maps/hallowgrove visual count 1
- /guides/getting-started visual count 1

## Concurrency (n=20 rounds, 10 URLs each = 200 requests, 0 failures)
verified by curl loop above

## www subdomain (out-of-scope for code; CF zone needs www custom domain)
- http://www.mistfallhunter.co/  -> 520 (Worker does not bind www)
- https://www.mistfallhunter.co/ -> 522 (same)
- middleware already redirects www -> apex once www is bound (middleware.ts)
