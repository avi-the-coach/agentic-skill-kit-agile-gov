---
name: weekly-work-review
description: Prepare, revise and finalize weekly reviews, executive snapshots and short status messages using shared private work context.
version: 2.0.0
---

# Weekly Work Review & Reporting

## Name and purpose
Create evidence-aware, audience-appropriate reports from shared work memory, preserving history and approved revisions.
Origin: [Skill Request #2](https://github.com/avi-the-coach/agentic-skill-kit-agile-gov/issues/2). SAA separation: [Skill Request #4](https://github.com/avi-the-coach/agentic-skill-kit-agile-gov/issues/4).

## When to use
Weekly reviews, client reports, executive snapshots, WhatsApp statuses, report corrections or content approval. Hebrew: דוח שבועי, דוחות לקוחות, דוח מלא, דוח מסמך, סטטוס וואטסאפ.
The directory/name remain stable for existing users and private instructions.

## When not to use
Plain intake/setup/resume belongs to `skills/work-memory/SKILL.md`; commitment review and meeting preparation to `skills/work-followup/SKILL.md`. If an older instruction routes those requests here, immediately delegate to the appropriate skill without a report interview.
Do not distribute reports or schedule work without an explicit request. Annual work-plan creation remains a separate future capability; existing plans may be inputs. Sales/pricing/contract analysis is outside this skill.

## Inputs
Required: work scope, audience/purpose, report window or explicit as-of snapshot, and updates or an honest indication of missing updates. Durable versions require an accessible verified private writable workspace.
Optional: prior reports, imported snapshots, goals, relevant activities/follow-ups and private presentation preferences.

## Information to collect
Reuse known context; fill only scope/period, audience, format or material factual gaps. Propose explicit dates for "this week"; do not fabricate week boundaries. For a current-status request with no weekly window, label an as-of snapshot and follow the shared contract.
Use private client ordering/grouping and templates if established. An index alone does not establish complete scope.

## Interaction
Follow `system/INTERACTION-GUIDELINES.md`. First reporting use covers scope/period, audience/format, updates and review; skip known areas. Ask contextual questions about changes and open commitments rather than retelling engagement history.

## Process
1. **Recover.** Invoke `skills/work-memory/SKILL.md` for relevant context. Read `system/PRIVATE-WORKSPACE.md` and `system/WORK-CONTEXT-AUDIENCE.md`. Verify privacy/access before private data; if saving is unavailable, explain the limitation and provide an explicitly unsaved one-off draft only with user agreement.
2. **Find history.** Load selected clients' latest earlier finalized reports (including aggregate reports), newer unresolved drafts, same-period revisions, relevant activities and open commitments. Reconcile stale/missing indexes against actual metadata. If no previous final exists, say so and use attributed imported snapshots where available.
3. **Reconcile.** Pass new updates/corrections once through work-memory. Use work-followup when commitment review is needed. Respect newest supported corrections, distinguish missing updates from inactivity and planned work from completion. Never turn a private assessment into a factual blocker.
4. **Compose.** Read `references/reporting-profiles.md`; choose `templates/status-full.md`, `templates/status-whatsapp.txt` or `templates/report.md`. Apply private format preferences before defaults. Choose recent meaningful progress, decisions and next steps; preserve qualifiers and honest knowledge cutoff. Filter audience-eligible facts before embedding any data in artifacts.
5. **Review.** Show the draft and briefly describe material memory changes/gaps. A request to draft, format or send is not automatically content approval. If the user clearly accepts an identified report's content, create a new final revision with approval timestamp; do not leave accepted content silently marked draft. Ask only if the approved version or extent of approval is ambiguous. Format-template approval alone does not finalize a report.
6. **Save and verify.** Use immutable revision files and metadata/indexes under the canonical contract. Finalization and corrections produce new revisions; never overwrite old ones. Use current head/concurrency checks and remote read-back. Disclose partial failures accurately. No separate shadow memory store.
7. **Handoff.** Provide the chosen report format and saved link when appropriate, identify draft/final and coverage, and leave enough indexed state to resume. Report approval never authorizes external distribution.

## Output
Primary: a dated report and metadata, normally Markdown source with requested presentation, saved in the user's private workspace. Hebrew HTML uses `lang="he" dir="rtl"`.
Secondary: shared memory/follow-up changes only when supported by new evidence; no duplicate events.

## Quality checks
- Scope, audience, period/as-of date and revision align across content and metadata.
- Achievements trace to evidence; old plans and unchanged context are not new progress.
- Current corrections and older open commitments are considered.
- Sensitive material is excluded from the entire artifact payload, including embedded JSON, exports and comments.
- Private report preferences are honored without copying them into shared templates.
- Prior drafts/finals remain retrievable; explicit content acceptance is reflected in a new final revision.
- Remote saves and index references are verified; no false persistence or distribution claims.

## Assets and code
- `system/PRIVATE-WORKSPACE.md`: canonical persistence contract.
- `system/WORK-CONTEXT-AUDIENCE.md`: canonical disclosure policy.
- `references/reporting-profiles.md`: profile selection and imported-report interpretation.
- `templates/status-full.md`, `templates/status-whatsapp.txt`, `templates/report.md`: generic output scaffolds.
- `references/acceptance.md`: reporting and compatibility scenarios.
- Legacy `references/workspace-contract.md`, `references/audience-boundaries.md` and `templates/client-context.md` forward to canonical assets.
No executable runtime dependency is required.

## Examples
- "Prepare this week's report": recover history, establish dates/audience, gather only missing updates.
- "Record today's meeting" via an older reporting entry: delegate to work-memory; no report required.
- "What is open before tomorrow's meeting?": delegate to work-followup.
- "This exact report is approved": create and verify the next final revision, retaining the draft.
