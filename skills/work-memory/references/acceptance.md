# Work memory acceptance scenarios

Use synthetic data only. Evaluate observable behavior, not exact wording. Do not exercise writes against a real user's private workspace.

| Scenario | Expected behavior |
| --- | --- |
| Authorized empty private workspace | Initialize only missing configuration/indexes/instructions; no invented clients, reports or required report period. Verify remote save. |
| Missing creation tool | Guide onboarding; do not claim a repository was created. |
| Public, inaccessible, read-only or several candidate workspaces | Identify precise limitation/ambiguity; no public fallback, guessed destination or false persistence. |
| Mixed Project Cedar, Project Maple and general practice update | Store one source and distinct linked records; general topic needs no client ID. |
| Unknown person association | Save clear facts; preserve unresolved claim and ask only the consequential question. |
| Old source with relative dates | Resolve from source date; separate source/capture/event/planned times; unknown remains unknown. |
| Corrected date | Append correction and update current view/follow-up history, retaining original evidence. |
| Subjective motive plus operational fact | Keep internal assessment attributed and separate from the work fact. |
| Existing schema-v1 workspace and old private instructions | Read existing data without migration; legacy reporting path delegates to work-memory. |
| Retry after partial save or concurrent branch change | Reconcile remote state, deduplicate and merge; no force push or duplicate journal. |
| Formatting preference | Store it privately with provenance; shared defaults remain generic. |

End-to-end role routing and fresh-conversation checks: `roles/senior-agentic-assistant/references/acceptance.md`.
