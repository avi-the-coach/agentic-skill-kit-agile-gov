# Runtime contract

## Assembly and runtime
The HTML template has exactly three markers: `/*__STYLE__*/`, `/*__APP__*/`, `/*__RUNTIME__*/`.
Embed `assets/review.css`, the domain adapter, and `assets/review-runtime.js` respectively. All files are relative to this skill's root. The agent may run `scripts/build.py` in its own environment or assemble them directly. The final HTML needs no Python, Node, repository connection or network. Do not load assets through external script/link tags. Escape literal closing script/style tags in embedded assets. Render imported/user text with `textContent`, never HTML interpolation or eval.

## Adapter API
Define `window.PrototypeApp` before the runtime:
- `id`: stable slug identifying this product, distinct from other prototypes. Keep it across compatible revisions. Example: `citizen-service-demo`.
- `version`: data compatibility version string. The runtime accepts exact matches; for incompatible revisions change it and explicitly reject old snapshots unless you implement and test a migration. Do not claim automatic migration.
- `title`: user-facing title.
- `views`: nonempty array of unique `{id,label}` actors/screens. A view ID is stable review context, not a display label. For multi-page apps include screen identifiers in these view IDs or extend the runtime's context contract consistently.
- `initial()`: return fresh, JSON-serializable domain data, including records, drafts, workflow progression and relevant selections.
- `validate(data)`: return `true` only for the complete expected domain shape, types, allowed states and size limits. Reject duplicate record IDs. This is mandatory: envelope validation cannot validate arbitrary app data.
- `render(root, ctx)`: build the active view using DOM APIs. It receives `data`, `view`, `el(tag,text,className)`, `button(text,handler,className)`, `uid()`, `toast(text)`, `update(fn)`, `persist(fn)`, `spec(target,kind,title,text)`.

`update(fn)` mutates domain data, saves, then renders. Use it for completed actions and transitions. `persist(fn)` saves without rerendering; use it for text input to preserve focus/caret. Never leave meaningful mutable state only in DOM or untracked variables. `spec` creates an accessible button opening a modal explanation. Allowed kinds: `requirement`, `assumption`, `question`. Include source references in explanation text; example assumptions must not become user requirements.

## Stable anchors and comments
Set unique `data-anchor` IDs on meaningful fields, buttons, panels, records and containers. Add human-readable `data-label` values for the keyboard target picker. Use record IDs, never list indexes, for repeatable items. Avoid IDs containing personal data. Runtime Ctrl-click or annotation mode captures the nearest anchor, normalized local coordinates and the current view. Unanchored space falls back to the screen anchor. A fallback coordinate cannot be as precise as a stable field anchor; add anchors wherever feedback matters.

Markers are recalculated on rendering, resize and scroll. View-filtered or removed targets keep their comments in the review list; do not discard or relocate silently. Keyboard users can choose an anchor from a labeled select; touch users can toggle selection mode. Escape cancels selection. Reviewer identity is a label, not authentication: local comments are editable, including imported ones, and the UI explicitly says this. Do not imply enforced ownership or cross-user collaboration.

## Envelope / local database
Storage key: `prototype-builder:<id>:database` (version lives in the envelope, so old data is detected rather than silently abandoned).

```json
{
  "format": "prototype-builder",
  "schemaVersion": 1,
  "prototypeId": "citizen-service-demo",
  "appVersion": "1.0.0",
  "updatedAt": "2026-10-11T12:00:00.000Z",
  "app": {"domain": "adapter-defined"},
  "settings": {"view": "citizen", "spec": false, "reviewer": "Reviewer"},
  "comments": [{
    "id": "comment-1", "author": "Reviewer", "text": "Question",
    "view": "citizen", "target": "subject-input", "x": 0.95, "y": 0.1,
    "createdAt": "2026-10-11T12:00:00.000Z",
    "updatedAt": "2026-10-11T12:00:00.000Z"
  }]
}
```

The runtime validates identity/version, settings, dates, comment types/lengths/IDs/normalized positions, and calls the adapter validator. JSON imports are limited to approximately 2MB and 1000 comments; bound adapter data too. Imports replace the complete database after explicit confirmation; V1 does not merge. Invalid imports leave current state unchanged. Treat text as untrusted. File picker and paste are both supported. Copy falls back to a selectable textarea when the Clipboard API fails.

Invalid/incompatible saved data is not overwritten: display a warning and a temporary sample in memory until explicit reset/import. Storage failures fall back to in-memory work with a persistent export warning. Another-tab changes suspend saving pending explicit reconciliation. Reset requires confirmation. localStorage depends on browser/profile/origin; `file://` behavior varies and data can be cleared. Never promise durability, multi-user sync or secure storage. Always retain export/import as the portable fallback.

## Styling and language
The supplied shell/example use Hebrew RTL. For another language translate shell strings, runtime user messages and adapter content, change HTML `lang`/`dir`, and retain the accessibility labels. CSS uses logical properties where direction matters. Keep review tools grouped in the header/footer, visually distinct from the product. Customize CSS and domain layout deliberately rather than reuse the citizen demo's visual identity for every product. Do not remove the integrated review/data capabilities while styling.

## Host environments
Projects supply routing/context, not guaranteed execution capabilities. Read repository files through available connectors. If a host only supports native artifact authoring, inline the assets directly. Prefer downloadable HTML even when a native preview is present. Never assume storage or downloads work inside sandboxed previews. A user should not need Claude Code or terminal access to use this skill.
