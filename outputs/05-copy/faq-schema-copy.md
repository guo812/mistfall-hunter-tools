# FAQ / Schema Copy — mistfall-hunter（05-copy 配套）

> 阶段 Stage: 05-copy（FAQ & schema 文案冻结）
> 日期 Date: 2026-08-08
> 作者 Author: content
> 用途: 每页 3-5 条 FAQ（FAQPage JSON-LD 可序列化）；答案首句直答；所有数据依赖项标 [DATA-PENDING: 08]；信任标签与 Last Verified 必须与页面一致。
> 范围: 54 页（首页 + 10 工具 + 43 内容页）；Trust 4 页无 FAQ schema（04 定稿）。
> 实现约束: JSON-LD 静态 SSR 输出，不得客户端后注入；ID 稳定（如 https://mistfallhunter.co/tier-list#faq）；答案不含竞品名、不含付费话术、不用 "Unlimited"。

---

## 1. 首页 /（3 条）

**Q: Is Mistfall Hunter free to play?**
A: Yes. Mistfall Hunter is a free-to-play PvPvE extraction ARPG by Bellring Games, published with Skystone Games, on PC, PS5 and Xbox. You can launch it directly from its Steam page. (Verified · Last Verified: 2026-08-08)

**Q: What tools does Mistfall Hunter Tools offer?**
A: We offer 10 free decision tools: a Class Quiz, Settings Recommender, Tier List, Loot Finder, Items Database, Extraction Checklist, Build Planner, Squad Comp Builder, PvP Matchup Matrix and an Interactive Map. All tools are free to use and need no account or sign-up.

**Q: Is this site affiliated with Bellring Games?**
A: No. Mistfall Hunter Tools is an unofficial fan resource and is not affiliated with, endorsed by, or sponsored by Bellring Games or Skystone Games. Game names and trademarks belong to their respective owners.

**Q: Do I need an account to use the tools?**
A: No. Every tool on this site works anonymously in your browser with no login. Tool progress such as checklist items and quiz results is stored only in your browser's local storage.

---

## 2. 工具页（10 × 4 条）

### /class-quiz
**Q: How does the Mistfall Hunter Class Quiz work?**
A: You answer 5 quick questions about your playstyle — weapon preference, solo or group play, difficulty preference and more — and the quiz calculates your best class locally in your browser. No data is uploaded.

**Q: Which classes can the quiz recommend?**
A: The quiz can recommend all 6 Mistfall Hunter classes: Mercenary, Sorcerer, Blackarrow, Shadowstrix, Seer and Withered Knight. Each recommendation includes a fit score and 2-3 reasons, plus a link to the matching build guide.

**Q: Is the quiz accurate?**
A: The quiz maps your answers against community-tested class profiles and is updated with the current meta as of its Last Verified date. It is a starting recommendation, not a guarantee — check the class guide for full strengths and weaknesses.

**Q: Do I need to sign up to take the quiz?**
A: No. The class quiz is free to use, anonymous and has no sign-up. You can retake it as many times as you like.

### /settings
**Q: What settings does the recommender cover?**
A: The Settings Recommender covers PC, PS5 and Xbox. On PC you enter your GPU and resolution plus a target frame rate; on consoles you pick a preset tier. Output includes graphics options, rendering scale, FPS cap and V-sync advice.

**Q: Are these settings verified?**
A: Settings are based on community reports and testing, labeled Community Report with a Last Verified date. They are a solid starting point — adjust in-game to what feels best on your hardware.

**Q: What if my GPU isn't recognized?**
A: If your GPU is not in the database, the tool falls back to the closest performance tier and recommends mid-range settings so you still get a usable baseline.

**Q: Will these settings increase my FPS?**
A: The recommended settings target stable frame rates for your hardware class and often improve FPS over defaults. For the full PC optimization guide with stutter fixes, see the Best PC Settings guide.

### /tier-list
**Q: What is the Mistfall Hunter tier list?**
A: It ranks all 6 classes from S to D across four modes: Solo, Trio, Duo and Beginner. S is the strongest in that mode, D the weakest. Each ranking shows trust labels and a last-verified date.

**Q: How often is the tier list updated?**
A: The tier list is re-verified after major patches and marked Needs Update if a patch changes the meta before re-verification. Check the Last Verified date at the top of the page.

**Q: Why is the Duo tier list exclusive to this site?**
A: Duo has no official matchmaking in Mistfall Hunter, and most other sites only cover Solo and Trio. We built a dedicated Duo ranking from community reports so two-player teams have a reference.

**Q: Which class is the best in Mistfall Hunter?**
A: There is no single best class — it depends on mode and playstyle. Use the Solo, Trio, Duo or Beginner tier list for your mode, then take the Class Quiz for a personal recommendation.

### /loot-finder
**Q: What can I search in the Loot Finder?**
A: You can search weapons, armor, gems and consumables by name or partial keyword. Results show every acquisition path we track: boss drops, chests, NPC vendors and crafting recipes.

**Q: Where does the drop data come from?**
A: Drop data is compiled from official public sources and community reports, each entry labeled with a trust label and Last Verified date. Sources are linked where available.

**Q: What if my item has no result?**
A: The V1 database covers a high-frequency subset and more items are added continuously. If you don't see a result, try a shorter keyword or one of the popular item chips.

**Q: Is the Loot Finder free?**
A: Yes. The Loot Finder is free to use with no account needed. Item data is read from our database and shown instantly.

### /items
**Q: What is in the Mistfall Hunter Items Database?**
A: The database lists weapons, armor, gems and consumables with stats, rarity, type and drop sources. You can filter by type and rarity and open any item for full details.

**Q: Is this the complete item list?**
A: V1 ships a high-frequency subset of the most-searched items, and the database grows over time. Rarity and drop-source fields are marked with Last Verified dates.

**Q: Can I compare items side by side?**
A: Not in V1. Each item page shows stats and drop sources; a comparison tool is on the roadmap. For drop paths, use the Loot Finder.

**Q: Do I need an account to browse items?**
A: No. The items database is free to use, anonymous and requires no sign-up.

### /checklist
**Q: What does the Extraction Checklist include?**
A: It groups 15-20 pre-extract objectives: loadout checks, supplies, extraction point confirmation, loot rules and more, so you don't lose a run to a careless miss.

**Q: Is my checklist progress saved?**
A: Yes. Progress is saved automatically in your browser's local storage, so it survives refreshes. If local storage is unavailable (private mode), the checklist still works for the session but won't persist.

**Q: Can I reset the checklist?**
A: Yes. A reset button clears all checks and returns the progress bar to 0%. When you complete 100% of the checklist, the tool confirms you're ready to extract.

**Q: Is the checklist free?**
A: Yes — free to use, no account, no sign-up.

### /build-planner
**Q: What does the Build Planner do?**
A: You pick a class, click nodes on the interactive talent tree, and choose weapons, armor and gems. The planner builds a shareable summary link you can send to your squad.

**Q: Are the talent trees complete?**
A: The planner covers the 6 classes × 2 stances with the talent data verified as of its Last Verified date. Data is labeled Community Report where it comes from community testing.

**Q: Can I share my build?**
A: Yes. A share link encodes your build so teammates can open and review it. Build drafts stay in your browser until you share.

**Q: Do I need an account to use the planner?**
A: No. The Build Planner is free and anonymous — no login or sign-up required.

### /squad-builder
**Q: What is the Squad Comp Builder?**
A: It lets you build a 3-class Trio or 2-class Duo squad, then evaluates role coverage, missing roles and synergy with a comp score and suggestions.

**Q: How is my squad evaluated?**
A: The evaluation checks frontline/DPS/support coverage, synergy between classes and weak spots, based on the class attribute table. It also suggests alternative picks for missing roles.

**Q: Can I share my squad comp?**
A: Yes. A share URL encodes your class combination so anyone can open the same comp. This is the only dedicated squad tool for Mistfall Hunter Duo and Trio play.

**Q: Is the squad builder free?**
A: Yes — free to use, anonymous, no sign-up. On mobile, tap classes to add them instead of dragging.

### /matchups
**Q: What is the PvP Matchup Matrix?**
A: It's an interactive 6×6 grid showing every class-vs-class matchup in Solo and Trio modes. Click a cell to see analysis, key skills and strategy tips.

**Q: How is matchup data sourced?**
A: Matchup content is adapted from community reports and testing, labeled Community Report with a Last Verified date. Cells still being collected show a "Pending community report" note.

**Q: Can I switch between Solo and Trio?**
A: Yes. The matrix has a Solo/Trio toggle; the matchup verdicts change because group fights play differently than duels.

**Q: Is the matchup matrix free?**
A: Yes. Free to use, no account, mobile-friendly with horizontal scroll and bottom-sheet analysis.

### /map
**Q: What maps are in the Interactive Map?**
A: Both Mistfall Hunter maps — Hallowgrove and Brandrgarde — with POI markers, extraction points, boss locations and loot route layers.

**Q: Can I filter map layers?**
A: Yes. Toggle layers for POIs, extraction points, bosses and chests to focus on what you need for a run. Click any POI for details.

**Q: Is map data accurate?**
A: Map data is adapted from community testing and labeled Community Report with a Last Verified date. Positions are reviewed after map-affecting patches.

**Q: Is the map free to use?**
A: Yes — free, anonymous, works in mobile browsers with pinch-to-zoom and one-finger pan.

---

## 3. Classes（6 × 4 条）

> 模板：每个职业页 4 条（玩法定位 / 最佳姿态 / 适合人群 / 相关 Build）。职业定位来自 PRD §5.3 冻结口径；数值细节 [DATA-PENDING: 08]。

### /classes/mercenary
**Q: What is the Mercenary class about?**
A: The Mercenary is Mistfall Hunter's frontline bruiser — strong up close, built to hold space and protect teammates in PvPvE extracts.

**Q: Is the Mercenary good for beginners?**
A: Yes, the Mercenary is often recommended for new players because its survivability forgives mistakes while you learn extraction basics. Check the Beginner Tier List for the current ranking.

**Q: What stance should a Mercenary use?**
A: The best stance depends on your build and squad role; the class guide covers both stances and when to stance-swap. [DATA-PENDING: 08 具体数值]

**Q: Where can I find Mercenary builds?**
A: See the Mistfall Hunter Mercenary Build Guide for skills, weapons, armor and gems, or use the Build Planner to design your own.

### /classes/sorcerer
**Q: What is the Sorcerer class about?**
A: The Sorcerer trades durability for high burst spell damage and is one of the best classes for quick kills in Mistfall Hunter.

**Q: Is the Sorcerer hard to play?**
A: The Sorcerer has high damage but low survivability, so positioning matters. It suits players comfortable with kiting and ability timing.

**Q: What stance should a Sorcerer use?**
A: The guide covers both stances and which one favors burst vs sustained damage. [DATA-PENDING: 08 具体数值]

**Q: Where can I find Sorcerer builds?**
A: See the Mistfall Hunter Sorcerer Build Guide, or use the Build Planner to prototype a burst loadout.

### /classes/blackarrow
**Q: What is the Blackarrow class about?**
A: The Blackarrow is a precision ranged class that excels at safe damage and strong extraction control in Mistfall Hunter.

**Q: Is the Blackarrow good for solo play?**
A: Yes — ranged damage and escape tools make Blackarrow a strong solo extractor. See the Solo Tier List for its current ranking.

**Q: What stance should a Blackarrow use?**
A: The class guide covers both stances and which favors sustained ranged pressure. [DATA-PENDING: 08 具体数值]

**Q: Where can I find Blackarrow builds?**
A: See the Mistfall Hunter Blackarrow Build Guide for a precision loadout, or check the Loot Finder for its best gear drops.

### /classes/shadowstrix
**Q: What is the Shadowstrix class about?**
A: The Shadowstrix is a high-mobility, stealthy class that wins PvP fights with positioning, speed and burst windows.

**Q: Is the Shadowstrix good for PvP?**
A: Yes — it's one of the strongest PvP classes when played well. The PvP Survival Guide and Matchup Matrix cover its key matchups.

**Q: What stance should a Shadowstrix use?**
A: The guide covers both stances and which favors mobility vs burst. [DATA-PENDING: 08 具体数值]

**Q: Where can I find Shadowstrix builds?**
A: See the Mistfall Hunter Shadowstrix Build Guide, or use the Squad Builder to pair it with complementary classes.

### /classes/seer
**Q: What is the Seer class about?**
A: The Seer is Mistfall Hunter's utility and support class — buffs, debuffs and team carry potential that shapes fights.

**Q: Is the Seer good for squad play?**
A: Yes. The Seer's support kit shines in Trio and Duo comps. Check the Duo Guide and Trio Tier List for how it fits squads.

**Q: What stance should a Seer use?**
A: The class guide covers both stances and which favors utility vs defensive play. [DATA-PENDING: 08 具体数值]

**Q: Where can I find Seer builds?**
A: See the Mistfall Hunter Seer Build Guide for support loadouts, or use the Squad Builder to build a squad around it.

### /classes/withered-knight
**Q: What is the Withered Knight class about?**
A: The Withered Knight is a durable, hard-to-kill frontline class built to survive and anchor a squad through tough extracts.

**Q: Is the Withered Knight beginner-friendly?**
A: Yes — high durability makes it forgiving for new players. See the Beginner Tier List for its current ranking.

**Q: What stance should a Withered Knight use?**
A: The guide covers both stances and which favors tanking vs sustain damage. [DATA-PENDING: 08 具体数值]

**Q: Where can I find Withered Knight builds?**
A: See the Mistfall Hunter Withered Knight Build Guide, or use the Extraction Checklist to prep for frontline runs.

---

## 4. Builds（6 × 3 条）

> 模板：3 条（核心思路 / 装备来源 / 上手难度）。具体装备与天赋数值 [DATA-PENDING: 08]。

### /builds/mercenary
**Q: What is the best Mercenary build?**
A: The strongest Mercenary builds focus on frontline durability, cleave damage and stance-swap pressure. [DATA-PENDING: 08 具体天赋/装备]

**Q: Where do I get Mercenary gear?**
A: Use the Loot Finder to locate boss drops, chests, NPC vendors and crafting recipes for Mercenary-appropriate weapons and armor.

**Q: Is the Mercenary build expensive to put together?**
A: A starter build uses common drops and cheap crafts; the meta build needs rarer drops. The Gold Farming Guide covers how to fund it.

### /builds/sorcerer
**Q: What is the best Sorcerer build?**
A: Sorcerer builds maximize burst spell damage with the right stance, weapons and gem loadout. [DATA-PENDING: 08 具体天赋/装备]

**Q: Where do I get Sorcerer gear?**
A: Use the Loot Finder to find spell-damage weapons, armor and gems by name, or browse the Items Database by type and rarity.

**Q: Is the Sorcerer build squishy?**
A: Yes — Sorcerer builds trade durability for damage, so the loadout includes escape tools and the guide covers positioning.

### /builds/blackarrow
**Q: What is the best Blackarrow build?**
A: Blackarrow builds optimize ranged pressure, kiting and extraction safety at range. [DATA-PENDING: 08 具体天赋/装备]

**Q: Where do I get Blackarrow gear?**
A: Use the Loot Finder for ranged weapons and precision gems; source links show boss, chest and vendor paths.

**Q: Is Blackarrow good for solo extraction?**
A: Yes — its range and escape make it a top solo pick. Pair the build with the Solo Survival Guide for routes and discipline.

### /builds/shadowstrix
**Q: What is the best Shadowstrix build?**
A: Shadowstrix builds lean into mobility, stealth and burst windows for PvP dominance. [DATA-PENDING: 08 具体天赋/装备]

**Q: Where do I get Shadowstrix gear?**
A: Use the Loot Finder to locate mobility and burst gear, and the Matchup Matrix to plan which fights to take.

**Q: Is Shadowstrix viable in Trio?**
A: Yes — as a flanker/assassin role. The Trio Tier List and Duo Guide show how it slots into squads.

### /builds/seer
**Q: What is the best Seer build?**
A: Seer builds balance utility, healing and crowd control to carry a squad through any extract. [DATA-PENDING: 08 具体天赋/装备]

**Q: Where do I get Seer gear?**
A: Use the Loot Finder to find support and utility items, or the Items Database filtered by type and rarity.

**Q: Is the Seer build for solo or squad play?**
A: Seer shines in squads but has viable solo variants. See the Solo Survival Guide and the Duo Guide for both contexts.

### /builds/withered-knight
**Q: What is the best Withered Knight build?**
A: Withered Knight builds stack durability and sustain so you can frontline and never die first. [DATA-PENDING: 08 具体天赋/装备]

**Q: Where do I get Withered Knight gear?**
A: Use the Loot Finder for defensive armor and sustain gems; check source links for boss, chest and crafting paths.

**Q: Is Withered Knight good for beginners?**
A: Yes — it's one of the most forgiving classes. Combine the build with the Beginner Guide and Extraction Checklist.

---

## 5. Tier List 子页（4 × 3 条）

### /tier-list/solo
**Q: Which class is best for solo in Mistfall Hunter?**
A: The current Solo tier list puts ranged and self-sufficient classes at the top because they extract more reliably alone. See the full S-to-D ranking on this page.

**Q: How is the Solo tier list ranked?**
A: Classes are ranked by survival, kill speed and self-sufficiency in solo extracts, with trust labels and a Last Verified date.

**Q: Can I play any class solo?**
A: Yes — every class can extract solo, but lower-tier picks need better routes and gear. See the Solo Survival Guide for loadouts.

### /tier-list/trio
**Q: Which classes are best in Trio?**
A: The Trio tier list ranks classes by role coverage and synergy in three-man squads — a balanced frontline/DPS/support core usually ranks highest.

**Q: How is the Trio tier list ranked?**
A: Rankings combine class strength with how well the class covers a squad role. Use the Squad Builder to test combinations.

**Q: What is a good Trio comp?**
A: A typical strong comp pairs a frontline class, a DPS class and a support class. The Squad Builder evaluates role coverage and synergy live.

### /tier-list/duo
**Q: What is the best Duo comp in Mistfall Hunter?**
A: The best Duo comps pair self-sufficient classes that cover each other's weaknesses — see the exclusive Duo tier list for the current ranking.

**Q: Why is there a Duo tier list?**
A: Duo has no official matchmaking in Mistfall Hunter, so players form pairs manually. This site built the only dedicated Duo ranking from community reports.

**Q: How do I play Duo without matchmaking?**
A: The Duo Guide covers forming pairs, comms and route splits, and the Squad Builder evaluates your two-class comp.

### /tier-list/beginner
**Q: What is the best class for beginners in Mistfall Hunter?**
A: The Beginner tier list ranks durable, forgiving classes at the top so new players can extract safely while learning mechanics.

**Q: How is the Beginner tier list ranked?**
A: Rankings prioritize ease of use and survivability over raw ceiling. Take the Class Quiz for a personal recommendation.

**Q: Should I pick a beginner-friendly class?**
A: It's a good start — survivability keeps you in the game while you learn extraction. Move to the Beginner Guide next.

---

## 6. Maps（2 × 3 条）

### /maps/hallowgrove
**Q: Where is Hallowgrove in Mistfall Hunter?**
A: Hallowgrove is Mistfall Hunter's first map. This guide covers its POIs, extraction points, boss locations and loot routes.

**Q: How many extraction points does Hallowgrove have?**
A: The map guide lists all extraction points with positions and activation details. [DATA-PENDING: 08 具体数量/坐标]

**Q: Where are the bosses on Hallowgrove?**
A: Boss locations are marked on the map with layer filters. See the Interactive Map for live markers, or the Boss Guides for fight details.

### /maps/brandrgarde
**Q: Where is Brandrgarde in Mistfall Hunter?**
A: Brandrgarde is the second Mistfall Hunter map. This guide covers its POIs, extraction points, boss locations and loot routes.

**Q: How many extraction points does Brandrgarde have?**
A: The map guide lists all extraction points with positions and activation details. [DATA-PENDING: 08 具体数量/坐标]

**Q: Where are the bosses on Brandrgarde?**
A: Boss locations are marked on the map. Use the Interactive Map layers to plan routes, and the Boss Guides for fight specifics.

---

## 7. Bosses（3 × 4 条）

> 招式/阶段数值 [DATA-PENDING: 08]。

### /bosses/cursed-moonwane
**Q: Where do I find Cursed Moonwane?**
A: Cursed Moonwane appears on Hallowgrove at a fixed boss location — see the Hallowgrove Map Guide for the position and approach route. [DATA-PENDING: 08 坐标]

**Q: What are Cursed Moonwane's phases?**
A: The fight has multiple phases with distinct attacks. This guide breaks down each phase and what to watch for. [DATA-PENDING: 08 招式细节]

**Q: Which classes are best against Cursed Moonwane?**
A: High-mobility classes and classes with strong sustain perform best. See the Class Guides and the Matchup-style strategy notes in this guide. [DATA-PENDING: 08]

**Q: What does Cursed Moonwane drop?**
A: Rewards are listed with drop sources in the guide and the Loot Finder. [DATA-PENDING: 08 掉落表]

### /bosses/salmar
**Q: Where do I find Salmar?**
A: Salmar is located on Brandrgarde at a fixed boss position — see the Brandrgarde Map Guide for the route. [DATA-PENDING: 08 坐标]

**Q: What are Salmar's attacks?**
A: The guide covers Salmar's attack patterns, telegraphed moves and safe positioning. [DATA-PENDING: 08 招式细节]

**Q: Which classes are best against Salmar?**
A: Sustained damage classes with good dodge windows work well. See the Build Guides for loadouts. [DATA-PENDING: 08]

**Q: What does Salmar drop?**
A: Drop tables are tracked in this guide and the Loot Finder with sources. [DATA-PENDING: 08 掉落表]

### /bosses/einherjar
**Q: What is Einherjar mode in Mistfall Hunter?**
A: Einherjar is a special mode with its own boss. This guide covers how to prepare, survive and secure the kill. [DATA-PENDING: 08 模式机制]

**Q: Where is the Einherjar boss?**
A: The boss spawns within the Einherjar mode on its map. See the Map Guides for location context. [DATA-PENDING: 08]

**Q: Which classes are best for Einherjar?**
A: Durable classes with strong sustain are recommended. See the Withered Knight and Mercenary guides for frontline options. [DATA-PENDING: 08]

**Q: What are the Einherjar rewards?**
A: Rewards are listed in this guide with source notes. [DATA-PENDING: 08 掉落表]

---

## 8. Guides（17 × 3 条）

> 每条 3 条 FAQ；首句直答。

### /guides/getting-started
**Q: What should I do first in Mistfall Hunter?**
A: Take the Class Quiz to pick your first class, read the Beginner Guide for extraction basics, then run the Extraction Checklist on your first few extracts.

**Q: How long does it take to learn Mistfall Hunter?**
A: You can extract successfully in your first session by following the First Extraction Guide; mastering classes and PvP takes longer.

**Q: Is Mistfall Hunter crossplay?**
A: Crossplay details are covered in the FAQ guide; platform-specific settings are in the PS5 and Xbox settings guides. [DATA-PENDING: 08 确认 crossplay 口径]

### /guides/first-extraction
**Q: What do I need before my first extraction?**
A: A basic loadout, a route to an extraction point, and clear objectives. Use the Extraction Checklist to prep, then follow this guide's route.

**Q: When should I leave a run?**
A: Leave when you have loot worth keeping and a safe path to extract — the guide covers risk windows and when to bail.

**Q: What happens if I die in Mistfall Hunter?**
A: Dying means losing your carried loot in extraction games. The guide explains gear risk and how to minimize it.

### /guides/extraction
**Q: How does extraction work in Mistfall Hunter?**
A: You enter a map with a loadout, loot objectives, and must reach an extraction point before the timer or enemy pressure ends the run. [DATA-PENDING: 08 具体计时]

**Q: What is gear risk in Mistfall Hunter?**
A: Gear risk determines what you lose on death. The guide explains the rules and how to protect valuable items.

**Q: How many extraction points are there per map?**
A: Each map has multiple extraction points with different activation rules — see the Map Guides for positions.

### /guides/tips
**Q: What is the most important tip for Mistfall Hunter?**
A: Know when to extract — most lost loot comes from overstaying. This guide lists 25 practical tips covering loot, combat and economy.

**Q: How do I survive PvP encounters?**
A: Control distance, use cover, and avoid third parties. See the PvP Survival Guide for matchups and positioning.

**Q: How do I make gold fast?**
A: Efficient loot routes and auction flips are the fastest methods — see the Gold Farming Guide for routes and flips.

### /guides/faq
**Q: Is Mistfall Hunter free to play?**
A: Yes, Mistfall Hunter is free-to-play on PC, PS5 and Xbox. See the Codes & Rewards page for active codes.

**Q: Is Mistfall Hunter crossplay?**
A: This guide answers crossplay and platform questions directly. [DATA-PENDING: 08 确认 crossplay 口径]

**Q: What is a season wipe in Mistfall Hunter?**
A: A season wipe resets progression at the start of a new season — the guide explains what resets and what carries over. [DATA-PENDING: 08 具体规则]

### /guides/dual-weapon-stances
**Q: How do dual weapon stances work?**
A: Each class has two stances you can swap between during a run, changing your skills and bonuses. This guide covers the mechanic and when to swap.

**Q: Can I stance-swap mid-combat?**
A: Yes — stance swapping is designed for combat adaptation, but has timing tradeoffs. [DATA-PENDING: 08 具体规则]

**Q: Do stances change my build?**
A: Stances change available skills and bonuses, so builds are usually optimized for one stance — see the Build Guides.

### /guides/camp-upgrades
**Q: What are camp upgrades in Mistfall Hunter?**
A: Camp upgrades are permanent progression purchases that improve your base between runs. This guide ranks the best order to buy them.

**Q: What should I upgrade first?**
A: Early upgrades that reduce cost or speed up runs pay off first. The guide lists the recommended order. [DATA-PENDING: 08 具体升级树]

**Q: Do camp upgrades reset on season wipe?**
A: Season wipe rules for camp progression are covered in the guide. [DATA-PENDING: 08 具体规则]

### /guides/scavenger-squads
**Q: What are scavenger squads in Mistfall Hunter?**
A: Scavenger squads are low-risk loot teams that focus on fast, efficient extraction instead of PvP. This guide covers how to form and run them.

**Q: How do I find a scavenger squad?**
A: Use community channels or the Duo Guide for pair-up options — this site doesn't host matchmaking.

**Q: Are scavenger squads profitable?**
A: Yes — consistent small extracts add up. See the Gold Farming Guide for route-level profit.

### /guides/leveling
**Q: What is the fastest way to level in Mistfall Hunter?**
A: Focus on quests that give the most XP per run and efficient loot routes that combine objectives. The guide ranks the fastest methods. [DATA-PENDING: 08 具体数值]

**Q: Does gear help me level faster?**
A: Yes — better gear means safer runs and more objectives completed per extract.

**Q: Do levels reset on season wipe?**
A: Season wipe rules for level progression are covered in the guide. [DATA-PENDING: 08 具体规则]

### /guides/keys-treasure
**Q: Where do I find keys in Mistfall Hunter?**
A: Keys drop from specific enemies, chests and events — the guide lists known sources. [DATA-PENDING: 08 掉落来源]

**Q: What are treasure rooms?**
A: Treasure rooms are locked areas with high-value loot that require keys. The guide maps their locations. [DATA-PENDING: 08 位置]

**Q: Is it worth opening treasure rooms?**
A: Yes when you have spare keys and a safe route — the guide covers risk vs reward.

### /guides/pvp-survival
**Q: How do I win PvP fights in Mistfall Hunter?**
A: Win the matchup knowledge game: know class matchups, control positioning, and stay aware of third parties. The Matchup Matrix covers class-versus-class.

**Q: Which class is best for PvP?**
A: The Solo and Trio tier lists rank PvP strength by mode; the Matchup Matrix shows specific counters.

**Q: How do I avoid getting third-partied?**
A: Keep fights short, disengage when you have the loot, and avoid open areas during fights.

### /guides/pc-settings
**Q: What are the best PC settings for Mistfall Hunter?**
A: The guide lists optimized graphics, rendering and input settings for FPS and stutter fixes. [DATA-PENDING: 08 具体档位]

**Q: Why is my FPS stuttering?**
A: Stutter is usually rendering or shader-related — the guide covers the specific fixes. Use the Settings Recommender for a baseline.

**Q: Do I need a high-end GPU?**
A: No — the guide includes settings for low, mid and high-end GPUs with expected performance tiers.

### /guides/ps5-settings
**Q: What are the best PS5 settings for Mistfall Hunter?**
A: The guide covers graphics modes, FOV, controller and crossplay settings for smooth performance. [DATA-PENDING: 08 具体选项]

**Q: Should I use performance or quality mode?**
A: Performance mode favors frame rate for PvP; quality mode favors visuals. The guide recommends per scenario.

**Q: Does Mistfall Hunter support crossplay on PS5?**
A: Crossplay availability is covered in the guide. [DATA-PENDING: 08 确认]

### /guides/xbox-settings
**Q: What are the best Xbox settings for Mistfall Hunter?**
A: The guide covers graphics modes, FOV, controller and crossplay settings for smooth performance. [DATA-PENDING: 08 具体选项]

**Q: Should I use performance or quality mode?**
A: Performance mode favors frame rate for PvP; quality mode favors visuals. The guide recommends per scenario.

**Q: Does Mistfall Hunter support crossplay on Xbox?**
A: Crossplay availability is covered in the guide. [DATA-PENDING: 08 确认]

### /guides/controller-vs-kbm
**Q: Is controller or keyboard and mouse better for Mistfall Hunter?**
A: Keyboard and mouse favors precise aim; controller offers comfort and aim assist. The guide breaks down the best setup per class.

**Q: Does Mistfall Hunter have aim assist on controller?**
A: Aim assist details are covered in the guide per platform. [DATA-PENDING: 08 确认]

**Q: Can I switch between controller and keyboard mid-game?**
A: Input switching behavior is covered in the guide. [DATA-PENDING: 08 确认]

### /guides/auction-house
**Q: How does the auction house work in Mistfall Hunter?**
A: You buy and sell items with fees on transactions. The guide explains fees, listings and flipping. [DATA-PENDING: 08 费率]

**Q: How do I flip items for profit?**
A: Buy underpriced listings and resell at market value — the guide covers margins and price trends.

**Q: What are the auction house fees?**
A: Fee rates are listed in the guide. [DATA-PENDING: 08 费率]

### /guides/gold-farming
**Q: What is the best way to farm gold in Mistfall Hunter?**
A: Efficient scavenger routes plus auction flips are the fastest methods. The guide ranks routes by gold per hour. [DATA-PENDING: 08 数值]

**Q: Are there items worth flipping?**
A: Yes — the guide tracks volatile items and price trends for flipping.

**Q: How much gold can I make per hour?**
A: Estimated gold-per-hour ranges are in the guide, based on community reports. [DATA-PENDING: 08 数值]

---

## 9. Codes（3 × 3 条）

### /codes/rewards
**Q: Are there active Mistfall Hunter codes?**
A: Active codes are listed with expiry countdowns on this page. Codes change frequently — check the Last Verified date.

**Q: What do Mistfall Hunter codes give?**
A: Codes grant in-game rewards such as cosmetics or consumables; each entry lists what the code gives. [DATA-PENDING: 08 实时码]

**Q: How do I redeem a Mistfall Hunter code?**
A: Follow the How to Redeem guide for PC, PS5 and Xbox steps.

### /codes/how-to-redeem
**Q: How do I redeem a Mistfall Hunter code on PC?**
A: Open the in-game redeem menu, enter the code, and claim the reward. The guide covers exact steps per platform.

**Q: How do I redeem codes on PS5 or Xbox?**
A: Console redemption steps are platform-specific — the guide covers both consoles. [DATA-PENDING: 08 确认]

**Q: Why is my code not working?**
A: Codes expire or are region/account locked. The guide covers common errors and expiry checks.

### /codes/twitch-drops
**Q: How do Mistfall Hunter Twitch Drops work?**
A: Watch participating Mistfall Hunter streams for a set time to earn drops; claim them in your Twitch inventory. [DATA-PENDING: 08 规则]

**Q: Are there current Twitch Drops?**
A: Current drop campaigns and requirements are listed on this page with claim steps. [DATA-PENDING: 08 实时]

**Q: Do I need to link my game account?**
A: Linking requirements are covered in the guide. [DATA-PENDING: 08 确认]

---

## 10. Duo/Solo（2 × 3 条）

### /guides/duo
**Q: How do I play Duo in Mistfall Hunter?**
A: Duo has no official matchmaking, so you form pairs manually. This guide covers best two-class comps, comms and route splits.

**Q: What is the best Duo comp?**
A: The Duo Tier List ranks two-class comps; the Squad Builder evaluates role coverage and synergy for your specific pair.

**Q: Is Duo easier or harder than Solo?**
A: Duo gives a teammate for coverage but splits loot — the guide covers tradeoffs and how to make pairs work.

### /guides/solo-survival
**Q: How do I survive solo in Mistfall Hunter?**
A: Pick a self-sufficient class, keep a disciplined route, and extract early with valuable loot. The Solo Tier List ranks class picks.

**Q: What is the best solo class?**
A: Ranged and self-sufficient classes top the Solo Tier List; the Class Quiz gives a personal recommendation.

**Q: How do I avoid PvP as a solo player?**
A: Use route discipline, listen for fights, and avoid contested POIs — the guide covers escape tactics.

---

## 11. Schema 分配说明（给 07 前端）

- FAQPage：以上 54 页每页 3-5 条，mainEntity 数组，Q=question/A=acceptedAnswer.text；JSON-LD 静态 SSR。
- ItemList：/tier-list、/tier-list/{solo,trio,duo,beginner}、/items（条目 + 评分字段）。
- Article：guides/classes/builds/bosses/maps/codes/duo-solo 全部内容页（headline, datePublished, dateModified, author="Mistfall Hunter Tools"；dateModified 与 Last Verified 同步，E14）。
- WebApplication：10 工具页（applicationCategory=GameApplication, operatingSystem=Web）。
- HowTo（可选）：/settings、/guides/how-to-redeem、/guides/first-extraction（Google 2023 后无 rich result 但利于 AI 解析）。
- WebSite + SearchAction：全站 head（target=https://mistfallhunter.co/search?q={search_term_string}）。
- Organization：全站 head 或 /about（name="Mistfall Hunter Tools", url, logo=原创 logo）。
- BreadcrumbList：全站除首页。
- 约束：JSON-LD 静态输出；ID 稳定；事件参数不含 PII/图片内容/文件名。

**状态行：[DONE] — FAQ/schema 文案冻结完成；Trust 4 页无 FAQ schema；数据依赖项均标 [DATA-PENDING: 08]。**
