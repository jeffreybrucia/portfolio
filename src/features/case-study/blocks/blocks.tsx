import type { ReactNode } from 'react';
import { Container, Grid, Media, Text, cx, type ImageAsset } from '@/design-system';
import styles from './blocks.module.css';

/**
 * Case study story blocks. A project's Story.tsx composes these in any
 * order. They share spacing and type rules, so every case study feels like
 * part of the same site while telling its own story.
 */

/* ---------------------------------------------------------------------- */

interface SectionProps {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  /** prose = 720px reading column · page = full content width */
  width?: 'prose' | 'page';
  /** dark = inverse band for image-heavy moments */
  tone?: 'default' | 'muted' | 'dark';
  children?: ReactNode;
}

export function Section({ id, eyebrow, title, width = 'prose', tone = 'default', children }: SectionProps) {
  const inverse = tone === 'dark';
  return (
    <section id={id} className={cx(styles.section, styles[`tone-${tone}`])}>
      <Container width={width}>
        {(eyebrow || title) && (
          <header className={styles.sectionHeader}>
            {eyebrow && (
              <Text variant="labelSm" tone={inverse ? 'inverseSecondary' : 'secondary'}>
                {eyebrow}
              </Text>
            )}
            {title && (
              <Text variant="section" as="h2" tone={inverse ? 'inverse' : 'default'}>
                {title}
              </Text>
            )}
          </header>
        )}
        <div className={styles.sectionBody}>{children}</div>
      </Container>
    </section>
  );
}

/* ---------------------------------------------------------------------- */

/** Running text. Styles plain <p>, <ul>, <ol>, <h3>, <strong> children. */
export function Prose({ children, lead }: { children: ReactNode; lead?: boolean }) {
  return <div className={cx(styles.prose, lead && styles.lead)}>{children}</div>;
}

/* ---------------------------------------------------------------------- */

interface FigureProps {
  image: ImageAsset;
  caption?: ReactNode;
  ratio?: string;
  /** inline = within the text column · wide = content width · bleed = edge to edge */
  size?: 'inline' | 'wide' | 'bleed';
  /** Soft muted frame around product screenshots. */
  framed?: boolean;
}

export function Figure({ image, caption, ratio = '16 / 10', size = 'wide', framed }: FigureProps) {
  const width = size === 'bleed' ? 'bleed' : size === 'wide' ? 'page' : 'prose';
  return (
    <Container as="figure" width={width} className={styles.figure}>
      <div className={cx(framed && styles.frame, size !== 'bleed' && styles.rounded)}>
        <Media image={image} ratio={ratio} fit={framed ? 'contain' : 'cover'} radius={size === 'bleed' ? 'none' : 'card'} />
      </div>
      {caption && (
        <figcaption className={cx(styles.caption, size === 'bleed' && styles.captionInset)}>
          <Text variant="bodySm" tone="secondary" as="span">
            {caption}
          </Text>
        </figcaption>
      )}
    </Container>
  );
}

/* ---------------------------------------------------------------------- */

export interface Stat {
  value: string;
  label: string;
}

export function Stats({ items, note }: { items: Stat[]; note?: ReactNode }) {
  return (
    <div className={styles.stats}>
      <Grid variant="thirds" as="ul">
        {items.map((s) => (
          <li key={s.label} className={styles.stat}>
            <Text variant="stat" as="span">
              {s.value}
            </Text>
            <Text variant="bodySm" tone="secondary" as="span">
              {s.label}
            </Text>
          </li>
        ))}
      </Grid>
      {note && (
        <Text variant="label" tone="secondary" className={styles.statsNote}>
          {note}
        </Text>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------------- */

export function PullQuote({ children, attribution }: { children: ReactNode; attribution?: string }) {
  return (
    <figure className={styles.quote}>
      <blockquote>
        <Text variant="section" as="p" serif>
          {children}
        </Text>
      </blockquote>
      {attribution && (
        <figcaption>
          <Text variant="label" tone="secondary">
            {attribution}
          </Text>
        </figcaption>
      )}
    </figure>
  );
}

/* ---------------------------------------------------------------------- */

/** Heading/aside on the left, content on the right (stacks on mobile). */
export function Split({ aside, children }: { aside: ReactNode; children: ReactNode }) {
  return (
    <Grid variant="split" className={styles.split}>
      <div className={styles.splitAside}>{aside}</div>
      <div>{children}</div>
    </Grid>
  );
}

/* ---------------------------------------------------------------------- */

export interface ListItem {
  title: string;
  body?: ReactNode;
}

/** Numbered list of workstreams / principles / decisions. */
export function NumberedList({ items }: { items: ListItem[] }) {
  return (
    <ol className={styles.numbered} role="list">
      {items.map((item, i) => (
        <li key={item.title} className={styles.numberedItem}>
          <Text variant="label" tone="secondary" as="span" className={styles.numberedIndex}>
            {String(i + 1).padStart(2, '0')}
          </Text>
          <div>
            <Text variant="subsection" as="h3">
              {item.title}
            </Text>
            {item.body && (
              <Text variant="body" tone="secondary" as="div" className={styles.numberedBody}>
                {item.body}
              </Text>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}

/* ---------------------------------------------------------------------- */

/**
 * Visible marker for content that hasn't been written yet. Deliberately
 * obvious so it's never shipped by accident — search the repo for
 * <ContentPending to find every gap.
 */
export function ContentPending({ children }: { children: ReactNode }) {
  return (
    <div className={styles.pending} role="note">
      <Text variant="labelSm" tone="secondary">
        Content to come
      </Text>
      <Text variant="bodySm" tone="secondary" as="div">
        {children}
      </Text>
    </div>
  );
}
