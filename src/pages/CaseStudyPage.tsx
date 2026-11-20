import { getNextProject, getProject } from '@/content/projects';
import { site } from '@/content/site';
import { CaseStudyLayout } from '@/features/case-study/CaseStudyLayout';
import { useDocumentTitle } from '@/app/useDocumentTitle';
import { NotFound } from './NotFound';

export function CaseStudyPage({ slug }: { slug: string }) {
  const project = getProject(slug);
  useDocumentTitle(project ? `${project.title} — ${site.name}` : `Not found — ${site.name}`);

  if (!project) return <NotFound />;
  // key: remount per project so hero/entrance state resets between case studies
  return <CaseStudyLayout key={project.slug} project={project} next={getNextProject(project.slug)} />;
}
