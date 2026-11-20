import type { ReactNode } from 'react';
import { Container, Text } from '@/design-system';
import styles from './SimplePage.module.css';

/** Layout for text-led pages (About, Contact, 404). */
export function SimplePage({ eyebrow, title, children }: { eyebrow?: string; title: ReactNode; children?: ReactNode }) {
  return (
    <Container as="section" width="page" className={styles.page}>
      <header className={styles.header}>
        {eyebrow && (
          <Text variant="label" tone="secondary">
            {eyebrow}
          </Text>
        )}
        <Text variant="hero">{title}</Text>
      </header>
      <div className={styles.body}>{children}</div>
    </Container>
  );
}
