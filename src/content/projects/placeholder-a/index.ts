import { defineProject } from '../defineProject';

/**
 * PLACEHOLDER — not real work. Keeps the grid composed while real case
 * studies are written. Replace (rename the folder + slug) or delete, and
 * remove it from ../index.ts.
 */
export default defineProject(
  {
    slug: 'placeholder-a',
    title: 'Project placeholder',
    category: 'Case study to come',
    summary: 'Replace with a real project.',
    cover: { placeholder: true, placeholderNote: 'Cover (3:4)', alt: 'Placeholder project cover', tone: 'dark' },
    status: 'placeholder',
  },
  () => import('../PlaceholderStory'),
);
