## Task for 前端开发主管-07: 10R-D frontend/trust-page integration

Authority: `inputs/02-owner-confirmations/owner-release-10R-D-local-repair-20260809.md`.

Dependency: the content P0 repair card must be formally DONE.

Read corrected A3 route-copy package plus frozen `outputs/05-copy/trust-pages-final-copy.md`. Integrate source without rewriting frozen TDK/DA; render complete frozen truthful Privacy/Terms/Contact bodies (not route-answer stubs). Rebuild serially (`npm run build`, then project-defined `npm run opennext:build`) and audit all 58 rendered routes: zero `[DATA-PENDING` / internal Chinese placeholder text in visible DOM and JSON-LD; trust pages contain required final sections; preserve existing schema/canonical/SSR contracts.

Non-goals: Git, deploy, Cloudflare/DNS/cache, email routing, analytics, GSC/Bing/IndexNow, remote or public action.

ACK/已开始; immediately BLOCKED with exact reason; DONE only after Kanban completion with build/package/audit evidence.