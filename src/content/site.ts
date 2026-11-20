import type { NavItem } from '@/design-system';

/**
 * Site-wide copy and navigation.
 * DRAFT COPY: `headline` and `intro` are a starting point written from your
 * stated role — rewrite them in your own voice.
 */
export const site = {
  name: 'Jeff Brucia',
  role: 'Principal Product Designer',
  headline: 'Complex travel systems, designed to feel simple.',
  intro:
    'I’m a principal product designer working on loyalty programs, multi-product booking flows and package search at Expedia Group.',
  location: 'Marin County, California',
};

export const navItems: NavItem[] = [
  { label: 'Work', href: '/', matches: ['/work/'] },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];
