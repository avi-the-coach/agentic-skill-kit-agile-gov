# Private workspace contract — v1

## Discovery and privacy
Use private project setting `private_workspace: owner/repository`, an explicit user locator, or discover accessible repositories named `agentic-skill-kit-agile-gov-my-workspace`. Do not guess an owner from the public kit owner. If exactly one candidate exists, verify ownership/access and private visibility; if several exist, ask which. Never write personal locators or client facts into public kit files, Issues or examples. If privacy cannot be verified, stop workspace access and explain the blocker.

Read private `AGENTS.md` before client data, then configuration. Preserve unrelated files. Unknown schema versions require a compatible reader or explicit migration plan, not silent conversion.

## Minimal initialization
Initialize an authorized empty workspace with the following UTF-8 files. Create client folders only when selected. Null means not established, not false.

`workspace.json`:
```json
{
  "schema_version": 1,
  "private_workspace": "owner/repository",
  "language": null,
  "timezone": null,
  "reporting": {"week_start": null, "audience": null, "format": null},
  "context_policy": "Save user-supplied facts with provenance; keep uncertainty explicit; final reports require review."
}
```
`clients/index.json`: `{"schema_version":1,"clients":[]}`

`reports/index.json`: `{"schema_version":1,"reports":[]}`

Private `AGENTS.md` must instruct: verify privacy; use latest shared kit instructions; read configuration/indexes; load selected clients only; preserve revisions; no distribution; verify remote saves. Keep the actual workspace locator only in private configuration. Repository creation is onboarding. An empty GitHub repository may require an initial contents-create commit before Git-tree operations. Verify each initialization write and resume only missing files after partial failure.

## Records
| Path | Contents and invariants |
| --- | --- |
| `clients/index.json` | Stable `id`, `name`, optional aliases, `context_path`, `followups_path` per client. Use safe ASCII lowercase slugs, never slashes or `..`. Resolve identity ambiguity. |
| `clients/<id>/context.md` | Goals, people/roles, initiatives, background and preferences. Each fact has source, capture date, effective date if known, and confirmation status. Retain dated context changes. |
| `clients/<id>/activities/YYYY-MM/<event-id>.json` | `id`, `client_id`, `event_date` (ISO date or null), `captured_at` (timestamp with timezone), `kind`, `summary`, `outcomes`, `decisions`, `sources`, `certainty`. If event date unknown, file in capture month but never infer event date from it. |
| `clients/<id>/followups.json` | `schema_version`, `items`. Each item: `id`, `summary`, `status` (open/blocked/done/cancelled), nullable `owner` and `due_date`, `sources`, `updated_at`, dated `history`. Completion/cancellation needs evidence; retain closed items. |
| `reports/<start>_<end>/<scope>/vNNN/report.md` | Immutable saved source. ISO dates; safe scope slug for client or named aggregate. |
| Same directory: `metadata.json` | Report metadata below. |
| Same directory: presentation | Optional matching audience-safe `report.html` or chosen format. HTML is self-contained and escapes supplied text. |
| `reports/index.json` | Every revision, drafts included. Never a single mutable latest report. |

Use UUIDs or collision-checked IDs for activities/follow-ups; preserve IDs when updating. Check source plus content/date before adding duplicate meeting notes; do not merge merely similar meetings. Correct an activity with explicit dated provenance and retained Git history.

Report metadata example (synthetic):
```json
{
  "schema_version": 1,
  "period": {"start": "2030-04-07", "end": "2030-04-13", "timezone": "Asia/Jerusalem"},
  "scope_id": "example-client",
  "client_ids": ["example-client"],
  "audience": "internal",
  "status": "draft",
  "revision": 1,
  "created_at": "2030-04-13T10:00:00+03:00",
  "approved_at": null,
  "supersedes": null,
  "previous_period_reports": [],
  "sources": [],
  "files": ["report.md"],
  "missing_updates": [],
  "change_summary": "Initial draft"
}
```
Each report-index entry has `metadata_path`, `report_path`, `period`, `scope_id`, `client_ids`, `status`, `revision`. These must match metadata. New period = new directory. Any saved draft/final change = next unused revision. Finalization creates a new final revision with approval timestamp and supersedes pointer to the reviewed draft; retain the draft. Later corrections retain the old final. Revision numbers increase within period + scope. Distinguish independently maintained audiences in scope IDs.

## Fresh-conversation retrieval
1. Resolve and verify workspace; read private instructions/configuration and both indexes.
2. Select clients and load their context and follow-ups.
3. Find each client's latest earlier final report by period end then highest final revision, including aggregate reports containing that client. Read only relevant client sections. Inspect same-period drafts/finals before creating duplicates. Distinguish newer unresolved drafts from final history.
4. Read period activities and older open commitments. Unknown event dates stay unassigned until clarified.
5. If indexes are missing/inconsistent, enumerate actual metadata and reconstruct entries. Do not conclude no history exists from incomplete indexes.

## Save protocol
1. Read current remote head, relevant content and blob SHAs; verify privacy before writing. Prepare a coherent write set: revision files/metadata, relevant context/activity/follow-ups and indexes. Exclude unrelated files and credentials.
2. Prefer an atomic commit with a tree based on the inspected remote tree and actual parent SHA. Advance only with a non-force fast-forward, also supplying expected head where supported. Never force-push. If head advanced, reread and merge logically, choose a fresh revision if occupied, and retry from the new head. Never discard another writer's updates.
3. If only per-file writes exist, create immutable revision files first, update memory with current SHAs, then indexes last. Track completed paths. On conflict, reread before merging. Never overwrite an existing revision.
4. Verify remote content of every changed file or content-equivalent blob at the committed head, including indexes. Confirm indexed report files exist, status/revision match, client IDs and sources resolve. Failure means partial/unknown save, not success.
5. On partial failure, disclose saved and unsaved elements. Resume from remote state, finish missing files, reconcile unindexed metadata and deduplicate events. Do not delete saved evidence to hide incomplete writes.

Use available Git CLI, contents APIs or Git-tree APIs; inspect runtime tool signatures. Local generation and download links are not verified repository saves.


## Temporal intake extension (additive to schema v1)
Older records remain readable: missing timestamps mean unknown, never inferred from a Git commit or backfilled as the ingestion time. Existing client activities remain supported. New mixed intake uses a shared journal and timeline as the source; client files link to those records rather than duplicate their facts.

### Canonical source and derived records
- `journal/YYYY-MM/<message-id>.json`: append-only relevant work input. Fields: `id`, `source_ref` (message ID/link when exposed, otherwise an honest local reference), `said_at` (ISO timestamp with offset or null), `said_at_precision` (second/minute/date/unknown), `recorded_at` (actual storage-preparation timestamp), `timezone` (IANA), `text`, `record_ids`. Preserve the relevant original wording; omit unrelated personal chatter and secrets. Never label a paraphrase as verbatim. With date-only source information preserve `said_date` and leave `said_at` null.
- `timeline/YYYY-MM/<record-id>.json`: one independently meaningful fact, activity, decision, plan, preference or correction, filed by capture month. Fields: `id`, `source_ids`, `client_ids` (possibly empty/multiple), `topics`, `kind`, `summary`, `association_status` (resolved/pending/general), `said_at`, `recorded_at`, `timezone`, `temporal`, `certainty`, `supersedes` (nullable prior record ID). Each `temporal` object holds `event_date`, `event_at`, `planned_date`, `planned_at`, `due_date`, `effective_from`, `effective_to`, `original_expression`, `precision`, `resolution_basis`, `needs_clarification`; unknown values are null. Use only appropriate fields; plans are not completed activities.
- `timeline/index.json`: schema_version 1, `records` array of ID, path, client_ids, topics, kind, said_at and relevant event/planned/due dates; `pending_ids` for unresolved associations/dates. Initialize lazily. Read this index during intake/resume alongside existing indexes; enumerate actual metadata if stale.
- `followups/index.json`: schema_version 1, `items` with ID, source/record links, client_ids/topics, summary, owner (nullable), planned_at/planned_date/due_date, status (open/blocked/done/cancelled), last_verified_at, and append-only dated `history`. This supports general and cross-client commitments. Continue reading existing per-client followups, deduplicating by ID/reference. Do not maintain two competing copies of one commitment.

### Temporal interpretation and lifecycle
Capture per-message timestamps from available message metadata, including the offset applicable on that date. Use an actual clock for recorded_at; never substitute it for said_at. Resolve yesterday/tomorrow from the originating message's local date. Preserve date-only precision and phrases such as “evening.” Resolve “in a week” when unambiguous; retain “next week” as a range or unresolved expression unless a day is supplied. Use date-appropriate IANA timezone rules across daylight-saving changes, never a permanently fixed UTC offset.

Keep historical source/claim records immutable. A correction, changed association, reschedule or updated fact creates a new linked record with its own said_at and recorded_at; append follow-up history and update indexes/current views without deleting previous states. Reclassification resolves pending status through a linked correction, leaving the original attribution visible. Deduplicate against stable source IDs and content before saving retries.

On return, compare current local time to planned/due dates; for date-only plans avoid assuming the day's event has already occurred. Passed date means “outcome not yet confirmed,” not done or cancelled. Record actual event date only when reported; retain original planned date and reschedules. Record confirmation time separately from event time. Refresh relevant stale observations without discarding useful background or open commitments. For “what did we know then?” use said_at; for “what happened that week?” use supported event dates. Unknown dates stay explicitly unknown.

Save journal, derived records, current views and indexes as one coherent commit when possible, following the existing concurrency/read-back protocol. Never claim persistence until verification. When showing a client-specific report, include only relevant, audience-appropriate portions of multi-client sources; do not expose full mixed-message journal text.
