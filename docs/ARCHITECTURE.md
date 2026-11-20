# Architecture

## Layers

```
src/
├── design-system/          ← reusable, portfolio-agnostic. No content, no router imports.
│   ├── tokens/             tokens.css (source of truth) + tokens.ts (JS mirror for motion/breakpoints)
│   ├── styles/             base.css (reset, focus, skip link) + index.css (global entry)
│   ├── motion/             view-transitions.css, sharedElement.ts, reducedMotion.ts
│   ├── components/         one folder per component: Component.tsx + Component.module.css
│   ├── utils/              cx()
│   └── index.ts            public API — import everything from '@/design-system'
│
├── router/router.ts        ~200-line History API router with View Transitions
│
├── features/case-study/    portfolio-specific building blocks built FROM the design system
│   ├── CaseStudyLayout     hero (shared-element target), facts, story, back/next
│   └── blocks/             Section, Prose, Figure, Stats, PullQuote, Split, NumberedList, ContentPending
│
├── content/                ← all words and images live here
│   ├── site.ts             name, role, homepage copy, nav items
│   └── projects/
│       ├── index.ts        registry: order, lookup, next project
│       ├── types.ts        ProjectMeta / Project
│       ├── defineProject.ts
│       ├── _template/      copy this to start a case study
│       └── <slug>/         index.ts (meta) + Story.tsx + assets/
│
├── pages/                  Home, CaseStudyPage, About, Contact, NotFound (thin: compose components + content)
└── app/App.tsx             routes, nav, footer, transition rules
```

**Dependency direction:** `pages → features → design-system`, and `content` is
read by pages/features. The design system never imports from content, pages or
the router — so it can be lifted into its own package later.

**Styling rule:** components use CSS Modules that read `var(--token)` values.
Pages contain layout-only CSS (spacing between components). If you find
yourself typing a hex value, a px font size or a duration outside
`tokens.css`, add or use a token instead.

## Routing

`src/router/router.ts` intercepts clicks on same-origin `<a href>` elements, so
design-system components stay plain anchors. Anchors opt into behaviors with
data attributes:

| Attribute | Effect |
| --- | --- |
| `data-transition="project-enter \| project-exit \| page"` | Choose the transition (otherwise `App.tsx`'s resolver decides) |
| `data-shared-id="<slug>"` | This anchor's image should morph (see below) |
| `data-history-back` | Use `history.back()` if the previous entry is the href (exact scroll restore) |
| `data-external` | Don't intercept (mailto:, downloads, skip link) |

Routes are matched in `App.tsx` (`/`, `/work/:slug`, `/about`, `/contact`, 404).
To add a page: create it in `src/pages`, add a line to `Route` in `App.tsx`,
and (optionally) a `navItems` entry in `content/site.ts`.

Scroll positions are stored per history entry in `sessionStorage` and
restored on back/forward and refresh (`history.scrollRestoration = 'manual'`).
After a push navigation, focus moves to `<main>` for screen-reader users.

## The shared-element transition

1. Each `ProjectCard` and the case study hero call
   `useSharedElementName(slug)`. Only the *active* slug gets
   `view-transition-name: project-media` — a name must be unique on the page.
2. On card click the router sets the active slug (synchronously, before the
   snapshot), stamps `html[data-transition="project-enter"]`, and calls
   `document.startViewTransition()` around the React render.
3. The browser morphs the card's image box into the hero's full-viewport box.
   `motion/view-transitions.css` keeps the crop continuous (`object-fit: cover`
   on the snapshots), animates the corner radius 12 → 0 on the image pair,
   fades the old page out fast and brings the case study in after the image
   has mostly landed.
4. Back (browser, the "Back to work" button, or the nav) runs the reverse with
   `project-exit`; the home page's scroll position is restored *inside* the
   transition so the image lands exactly on its card.
5. Fallbacks:
   - **Direct URL / refresh:** no transition runs, so the hero plays a short
     settle animation. The hero still registers itself as active, so going
     "Back to work" morphs into the right card.
   - **Browsers without View Transitions:** instant navigation, everything else works.
   - **`prefers-reduced-motion`:** transitions are skipped and token durations are 0.
   - **Mobile swipe-back** (`hasUAVisualTransition`): the browser's own animation is used.

## Performance notes

- Case study stories are lazy-loaded (`defineProject` → `React.lazy`) and
  pre-warmed when the home page is idle.
- `Media` sets intrinsic `width/height` (no layout shift), lazy-loads by
  default, `priority` for the hero and first card row, and accepts `srcSet`.
- Animations use `transform`/`opacity` only; the blur is static image copies,
  not a live `backdrop-filter`.
- Fonts load from Google Fonts with `display=swap`. To self-host later, add
  `@fontsource-variable/geist` and `@fontsource/instrument-serif`, import them
  in `main.tsx` and remove the `<link>` from `index.html`.
