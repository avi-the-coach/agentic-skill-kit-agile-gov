# Private workspace contract — schema v1

Canonical shared infrastructure for work-memory, work-followup and reporting. Extracted from weekly-work-review in Skill Request #4; schema and stored paths remain compatible. This document is authoritative; legacy references forward here.

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

Private `AGENTS.md` must instruct: verify privacy; use latest shared kit instructions and `skills/INDEX.md`; route intake/setup/resume to `skills/work-memory/SKILL.md`, commitment review to `skills/work-followup/SKILL.md` and reports to `skills/weekly-work-review/SKILL.md`; read configuration/indexes; load only relevant work context; preserve revisions; no distribution; verify remote saves. Existing private instructions that refer to the older reporting entry remain supported through its compatibility routing. Keep the actual workspace locator only in private configuration. Repository creation is onboarding. An empty GitHub repository may require an initial contents-create commit before Git-tree operations. Verify each initialization write and resume only missing files after partial failure.

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
1. Resolve and verify the workspace; read private instructions, configuration and relevant indexes. Initialize only missing authorized infrastructure.
2. Recover context and source-linked records for the current goal, including general/cross-client topics where relevant. Read current follow-ups for commitment-related work.
3. Apply linked corrections and dated context changes before relying on older snapshots. Indexes locate records; they do not prove a complete client list or that no newer source exists.
4. Read report history when producing a report or when it supplies relevant historical evidence. For a report, find each selected client's latest earlier final by period end then revision, including aggregates; inspect newer drafts separately and same-period revisions before choosing a new version.
5. Compare relevant due/planned dates without inferring completion. Unknown event dates remain unknown.
6. If indexes are missing/inconsistent, enumerate actual records/metadata and reconcile. Do not demand a report period merely to resume memory or record a note.

## As-of snapshots and focused briefs
A current-status snapshot or durable meeting brief need not invent a reporting week. Use the existing revision layout with `period.start = period.end = snapshot_date`, where snapshot_date is the local date of the requested view (default: the current local date in the established timezone).
Add metadata `report_kind: "snapshot"` or `"meeting-brief"`, `snapshot_date`, `generated_at`, `knowledge_as_of` (nullable when not established), and a plain `coverage` explanation. Here the one-day period is a storage bucket for the view, not evidence that all described activity happened on that date.
Use a distinct scope ID for a separately maintained audience/profile, such as `example-client-meeting-brief`, and the same immutable draft/final rules. Display "as of" or a meeting-brief title; do not label this a complete weekly report. Preserve each claim's own event/planned/source dates.
If the user specifically needs a weekly activity report and its window is unknown, clarify/propose actual boundaries instead of silently substituting a snapshot.
Historical documents with unknown reporting periods remain imported sources; do not manufacture dates for them. Current snapshot generation does not refresh stale evidence.

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


## Imported snapshots and format profiles (v1.2 additive)
Journal sources may add `source_as_of`, `source_as_of_precision`, `source_timezone`, `text_fidelity` and `variants`. Derived timeline records retain source_as_of; do not use it as event_date unless evidence supports that date. Timeline indexes may add source_as_of for baseline retrieval. Consult indexed snapshot sources when relevant, including when reporting has no finalized earlier report.
Private reporting preferences may add `profiles`, `client_order`, `cross_cutting_topics` and `source_ref`. Reports may add `profile` (full-status/whatsapp-status/weekly-review), `generated_at`, `knowledge_as_of`, `coverage` and `source_snapshot_ids`. These additive fields never replace period, provenance or revision rules. When multiple formats share a report revision, list their files in metadata and keep their facts consistent; materially different windows/audiences need explicit metadata/scopes. Unknown historical periods must not be fabricated to fit a report directory: preserve these documents as indexed intake sources.


## Audience classification extension (v1.3 additive)
Add `content_class` (work-fact/personal-assessment/coaching-strategy/unclassified), `disclosure` (audience-scoped/internal-only), `audience_scope` (nullable profile IDs), `attributed_to`, and `classification_basis` to new claim records. Reflect classification in timeline indexes without repeating sensitive text. Personal-assessment and coaching-strategy default internal-only; unclassified is excluded until reviewed. Mixed journals stay internal-only regardless of derived work-fact eligibility. Missing legacy classification means unclassified: inspect relevant records on use; never bulk mark legacy records shareable. Preserve source history when recording a later reclassification.
Store private preferences under `reporting.audience_policy`, with a source reference. Report metadata may add `output_mode` (audience-report/internal-reflection), `audience_profile`, `disclosure_reviewed_at` and a minimal `disclosure_review_summary`; keep these private when they contain sensitive context. The review is evidence of a check, not a guarantee or send authorization.

## Optional assistant preferences (additive, no migration)
Private configuration may include `assistant` with `role`, language, work scope, conversational-initiative preferences, explicitly established external-action boundaries and source references. Missing values are unknown, not default permissions.
Use existing `assistant_identity`, `reporting` and other private keys where present; do not overwrite them or require duplicate settings. Persist only choices actually established with the user. Keep report formatting, client order/grouping and any private template paths in private configuration. No real persona, signature, footer or client list belongs in the shared kit.
Enabling a role never enables scheduled monitoring or external writes. Runtime authorization remains authoritative.

## Compatibility and responsibility
- `skills/work-memory/SKILL.md` is the intake/recovery capability; it can persist updates without producing a report.
- `skills/work-followup/SKILL.md` reviews commitments and delegates changed evidence to that same memory workflow.
- `skills/weekly-work-review/SKILL.md` composes/version-controls reports from the shared state.
- The storage contract and audience policy are infrastructure shared by all three. Roles select capabilities; they do not create separate stores.
- Existing `clients/`, `journal/`, `timeline/`, `followups/` and `reports/` paths and IDs remain valid. Legacy per-client activities/follow-ups remain readable; do not migrate merely because the kit changed.
- `clients/` is an existing storage label, not a requirement that every work topic be a client. General records may have empty client IDs.
- For authorization/access mismatches, unknown schemas or partial saves, explain the specific limitation and preserve evidence; never silently downgrade privacy.
