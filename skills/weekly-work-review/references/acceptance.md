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
