---
name: product-canvas
version: 0.1.0
status: draft
primary_artifact: visual-canvas
tags:
  - product-management
  - product-framing
  - discovery
  - alignment
---

# Product Canvas

## 1. Name and purpose

Create a concise, visual **Product Canvas** that gives a team a shared view of a product or product initiative: who it is for, what problem it addresses, why it matters, what outcomes define success, what solution direction is being considered, and what remains uncertain.

The capability is not a form-filling exercise. The agent should synthesize available context, expose contradictions and gaps, distinguish evidence from assumptions, and produce a canvas that is useful for product discussion and decision-making.

## 2. When to use

Use this skill when the user wants to:

- create, fill, refresh, or review a Product Canvas;
- frame a new product or product initiative;
- align stakeholders around users, problems, value, outcomes, and solution direction;
- turn scattered product notes/research into a coherent one-page product view;
- expose key assumptions, risks, evidence gaps, and next learning questions.

Typical trigger phrases include “product canvas”, “product framing”, “one-page product view”, “visual product brief”, or a request to align a product idea on one visual board.

## 3. When not to use

Do not use this skill as the primary workflow when the user mainly needs:

- a detailed PRD or functional specification;
- a business model or financial model;
- a delivery roadmap or release plan;
- feature prioritization/scoring;
- a full product strategy;
- customer research execution;
- an experiment plan.

A Product Canvas may feed those capabilities later.

## 4. Inputs

### Required

At minimum, enough context to identify:

- the product or initiative;
- the intended user/customer or a clear statement that this is still unknown;
- the problem/opportunity or a clear statement that this is still unknown.

Unknowns are valid inputs. Do not invent answers merely to complete the canvas.

### Optional

Use any relevant available inputs before asking the user:

- free-form product description;
- interview answers;
- product briefs, PRDs, decks, research, analytics, roadmaps, strategy documents;
- customer/user research;
- market or competitor information;
- stakeholder notes;
- URLs and public sources;
- prior artifacts or outputs from other skills.

## 5. Information to collect

The canvas covers approximately eight major information areas:

1. **Product / Vision** — what the product or initiative is and what change it aims to create.
2. **Target Users / Customers** — who experiences the problem or receives the value.
3. **Problems / Needs** — important pains, needs, jobs, or opportunities.
4. **Current Alternatives** — what users do today instead, including “do nothing”.
5. **Value Proposition** — why the proposed product/direction is valuable.
6. **Business Outcomes & Success Metrics** — why the organization cares and how success can be observed.
7. **Key Capabilities / Solution Direction** — the minimum solution-level view needed to communicate the direction, without prematurely producing a feature backlog.
8. **Assumptions, Risks, Evidence & Open Questions** — what is known, believed, risky, or still needs learning.

Do not ask for information already present in the conversation, files, connected sources, or prior answers.

## 6. Interaction

Follow `system/INTERACTION-GUIDELINES.md`.

When several information areas are missing, tell the user that the canvas has roughly eight areas and offer:

1. **Sequential interview** — one meaningful question at a time, adapting based on previous answers.
2. **Batch** — all material questions together.

Default to sequential interview.

During the interview:

- ask only questions that materially affect the canvas;
- probe vague claims such as “users need this” by asking what evidence exists;
- allow “unknown” as an explicit answer;
- periodically summarize important assumptions or contradictions;
- do not require cosmetic details such as colors or exact layout unless the user asks.

## 7. Process

1. **Gather existing context**
   - Inspect the conversation and relevant supplied/connected materials.
   - Extract candidate statements for each canvas area.

2. **Normalize and classify**
   - Rewrite content into concise, decision-useful statements.
   - Classify material claims as:
     - `evidence` — supported by a source, observation, research, or data;
     - `assumption` — plausible but not sufficiently validated;
     - `unknown` — explicitly unresolved or lacking enough information.
   - Never upgrade an assumption to evidence merely because it sounds credible.

3. **Identify material gaps**
   - Determine which missing areas would meaningfully weaken the canvas.
   - Collect only those gaps using the interaction protocol.

4. **Synthesize the product logic**
   - Check whether the chain is coherent:
     target user → problem/need → value proposition → business outcome → success metric → solution direction.
   - Surface contradictions rather than silently resolving them.
   - Keep solution detail proportional to the maturity of the problem understanding.

5. **Create the canonical data model**
   - Structure the final content according to `schemas/product-canvas.schema.json`.
   - Preserve sources or source notes when available.
   - Keep each item short enough to work visually.

6. **Render the visual canvas**
   - Use `templates/product-canvas.html` as the visual reference and fallback implementation.
   - Preserve the board/grid metaphor rather than turning the output into a linear report.
   - Use visual status markers for evidence, assumptions, and unknowns.
   - Optimize for a single-screen / one-page overview when practical, while allowing sections to grow when the content requires it.

7. **Choose the runtime-native output**
   Use the best native artifact surface available in the current agent environment:

   - **ChatGPT / OpenAI agent with a native Canvas or equivalent editable artifact surface:** create the Product Canvas in that native surface, using the HTML template/layout as the rendering specification. Prefer an editable canvas over a plain chat response.
   - **Claude with Artifacts available:** create the Product Canvas as a Claude Artifact, preferably self-contained HTML using the supplied template/layout.
   - **Any other environment, or when the native surface is unavailable:** generate a self-contained downloadable `.html` file using the supplied template.
   - If runtime identity is unclear, detect capabilities rather than guessing the vendor. Fall back to downloadable HTML.

   The content model and visual structure must remain equivalent across environments even when the rendering mechanism differs.

8. **Handoff**
   - Provide the artifact.
   - Briefly call out the most consequential assumptions/open questions if they affect how the canvas should be interpreted.
   - Do not duplicate the entire canvas in chat.

## 8. Output

### Primary artifact

A visual **Product Canvas** containing:

- Product / Vision
- Target Users / Customers
- Problems / Needs
- Current Alternatives
- Value Proposition
- Business Outcomes
- Success Metrics
- Key Capabilities / Solution Direction
- Assumptions & Risks
- Evidence & Open Questions

### Rendering preference

1. Native ChatGPT/OpenAI Canvas or equivalent editable artifact surface, when available.
2. Claude Artifact, when available.
3. Standalone self-contained HTML file.

### Visual expectations

The canvas should:

- read as a board of distinct blocks/cards rather than a report;
- have clear visual hierarchy and whitespace;
- remain legible on a desktop screen and when printed/exported to PDF;
- use short statements rather than long paragraphs;
- visually distinguish `Evidence`, `Assumption`, and `Unknown`;
- include product name, version/date, and optional owner/context metadata;
- be usable without reading the chat transcript.

Suggested fallback filename:

`Product-Canvas-<ProductName>-v1.html`

## 9. Quality checks

Before handoff, verify:

- The target user/customer is explicit or intentionally marked unknown.
- Problems/needs are expressed as user/customer problems rather than disguised features.
- The value proposition corresponds to the stated problems/needs.
- Business outcomes are not confused with delivery outputs.
- Success metrics are observable and not merely “launch X”.
- Key capabilities do not become an unprioritized feature dump.
- Evidence, assumptions, and unknowns are visibly distinguishable.
- Sources are preserved when available.
- Contradictions and material gaps are surfaced.
- The artifact is visually scan-friendly and usable without the conversation.
- The chosen rendering follows the runtime preference order above.
- Standalone HTML output has no required external dependency.

## 10. Assets and code

- `schemas/product-canvas.schema.json` — canonical structured representation of the canvas.
- `templates/product-canvas.html` — self-contained visual HTML template and fallback artifact.
- `examples/example-product-canvas.json` — worked example of the canonical data model.

No script is required in v0.1. A renderer script may be added later if deterministic generation across runtimes becomes valuable.

## 11. Examples

See `examples/example-product-canvas.json`.

A good execution may begin with an incomplete idea, interview the user only for material gaps, and still leave some fields marked as assumptions or unknowns. Completeness is less important than truthful product logic.
