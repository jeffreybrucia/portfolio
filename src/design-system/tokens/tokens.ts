/**
 * JS mirror of the tokens that code needs at runtime (motion, breakpoints).
 * Keep in sync with tokens.css. Visual styling should use the CSS variables;
 * use these only where JavaScript has to know the value.
 */

export const breakpoints = {
  /** ≥ 640px: two-column grid */
  tablet: 640,
  /** ≥ 1024px: three-column grid */
  desktop: 1024,
} as const;

export const easing = {
  standard: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
  image: 'cubic-bezier(0.45, 0, 0.25, 1)',
  exit: 'cubic-bezier(0.4, 0, 1, 1)',
} as const;

export const duration = {
  micro: 200,
  short: 250,
  medium: 450,
  image: 600,
  page: 650,
} as const;

export const radius = {
  card: 12,
} as const;

export const media = {
  /** Matches the CSS grid: 1 col < 640, 2 cols < 1024, 3 cols above. */
  cardSizes: '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw',
  heroSizes: '100vw',
} as const;
