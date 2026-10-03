# Artifact Guidelines

## Default rule

A skill should normally end with a durable artifact the user can download, reuse, edit, share, or feed into another workflow.

Chat text is primarily for:

- collecting inputs,
- explaining choices,
- resolving ambiguity,
- summarizing the result,
- and handing off the artifact.

## Choose the format by utility

Examples:

- **DOCX** — briefs, canvases, reports, narratives, plans, decision documents.
- **PDF** — polished fixed-layout sharing or print-ready handoff.
- **XLSX** — prioritization, scoring, tracking, models, structured analysis.
- **PPTX** — presentations, workshops, stakeholder communication.
- **CSV** — portable tabular data.
- **Markdown** — portable text/source documentation.
- **HTML** — interactive or web-friendly artifacts/forms where supported.
- **JSON/YAML** — machine-readable structured outputs.
- **Images** — visual maps/diagrams when image output is the useful deliverable.

A skill may produce multiple formats when each has a clear purpose, but avoid generating redundant files by default.

## Artifact requirements

Unless the skill says otherwise, artifacts should:

- be complete enough to use without reading the chat transcript,
- have a clear title and context,
- distinguish facts, assumptions, and open questions when relevant,
- preserve useful source attribution,
- use sensible formatting,
- include version/date metadata when helpful,
- and use a descriptive filename.

## Suggested filenames

Use human-readable names such as:

`Product-Canvas-Acme-v1.docx`

`Feature-Prioritization-Q1.xlsx`

Avoid generic names such as `output.docx`.

## Source preservation

If the artifact is based on supplied files, research, or external sources, preserve citations/links/source notes when useful for traceability.

## Environment limitations

Artifact creation depends on the tools available in the current agent environment.

If the preferred output cannot be created:

1. use the closest useful supported format,
2. preserve the content/structure needed to recreate the preferred format later,
3. briefly state the limitation.

Do not silently replace a materially different artifact type.

## Quality before handoff

Before handing off an artifact, check:

- Does it answer the requested outcome?
- Is it internally consistent?
- Is it usable without the conversation?
- Are placeholders intentional and clearly marked?
- Are calculations and transformations validated?
- Is the filename meaningful?
