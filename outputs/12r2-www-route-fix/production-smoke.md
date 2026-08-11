# 12R2 www Route fix — production evidence

## Worker
- name: mistfall-hunter-tools
- version: 77ed7742-1149-4406-b006-11c6f53c43e9
- routes (from wrangler deploy output):
  - www.mistfallhunter.co/*   (zone mistfallhunter.co)
  - mistfallhunter.co/*      (zone mistfallhunter.co)

## wrangler.jsonc (key block)
  "routes": [
    { "pattern": "www.mistfallhunter.co/*", "zone_name": "mistfallhunter.co" },
    { "pattern": "mistfallhunter.co/*", "zone_name": "mistfallhunter.co" }
  ]

## Apex (https)
- https://mistfallhunter.co/ 200
- https://mistfallhunter.co/classes 200
- https://mistfallhunter.co/builds 200
- https://mistfallhunter.co/maps 200
- https://mistfallhunter.co/bosses 200
- https://mistfallhunter.co/guides 200
- https://mistfallhunter.co/codes 200
- https://mistfallhunter.co/classes/mercenary 200
- https://mistfallhunter.co/bosses/cursed-moonwane 200
- https://mistfallhunter.co/maps/hallowgrove 200
- https://mistfallhunter.co/guides/getting-started 200

## www (https)
- https://www.mistfallhunter.co/ 308
- https://www.mistfallhunter.co/classes 308
- https://www.mistfallhunter.co/builds 308
- https://www.mistfallhunter.co/maps 308
- https://www.mistfallhunter.co/bosses 308
- https://www.mistfallhunter.co/guides 308
- https://www.mistfallhunter.co/codes 308
- https://www.mistfallhunter.co/classes/mercenary 308
- https://www.mistfallhunter.co/bosses/cursed-moonwane 308
- https://www.mistfallhunter.co/maps/hallowgrove 308
- https://www.mistfallhunter.co/guides/getting-started 308

## www (http)
- http://www.mistfallhunter.co/ 308
- http://www.mistfallhunter.co/classes 308
- http://www.mistfallhunter.co/builds 308
- http://www.mistfallhunter.co/maps 308
- http://www.mistfallhunter.co/bosses 308
- http://www.mistfallhunter.co/guides 308
- http://www.mistfallhunter.co/codes 308
- http://www.mistfallhunter.co/classes/mercenary 308
- http://www.mistfallhunter.co/bosses/cursed-moonwane 308
- http://www.mistfallhunter.co/maps/hallowgrove 308
- http://www.mistfallhunter.co/guides/getting-started 308

## Query preservation
- http://www.mistfallhunter.co/classes?origin=12r2 -> 308 to https://mistfallhunter.co/classes?origin=12r2
- https://www.mistfallhunter.co/bosses/cursed-moonwane?origin=12r2 -> 308 to https://mistfallhunter.co/bosses/cursed-moonwane?origin=12r2

## Concurrency
- n=20 rounds x 10 urls = 200 requests, 0 failures (all 308 or 200)

## Security reminder (DO NOT REPEAT)
- The CF API token was sent in chat one time (user-issued). Recommend rotating at https://dash.cloudflare.com/profile/api-tokens and re-saving only to .secrets/.env (chmod 600).
- Local .secrets/.env is in workspace root; not committed (already in .gitignore candidate via path); worker reads routes from wrangler.jsonc, not env.
