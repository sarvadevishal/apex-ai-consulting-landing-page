# CLAUDE.md — Claude Code Instructions

## Project Overview
This is an AI consulting services landing page project. It uses a 4-agent pipeline to go from research → insights → copy → working application. Read System.md for the full project context before doing any work.

## Agent Execution Order
Always run agents in this sequence. Never skip a step.

1. **Researcher** (`agents/researcher.md`) → writes `research/raw_research.md`
2. **Consolidator** (`agents/consolidator.md`) → reads raw research, writes `consolidated/insights.md`
3. **Copywriter** (`agents/copywriter.md`) → reads insights + System.md, writes `copy/landing_copy.md`
4. **Builder** (`agents/builder.md`) → reads copy + System.md, writes `app/index.html`, `app/styles.css`, `app/script.js`

## File Paths (absolute, do not change)
```
agents/researcher.md
agents/consolidator.md
agents/copywriter.md
agents/builder.md
research/raw_research.md
consolidated/insights.md
copy/landing_copy.md
app/index.html
app/styles.css
app/script.js
```

## Rules for All Agents
- Write complete, production-ready output — no TODOs, no placeholders
- Each agent reads its input files before writing output
- Builder must produce a visually polished, fully responsive page
- All CTAs must link to `#contact` (the contact form section)
- The contact form must use `method="POST"` with `action="https://formspree.io/f/YOUR_FORM_ID"` (user replaces ID)

## Tech Stack Constraints
- No React, Vue, or any JS framework
- No npm, no build step — pure static files
- CSS must use custom properties (`--color-primary`, etc.)
- JS must be minimal: only smooth scroll, form validation, mobile nav toggle
- Must pass Lighthouse score >90 for Performance, Accessibility, Best Practices

## Deployment
```bash
# Deploy to Vercel
vercel --prod
# Or connect the repo to Vercel dashboard for auto-deploy
```

## When Adding New Sections or Features
- Keep the 13-section structure defined in System.md
- Do not add sections without user approval
- Any copy changes go through copywriter agent first

## Do Not
- Do not use inline styles (use CSS classes)
- Do not hardcode colors outside of `:root` CSS variables
- Do not commit API keys or form IDs
- Do not use jQuery or any CDN-loaded library without user approval
