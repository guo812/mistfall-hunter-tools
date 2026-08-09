## Task for 文案写作主管-05: 10R-D P0 source-copy repair

Authority: `inputs/02-owner-confirmations/owner-release-10R-D-local-repair-20260809.md`.

Modify only canonical A3 source route JSON files under `outputs/05-copy-repair/routes/` to remove all 56 `[DATA-PENDING: 08 ...]` internal placeholders that PM found across 33 routes. Replace each with truthful, neutral, user-facing English that does not invent facts and preserves the exact frozen TDK/direct-answer fields and route coverage. Also produce/extend a deterministic scanner proving zero residual `[DATA-PENDING` (including Chinese variants), zero visible/schema contamination, and unchanged contracts. Update copy evidence under `outputs/05-copy-repair/`.

Non-goals: no app code, trust-page/front-end integration, Git, deploy, DNS/Cloudflare, analytics, GSC/Bing/IndexNow, remote or public action.

ACK/已开始; progress; BLOCKED exact input; DONE only with changed-file list, command output, scanner result and evidence path.