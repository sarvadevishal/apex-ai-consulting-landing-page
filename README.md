# APEX AI Consulting — Landing Page

A high-converting, 13-section AI consulting services landing page built entirely using a **4-agent AI pipeline** inside Claude Code. From research to deployed application — no manual copywriting, no manual coding.

**Live Demo:** [apex-ai-consulting-landing-page.vercel.app](https://apex-ai-consulting-landing-page.vercel.app)

---

## What This Project Is

This is not just a landing page — it's a demonstration of how to use **Claude Code with a multi-agent pipeline** to go from a business brief to a fully deployed, production-ready web application.

The pipeline runs 4 specialized agents in sequence:

```
[Brief] → Researcher → Consolidator → Copywriter → Builder → [Live App]
```

Each agent reads the previous agent's output, does its job, and hands off to the next. The result is a 13-section landing page with research-backed copy, optimized conversion design, and clean HTML/CSS/JS — all ready to deploy on Vercel.

---

## Project Structure

```
apex-ai-consulting-landing-page/
│
├── CLAUDE.md                    # Claude Code instructions — agent execution order, rules
├── System.md                    # Project mission, audience, brand voice, agent map
│
├── agents/
│   ├── researcher.md            # Agent 1: Research best practices & competitor landscape
│   ├── consolidator.md          # Agent 2: Distill research into actionable section briefs
│   ├── copywriter.md            # Agent 3: Write all 13 sections of landing page copy
│   └── builder.md               # Agent 4: Build the production HTML/CSS/JS application
│
├── research/
│   └── raw_research.md          # Output from Agent 1 (1,800+ words of research)
│
├── consolidated/
│   └── insights.md              # Output from Agent 2 (section-by-section directives)
│
├── copy/
│   └── landing_copy.md          # Output from Agent 3 (complete 13-section copy)
│
└── app/
    ├── index.html               # The landing page (all 13 sections)
    ├── styles.css               # Full design system — dark theme, responsive
    └── script.js                # Nav, FAQ accordion, form validation, animations
```

---

## The 13-Section Landing Page

| # | Section | Purpose |
|---|---------|---------|
| 1 | **Hero** | Headline + subheadline + primary CTA — answers "what, for who, what next" in 3 seconds |
| 2 | **Trust Bar** | Partner logos + 3 key metrics — instant credibility below the fold |
| 3 | **Problem Statement** | Agitate the pain — makes the visitor feel understood |
| 4 | **Solution Overview** | Introduce the APEX AI Framework as the mechanism |
| 5 | **Core Services** | 4 service cards with outcome-focused bullets |
| 6 | **How It Works** | 3-step process with timeframes — reduces buyer anxiety |
| 7 | **Results / Case Studies** | 3 case studies with before/after metric boxes |
| 8 | **Features & Benefits** | 8 differentiators in a scannable grid |
| 9 | **About / Team** | Founder story + 3 team member bios |
| 10 | **Testimonials** | 4 client quotes with specific results |
| 11 | **FAQ** | 8 accordion Q&As pre-empting top objections |
| 12 | **Pricing** | 3 tiers — Starter, Growth (featured), Enterprise |
| 13 | **Final CTA + Form** | Contact form + trust signals — highest conversion section |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Fonts | Google Fonts — Inter |
| Form backend | Formspree |
| Deployment | Vercel (static site) |
| AI pipeline | Claude Code (claude-sonnet-4-6) |
| Agents | Researcher, Consolidator, Copywriter, Builder |

No frameworks. No npm. No build step. Pure static files — deploy anywhere.

---

## How to Run This Yourself

### Prerequisites
- [Claude Code](https://claude.ai/code) installed and authenticated
- [Node.js](https://nodejs.org) (for Vercel CLI)
- A [Vercel](https://vercel.com) account
- A [Formspree](https://formspree.io) account (free tier works)
- A [GitHub](https://github.com) account

---

### Step 1 — Clone the Repository

```bash
git clone https://github.com/sarvadevishal/apex-ai-consulting-landing-page.git
cd apex-ai-consulting-landing-page
```

---

### Step 2 — Open in Claude Code

```bash
claude
```

This opens Claude Code in your project directory. Claude will automatically read `CLAUDE.md` and `System.md` for project context.

---

### Step 3 — Customize the Brief

Before running the agents, edit these two files to match your business:

**`System.md`** — Update:
- Target audience (who your clients are)
- Brand voice (how you want to sound)
- Core value proposition (what makes you different)
- The 13-section structure (add/remove sections if needed)

**`CLAUDE.md`** — Update:
- Company name
- Any tech stack preferences
- Deployment target

---

### Step 4 — Run the Agent Pipeline

Run each agent in order inside Claude Code. Paste each prompt as a message:

#### Agent 1 — Researcher
```
Run the researcher agent as defined in agents/researcher.md. 
Read the file, follow the instructions, and save the output to research/raw_research.md
```

#### Agent 2 — Consolidator
```
Run the consolidator agent as defined in agents/consolidator.md.
Read research/raw_research.md as input, follow the instructions, 
and save the output to consolidated/insights.md
```

#### Agent 3 — Copywriter
```
Run the copywriter agent as defined in agents/copywriter.md.
Read consolidated/insights.md and System.md as inputs, follow the instructions, 
and save the output to copy/landing_copy.md
```

#### Agent 4 — Builder
```
Run the builder agent as defined in agents/builder.md.
Read copy/landing_copy.md and System.md as inputs, follow the instructions, 
and build the application. Save to app/index.html, app/styles.css, app/script.js
```

Each agent reads the previous output and the relevant agent prompt file — no manual copy-pasting needed.

---

### Step 5 — Connect the Contact Form

1. Go to [formspree.io](https://formspree.io) and create a free account
2. Create a new form — copy your Form ID (looks like `xpzgkdqr`)
3. Open `app/index.html` and find this line:
   ```html
   <form ... action="https://formspree.io/f/YOUR_FORM_ID" ...>
   ```
4. Replace `YOUR_FORM_ID` with your actual Formspree form ID:
   ```html
   <form ... action="https://formspree.io/f/xpzgkdqr" ...>
   ```

---

### Step 6 — Preview Locally

Open `app/index.html` directly in your browser, or serve it with any static server:

```bash
# Using Python
cd app
python3 -m http.server 3000

# Using Node.js (npx)
cd app
npx serve .
```

Then open [http://localhost:3000](http://localhost:3000)

---

### Step 7 — Deploy to Vercel

Install the Vercel CLI and deploy:

```bash
# Install Vercel CLI (one time)
npm install -g vercel

# Login to Vercel
vercel login

# Deploy from the app/ directory
cd app
vercel deploy --prod --yes
```

Your site will be live at `https://your-project-name.vercel.app` within seconds.

---

### Step 8 — Publish to GitHub

```bash
# From the project root (not app/)
cd ..

# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit: AI consulting landing page"

# Create repo on GitHub and push
# Option A: Using GitHub CLI
gh repo create your-repo-name --public --push --source .

# Option B: Manual
# 1. Create repo at github.com/new
# 2. Then run:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

---

## Customizing the Design

All design tokens are CSS custom properties in `app/styles.css` under `:root`. Change these to retheme the entire site:

```css
:root {
  --color-bg:       #0a0a0f;   /* Page background */
  --color-primary:  #6366f1;   /* Indigo — brand color */
  --color-accent:   #22d3ee;   /* Cyan — highlights */
  --color-cta:      #f97316;   /* Orange — CTA buttons */
}
```

**To change fonts:** Replace the Google Fonts `<link>` in `index.html` and update `--font-main` in `:root`.

**To add/remove sections:** Each section has a matching ID in `index.html` and a corresponding block in `styles.css`. Follow the existing pattern.

---

## Customizing the Copy

All copy lives in `copy/landing_copy.md`. To update specific sections:

1. Edit the relevant section in `copy/landing_copy.md`
2. Ask Claude Code to apply the changes to `app/index.html`:
   ```
   Update Section 1 (Hero) in app/index.html to use this new headline: 
   "Your updated headline here"
   ```
3. Redeploy: `cd app && vercel deploy --prod`

Or re-run Agent 3 (Copywriter) with updated instructions and then Agent 4 (Builder) to rebuild the entire page.

---

## Agent Pipeline — How It Works

The 4 agents are defined as Markdown prompt files in the `agents/` folder. Each file contains:
- The agent's **role** and **expertise**
- The **task** it needs to complete
- The **input** it should read
- The **output format** it must produce
- **Quality standards** to meet

This structure means you can:
- Swap out any agent by editing its `.md` file
- Re-run individual agents without re-running the whole pipeline
- Fork the pipeline for other types of projects (SaaS, e-commerce, portfolios, etc.)

### Agent Handoff Chain

```
System.md + agents/researcher.md
         ↓
  research/raw_research.md        ← Agent 1 output

research/raw_research.md + agents/consolidator.md
         ↓
  consolidated/insights.md        ← Agent 2 output

consolidated/insights.md + System.md + agents/copywriter.md
         ↓
  copy/landing_copy.md            ← Agent 3 output

copy/landing_copy.md + System.md + agents/builder.md
         ↓
  app/index.html                  ← Agent 4 output
  app/styles.css
  app/script.js
```

---

## Conversion Principles Applied

This landing page was built on research-backed conversion principles:

- **Outcome-first headlines** — specific result + timeframe + qualifier
- **Single dominant CTA** per section — no competing actions
- **Social proof proximity** — trust signals within 150px of CTA buttons
- **Loss aversion framing** — cost of inaction, not just benefit of action
- **Specificity principle** — precise numbers ("213 clients") over vague claims ("200+ clients")
- **Risk reversal** — free strategy call removes financial commitment from first step
- **FAQ pre-emption** — 8 questions addressing the 6 core buyer objections
- **3-tier pricing** with middle tier anchored as "Most Popular"
- **End-of-page CTA** — highest volume conversion point on long-form pages

---

## Contributing

To adapt this pipeline for a different type of business:

1. Update `System.md` with the new business context
2. Modify the agent prompts in `agents/` to match the new domain
3. Re-run the pipeline
4. The builder will produce a completely different application based on the new copy

The pipeline is intentionally business-agnostic — only the prompts and system context change.

---

## License

MIT — use this freely for your own projects and clients.

---

Built with [Claude Code](https://claude.ai/code) by Anthropic.
