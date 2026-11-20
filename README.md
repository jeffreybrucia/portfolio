# portfolio

Personal portfolio website and reusable design system components.

Vite + React 19 + TypeScript, CSS Modules, deployed on Vercel. No UI or routing
libraries — the design system and the shared-element page transitions are
built in-house on native platform features (CSS custom properties, View
Transitions API, History API).

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
npm run typecheck
npm run build      # outputs dist/
npm run preview    # serve the production build
```

Deploy: import the repo in Vercel (framework preset **Vite**). `vercel.json`
rewrites every path to `index.html` so deep links like `/work/one-key` work.

## Docs

| Doc | What it covers |
| --- | --- |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | Folder structure, how the pieces connect, routing & transitions |
| [docs/DESIGN-SYSTEM.md](docs/DESIGN-SYSTEM.md) | Tokens, components, motion, responsive & accessibility rules, adding a component |
| [docs/ADDING-A-CASE-STUDY.md](docs/ADDING-A-CASE-STUDY.md) | Step-by-step: new project, images, story blocks |

## Content status

Real content: One Key (from facts provided so far). Everything else is a
clearly marked placeholder — search for `placeholder: true`, `status: 'placeholder'`
and `<ContentPending` to find every gap. `src/content/site.ts` holds draft
homepage copy to rewrite.
