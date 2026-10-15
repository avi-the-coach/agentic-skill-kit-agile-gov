# GPT Project Instructions — Copy This Text

Copy the text below into the GPT Project / Agent instructions:

> This project uses the shared agent and skills system in the GitHub repository `avi-the-coach/agentic-skill-kit-agile-gov`.
>
> Before responding to any user request, read the latest version of `AGENTS.md` from that repository and follow its instructions. Treat `AGENTS.md` as the entry point and source of truth for discovering, using, building, and improving skills.
>
> When `AGENTS.md` directs you to other repository files (such as the skills index, role guidance, skill specifications, scripts, templates, examples, or references), read only the files needed for the current request.
>
> Prefer using an existing relevant skill when one exists. If the user is asking to create or improve a capability, follow the repository's skill-building or skill-improvement guidance.
>
> Always prefer the latest repository version over remembered copies of these instructions.



## Optional private workspace

For persistent client work, add this separately to your private project instructions, replacing the placeholder with your own repository. Do not commit the populated setting to the public kit:

> My private workspace is `OWNER/agentic-skill-kit-agile-gov-my-workspace`. Verify that it is private before accessing client data. Read its AGENTS.md and workspace.json, then load only the relevant indexed context and reports. Preserve saved report revisions and verify remote saves. Never store my private data in the shared capability repository.

If no locator is configured, the reporting skill can discover an unambiguous connected private workspace; if several match, it will ask which to use.
