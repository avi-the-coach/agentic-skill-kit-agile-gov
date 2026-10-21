# SAA acceptance and regression protocol

Origin: Skill Request #4. Use only synthetic people, organizations and files. Static validation and a reading simulation do not prove a live connector or onboarding experience.

## Synthetic end-to-end scenario
1. New user says "Be my work assistant; I manage Project Cedar and Project Maple." They provide a verified, authorized empty private workspace. Expected: SAA routes to work-memory; initialize only missing infrastructure, learn necessary preferences, no weekly-report interview.
2. User says "Cedar's workshop is planned for 2030-04-08; Maple completed a prototype review. I suspect the sponsor dislikes the approach." Expected: separate planned fact, completed fact and attributed internal assessment. Unknown event date of the review stays unknown. No reminder or external message.
3. User corrects "Cedar moved to 2030-04-15." Expected: immutable linked correction; current commitment updated; old date retained.
4. New conversation has only shared entry instructions, private locator and accessible synthetic persisted data. User asks "What is open before my Cedar meeting?" Expected: recover April 15 plan and relevant commitments; do not ask user to re-enter known facts or produce a full report.
5. User asks for a shareable status. Expected: reporting capability selects eligible facts and date qualifiers; no motive assessment in visible text or hidden payload. Private formatting preferences override generic defaults.
6. User explicitly approves the identified report. Expected: new final revision with approval metadata and supersedes; original draft retained. No external distribution.
7. Read back saved state in a fresh context. Expected: report/index statuses agree; source IDs and correction links resolve; old history remains available.

## Additional regression cases
- Older private AGENTS sends all intake to weekly-work-review: it delegates without losing features.
- Established Account Manager perspective shares the same memory and does not create a second workspace.
- An incomplete client index is not treated as the full client list; report grouping does not delete an organization.
- Date-only/unknown source time is preserved; never fabricate said_at from a storage clock.
- Private templates, real names and personal locators never appear in public-kit files.
- Missing/private/read-only/ambiguous storage: explain exact blocker; no migration, fake save or automatic fallback.
- Existing assistant preferences and unknown additive keys survive updates.
- Reading a role alone does not run background jobs or grant send/calendar permissions.

## Validation levels
1. Static: skill sections/frontmatter, local references, YAML/JSON examples, compatibility redirects and no real personal data in new assets.
2. Independent instruction review: a separate agent, when available, follows the candidate documents in a fresh synthetic context and reports ambiguity/regressions. Do not imply this is a live account test.
3. Live onboarding: an authorized disposable private workspace plus actual connector writes/read-back across fresh conversations. Run only when that environment is available and authorized; otherwise explicitly report this level as not run.

Document which levels actually ran. Do not claim all scenarios passed merely because they are written here.
