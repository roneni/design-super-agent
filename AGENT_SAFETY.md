# Agent Safety Rules

## Incident Background
On 2026-03-06, the code-generator sub-agent ran `vercel --prod` inside a project directory that contained an existing `.vercel/project.json` linked to the production `psychedelic-universe.com` site. This overwrote the live authorized deployment. Production was restored via `vercel promote`.

## Rule 1: No Deployment
Sub-agents MUST NEVER run deployment commands. This includes:
- `vercel`, `vercel --prod`, `npx vercel` (any flags)
- `netlify deploy`, `npx netlify-cli` (any flags)
- `git push` to any remote
- `npm publish`, `npx wrangler publish`, or any hosting CLI
- Any command that sends code to an external service

**The agent's job ends at `npm run build`.** The user deploys manually.

## Rule 2: No Existing Project Modification
Sub-agents MUST NEVER modify files inside directories that contain:
- `.vercel/project.json` — indicates a linked Vercel project
- `.netlify/` — indicates a linked Netlify project
- `.git/` with configured remotes pointing to production repos

If the agent needs to build a new project, it creates a fresh directory under `projects/agent-drafts/` with no deployment configs.

## Rule 3: Sandboxed Working Directory
All agent-generated code goes into: `projects/agent-drafts/<project-name>/`

This directory:
- Has no `.vercel/` or `.netlify/` configs
- Has no `.git/` with production remotes
- Is purely local — safe to experiment in
- Can be reviewed by the user before any deployment decision

## Rule 4: No Destructive Shell Commands on User Files
Sub-agents MUST NOT run:
- `rm -rf` on directories outside their working sandbox
- `git reset --hard`, `git push --force` on any repo
- Commands that modify files outside the project they were told to work on

## Rule 5: Escalation
If a sub-agent encounters a situation where it feels it needs to deploy, push, or modify infrastructure, it MUST:
1. Stop
2. Report back to the director: "This task requires deployment/infrastructure changes that are outside my safety boundary."
3. The director escalates to the user via AskUserQuestion

## Enforcement
These rules are enforced at four levels:
1. **Code-level guardrail** — `safe_bash` tool blocks deployment commands via regex patterns before execution. The code-generator does NOT have access to the standard `Bash` tool — only `safe_bash`, which rejects vercel, netlify, git push, npm publish, wrangler, firebase deploy, surge, heroku, fly.io, railway, and aws s3 sync. This is the PRIMARY enforcement — it cannot be overridden by prompts or briefs.
2. **System prompt** — Director told deployment is forbidden
3. **Sub-agent prompt** — Code-generator told deployment is code-blocked
4. **Agent definition** — Description states deployment is disabled

## For the User
When you want to deploy an agent-built project:
```bash
cd projects/agent-drafts/<project-name>
npx vite preview  # Review locally first
vercel             # Interactive setup — creates NEW project, you control the name
```
