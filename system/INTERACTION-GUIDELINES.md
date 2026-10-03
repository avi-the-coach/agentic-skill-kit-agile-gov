# Interaction Guidelines

## Goal

Collect enough context to perform high-quality work without turning the experience into an unnecessary questionnaire.

## Use existing context first

Before asking a question, check whether the answer is already available in:

- the current conversation,
- user-provided files,
- connected sources available to the agent,
- repository files,
- or earlier answers in the current skill flow.

Never ask the user to repeat known information.

## Structured discovery

When a skill requires multiple areas of information, first identify the major questions or information areas.

Tell the user approximately how many major questions/areas need to be covered and offer two modes:

1. **Sequential interview** — ask one question at a time and adapt later questions to earlier answers.
2. **Batch** — provide all questions together for the user to answer in one response.

### Default

Use **sequential interview** by default.

If the user has already expressed a preference for one mode in the conversation, honor it without asking again.

## Sequential interview behavior

- Ask one meaningful question at a time.
- Incorporate the answer before choosing the next question.
- Skip questions already answered.
- Probe when an answer reveals an important ambiguity or assumption.
- Avoid interrogative busywork: ask only what affects the artifact or decision.
- Periodically summarize when the flow becomes complex.

## Batch behavior

- Group related questions.
- Make required vs optional questions clear.
- Use a structure that is easy to answer inline.
- After the response, ask only targeted follow-ups for material gaps.

## Files and sources

When files or sources could materially improve the outcome, invite the user to provide them, but do not block progress when they are optional.

Possible inputs include documents, spreadsheets, PDFs, presentations, images, datasets, URLs, prior artifacts, customer research, analytics, roadmaps, or stakeholder material.

## Forms and structured UI

A skill may provide an optional form, schema, HTML UI, or other structured collection mechanism.

If the current environment supports it, the agent may use it. If not, fall back to conversational collection while preserving the same logical data model.

## Handoff

Before creating the final artifact:

- identify any critical assumptions,
- resolve material gaps when feasible,
- and avoid asking for cosmetic details that can safely use sensible defaults.

Chat should support the work; the durable artifact should normally contain the finished deliverable.
