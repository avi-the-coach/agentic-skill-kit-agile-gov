# Skill Request Workflow

## Purpose

This workflow turns missing reusable capabilities into visible, trackable requests that humans and agents can refine together and, when accepted, implement as repository skills.

The GitHub Issue is the durable system of record for the request. Chat may help formulate or discuss the request, but material questions, decisions, status changes, and implementation outcomes should be reflected in the Issue thread.

## When to create a Skill Request

Create or offer a Skill Request when all of the following are true:

- no suitable skill is found after checking `skills/INDEX.md`;
- the requested capability is likely to be reused, not just a one-off task;
- the user is asking for the capability to exist in the shared skill kit, or agrees that it should be considered by the maintainers;
- the user explicitly approves creating the Issue on their behalf.

Do not create a Skill Request merely because an agent cannot complete a task in the current environment. Tool limitations and reusable skill gaps are different things.

## Before submitting

1. Read `skills/INDEX.md`.
2. If a likely existing skill is found, inspect its `SKILL.md` before deciding a gap exists.
3. Search open and closed Issues for an equivalent request when Issue search is available.
4. If an existing request already covers the capability, prefer linking to and continuing that Issue rather than creating a duplicate.

## Minimum request content

A useful request should capture as much of the following as is already known:

- **Requested capability** — what the agent should be able to do.
- **Desired outcome** — what useful result the user is trying to achieve.
- **Use cases / context** — when the capability would be used.
- **Typical inputs** — information, files, systems, URLs, or prior artifacts available to the agent.
- **Expected output** — the artifact, decision, transformation, or result expected at the end.
- **Why reusable** — why this belongs in the shared skill kit rather than being a one-off answer.
- **Examples / constraints** — optional concrete examples, edge cases, organizational constraints, or quality expectations.

Do not block submission because every field is not known. Missing information can be refined in the Issue conversation.

## Agent-assisted submission

When an agent is helping the user submit a request:

1. Synthesize the conversation into the request structure; do not make the user restate information already provided.
2. Show the user a concise summary if confirmation is needed.
3. Obtain explicit approval before creating the GitHub Issue.
4. Use a title beginning with `[Skill Request]` followed by a short capability name.
5. Create the Issue directly when GitHub Issue write access is available. Otherwise, direct the user to the repository's **Request a new skill** Issue Form and provide ready-to-paste content.
6. Return the Issue link to the user so they can follow the request.

## Triage and lifecycle

Maintainers and their agents should review requests and choose one of these outcomes:

- **Needs information** — ask focused questions in the Issue. Keep the request open.
- **Duplicate** — link the existing skill or Issue and close as duplicate/not planned as appropriate.
- **Accepted** — state that the request has been accepted and, when known, what will happen next.
- **In progress** — use the Issue thread to record meaningful implementation progress or links to related work.
- **Implemented** — comment with the new skill name and repository path/link, mention any important usage notes, then close the Issue as completed.
- **Declined / not planned** — explain the reason briefly and close as not planned.

Labels such as `skill-request`, `needs-info`, `accepted`, `in-progress`, `implemented`, `duplicate`, and `not-planned` are recommended when the repository supports them, but the workflow must remain understandable from Issue titles, comments, and state even without labels.

## Asking follow-up questions

Ask only for information needed to make a decision or design the capability. Prefer small batches or one focused question at a time when the request is ambiguous.

Questions should help clarify matters such as:

- the job to be done and desired outcome;
- who will use the capability and in what context;
- expected inputs and output artifact;
- repeatability and generalizability;
- constraints or non-negotiable requirements;
- whether an existing skill should be extended instead of creating a new one.

Do not run a full skill-design interview before accepting a request unless that depth is necessary. The Issue can start lightweight and become more detailed after acceptance.

## From accepted request to skill

When implementation starts, follow `system/BUILDING-SKILLS.md` or `system/IMPROVING-SKILLS.md` as appropriate.

If a new or materially changed skill is created:

- follow `system/SKILL-SPEC.md`;
- update `skills/INDEX.md` in the same change;
- preserve useful decisions and requirements from the Issue;
- when practical, include a simple origin reference such as `Origin: GitHub Issue #123` in the skill documentation or another appropriate traceability location;
- post the implementation link back to the Issue before closing it.

## Public Issue Form

The repository provides a GitHub Issue Form at:

`.github/ISSUE_TEMPLATE/skill-request.yml`

It is intentionally lightweight enough for humans while structured enough for agents to populate from a conversation.
