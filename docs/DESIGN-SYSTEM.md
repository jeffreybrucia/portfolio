# Design system

Principle: **restraint is part of the craft.** Every token below exists for a
reason; prefer reusing one over adding one.

## Tokens (`src/design-system/tokens/tokens.css`)

| Group | Tokens | Notes |
| --- | --- | --- |
| Color | `--color-bg #FAF9F6`, `--color-surface #FFF`, `--color-surface-muted #F2F0EC`, `--color-text #202020`, `--color-text-secondary #777570`, `--color-border #E8E6E1` | Warm neutral. Inverse set (`--color-*-inverse`) for dark bands and text over imagery. No accent color — add one only for a real interaction need. |
| Type families | `--font-display` Newsreader (`--weight-display` 400) · `--font-sans` Geist | Serif = hero, case titles, section headings, pull quotes only. |
| Type scale | `--text-hero` 44→88 · `--text-case-title` 40→64 · `--text-section` 32→48 · `--text-card-title` 20→24 · `--text-body-lg` 17→18 · `--text-body` 16 · `--text-body-sm` 15 · `--text-label` 13 · `--text-label-sm` 11 | Fluid via `clamp()` between ~375 and 1440px viewports. |
| Spacing | `--space-1` 4 · `-2` 8 · `-3` 12 · `-4` 16 · `-6` 24 · `-8` 32 · `-12` 48 · `-16` 64 · `-24` 96 | 4px base. Semantic: `--page-margin`, `--section-gap`, `--grid-gap` (12px). |
| Sizing | `--size-icon-button` 44 · `--size-nav` 64 · `--ratio-card` 3/4 | |
| Radii | `--radius-sm` 4 · `-md` 8 · `--radius-card` 12 · `-full` | |
| Shadows | `--shadow-sm`, `--shadow-md`, `--shadow-nav` | Used sparingly — hierarchy comes from space and type. |
| Motion | `--ease-standard` cubic-bezier(.2,.8,.2,1) · `--ease-image` (smooth in-out) · `--ease-exit` | |
| Durations | `--duration-micro` 200 · `-short` 250 · `-medium` 450 · `-image` 600 · `-page` 650 | All 0 under reduced motion. |

`tokens.ts` mirrors the values JavaScript needs (breakpoints, durations,
`sizes` strings). Keep the two in sync.

## Components (`src/design-system/components`)

| Component | Purpose | Key props |
| --- | --- | --- |
| `Text` | All typography. | `variant` (hero, caseTitle, section, subsection, cardTitle, bodyLg, body, bodySm, label, labelSm, stat), `tone`, `as`, `serif`, `measure` |
| `Container` | Max width + page margins. | `width`: page · prose · bleed |
| `Grid` | `cards` 1/2/3 cols with 12px gap · `split` 5/7 · `thirds` | `variant`, `as="ul"` |
| `Icon` | Quiet 1.5px outline icons. | `name` |
| `IconButton` | 44px circular icon-only control. | `icon`, `label` (required when interactive), `tone`, `nudge`, `as` button · a · span (decorative) |
| `Button` | Pill text button / link. | `variant` primary · secondary · quiet, `tone`, `size`, `iconStart/End`, `href` |
| `BackLink` | "Back to work" with history-aware back + exit transition. | `href`, `sharedId`, `tone` |
| `Media` | Every image: intrinsic size, focal point, lazy/priority, labelled placeholders. | `image: ImageAsset`, `ratio`, `fit`, `priority`, `radius`, `viewTransitionName` |
| `Scrim` | Eased bottom gradient for legibility (no visible edge). | `extent`, `strength` |
| `ProgressiveBlur` | Blur that strengthens toward the bottom; child of `Media`. | `image`, `extent`, `maxBlur` |
| `ProjectCard` | Image-led 3:4 card: blur + scrim + labels + arrow, shared-element source. | `id`, `href`, `image`, `category`, `title`, `summary`, `mark`, `priority` |
| `Nav` | Fixed minimal nav; translucent warm surface on scroll; `overlay` tone over heroes. | `brand`, `items`, `currentPath`, `tone` |

### `ImageAsset`

```ts
{ src, srcSet?, width, height, alt,
  focal?: { x: 0–100, y: 0–100 },   // object-position for every crop
  tone?: 'dark' | 'light',          // light → stronger scrim
  placeholder?: true, placeholderNote? }
```

## Interaction conventions

- Hover only under `@media (hover: hover)`; touch gets `:active` feedback.
- Card hover: image scale 1.03 (`--duration-image`, `--ease-image`), scrim to
  full strength, arrow nudges up-right. A parent with `data-interactive-parent`
  drives child hover/focus states, so the card stays a single link.
- Micro-interactions 180–250ms with `--ease-standard`; surfaces 450ms; image
  and page transitions 600–650ms with `--ease-image`.
- Never animate layout properties; use `transform` and `opacity`.

## Responsive

| Breakpoint | Grid | Notes |
| --- | --- | --- |
| < 640 | 1 col | 16px margins, smaller nav labels, card padding 16 |
| 640–1023 | 2 cols | |
| ≥ 1024 | 3 cols | Margins up to 48px, content max 1440 |

Type and margins scale fluidly between breakpoints; components recompose
rather than shrink (e.g. `Split` stacks below 900px, its aside stops being sticky).

## Accessibility

- Visible `:focus-visible` ring everywhere (2px, offset 3px); inverse on imagery.
- Icon-only controls require `label` → `aria-label`; decorative icons are `aria-hidden`.
- 44px minimum touch targets (nav links, icon buttons, buttons).
- Skip link, `<main id="main">` focus after navigation, `aria-current` in nav.
- `prefers-reduced-motion` and `prefers-reduced-transparency` respected.
- Placeholders announce themselves (`role="img"`, "Placeholder: …").

## Adding a component

1. `src/design-system/components/Thing/Thing.tsx` + `Thing.module.css`.
2. Style only with tokens. Keep it content-agnostic: data in via props,
   no imports from `content/`, `pages/` or `router/`. Links are plain `<a href>`.
3. Export it (and its prop types) from `src/design-system/index.ts`.
4. Document it in the table above.

If a component is portfolio-specific (knows about projects or case studies),
it belongs in `src/features/` instead, built from design-system parts.
