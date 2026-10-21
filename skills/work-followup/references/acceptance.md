# Work follow-up acceptance scenarios

Use synthetic data only.

| Scenario | Expected behavior |
| --- | --- |
| "What should I raise before the Cedar meeting?" | Read relevant decisions and commitments, produce a focused brief; no report-period interview. |
| Planned date passed without outcome | Remains open/outcome-unconfirmed, not done or cancelled. |
| Rescheduled commitment | Retain ID and old planned date in history; update current date only with evidence. |
| Calendar call versus future workshop | Do not equate their dates or cancel a calendar event when only the workshop date is corrected. |
| Suggested next action | Label as proposal; do not treat it as a confirmed promise. |
| Duplicate general/per-client follow-up | Deduplicate by source/ID; no competing lists. |
| User confirms completion | Pass evidence to work-memory, append history and verify the persisted state. |
| Date mentioned without reminder request | No background job created. Explicit reminder requests use supported runtime automation tools. |
| Confidential assessment in meeting brief | Apply audience rules; no sensitive content hidden in an export. |
| No private write access | Explain unsaved nature, do not promise future tracking. |

End-to-end role routing and fresh-conversation checks: `roles/senior-agentic-assistant/references/acceptance.md`.

A durable meeting brief without a weekly window follows the shared as-of snapshot convention with report_kind `meeting-brief`, an explicit coverage statement, distinct scope and matching revision/index metadata. Stale source evidence is not refreshed by the brief's generation date.
