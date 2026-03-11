# Deployment

## Purpose
How to build a project for production. The code-generator builds locally — deployment is handled by the user.

---

## SAFETY RULES — NON-NEGOTIABLE

The code-generator sub-agent MUST NEVER:
- Run `vercel`, `vercel --prod`, `npx vercel`, or any Vercel CLI command
- Run `netlify deploy`, `npx netlify-cli`, or any Netlify CLI command
- Run `git push`, `git remote`, or interact with remote repositories
- Create or modify `.vercel/`, `.netlify/`, or deployment configuration directories
- Trigger any CI/CD pipeline, webhook, or external deployment service
- Access, read, or modify existing deployment configs (`.vercel/project.json`, `netlify.toml` linking to live projects)

If asked to deploy, respond: "The project is built and ready at [path]. Deployment is handled manually by the user for safety."

---

## Local Build (What the Agent CAN Do)

### Production Build
```bash
# Build for production
npm run build
# Output: dist/ (Vite) or .next/ (Next.js) or out/ (static export)
```

### Build Verification Checklist
```bash
# 1. Clean production build
npm run build

# 2. No TypeScript errors
npx tsc --noEmit

# 3. Check bundle size
du -sh dist/  # Should be reasonable (< 5MB for most sites)

# 4. Preview production build locally
npx vite preview  # or npx next start

# 5. Verify responsive (use browser device toolbar)
# Check at: 375px (iPhone), 768px (iPad), 1440px (Desktop)
```

### Static Export (Next.js)
```typescript
// next.config.ts
const config = {
  output: 'export',
  images: { unoptimized: true },
}
export default config
```
```bash
npm run build
# Output is in out/ — ready for manual upload
```

---

## What the User Does After Build

The agent reports: "Build successful at /path/to/project/dist/"

The user can then choose to:
1. Preview locally: `npx vite preview` or `npx serve dist/`
2. Deploy to a NEW Vercel project: `cd /path/to/project && vercel` (interactive setup)
3. Deploy to Netlify: `cd /path/to/project && netlify deploy --prod`
4. Upload to any static host manually

This separation ensures agents never touch production infrastructure.
