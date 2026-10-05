---
name: pi-feature-readiness-review
version: 0.1.1
status: draft
primary_artifact: xlsx
tags:
  - product-management
  - pi-planning
  - feature-readiness
  - refinement
---

# PI Feature Readiness Review

## 1. Name and purpose
Review a portfolio of features before PI Planning and provide coaching-oriented feedback that helps teams improve clarity, value, scope, acceptance criteria, sizing, decomposition, dependencies, risks, and ownership.

This skill is a refinement aid, not a governance gate. It should not decide whether a feature is allowed into a PI.

## 2. When to use
Use when the user wants to review features for PI Planning readiness, identify feature-quality gaps before planning, receive refinement recommendations and questions, analyze features in a spreadsheet, or use the standard PI Feature Readiness input template.

## 3. When not to use
Do not use as a binary go/no-go approval process, a substitute for product/architecture/delivery/business judgment, a generic feature prioritization method, or a detailed story-quality review when the primary unit is individual stories.

## 4. Inputs
Preferred input: `templates/pi-feature-readiness-template.xlsx`, with sheets `Instructions`, `Features`, `Stories`, and `Dependencies`.

`Feature ID` is the stable key linking the sheets. Never use Excel row numbers as identifiers.

Minimum required fields: Feature ID, Feature Name, Description.
Recommended context: Target User / Beneficiary, Business Value / Outcome, In Scope, Out of Scope, Team, Owner, Priority, Acceptance Criteria, Estimate / Size, Risks / Assumptions, Notes.

## 5. Information to collect
If no features or workbook were supplied, ask the user to upload a completed workbook and offer the standard empty Excel template.

When the user asks for the standard template, provide the direct raw-download link so the XLSX downloads immediately rather than linking to the GitHub file-view page:

`https://github.com/avi-the-coach/agentic-skill-kit-agile-gov/raw/refs/heads/main/skills/pi-feature-readiness-review/templates/pi-feature-readiness-template.xlsx`

If a non-standard workbook is supplied, work with it when the structure is understandable, identify the mapping to standard fields, state material fields that could not be mapped, and recommend the standard template for future runs.

## 6. Interaction
This is primarily file-driven and normally does not require an interview before analysis. Validate feature identifiers and cross-sheet references before reviewing content. Use a constructive, specific, non-judgmental coaching tone.

## 7. Process
1. Read Features, Stories, and Dependencies.
2. Validate Feature IDs for uniqueness and referential integrity.
3. Build full context per feature from all sheets.
4. Review each feature using `references/review-criteria.md`.
5. For every dimension produce: Observation, Why it matters, Recommendation, Questions to resolve.
6. Supporting indicators: Strong, Could be clearer, Needs attention, Missing information.
7. Overall guidance: Well Prepared, Minor Refinement Suggested, Refinement Recommended, Significant Clarification Needed.
8. Overall guidance reflects refinement need, not PI admission.
9. Do not invent missing product information; surface the gap and suggest questions/actions.
10. Create a new review workbook; do not overwrite the source.

## 8. Output
Primary artifact: XLSX review workbook.

Recommended sheets:
- `Feature Review`: source fields plus overall guidance, dimension indicators, observations, recommendations, questions, and next actions.
- `Summary`: feature count, guidance distribution, recurring themes, dimensions needing attention, and major cross-feature dependency/information patterns.
- `Review Guide`: criteria and indicator definitions for transparency.

## 9. Quality checks
Ensure every reviewed row maps to exactly one Feature ID; validate story/dependency relationships; base feedback only on supplied evidence; do not silently treat missing data as failure; make recommendations actionable; keep overall guidance consistent with detailed feedback; do not frame the output as formal approval/rejection; ensure the workbook stands alone.

## 10. Assets and code
- `templates/pi-feature-readiness-template.xlsx` — preferred input template.
- `references/review-criteria.md` — qualitative review rubric.

## 11. Example feedback
Observation: The benefit is stated broadly but the expected change is not clear.
Why it matters: Without a clearer outcome, teams may optimize for different interpretations of success.
Recommendation: Describe the customer or business outcome the feature is expected to influence.
Questions to resolve: Which customer behavior, operational result, or business metric should improve?
