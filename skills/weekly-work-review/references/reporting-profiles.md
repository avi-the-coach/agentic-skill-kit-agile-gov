# Reporting profiles

## Select the requested product
- “דוח מלא”, “דוח מסמך”, “תמונת מצב מלאה”, full status: use `templates/status-full.md`.
- “דוח WhatsApp”, “סטטוס WhatsApp”, “וואטסאפ”: use `templates/status-whatsapp.txt`.
- Keep structured weekly reviews available through `templates/report.md`. For a bare “דוח”, reuse an established preference; otherwise ask one short format question.
- A content profile is independent of file type. “דוח מסמך” does not require DOCX unless requested. Use available artifact skills for chosen file types.
- Read private preferences for client ordering, audience, scope and language. Never hardcode one user's clients, names or facts into shared templates.

## Common content rules
Use a title and an honest as-of timestamp with timezone in metadata. Separate generated_at from knowledge_as_of. A freshly generated report based on old information must disclose that its information is last known as of the source date. Include a reporting window when established; do not invent week boundaries.
Organize by client/body; optionally lead with numbered “0. כללי” and finish with a cross-cutting initiative. Keep user-established numbering/order where useful.
Describe progress/outcomes, material obstacles/decisions, and relevant next steps. Include only supported information appropriate to the recipient. Remove duplicates, template instructions and empty headings. Do not repeat the entire engagement history.
Use latest supported claims, preserve unresolved contradictory claims privately, and phrase consequential uncertainty honestly in the report. Do not resolve approval discrepancies by guessing. Source references and detailed uncertainty tracking belong in private metadata; include source links in the audience version only when useful/requested.
An unchanged fact is not new progress. An overdue open commitment remains open until evidence resolves it.

## Full status
Write an executive snapshot across selected clients with enough context to explain current progress and implications. Use short coherent paragraphs per body, typically 1–3, with optional bullets for parallel items. Retain relevant ongoing context, major milestones and blockers; avoid a historical narrative. No compulsory separate risk/decision tables.
Default heading: “תמונת מצב”; subheading: “תקציר מנהלים – גופים מלווים”.

## WhatsApp status
Select recent meaningful actions, current blockers/decisions, and near-term next steps. Do not mechanically shorten every sentence in the full report or reproduce its background. Default focus: recent days and upcoming week; express exact coverage in metadata and use known user cadence. If evidence is stale, label it as last-known and do not present old plans as current.
Usually 1–3 short sentences or bullets per body, with exceptions for genuinely material complexity. Omit unchanged background. For a requested all-client view, mark missing updates briefly instead of silently implying no activity; otherwise omit inactive sections.
Use plain copy-ready text, blank lines between bodies, single asterisks for WhatsApp bold, optional restrained emoji. No Markdown tables, HTML, escaped asterisks or double-asterisk syntax. Preserve meaningful qualifiers when compressing, especially “planned”, “in principle”, “approved” and “not yet verified”.
Prepare text only; never send it without a separate explicit request.

## Import existing reports
Preserve the relevant supplied text and both variants in a private immutable source, identifying normalized whitespace if applicable. Record source_as_of, source timezone and precision independently from said_at and recorded_at. Report as-of is not the event date of every embedded statement.
Resolve relative expressions against the document's own as-of date when clearly anchored. In rolling documents with apparently stale/mixed wording, retain the expression and mark uncertainty instead of calculating a definitive date. Preserve exact dates as claims even when calendar evidence differs.
Variants are alternative representations, not two independent confirmations. Link repeated claims to one record and note which variants contain them. Keep omitted detail available privately. Preserve contradictory statuses as unresolved; do not rank versions merely by length or order.
Store imported reports as sources, with their approval status unknown unless specified. Do not add them as agent-generated finalized reports or invent a reporting-period start. Retrieve indexed imported snapshots as baseline when no prior finalized report exists, explicitly distinguishing the two.


## Audience safety
Apply `audience-boundaries.md` before selecting content for either profile and for dashboard derivatives. Default to audience-report; personal assessments and coaching strategies are excluded. Keep internal-reflection as a separately requested output, not a hidden section of the same artifact.
