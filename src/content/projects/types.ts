import type { ComponentType, ReactNode } from 'react';
import type { ImageAsset } from '@/design-system';

/**
 * Everything the portfolio needs to know about a project *without* loading
 * its story. Used by the home grid, the case study hero, and navigation.
 */
export interface ProjectMeta {
  /** URL segment: /work/<slug>. Also the shared-element id. */
  slug: string;
  title: string;
  /** Discipline / domain, shown above the title on the card. */
  category: string;
  /** One line for the card. */
  summary?: string;
  /** Longer intro for the case study hero. */
  intro?: string;
  /** Card image (3:4 crop). */
  cover: ImageAsset;
  /** Case study hero (full-viewport crop). Defaults to `cover`. */
  hero?: ImageAsset;
  /** Small restrained mark shown top-left on the card. */
  mark?: ReactNode;
  /** Key facts under the hero: role, timeline, scope… */
  facts?: Array<{ label: string; value: string }>;
  /**
   * published   → listed and routable
   * placeholder → listed with clear placeholder styling (remove once real work exists)
   * draft       → routable by URL only, hidden from the grid
   */
  status: 'published' | 'placeholder' | 'draft';
}

export interface Project extends ProjectMeta {
  /** The story: a component composed from case-study blocks. Lazy-loaded. */
  Story: ComponentType;
  /** Warm the story chunk (called on idle / hover). */
  preload: () => Promise<unknown>;
}
