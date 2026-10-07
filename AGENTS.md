# Agent Operating Guide

## Purpose

This repository is a shared capability system for agents working on product management, product development, organizational agility, coaching, leadership, and adjacent work.

It is designed to support two modes:

1. **Use** — discover and execute an existing skill.
2. **Build / Improve** — create a new skill or improve an existing one so future agents can reuse it.

This file is the entry point. Read it first.

## Operating rule

For every user request:

1. Understand the user's desired outcome.
2. Read `skills/INDEX.md` before opening individual skills.
3. If a relevant skill exists, open that skill's `SKILL.md` and only the supporting files needed for the task.
4. If a role is explicitly relevant, consult the appropriate file under `roles/` for contextual guidance. Roles are views over skills; they do not own skills.
5. Execute the skill according to its instructions and the shared system rules.
6. When practical, finish with a durable downloadable artifact rather than only chat text.
7. If no suitable skill exists, either complete the task directly when simple, propose/build a reusable skill when the user is asking to create it, or use the shared Skill Request mechanism for reusable capability gaps that should be considered by the repository maintainers.

## Skill discovery

`skills/INDEX.md` is the lightweight catalog.

Do not read every skill to find the right one. Use the index to identify likely candidates, then open only the selected skill(s).

A skill is a reusable capability, not merely a prompt. A normal skill may include:

- instructions,
- structured questions,
- templates,
- forms or schemas,
- scripts or executable code,
- examples,
- references,
- and artifact-generation assets.

## Interaction defaults

Follow `system/INTERACTION-GUIDELINES.md`.

Important default: when a skill needs several questions answered, tell the user how many major questions/areas need to be covered and offer:

1. **Sequential interview** — one question at a time.
2. **Batch** — all questions at once.

Default to sequential interview unless the user prefers otherwise.

Do not ask for information that is already available in the conversation, supplied files, connected sources, or prior answers.

## Inputs

Skills may accept one or more of:

- free-form user text,
- answers to structured questions,
- uploaded files,
- documents, PDFs, spreadsheets, presentations, images,
- URLs and public sources,
- repository files,
- datasets,
- previous artifacts,
- structured forms or schemas,
- outputs of other skills.

Use available inputs before requesting additional information.

## Outputs and artifacts

Follow `system/ARTIFACT-GUIDELINES.md`.

Default principle:

> A skill should produce the most useful durable artifact for the task. Chat is primarily the interaction and handoff layer, not the final deliverable.

The artifact format should fit the work: DOCX, PDF, XLSX, PPTX, CSV, Markdown, HTML, image, structured JSON/YAML, or another appropriate format.

If the environment cannot create the preferred artifact type, create the best supported alternative and clearly state the limitation.

## Code and tools

A skill may include code under directories such as `scripts/`.

When supported by the current environment, agents may:

- read code from this repository,
- run it,
- use its output,
- modify it,
- generate files,
- and, when explicitly requested and authorized, commit improvements back to the repository.

Never assume code is safe merely because it is in the repository. Inspect unfamiliar scripts before execution and respect the current environment's security/tool constraints.

## Repository write permissions and build-vs-request routing

When the user asks to create, build, add, or materially improve a skill, determine whether the current agent can write changes back to this repository before choosing the workflow.

Use this routing rule:

1. **Repository code write access is available** — if the connected GitHub identity/tooling clearly has permission to write repository contents (for example push/write/maintain/admin capability), treat the request as a build/improvement request and follow the relevant build guidance.
2. **Repository code write access is not available** — do not pretend to build the shared repository skill and do not stop at a local draft. Treat the request as a Skill Request: help the user formulate it and, with explicit approval, submit an Issue using `system/SKILL-REQUESTS.md`.
3. **Permission is unknown** — when the environment supports inspecting repository permissions, check them. If permission cannot be verified, do not assume repository write access. Explain the limitation and use the Skill Request path instead.
4. **Issue access is separate from code write access** — a user may be unable to push code but still be able to open an Issue in this public repository. If the agent has GitHub Issue write capability, it may create the Issue after explicit user approval. Otherwise provide the public **Request a new skill** Issue Form.

Never attempt repository code changes on behalf of a user when the connected identity lacks the required repository write permission.

## Building and improving skills

For new skills, follow:

- `system/SKILL-SPEC.md`
- `system/BUILDING-SKILLS.md`

For improving existing skills, also follow:

- `system/IMPROVING-SKILLS.md`

When adding or materially changing a skill, update `skills/INDEX.md` in the same change.


## Skill requests and capability gaps

Follow `system/SKILL-REQUESTS.md` when a user wants a reusable capability that is not currently available and they are not asking you to build it immediately.

Default behavior:

1. Check `skills/INDEX.md` first to avoid duplicate requests.
2. Distinguish a one-off task from a reusable capability gap.
3. If it is reusable, briefly explain that no matching skill currently exists and offer to submit a Skill Request to this repository.
4. Never create an Issue on the user's behalf without their explicit approval.
5. If approved and the environment has GitHub Issue write access, create the Issue directly using the repository's Skill Request structure. Otherwise, direct the user to the repository's **Request a new skill** Issue Form or provide a ready-to-paste request.
6. Use the Issue thread as the durable conversation for missing information, decisions, status, implementation links, and closure.
7. When a new skill is implemented from a request, comment on the originating Issue with the skill path/link and close it as completed. When practical, preserve the originating Issue number in the skill documentation for traceability.

## Architecture principles

- **Skills are capabilities.**
- **Roles are contextual views and guidance over capabilities.**
- Keep skills reusable across roles.
- Do not duplicate a skill merely because multiple roles use it.
- Split skills based on materially different agent behavior/workflows, not merely because there are different output documents.
- Prefer progressive disclosure: index → skill instructions → only needed supporting assets.
- Keep the repository understandable to both agents and humans.

## Repository map

- `GPT-PROJECT-INSTRUCTIONS.md` — small bootstrap text to copy into a GPT Project / Agent.
- `AGENTS.md` — this operating guide and system entry point.
- `skills/INDEX.md` — skill catalog and routing layer.
- `skills/<skill-name>/SKILL.md` — individual skill instructions.
- `system/SKILL-SPEC.md` — required structure and quality bar for skills.
- `system/BUILDING-SKILLS.md` — how to create new skills.
- `system/IMPROVING-SKILLS.md` — how to improve existing skills.
- `system/INTERACTION-GUIDELINES.md` — shared user interaction patterns.
- `system/ARTIFACT-GUIDELINES.md` — shared artifact/output rules.
- `system/SKILL-REQUESTS.md` — shared workflow for requesting, refining, implementing, and closing reusable capability requests.
- `.github/ISSUE_TEMPLATE/skill-request.yml` — public GitHub Issue Form for new skill requests.
- `roles/` — optional role-specific context, workflows, principles, and recommended skill collections.
