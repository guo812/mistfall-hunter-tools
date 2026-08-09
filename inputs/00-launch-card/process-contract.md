# ShipSolo future-process contract

- board: `site-mistfall-hunter`
- workspace: `/root/.hermes/projects/shipsolo/mistfall-hunter`
- shared credential symlink: `/root/.hermes/projects/shipsolo/mistfall-hunter/.env.site`
- dispatcher topology: only `default` gateway dispatches Kanban; worker profiles must keep `kanban.dispatch_in_gateway=false`.
- credential rule: workers may source `.env.site` locally for boolean/API/login probes, but must never print, copy, commit, screenshot, or paste secrets.
- login rule: if a platform needs browser login/CAPTCHA/payment/manual confirmation, stop as `MANUAL_REQUIRED` with one click-level instruction; do not repeatedly log in or retry.
- retry rule: task cards default to `--max-retries 1`; repeated worker/model/tool failures become `BLOCKED/NEEDS_REPAIR`, not retry storms.
- confirmation gates: PRD brief, PRD V1, Copy Freeze, Design Source, production/public actions.
- evidence rule: `DONE` requires URL/path/build/screenshot/smoke evidence. Chat ACK is not DONE.
