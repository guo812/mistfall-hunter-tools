export type RouteInfo = { path: string; h1: string; answer: string; kind: 'tool'|'content'|'trust'|'home'; title?: string };
const classes = ['mercenary','sorcerer','blackarrow','shadowstrix','seer','withered-knight'] as const;
const pretty = (v: string) => v.split('-').map(x=>x[0].toUpperCase()+x.slice(1)).join(' ');
export const routes: RouteInfo[] = [
  {path:'/',kind:'home',h1:'Mistfall Hunter Tools, Builds & Tier List',answer:'Free Mistfall Hunter decision tools and 48 guides — quiz, tier list, squad builder, loot finder and settings — so you can pick, build, squad up and extract smarter.',title:'Mistfall Hunter Tools, Builds & Tier List (Updated Aug 2026)'},
  {path:'/class-quiz',kind:'tool',h1:'Mistfall Hunter Class Quiz — Find Your Best Class',answer:'Answer five questions about how you play and get a class direction with reasoning and a build link.'},
  {path:'/settings',kind:'tool',h1:'Mistfall Hunter Best Settings & FPS Guide',answer:'Pick your platform and hardware to get a recommended graphics and FPS setup, based on community-tested starting points.'},
  {path:'/tier-list',kind:'tool',h1:'Mistfall Hunter Tier List',answer:'Compare all six classes across Solo, Trio, Duo and Beginner modes with trust labels and last-verified dates.'},
  {path:'/loot-finder',kind:'tool',h1:'Mistfall Hunter Loot Finder',answer:'Search any item to see its listed acquisition paths, including boss drops, chests, vendors and crafting.'},
  {path:'/items',kind:'tool',h1:'Mistfall Hunter Items Database',answer:'Browse weapons, armor, gems and consumables with seed stats, rarity and listed acquisition notes.'},
  {path:'/checklist',kind:'tool',h1:'Mistfall Hunter Extraction Checklist',answer:'Tick off your pre-extract objectives and keep a local checklist for more deliberate runs.'},
  {path:'/build-planner',kind:'tool',h1:'Mistfall Hunter Build Planner',answer:'Plan a build by selecting a class, stance direction and gear priorities before you queue.'},
  {path:'/squad-builder',kind:'tool',h1:'Mistfall Hunter Squad Comp Builder',answer:'Pick three classes or two for Duo, then review role coverage, gaps and a practical next step.'},
  {path:'/matchups',kind:'tool',h1:'Mistfall Hunter PvP Matchup Matrix',answer:'Select a matchup for a concise strategy frame in Solo and group play.'},
  {path:'/map',kind:'tool',h1:'Mistfall Hunter Interactive Map',answer:'Explore Hallowgrove and Brandrgarde with local POI markers for extracts, bosses and loot routes.'},
  ...classes.map(c=>({path:`/classes/${c}`,kind:'content' as const,h1:`Mistfall Hunter ${pretty(c)} Class Guide`,answer:`The ${pretty(c)} is a distinct Mistfall Hunter class. Use this guide to frame its strengths, role and practical first build direction.`})),
  ...classes.map(c=>({path:`/builds/${c}`,kind:'content' as const,h1:`Mistfall Hunter ${pretty(c)} Build Guide`,answer:`This ${pretty(c)} build guide organizes a durable starting loadout, stance priorities and extraction-minded decisions.`})),
  ...['solo','trio','duo','beginner'].map(m=>({path:`/tier-list/${m}`,kind:'content' as const,h1:`Mistfall Hunter ${pretty(m)} Tier List`,answer:`This ${m} tier list ranks all six classes by practical extraction reliability, role coverage and room for adjustment.`})),
  ...['hallowgrove','brandrgarde'].map(m=>({path:`/maps/${m}`,kind:'content' as const,h1:`Mistfall Hunter ${pretty(m)} Map Guide`,answer:`Use this ${pretty(m)} map guide to plan POIs, extraction choices, boss routes and safer loot movement.`})),
  ...['cursed-moonwane','salmar','einherjar'].map(b=>({path:`/bosses/${b}`,kind:'content' as const,h1:`Mistfall Hunter ${pretty(b)} Boss Guide`,answer:`Prepare for ${pretty(b)} with a simple phase plan, role assignments and a controlled exit route.`})),
  ...[
   ['getting-started','Mistfall Hunter Beginner Guide'],['first-extraction','Mistfall Hunter First Extraction Guide'],['extraction','How to Extract in Mistfall Hunter'],['tips','Mistfall Hunter Tips & Tricks'],['faq','Mistfall Hunter FAQ'],['dual-weapon-stances','Mistfall Hunter Dual Weapon Stances Guide'],['camp-upgrades','Mistfall Hunter Camp Upgrades Guide'],['scavenger-squads','Mistfall Hunter Scavenger Squads Guide'],['leveling','Mistfall Hunter Leveling Guide'],['keys-treasure','Mistfall Hunter Keys & Treasure Rooms'],['pvp-survival','Mistfall Hunter PvP Survival Guide'],['pc-settings','Mistfall Hunter Best PC Settings & FPS Fix'],['ps5-settings','Mistfall Hunter Best PS5 Settings'],['xbox-settings','Mistfall Hunter Best Xbox Settings'],['controller-vs-kbm','Mistfall Hunter Controller vs Keyboard & Mouse'],['auction-house','Mistfall Hunter Auction House Guide'],['gold-farming','Mistfall Hunter Gold Farming Guide'],['duo','Mistfall Hunter Duo Guide'],['solo-survival','Mistfall Hunter Solo Survival Guide']
  ].map(([s,h])=>({path:`/guides/${s}`,kind:'content' as const,h1:h,answer:`Get a practical ${h.replace('Mistfall Hunter ','')} plan: what to prepare, which decisions matter, and how to adapt after each run.`})),
  ...[['rewards','Mistfall Hunter Codes & Rewards'],['how-to-redeem','How to Redeem Mistfall Hunter Codes'],['twitch-drops','Mistfall Hunter Twitch Drops Guide']].map(([s,h])=>({path:`/codes/${s}`,kind:'content' as const,h1:h,answer:`Use this ${h.replace('Mistfall Hunter ','')} reference to check the current status, verify sources and avoid expired information.`})),
  {path:'/about',kind:'trust',h1:'About Us',answer:'Mistfall Hunter Tools is an unofficial fan resource with free decision tools and guides.'},
  {path:'/privacy',kind:'trust',h1:'Privacy Policy',answer:'How Mistfall Hunter Tools handles browser-local tool data, analytics and no-account access.'},
  {path:'/terms',kind:'trust',h1:'Terms of Service',answer:'Terms for using Mistfall Hunter Tools, an unofficial fan resource with information provided as-is.'},
  {path:'/contact',kind:'trust',h1:'Contact',answer:'Contact the Mistfall Hunter Tools team about corrections, data sources or takedown requests.'},
];
export const getRoute = (path:string) => routes.find(r=>r.path===path);
export const publicPaths = routes.map(r=>r.path);
