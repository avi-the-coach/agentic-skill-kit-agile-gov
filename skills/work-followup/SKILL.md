---
name: work-followup
description: Review and maintain work commitments, identify relevant next actions, and prepare focused meeting or daily briefs from private context.
version: 1.0.0
---

# Work Follow-up

## Name and purpose
Turn existing context and commitments into a useful next-action conversation or focused brief, with reliable follow-up state. Origin: [Skill Request #4](https://github.com/avi-the-coach/agentic-skill-kit-agile-gov/issues/4).

## When to use
"What is still open?", "What should I focus on?", "Prepare me for this meeting", "What did I promise?", rescheduling, completion or cancellation updates. Hebrew: מה פתוח, על מה לעקוב, תכיני אותי לפגישה, מה הצעד הבא.

## When not to use
Do not replace a weekly/executive report, claim automatic monitoring, send messages, edit a calendar or create reminders just because a date is present. Use `skills/weekly-work-review/SKILL.md` for requested reports. Route explicit external actions to available runtime tools within their authorization rules.

## Inputs
Required: user goal/scope and accessible relevant context or user-supplied commitments. Durable state changes require a verified private writable workspace.
Optional: upcoming meeting details, selected calendar/source records, deadlines, dependencies, prior decisions and user priorities. No live calendar access is assumed.

## Information to collect
Ask only consequential gaps: which meeting/client if ambiguous, desired time horizon, actual outcome of an expired plan, unknown owner/date if needed. Do not invent urgency or assume a proposed next action is a user commitment.

## Interaction
Use `system/INTERACTION-GUIDELINES.md`. Start with a few high-value items and one contextual question when needed. New evidence is passed once to work-memory. Routine intake does not trigger a full report interview.

## Process
1. Use `skills/work-memory/SKILL.md` to recover relevant private context under `system/PRIVATE-WORKSPACE.md`. If storage is unavailable, explain it and use supplied information for an unsaved brief only with the user's agreement; never claim persistent tracking.
2. Read canonical general/cross-client follow-ups and relevant legacy per-client follow-ups, deduplicating by ID/source. Verify current context and corrections before using an old summary.
3. Distinguish open, blocked, done and cancelled. An elapsed date means outcome unconfirmed. Retain closed history. An appointment and the work discussed in it are separate unless evidence links them.
4. Select matters by the user's goal, explicit deadlines, dependencies and known impact. Label inferred priorities as suggestions; state gaps rather than assign unsupported risk scores.
5. Prepare a focused brief: relevant context, unresolved decisions/commitments, a few useful questions and proposed next steps. Apply `system/WORK-CONTEXT-AUDIENCE.md`; private coaching reflection requires its own explicit request.
6. When the user confirms a change, route it through work-memory, retain the commitment ID and append history. Do not maintain a competing task list. Track open commitments even if omitted from the latest brief.
7. If a durable brief is requested, use the report snapshot/revision rules with an appropriate scope/profile; no fabricated weekly period. Otherwise the brief may remain in chat while supported state changes are persisted.
8. Verify saves and summarize remaining unknowns. Recording or reviewing a commitment does not schedule background work.

## Output
Primary: a focused action/meeting brief and, when evidence changes, verified updates to existing follow-up records. Optional durable brief only when useful/requested.
No automatic external distribution.

## Quality checks
Current sources and dates; no completion inferred from elapsed time; evidence versus suggested next steps; correct audience; no duplicate task store; supported changes recorded with history and verified.

## Assets and code
- `system/PRIVATE-WORKSPACE.md`: shared storage and save protocol.
- `system/WORK-CONTEXT-AUDIENCE.md`: disclosure rules.
- `skills/work-memory/SKILL.md`: persistence and recovery.
- `references/acceptance.md`: synthetic scenarios.
No scheduler, server or third-party service is installed by this skill.

## Examples
- "Before my meeting with Project Cedar, what should I raise?": recover relevant decisions and open commitments, not the entire engagement history.
- An old pilot date passed: ask whether it happened, moved or was cancelled.
- "Remind me tomorrow at nine": use the runtime's supported automation workflow if authorized; do not pretend a JSON follow-up alone will notify the user.
