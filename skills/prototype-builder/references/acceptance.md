# Acceptance checklist

Run against each generated prototype, not just the generic template. Record actual tools/browsers and distinguish execution from inspection. A preview screenshot alone is not a behavior test.

## Product and specification
- Main journey works end-to-end across relevant actors; no inert primary controls.
- Realistic fictitious examples, meaningful empty/error/success states, consistent domain rules.
- Demo mode hides specification buttons; Spec mode reveals contextual, actionable explanations.
- Requirements, assumptions and open questions are clearly distinguished, with provenance where available.
- Simulated authentication/integrations are explicit. No actual messages, submissions, network dependencies or production data.
- Tab/Enter/Escape, labeled controls and focus return work; touch does not depend on hover.
- Inspect desktop and mobile screenshots; check overflow, contrast, spacing, modal scroll and RTL/LTR behavior.

## State and portability
1. Enter a draft, create a record, switch roles, advance its workflow and apply a filter.
2. Reload: records, draft, role/view, filter and status persist.
3. Ctrl-click a meaningful control: the underlying action must not fire. Save a named comment.
4. Reload and resize: the marker remains anchored. Switch views and back. Edit/delete comments locally.
5. Use keyboard target selection and touch annotation mode. Missing targets remain accessible in the comment list.
6. Export JSON to a file and copy the same state. Open a fresh browser context with the same HTML; import through the file picker, confirm replacement, reload and re-export. Verify semantic equality of app/comments/settings (timestamps may change).
7. Cancel an import and cancel reset: state must remain intact. Confirm reset: defaults return; importing restores exported state.
8. Reject invalid JSON, wrong prototype/version, malformed domain state, duplicate IDs, bad comment anchors and oversized files without changing current state. Render malicious-looking strings as text.
9. Block storage/read/write or simulate quota errors: app remains usable with a persistent warning and export fallback. Malformed saved state must not be overwritten merely by loading. Detect other-tab changes and avoid silent lost updates.
10. Deny Clipboard API: show selectable JSON fallback. Test file-local behavior in supported target browsers when available; do not claim universal file:// persistence.

## Maintainer regression suite
The suite requires an agent/maintainer environment with Playwright and Chromium; it is NOT a user runtime dependency. Run from any working directory:

```bash
python skills/prototype-builder/scripts/build.py --app skills/prototype-builder/examples/service-requests.app.js --output skills/prototype-builder/examples/service-requests.html
node skills/prototype-builder/tests/runtime.spec.cjs
```

Set `NODE_PATH` if the environment keeps Playwright outside standard resolution. Optional `PB_SCREENSHOT_DIR` selects a temporary screenshot directory. Tests exercise the bundled example; a new domain adapter needs its own journey checks. Firefox/WebKit and native ChatGPT/Claude artifact hosts must be tested separately if available; otherwise mark those environments unverified.
