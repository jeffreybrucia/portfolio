import type { Project } from './types';
import oneKey from './one-key';
import placeholderA from './placeholder-a';
import placeholderB from './placeholder-b';

/**
 * Project registry. Order here = order on the home grid.
 * To add a case study: copy ./_template, then import and list it below.
 */
export const projects: Project[] = [oneKey, placeholderA, placeholderB];

/** Projects shown on the home grid. */
export const listedProjects = projects.filter((p) => p.status !== 'draft');

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** The next listed project, wrapping around. */
export function getNextProject(slug: string): Project | undefined {
  const list = listedProjects;
  const i = list.findIndex((p) => p.slug === slug);
  if (list.length < 2) return undefined;
  return list[(i + 1) % list.length];
}

export function projectPath(slug: string) {
  return `/work/${slug}`;
}

export function matchProjectPath(pathname: string): string | null {
  const m = /^\/work\/([^/]+)$/.exec(pathname);
  return m ? decodeURIComponent(m[1]) : null;
}
