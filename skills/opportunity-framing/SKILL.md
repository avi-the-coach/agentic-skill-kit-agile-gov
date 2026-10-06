---
name: opportunity-framing
version: 0.1.0
status: draft
primary_artifact: docx
tags:
  - product-management
  - service-design
  - opportunity-framing
  - strategy
  - pre-discovery
---

# Opportunity Framing

## 1. Name and purpose

Turn an initial idea, pain point, perceived need, or proposed solution into a clearly framed, evidence-aware opportunity linked to organizational strategy, and determine whether there is enough justification and clarity to proceed to Product Discovery.

This is a **pre-discovery** capability. It helps an organization decide what is worth exploring before investing in discovery, solution design, procurement, development, or AI.

The skill must not assume that the user's initial idea is the right problem, that a new product is required, or that technology is the appropriate response.

## 2. When to use

Use this skill when the user wants to:

- examine an early idea, need, service gap, operational pain, or proposed initiative;
- separate a stated problem from a proposed solution;
- understand who is affected, where in the current process the problem occurs, and why it matters;
- connect an opportunity to an approved organizational strategy or strategic objective;
- decide whether an opportunity is sufficiently understood and justified to enter Product Discovery;
- create a concise Opportunity Brief for management discussion or handoff to a discovery workflow.

Typical trigger phrases include “we have an idea”, “we identified a need”, “should we explore this?”, “how does this connect to strategy?”, “before discovery”, “new service idea”, or a request to frame an opportunity before deciding on a solution.

## 3. When not to use

Do not use this skill as the primary workflow when the user mainly needs:

- execution of Product Discovery or user research;
- interviews, surveys, field research, or evidence collection from users;
- solution ideation or detailed comparison of solution concepts;
- product strategy development;
- a Product Canvas for an already framed product initiative;
- feature definition, prioritization, roadmap planning, or delivery planning;
- a business case, procurement decision, or investment approval.

This skill may recommend that one of those capabilities should follow.

## 4. Inputs

### Required

At minimum, enough context to identify one of the following:

- an idea;
- a pain point;
- a perceived need;
- a service or process gap;
- a proposed solution that needs to be reframed as a problem/opportunity.

Unknowns are valid inputs. Do not invent missing facts merely to complete the brief.

### Optional

Use any relevant available inputs before asking the user:

- approved and dated strategy documents;
- strategic objectives, plans, policies, or management priorities;
- information about target users, beneficiaries, employees, partners, or other affected groups;
- current process or service description;
- operational, service, financial, behavioral, or research data;
- existing user/customer research;
- known solutions, systems, services, or process improvements already available;
- constraints, regulation, policy, technology, budget, timing, or organizational dependencies;
- stakeholder and ownership information;
- prior briefs, canvases, presentations, notes, spreadsheets, URLs, or outputs from other skills.

An approved strategy is valuable but is **not required** to begin.

## 5. Information to collect

The skill covers approximately seven information areas:

1. **Initial signal** — what idea, pain, need, gap, or proposed solution triggered the work.
2. **Affected audience and context** — who experiences the difficulty, in what situation or process stage, and how.
3. **Impact** — what consequence the current situation creates for users, the organization, service outcomes, risk, cost, quality, or other relevant outcomes.
4. **Evidence state** — what is supported by evidence, what is an assumption, what is unknown, and what sources exist.
5. **Strategic relevance** — which approved strategic objective the opportunity may contribute to and by what mechanism.
6. **Existing context and constraints** — current process, capabilities, solutions, ownership, policy, dependencies, and significant constraints.
7. **Pre-discovery decision** — whether the opportunity is sufficiently framed and justified to proceed to Product Discovery.

Do not ask for information already available in the conversation, supplied files, connected sources, or earlier answers.

## 6. Interaction

Follow `system/INTERACTION-GUIDELINES.md`.

When several information areas are missing, tell the user approximately how many material areas remain and offer:

1. **Sequential interview** — one meaningful question at a time, adapting later questions to earlier answers.
2. **Batch** — all material questions together.

Default to sequential interview.

During the interaction:

- ask only questions that can materially change the framing or gate decision;
- treat “unknown” as a legitimate answer;
- challenge solution-shaped statements by asking what underlying problem or outcome they are intended to address;
- probe broad claims such as “users need this” or “this supports the strategy” by asking what evidence or strategic objective supports them;
- distinguish clarification from discovery: do not begin user research or primary evidence collection inside this skill;
- surface contradictions instead of silently resolving them.

## 7. Process

1. **Inspect the available context**
   - Review the conversation and relevant supplied or connected materials.
   - Identify the status and authority of important sources, especially strategy documents.
   - Note missing or conflicting inputs.

2. **Separate problem from proposed solution**
   - Identify solution language such as a requested system, application, automation, AI capability, new role, or new process.
   - Reframe it as the underlying difficulty, need, outcome, or opportunity.
   - Do not assume the proposed solution is necessary.

3. **Frame the opportunity**
   Produce a concise opportunity statement that makes explicit:
   - who is affected;
   - in what context or process stage;
   - what difficulty or unmet need exists;
   - what consequence it creates;
   - what is known versus assumed.

   Prefer a form similar to:

   “For [audience], when [context], [problem/need] creates [impact]. We currently know [evidence], while [assumptions/unknowns] remain unresolved.”

4. **Classify evidence and uncertainty**
   For material claims, distinguish:
   - `evidence` — supported by a cited source, observation, research, data, or authoritative document;
   - `assumption` — plausible but not sufficiently validated;
   - `unknown` — not yet established.

   Preserve source names, dates, links, and status when available.
   Never present an assumption as a fact.

5. **Assess strategic alignment**
   - When an approved strategy is available, link the opportunity to the most specific relevant strategic objective.
   - Explain the causal logic: how addressing the opportunity could contribute to that objective.
   - Characterize the link as **strong**, **plausible but unproven**, **weak**, or **not established**.
   - If the strategy or target is unavailable, outdated, or not approved, state that explicitly.
   - A proposed strategic objective may be suggested for discussion only when clearly marked **not approved**.

6. **Review current context without doing solution discovery**
   - Identify existing process, services, systems, policies, capabilities, and known alternatives that may affect whether the opportunity is real or material.
   - Surface important constraints, ownership, dependencies, and known duplication.
   - Do not conduct detailed solution ideation, solution scoring, or technology selection.
   - Do not assume development or AI is required.

7. **Assess whether the opportunity merits Product Discovery**
   Use one of four handoff states:

   - **Ready for Discovery** — the opportunity is sufficiently clear and strategically relevant, with enough evidence or justified uncertainty to warrant deliberate discovery.
   - **Needs Clarification** — basic framing information is missing and should be obtained before starting discovery.
   - **Reframe** — there appears to be a meaningful issue, but the current problem, audience, scope, or strategic framing is materially misleading or too solution-led.
   - **Park / Stop** — current evidence and strategic relevance do not justify further investment at this time.

   The gate is a recommendation, not an executive approval.

8. **Define the discovery handoff**
   - If the state is **Ready for Discovery**, identify the smallest set of questions or assumptions that Product Discovery should investigate next.
   - Do not answer those questions inside this skill unless the answers already exist in supplied evidence.
   - If another gate state applies, state what must change or be clarified before discovery.

9. **Create the Opportunity Brief**
   - Use `templates/opportunity-brief-template.md` as the content structure.
   - Keep the brief concise enough to fit roughly 1–2 pages in a normal document layout.
   - Prefer a durable editable DOCX artifact when the runtime supports it.
   - If DOCX generation is unavailable, produce the closest useful editable document format, preferably Markdown.
   - The brief must stand alone without requiring the chat transcript.

## 8. Output

### Primary artifact

A 1–2 page **Opportunity Brief** containing:

- Opportunity / problem statement
- Affected audience and context
- Evidence, assumptions, and important unknowns
- Impact / why the issue matters
- Strategic alignment and strength of the link
- Current context, known existing capabilities, and material constraints
- Pre-discovery gate recommendation
- Rationale for the gate
- Questions / assumptions to carry into Product Discovery
- Decisions or approvals still required
- Source and status notes

Suggested filename:

`Opportunity-Brief-<ShortName>-v1.docx`

### Discovery handoff contract

When the gate is **Ready for Discovery**, the Opportunity Brief is intentionally structured to act as a primary input to a future Product Discovery skill.

A downstream discovery workflow should be able to consume, at minimum:

- the framed opportunity;
- target/affected audience;
- current evidence;
- assumptions and unknowns;
- strategic objective and alignment rationale;
- constraints and context;
- discovery questions;
- known stakeholders/owners and required approvals when available.

The downstream skill should not require the user to re-enter this information if the brief is supplied.

## 9. Quality checks

Before handoff, verify:

- The problem/opportunity is not merely a disguised solution request.
- The affected audience and context are explicit or intentionally marked unknown.
- Material claims are distinguishable as evidence, assumptions, or unknowns.
- Sources and their status are preserved when available.
- No data, source, policy, strategy, or approval status has been invented.
- The strategic link names a specific objective when available and explains the contribution logic.
- Weak or unsupported strategic alignment is stated plainly.
- The skill has not drifted into Product Discovery, solution selection, or implementation planning.
- Development, procurement, automation, or AI are not assumed to be necessary.
- The gate recommendation follows from the available evidence and gaps.
- The artifact identifies the next questions rather than pretending they are already answered.
- The Opportunity Brief is concise, internally consistent, and usable without the conversation.
- The gate is presented as a recommendation requiring appropriate business/management judgment, not as an already approved decision.

## 10. Assets and code

- `templates/opportunity-brief-template.md` — canonical content structure for the 1–2 page Opportunity Brief.

No script or schema is required in v0.1. Add them later only if repeated use shows that deterministic rendering, validation, or structured handoff materially improves execution.

## 11. Examples

No worked example is included in v0.1.

A good execution may end with **Ready for Discovery**, but it is equally valid to recommend **Needs Clarification**, **Reframe**, or **Park / Stop** when the available evidence and strategic logic do not justify discovery.
