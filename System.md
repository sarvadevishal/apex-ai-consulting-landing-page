# System.md — AI Consulting Services Landing Page

## Project Mission
Build a high-converting, 13-section landing page that markets AI consulting services. The primary CTA is getting visitors to click a link, fill out a form, and reach out to us. Every design and copy decision must serve that single goal.

## Target Audience
- Mid-size business owners and founders (10–500 employees)
- Operations and product leads frustrated with manual processes
- Tech-curious executives who know AI matters but don't know where to start
- Companies that have heard about AI but haven't implemented it yet

## Brand Voice
- Confident, clear, jargon-free
- Authoritative but approachable
- Results-first: lead with outcomes, not features
- No fluff, no filler — every sentence earns its place

## Core Value Proposition
We turn AI from buzzword into business results — custom strategies, real automations, and agents built for your specific workflows.

## Primary CTA
"Book a Free Strategy Call" → links to a contact form / Calendly

---

## Agent Orchestration Order

```
[1] Researcher Agent
    Input:  This System.md + researcher.md prompt
    Output: research/raw_research.md

[2] Consolidator Agent
    Input:  research/raw_research.md + consolidator.md prompt
    Output: consolidated/insights.md

[3] Copywriter Agent
    Input:  consolidated/insights.md + System.md + copywriter.md prompt
    Output: copy/landing_copy.md

[4] Builder Agent
    Input:  copy/landing_copy.md + System.md + builder.md prompt
    Output: app/index.html, app/styles.css, app/script.js
```

---

## 13-Section Page Structure

| # | Section Name         | Goal                                              |
|---|----------------------|---------------------------------------------------|
| 1 | Hero                 | Hook visitor in 3 seconds, deliver CTA             |
| 2 | Trust Bar            | Instant credibility with logos/tools/numbers       |
| 3 | Problem Statement    | Agitate pain so visitor feels understood           |
| 4 | Solution Overview    | Position us as the clear answer                    |
| 5 | Core Services        | Show what we offer (3–4 cards)                    |
| 6 | How It Works         | 3-step process reduces friction                    |
| 7 | Results / Case Studies | Prove it works with real numbers                 |
| 8 | Features & Benefits  | Differentiate from competitors                     |
| 9 | About / Team         | Build human trust                                  |
| 10| Testimonials         | Social proof from real clients                     |
| 11| FAQ                  | Kill objections before they kill the sale          |
| 12| Pricing / Packages   | Anchor value, guide toward CTA                     |
| 13| Final CTA + Form     | Last push — contact form + footer                  |

---

## Output Conventions
- All agent outputs are Markdown files in their designated folders
- Builder outputs are clean HTML/CSS/JS files in `/app`
- No placeholder content — all copy must be final and usable
- Mobile-first, Vercel-deployable static site

## Tech Stack
- HTML5, CSS3 (no frameworks), vanilla JS
- Google Fonts (Inter or similar)
- CSS custom properties for theming
- Form: Formspree-ready `<form>` element
- Deploy target: Vercel static site
