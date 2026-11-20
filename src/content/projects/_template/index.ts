/**
 * CASE STUDY TEMPLATE — copy this folder to src/content/projects/<your-slug>/
 * then register it in src/content/projects/index.ts.
 * This folder itself is never imported.
 */
import { defineProject } from '../defineProject';
// import cover from './assets/cover.jpg';
// import hero from './assets/hero.jpg';

export default defineProject(
  {
    slug: 'your-slug', // → /work/your-slug (must match the folder name)
    title: 'Project title',
    category: 'Discipline · Company',
    summary: 'One line for the card.',
    intro: 'Two sentences for the case study hero.',
    cover: {
      // src: cover, width: 1800, height: 2400,
      placeholder: true,
      alt: 'Describe the image for screen readers',
      focal: { x: 50, y: 50 }, // where the important part of the image is (%)
      tone: 'dark', // 'light' strengthens the scrim for bright images
    },
    // hero: { src: hero, width: 2880, height: 1800, alt: '…', focal: { x: 50, y: 45 }, tone: 'dark' },
    facts: [
      { label: 'Role', value: '' },
      { label: 'Timeline', value: '' },
    ],
    status: 'draft', // draft = URL only · published = in the grid
  },
  () => import('./Story'),
);
