# Skill Specification

## Definition

A skill is a reusable agent capability that transforms inputs into a useful outcome and, by default, a durable artifact.

A skill is **not** just a prompt.

A complete skill defines:

1. what outcome it creates,
2. when it should be used,
3. what inputs it can consume,
4. how missing information is collected,
5. what process the agent follows,
6. what tools/code/assets may be used,
7. what artifact is produced,
8. and how quality is checked.

## Required file

Every skill lives in its own directory and must contain:

`skills/<skill-name>/SKILL.md`

Supporting directories are optional:

- `templates/`
- `forms/`
- `scripts/`
- `examples/`
- `references/`
- `schemas/`
- `assets/`

## Required SKILL.md sections

### 1. Name and purpose
State the capability and intended outcome.

### 2. When to use
Define clear triggers and relevant user intents.

### 3. When not to use
State important boundaries or adjacent cases better served elsewhere.

### 4. Inputs
Separate required and optional inputs. Inputs may include text, structured answers, files, URLs, datasets, repository content, or outputs from other skills.

### 5. Information to collect
List missing information that may need to be elicited from the user.

### 6. Interaction
State whether the standard interview protocol is sufficient or whether the skill needs a specific interaction flow.

### 7. Process
Give a repeatable, ordered workflow. Include analysis, transformations, tool use, code execution, validation, and synthesis as needed.

### 8. Output
Define the primary artifact and optional secondary artifacts. Specify format expectations when important.

### 9. Quality checks
List the checks the agent performs before handoff.

### 10. Assets and code
Reference supporting repository files and explain when/how to use them.

### 11. Examples
Provide examples when they materially improve reliable execution.

## Design principles

- Build for reuse across multiple users and roles.
- Prefer one coherent capability over a collection of unrelated tasks.
- Do not split a skill merely because it has multiple templates or artifact variants.
- Split when the required reasoning, inputs, workflow, or outcome is materially different.
- Keep shared behavior in system guidance rather than duplicating it across skills.
- The skill should remain usable through normal conversation even if an enhanced form/UI is unavailable.
- Forms and interactive UI are enhancements, not mandatory dependencies.
- Prefer deterministic templates/scripts for repeatable transformations and calculations when useful.
- Keep instructions concise enough that an agent can execute them reliably.

## Metadata

A small YAML front matter block is optional when useful for machine-readable routing, for example:

```yaml
---
name: feature-prioritization
version: 0.1.0
status: draft
primary_artifact: xlsx
tags:
  - prioritization
  - product-management
---
```

Do not move the entire skill into YAML. The main instructions should remain readable Markdown.
