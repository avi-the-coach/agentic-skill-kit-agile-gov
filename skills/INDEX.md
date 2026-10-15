# Skills Index

This is the routing layer for the skill library.

Agents should read this file before opening individual skills. Use it to identify the smallest relevant set of skills for the user's request.

## How to use this index

Each skill entry should contain:

- **Name**
- **Path**
- **Purpose**
- **Use when**
- **Typical inputs**
- **Primary artifact**
- **Tags**
- **Relevant roles** (optional)

Open a skill's `SKILL.md` only after identifying it here as relevant.

## Available skills

### Product Canvas

- **Path:** `skills/product-canvas/SKILL.md`
- **Purpose:** Turn product context, evidence, assumptions, and open questions into a coherent visual Product Canvas for alignment and decision-making.
- **Use when:** The user wants to create, fill, refresh, review, or synthesize a visual one-page product canvas or product-framing board.
- **Typical inputs:** Product descriptions, structured interview answers, customer/user research, briefs, PRDs, analytics, strategy material, stakeholder notes, URLs, and prior artifacts.
- **Primary artifact:** Visual Product Canvas rendered in the runtime's best native artifact surface (ChatGPT/OpenAI Canvas-equivalent, Claude Artifact) with standalone self-contained HTML as the fallback.
- **Tags:** `product-management`, `product-framing`, `discovery`, `alignment`, `canvas`
- **Relevant roles:** Product Manager, Product Coach

### PI Feature Readiness Review

- **Path:** `skills/pi-feature-readiness-review/SKILL.md`
- **Purpose:** Review feature quality and planning readiness before PI Planning and provide coaching-oriented feedback that helps teams improve clarity, value, scope, acceptance criteria, sizing, decomposition, dependencies, risks, and ownership.
- **Use when:** The user wants to review a portfolio of features for PI Planning, identify refinement gaps, or use the standard PI feature input workbook.
- **Typical inputs:** Standard XLSX template containing Features, Stories, and Dependencies; non-standard feature spreadsheets when mapping is feasible.
- **Primary artifact:** XLSX review workbook with feature-level feedback, recommendations, questions, and portfolio summary.
- **Tags:** `product-management`, `pi-planning`, `feature-readiness`, `refinement`, `agile`
- **Relevant roles:** Product Manager, Product Coach, Agile Coach

### Opportunity Framing

- **Path:** `skills/opportunity-framing/SKILL.md`
- **Purpose:** Turn an early idea, pain point, perceived need, or proposed solution into an evidence-aware, strategy-linked opportunity and determine whether it is ready to proceed to Product Discovery.
- **Use when:** The user wants to frame an opportunity before discovery, separate a problem from a proposed solution, assess strategic relevance, or decide whether an early need is sufficiently justified and understood to explore further.
- **Typical inputs:** Initial ideas or pain points, proposed solutions, strategy documents and objectives, target audience/process context, existing evidence and data, current capabilities, constraints, ownership information, and prior artifacts.
- **Primary artifact:** Polished, standalone, self-contained HTML Opportunity Brief (roughly 1–2 pages) designed for executive review and as a handoff input to a downstream Product Discovery workflow.
- **Tags:** `product-management`, `service-design`, `opportunity-framing`, `strategy`, `pre-discovery`
- **Relevant roles:** Product Manager, Product Coach, Business Owner

### Prototype Builder

- **Path:** `skills/prototype-builder/SKILL.md`
- **Purpose:** Turn requirements or a rough idea into a polished standalone interactive prototype and contextual working specification, with persistent local data, reviewer comments and JSON exchange.
- **Use when:** The user wants to build or revise a prototype, stakeholder demo, usability walkthrough or interactive specification in ChatGPT or Claude Projects.
- **Typical inputs:** PRD/specifications, product canvases, meeting notes, operational challenges, free-form ideas, existing prototype HTML and review JSON.
- **Primary artifact:** One self-contained HTML file with embedded CSS/JavaScript; optional companion JSON data/review snapshot.
- **Tags:** `product-management`, `prototyping`, `requirements`, `usability`, `interactive-specification`
- **Relevant roles:** Product Manager, Product Coach, Business Analyst, Agile Coach



### Weekly Work Review & Reporting

- **Path:** `skills/weekly-work-review/SKILL.md`
- **Purpose:** Prepare weekly client reports with private context, activity history and follow-up continuity.
- **Use when:** Weekly reviews/reports, דוח שבועי, דוחות לקוחות, interim client updates, corrections or resuming last week's work.
- **Typical inputs:** Updates, notes, prior reports, goals and a verified private workspace.
- **Primary artifact:** Versioned report (Markdown source and optional HTML/chosen presentation) saved in the private workspace, with context/activity/follow-up updates.
- **Dependency:** Accessible private workspace; write access to persist. Creating a repository is optional onboarding, not a skill.
- **Tags:** `work-management`, `weekly-reporting`, `client-context`, `private-workspace`
- **Relevant roles:** Account Manager, Agile Coach, Consultant, Team Lead
