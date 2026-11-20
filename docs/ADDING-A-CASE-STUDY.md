# Adding a case study

## 1. Copy the template

```bash
cp -R src/content/projects/_template src/content/projects/flex-packages
```

## 2. Fill in `index.ts`

Set `slug` (matches the folder; becomes `/work/<slug>`), `title`, `category`,
`summary`, `intro`, `facts`. Leave `status: 'draft'` while writing — the page
is reachable by URL but hidden from the grid.

## 3. Add images

Put files in the project's `assets/` folder and import them:

```ts
import cover from './assets/cover.jpg';

cover: {
  src: cover,
  width: 1800, height: 2400,      // real pixel size (prevents layout shift)
  alt: 'What the image shows',
  focal: { x: 50, y: 35 },        // keep this point visible in every crop
  tone: 'dark',                   // 'light' for bright images → stronger scrim
},
```

Guidelines:

- **Cover** (card): 3:4, at least 1200×1600. Dark-ish lower third reads best under white text.
- **Hero** (case study): landscape, at least 2400px wide. Set `hero` if it should
  differ from the cover; the transition morphs one into the other, so similar
  framing and the same focal point make it feel continuous.
- Export WebP/AVIF around 80% quality. For responsive sizes, add `srcSet`
  (e.g. `cover-800.webp 800w, cover-1600.webp 1600w`).
- Optional `mark`: a small white SVG/text label shown top-left on the card.
  Keep it restrained; don't reproduce company logos unless you have the right to.

## 4. Write `Story.tsx`

Compose blocks from `@/features/case-study/blocks/blocks`:

| Block | Use for |
| --- | --- |
| `Section` | Each chapter. `eyebrow`, `title`, `width` prose/page, `tone` default/muted/dark |
| `Prose` | Paragraphs and lists (`lead` for the intro paragraph) |
| `Stats` | 2–3 headline metrics |
| `Figure` | Screens and photos — `size` inline/wide/bleed, `framed` for UI screenshots, `caption` |
| `PullQuote` | The one insight worth stopping for |
| `Split` | Context on the left, detail on the right |
| `NumberedList` | Workstreams, principles, decisions |
| `ContentPending` | Visible "to do" marker — never ship with one |

The order is yours. For a layout only this story needs, write a local
component in the project folder (style it with tokens). Move it into `blocks/`
once a second case study wants it.

## 5. Register it

In `src/content/projects/index.ts`:

```ts
import flexPackages from './flex-packages';
export const projects: Project[] = [oneKey, flexPackages /* … */];
```

Array order = grid order. Change `status` to `'published'` when ready, and
delete the `placeholder-*` entries as real projects replace them.

## 6. Check

`npm run dev`, then: click the card (expand), use browser back (collapse to
the same card and scroll position), refresh on the case study, and check at a
phone width. `npm run build` before pushing.
