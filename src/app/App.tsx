import { useEffect } from 'react';
import { flushSync } from 'react-dom';
import { Nav, Text, Container, setActiveSharedId } from '@/design-system';
import { setTransitionResolver, startRouter, useLocation } from '@/router/router';
import { matchProjectPath } from '@/content/projects';
import { navItems, site } from '@/content/site';
import { Home } from '@/pages/Home';
import { CaseStudyPage } from '@/pages/CaseStudyPage';
import { About } from '@/pages/About';
import { Contact } from '@/pages/Contact';
import { NotFound } from '@/pages/NotFound';
import styles from './App.module.css';

/**
 * Decide how back/forward and unannotated links animate:
 * grid → case study expands, case study → grid collapses, else cross-fade.
 */
setTransitionResolver((from, to) => {
  const toProject = matchProjectPath(to);
  const fromProject = matchProjectPath(from);
  if (toProject && from === '/') {
    // e.g. browser "forward" into a case study: make that card the shared element
    flushSync(() => setActiveSharedId(toProject));
    return 'project-enter';
  }
  if (fromProject && to === '/') return 'project-exit';
  return 'page';
});

function Route({ pathname }: { pathname: string }) {
  if (pathname === '/') return <Home />;
  const slug = matchProjectPath(pathname);
  if (slug) return <CaseStudyPage slug={slug} />;
  if (pathname === '/about') return <About />;
  if (pathname === '/contact') return <Contact />;
  return <NotFound />;
}

export function App() {
  useEffect(() => startRouter(), []);
  const { pathname } = useLocation();
  const onCaseStudy = matchProjectPath(pathname) !== null;

  return (
    <>
      <a href="#main" className="skip-link" data-external>
        Skip to content
      </a>
      <Nav brand={site.name} items={navItems} currentPath={pathname} tone={onCaseStudy ? 'overlay' : 'default'} />
      <main id="main" tabIndex={-1} className={styles.main}>
        <Route pathname={pathname} />
      </main>
      <Container as="footer" className={styles.footer}>
        <Text variant="label" tone="secondary">
          © {new Date().getFullYear()} {site.name}
        </Text>
        <Text variant="label" tone="secondary">
          {site.location}
        </Text>
      </Container>
    </>
  );
}
