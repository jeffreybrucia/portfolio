import type { ReactNode } from 'react';
import { Media, type ImageAsset } from '../Media/Media';
import { Scrim } from '../Scrim/Scrim';
import { ProgressiveBlur } from '../ProgressiveBlur/ProgressiveBlur';
import { IconButton } from '../IconButton/IconButton';
import { Text } from '../Text/Text';
import { useSharedElementName } from '../../motion/sharedElement';
import { media as mediaTokens } from '../../tokens/tokens';
import { cx } from '../../utils/cx';
import styles from './ProjectCard.module.css';

export interface ProjectCardProps {
  /** Stable id — also the shared-element id for the case study transition. */
  id: string;
  href: string;
  image: ImageAsset;
  category: string;
  title: string;
  summary?: string;
  /** Small restrained brand / project mark, top-left. Inherits white. */
  mark?: ReactNode;
  /** Eager-load (first row). */
  priority?: boolean;
  /** Heading level for the title inside lists. */
  headingLevel?: 'h2' | 'h3';
  className?: string;
}

/**
 * Image-led project card (3:4, full-bleed, 12px radius).
 * The whole card is one link; the arrow control is decorative and follows
 * the card's hover/focus state. Clicking runs the shared-element transition
 * into the case study.
 */
export function ProjectCard({
  id,
  href,
  image,
  category,
  title,
  summary,
  mark,
  priority,
  headingLevel = 'h3',
  className,
}: ProjectCardProps) {
  const transitionName = useSharedElementName(id);

  return (
    <a
      href={href}
      className={cx(styles.card, className)}
      data-interactive-parent
      data-transition="project-enter"
      data-shared-id={id}
    >
      <Media
        image={image}
        ratio="var(--ratio-card)"
        radius="card"
        sizes={mediaTokens.cardSizes}
        priority={priority}
        className={styles.media}
        viewTransitionName={transitionName}
      >
        <ProgressiveBlur image={image} extent={46} maxBlur={14} />
      </Media>

      <div className={styles.overlay}>
        <Scrim extent="62%" strength={image.tone === 'light' ? 'strong' : 'soft'} />

        <div className={styles.top}>
          <div className={styles.mark}>{mark}</div>
          <IconButton as="span" icon="arrowUpRight" tone="inverse" nudge="up-right" />
        </div>

        <div className={styles.body}>
          <Text variant="label" tone="inverseSecondary" className={styles.category}>
            {category}
          </Text>
          <Text as={headingLevel} variant="cardTitle" tone="inverse">
            {title}
          </Text>
          {summary && (
            <Text variant="bodySm" tone="inverseSecondary" className={styles.summary}>
              {summary}
            </Text>
          )}
        </div>
      </div>
    </a>
  );
}
