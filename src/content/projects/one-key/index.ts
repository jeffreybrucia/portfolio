import { defineProject } from '../defineProject';

/**
 * One Key — loyalty consolidation across Expedia, Hotels.com and Vrbo.
 *
 * Images: none yet. Drop files into ./assets and import them, e.g.
 *   import cover from './assets/cover.jpg';
 *   cover: { src: cover, width: 1800, height: 2400, alt: '…', focal: { x: 50, y: 40 }, tone: 'dark' }
 */
export default defineProject(
  {
    slug: 'one-key',
    title: 'One Key',
    category: 'Loyalty · Expedia Group',
    summary: 'Consolidating three brands’ rewards into one travel loyalty program.',
    intro:
      'Expedia Rewards, Hotels.com Rewards and Vrbo — which had no loyalty program — unified into One Key, launched in the US and UK in eight months.',
    cover: {
      placeholder: true,
      placeholderNote: 'One Key cover (3:4)',
      alt: 'One Key project cover',
      tone: 'dark',
    },
    hero: {
      placeholder: true,
      placeholderNote: 'One Key hero (full-bleed)',
      alt: 'One Key rewards experience',
      tone: 'dark',
    },
    facts: [
      { label: 'Role', value: 'Senior → Principal Product Designer; design co-lead' },
      { label: 'Timeline', value: '8 months to launch' },
      { label: 'Markets', value: 'US + UK' },
      { label: 'Brands', value: 'Expedia, Hotels.com, Vrbo' },
    ],
    status: 'published',
  },
  () => import('./Story'),
);
