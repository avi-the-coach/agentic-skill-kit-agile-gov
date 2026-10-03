# Improving Skills

## Goal

Improve reliability, usefulness, reuse, and artifact quality without creating unnecessary complexity or breaking established behavior.

## Before changing a skill

1. Read the current `SKILL.md`.
2. Read any supporting assets relevant to the requested change.
3. Check `skills/INDEX.md` for how the skill is currently described/routed.
4. Identify whether the issue is:
   - routing,
   - missing/poor inputs,
   - interaction design,
   - workflow/reasoning,
   - template/form quality,
   - script/code quality,
   - artifact quality,
   - examples/documentation,
   - or scope.

## Improvement principles

- Preserve useful existing behavior unless the change intentionally replaces it.
- Prefer fixing the smallest layer that solves the problem.
- Move repeated behavior into shared system guidance when multiple skills need it.
- Do not create new subskills solely to make the directory look organized.
- Split a skill only when behavior, workflow, or outcomes have genuinely diverged.
- Keep conversation fallback working even when a form/UI enhancement exists.
- Validate scripts before relying on them.
- Keep outputs usable as standalone artifacts.

## After a material change

- Update the skill's metadata/version if used.
- Update examples or assets affected by the change.
- Update `skills/INDEX.md` if routing, purpose, inputs, outputs, or tags changed.
- Re-check the skill against `system/SKILL-SPEC.md`.

## Improvement evidence

When possible, improve skills based on concrete evidence such as:

- user feedback,
- observed failure modes,
- confusing questions,
- missing data,
- inconsistent artifacts,
- repeated manual corrections,
- or new reusable workflows.

Avoid speculative complexity without a demonstrated need.
