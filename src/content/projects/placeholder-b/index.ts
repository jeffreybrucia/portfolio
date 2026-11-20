import { defineProject } from '../defineProject';

/** PLACEHOLDER — not real work. See placeholder-a/index.ts. */
export default defineProject(
  {
    slug: 'placeholder-b',
    title: 'Project placeholder',
    category: 'Case study to come',
    summary: 'Replace with a real project.',
    cover: { placeholder: true, placeholderNote: 'Cover (3:4)', alt: 'Placeholder project cover', tone: 'dark' },
    status: 'placeholder',
  },
  () => import('../PlaceholderStory'),
);
