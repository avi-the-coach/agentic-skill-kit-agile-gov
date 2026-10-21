# Acceptance scenarios
Use synthetic data only; evaluate observable behavior rather than phrase matching. Do not test writes against real client data.

| Scenario | Expected behavior |
| --- | --- |
| Empty authorized private repository | Initialize configuration/indexes without invented clients or history; ask scope question. |
| Multiple workspace matches | Ask which; do not choose based on public-kit ownership. |
| Public/inaccessible/read-only workspace | Explain exact limitation; no public fallback or false save claim. |
| Fresh conversation | Recover earlier final, newer draft and open commitments; ask contextual questions. |
| Prior pilot plan, current meeting only | Report meeting; pilot remains unconfirmed. |
| Missing client update | Flag missing update, not no activity. |
| Draft then approval | Separate immutable draft/final revisions with approval and supersedes. |
| Correction to final | New revision, original retrievable. |
| Second week | New period directory and previous-period link. |
| Duplicate meeting notes | Reuse known source/event or clarify ambiguity. |
| Backdated/undated note | Separate event date from capture time. |
| Private assessment in client-facing report | Exclude assessment and unrelated client details. |
| Concurrent branch advance | Reread/merge; no force push or lost edits. |
| Failure before index write | Disclose partial save; recover orphan metadata on retry. |
| Stale index | Reconcile actual report metadata before claiming no history. |
| Unknown schema | No silent migration. |

Validate frontmatter, referenced asset paths, JSON examples and required sections. Forward-test a fresh-conversation scenario with a separate agent when available. Synthetic checks do not establish that a real user's report has been reviewed or saved.


## Free-flow and temporal cases (v1.1)
- Mixed clients plus a general topic: split records, link each appropriately, never require choosing one client first.
- Unknown person/client association: persist clear records, retain ambiguous record in pending queue and ask a targeted question.
- Yesterday and next week in an old message: resolve from source timestamp, preserve wording/precision; never use processing date.
- Rescheduled meeting and corrected past date: append linked records, retain original claim/planned date and separate confirmation timestamp.
- Due plan with no update: outcome remains unconfirmed on return; do not mark done or create a background reminder.
- Missing message time: store unknown/date-only precision rather than copying recorded_at into said_at.


## Reporting profile cases (v1.2)
- Full report requested: current executive snapshot per client; enough context without replaying all history.
- WhatsApp requested: recent progress and near-term next steps selected independently; single asterisks, no tables or sending.
- Old document ingested today: preserve document cutoff, submission and recorded time separately; do not claim all facts happened on the cutoff date.
- Full source says approved; shorter variant says in-principle: retain conflict; do not silently upgrade or downgrade approval.
- An expired plan in an imported source: leave outcome unknown; do not report completion.
- No prior generated final report but imported snapshot exists: use snapshot as attributed historical baseline, without finalizing it.
- Source contains actual clients: public templates contain placeholders only; all client data remains private.


## Audience boundaries (v1.3)
- Mixed intake contains a completed workshop, a personal judgment and a private persuasion plan: classify separately; normal status contains only appropriate workshop facts.
- A user's motive hypothesis is the only explanation of a delay: do not present the hypothesis or a euphemism as an established blocker.
- A dashboard hides sensitive notes in a modal, CSS or embedded JSON: fail the artifact; remove them from its payload.
- An internal coordination report is requested: do not treat it as personal-reflection authorization.
- Legacy records have no classification: inspect relevant content before selection; missing labels are not permission.
- An explicit personal reflection request: separate, labeled internal artifact; preserve dated attribution of views.

## SAA separation (v2.0)
- Legacy "record this" or "resume" invocation delegates to work-memory without a reporting interview.
- Legacy "what is open before my meeting" delegates to work-followup.
- Recovery and reporting use the same schema-v1 workspace; no forced migration or new memory store.
- Private profile/template overrides remain private; generic defaults do not replace established preferences.
- Explicit acceptance of a specific report creates a new final revision; approval of a template alone does not.
- Canonical contract/policy and legacy forwarding references resolve.
- Run `roles/senior-agentic-assistant/references/acceptance.md` for cross-capability continuity.

## As-of persistence regression
A requested current-status snapshot with no weekly window uses the canonical same-day snapshot storage bucket, explicit report_kind/snapshot_date/coverage metadata and an audience-specific scope. Index and metadata match; approval creates the next immutable final revision. Preserve claim event/planned/source dates and unknown knowledge_as_of. A historical source with unknown dates remains an imported source; a requested weekly activity report still establishes a real window.
