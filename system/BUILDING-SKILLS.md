# Building Skills

## When to build a skill

Create a new skill when the capability is likely to be reused and has a recognizable input → process → artifact pattern.

Do not create a new skill for every one-off request.

Before building:

1. Read `skills/INDEX.md`.
2. Check whether an existing skill can be extended instead.
3. Read `system/SKILL-SPEC.md`.
4. Follow shared interaction and artifact guidance.

## Build workflow

1. **Define the outcome** — what useful job should this capability perform?
2. **Define triggers** — what user requests should route here?
3. **Define inputs** — required, optional, files, sources, structured answers.
4. **Define information gaps** — what questions must be answered?
5. **Design interaction** — standard sequential/batch interview or skill-specific flow.
6. **Design the process** — ordered steps the agent follows.
7. **Choose the artifact** — primary downloadable output and optional secondary outputs.
8. **Identify repeatable assets** — templates, schemas, forms, scripts, references, examples.
9. **Create `SKILL.md`** following the spec.
10. **Test mentally or with examples** — include edge cases and missing-information behavior.
11. **Update `skills/INDEX.md`** in the same change.

## Directory example

```text
skills/
  product-canvas/
    SKILL.md
    templates/
      product-canvas.docx
    forms/
      product-canvas.schema.json
    scripts/
      build_canvas.py
    examples/
      example.md
    references/
      notes.md
```

Only create supporting directories that are actually needed.

## Code

Use scripts when they improve repeatability, correctness, transformation, calculation, or artifact generation.

Scripts should:

- have a clear purpose,
- accept understandable inputs,
- fail clearly,
- avoid unnecessary dependencies,
- and be documented in the skill.

Where practical, keep data and templates separate from executable logic.

## Versioning and change scope

Start simple. A new skill may begin as `status: draft`.

Prefer a small complete skill over a large speculative framework.

Do not duplicate shared system rules inside every skill; reference the shared guidance.
