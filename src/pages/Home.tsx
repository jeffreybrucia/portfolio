import { useEffect } from 'react';
import { Container, Grid, ProjectCard, Text } from '@/design-system';
import { listedProjects, projectPath } from '@/content/projects';
import { site } from '@/content/site';
import { useDocumentTitle } from '@/app/useDocumentTitle';
import styles from './Home.module.css';

export function Home() {
  useDocumentTitle(`${site.name} — ${site.role}`);

  // Warm case study chunks once the page is idle so stories are ready
  // before the shared-element transition finishes.
  useEffect(() => {
    const warm = () => listedProjects.forEach((p) => p.preload());
    const ric = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 600));
    const id = ric(warm);
    return () => (window.cancelIdleCallback ?? window.clearTimeout)(id as number);
  }, []);

  return (
    <>
      <Container as="section" className={styles.intro} aria-labelledby="intro-heading">
        <Text variant="label" tone="secondary" className={styles.eyebrow}>
          {site.name} · {site.role}
        </Text>
        <Text variant="hero" id="intro-heading" className={styles.headline}>
          {site.headline}
        </Text>
        <Text variant="bodyLg" tone="secondary" measure className={styles.lede}>
          {site.intro}
        </Text>
      </Container>

      <Container as="section" aria-label="Selected work" className={styles.work}>
        <Text as="h2" className="visually-hidden">
          Selected work
        </Text>
        <Grid variant="cards" as="ul">
          {listedProjects.map((project, i) => (
            <li key={project.slug}>
              <ProjectCard
                id={project.slug}
                href={projectPath(project.slug)}
                image={project.cover}
                category={project.category}
                title={project.title}
                summary={project.summary}
                mark={project.mark}
                priority={i < 3}
              />
            </li>
          ))}
        </Grid>
      </Container>
    </>
  );
}
