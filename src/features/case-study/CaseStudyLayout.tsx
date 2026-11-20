import { Suspense, useLayoutEffect, useState, type ReactNode } from 'react';
import {
  BackLink,
  Container,
  Media,
  ProgressiveBlur,
  ProjectCard,
  Scrim,
  Text,
  cx,
  setActiveSharedId,
  tokens,
  useSharedElementName,
} from '@/design-system';
import type { Project } from '@/content/projects/types';
import styles from './CaseStudyLayout.module.css';

interface CaseStudyLayoutProps {
  project: Project;
  next?: Project;
  /** Override the story (defaults to project.Story). */
  children?: ReactNode;
}

/**
 * Shared frame for every case study: immersive hero (the shared-element
 * target), key facts, the project's own story, and a route back / onward.
 */
export function CaseStudyLayout({ project, next, children }: CaseStudyLayoutProps) {
  const hero = project.hero ?? project.cover;
  const transitionName = useSharedElementName(project.slug);
  const metaName = transitionName ? 'case-hero-meta' : undefined;

  // Arriving by direct URL / refresh: no view transition is running, so
  // play a gentle entrance instead of the shared-element morph.
  const [direct] = useState(() => !document.documentElement.dataset.transition);

  // Make this project the active shared element so "back" morphs into its card,
  // even when the visitor didn't come from the grid.
  useLayoutEffect(() => {
    setActiveSharedId(project.slug);
  }, [project.slug]);

  return (
    <article className={styles.root}>
      <header className={styles.hero}>
        <Media
          image={hero}
          fit="fill"
          priority
          sizes={tokens.media.heroSizes}
          className={cx(styles.heroMedia, direct && styles.entrance)}
          viewTransitionName={transitionName}
        >
          <ProgressiveBlur image={hero} extent={40} maxBlur={20} />
        </Media>
        <Scrim extent="70%" strength={hero.tone === 'light' ? 'strong' : 'soft'} />

        <Container className={styles.heroInner}>
          <div className={styles.heroTop}>
            <BackLink href="/" tone="inverse" sharedId={project.slug} />
          </div>
          <div className={cx(styles.heroMeta, direct && styles.entranceMeta)} style={{ viewTransitionName: metaName }}>
            <Text variant="label" tone="inverseSecondary">
              {project.category}
            </Text>
            <Text variant="caseTitle" tone="inverse">
              {project.title}
            </Text>
            {project.intro && (
              <Text variant="bodyLg" tone="inverseSecondary" className={styles.heroIntro}>
                {project.intro}
              </Text>
            )}
          </div>
        </Container>
      </header>

      {project.facts && project.facts.length > 0 && (
        <Container as="section" aria-label="Project overview" className={styles.facts}>
          <dl className={styles.factsList}>
            {project.facts.map((f) => (
              <div key={f.label} className={styles.fact}>
                <Text as="dt" variant="labelSm" tone="secondary">
                  {f.label}
                </Text>
                <Text as="dd" variant="body">
                  {f.value}
                </Text>
              </div>
            ))}
          </dl>
        </Container>
      )}

      <div className={styles.story}>
        <Suspense fallback={<div className={styles.storyFallback} />}>{children ?? <project.Story />}</Suspense>
      </div>

      <Container as="footer" className={styles.footer}>
        <div className={styles.footerRow}>
          <BackLink href="/" sharedId={project.slug} />
        </div>
        {next && (
          <div className={styles.next}>
            <Text variant="labelSm" tone="secondary">
              Next project
            </Text>
            <ProjectCard
              id={next.slug}
              href={`/work/${next.slug}`}
              image={next.cover}
              category={next.category}
              title={next.title}
              summary={next.summary}
              mark={next.mark}
              headingLevel="h2"
              className={styles.nextCard}
            />
          </div>
        )}
      </Container>
    </article>
  );
}
