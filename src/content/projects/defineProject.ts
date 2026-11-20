import { lazy, type ComponentType } from 'react';
import type { Project, ProjectMeta } from './types';

/**
 * Pairs a project's metadata with its lazily-loaded story component.
 *
 *   export default defineProject(meta, () => import('./Story'));
 */
export function defineProject(
  meta: ProjectMeta,
  loadStory: () => Promise<{ default: ComponentType }>,
): Project {
  let pending: Promise<{ default: ComponentType }> | null = null;
  const load = () => (pending ??= loadStory());
  return {
    ...meta,
    Story: lazy(load),
    preload: load,
  };
}
