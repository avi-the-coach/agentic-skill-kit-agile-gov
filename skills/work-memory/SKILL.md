---
name: work-memory
description: Initialize, recover and maintain private work context from free-form updates, notes, corrections and preferences without requiring a report.
version: 1.0.0
---

# Work Memory & Context

## Name and purpose
Preserve reliable, source-linked work context across conversations, independently of any report or role. Origin: [Skill Request #4](https://github.com/avi-the-coach/agentic-skill-kit-agile-gov/issues/4).

## When to use
"Remember this", "record this meeting", "continue where we left off", mixed-client updates, corrections, imported notes, private-workspace setup and user preferences. Hebrew: תזכרי, תרשמי, עדכון, תיקון, אזור אישי, נמשיך.

## When not to use
No unrelated personal-data collection, silent account-wide ingestion or model-training claim. Repository creation is onboarding; report composition belongs to `skills/weekly-work-review/SKILL.md`, prioritizing commitments to `skills/work-followup/SKILL.md`. Do not require either skill for ordinary intake.

## Inputs
Required for durable saves: authorized destination, verified private visibility, read/write tools and work information supplied or selected by the user.
Optional: source documents, relevant connected records, existing context, activities, follow-ups, preferences and reports. Empty authorized workspaces are valid.

## Information to collect
Only gaps that affect the work: destination if ambiguous; scope and source access; identity when association matters; source date/timezone when resolving relative dates. Keep unknowns explicit. A report period or audience is not required to save an ordinary work update.

## Interaction
Use `system/INTERACTION-GUIDELINES.md`. Accept dictation and topic switching. Explain necessary setup, then ask one contextual question at a time; do not request all clients before saving a clear update.
Save clear parts of a mixed update and retain unresolved associations privately. A durable-memory relationship authorizes relevant ordinary intake within its agreed scope, not indiscriminate storage of unrelated conversation.

## Process
1. Read `system/PRIVATE-WORKSPACE.md` and `system/WORK-CONTEXT-AUDIENCE.md`. Discover the destination, verify privacy before reading work data, read private instructions/configuration and relevant indexes. If access fails, explain the exact limitation; with user agreement provide an explicitly unsaved note. Never use the public kit as fallback.
2. Initialize only missing infrastructure in an authorized workspace. Follow the canonical minimal files and lazy temporal indexes; do not invent content. A generic 404 is not evidence of an empty repo.
3. Recover relevant client/general context, timeline records and current follow-ups. Consult reports only when needed as historical evidence or for a reporting task. Check actual records when an index is stale; do not treat index membership as a complete scope inventory.
4. Triage the input into independently meaningful facts, activities, decisions, plans, corrections or preferences. Store one journal source, then linked claim records with source/capture/event/planned times and disclosure classification. Keep verbatim versus paraphrased text explicit. Resolve relative dates from the source message, not today's processing time.
5. Reconcile evidence: preserve prior claims; append corrections with supersedes links; update current context and affected commitments with history. Do not mark plans done because their dates passed. Separate a planned process session from another calendar call unless identity is established.
6. Store cross-client records once with multiple links; keep general topics with no invented client. Keep grouping/display preferences separate from organization identity. Personal assessments and coaching strategy remain internal and attributed.
7. Import old notes/reports as dated sources, not newly finalized output. Preserve source_as_of, submission and capture time separately, retain variants/conflicts and don't infer every event occurred on the document date.
8. Save journal, derived records, current views and indexes coherently using the canonical save protocol; deduplicate retries and verify remote content. Follow-up state is maintained here when changed by intake; work-followup uses the same records.
9. Briefly confirm saved facts and unresolved details. Route to follow-up or reporting only if requested or useful for the current intent. Never claim that reading a source alone saved it.

## Output
Primary: verified private context/journal/timeline updates and affected current follow-ups or preferences. A short acknowledgement is sufficient; no standalone report is mandatory.
Secondary: pending associations and source-linked input for other skills.

## Quality checks
Verify privacy and destination; provenance and honest timestamps; identities and uncertainty; no duplicate claims; old records retained; indexes resolve; remote save verified; no personal data copied into public assets.
Preserve private naming, audience and format preferences; no global assistant persona or signature defaults.

## Assets and code
- `system/PRIVATE-WORKSPACE.md`: canonical schema, initialization, time and persistence.
- `system/WORK-CONTEXT-AUDIENCE.md`: intake classification and safe disclosure.
- `templates/client-context.md`: optional new-client context scaffold.
- `references/acceptance.md`: synthetic scenarios.
No executable runtime dependency is required. Use supported repository/file tools.

## Examples
- "Project Cedar moved from April 8 to April 15": preserve the old date, link the correction, update its open commitment; no reminder is scheduled.
- "The workshop happened; I suspect the sponsor is avoiding a decision": split operational evidence from an attributed internal assessment.
- "Use short hyphen lists in my updates": save the user's scoped preference privately; do not edit the shared default.
