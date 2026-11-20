import type { CSSProperties, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import styles from './Media.module.css';

/**
 * Describes one image. Content files (src/content/projects/*) build these;
 * components only consume them.
 */
export interface ImageAsset {
  /** Omit (or set placeholder: true) when the real image isn't ready yet. */
  src?: string;
  /** Optional responsive sources, e.g. "a-800.jpg 800w, a-1600.jpg 1600w". */
  srcSet?: string;
  /** Intrinsic size — prevents layout shift. */
  width?: number;
  height?: number;
  alt: string;
  /** Focal point as percentages (0–100). Drives object-position for every crop. */
  focal?: { x: number; y: number };
  /** Average brightness. Overlays use this to decide scrim strength. */
  tone?: 'dark' | 'light';
  /** Renders a clearly-labelled placeholder instead of an image. */
  placeholder?: boolean;
  /** Optional note shown on the placeholder, e.g. "Hero: rewards page". */
  placeholderNote?: string;
}

interface MediaProps {
  image: ImageAsset;
  /** CSS aspect-ratio, e.g. "3 / 4". Omit to fill the parent (fit="fill"). */
  ratio?: string;
  /** fill = absolutely fill the parent box. */
  fit?: 'cover' | 'contain' | 'fill';
  sizes?: string;
  /** Eager-load above-the-fold images (hero, first row of cards). */
  priority?: boolean;
  radius?: 'none' | 'card';
  className?: string;
  imgClassName?: string;
  style?: CSSProperties;
  /** Visual duplicate (e.g. blur layers): hidden from assistive tech, no placeholder label. */
  decorative?: boolean;
  /** Forwarded to the media wrapper — used for shared-element transitions. */
  viewTransitionName?: string;
  children?: ReactNode;
}

export function Media({
  image,
  ratio,
  fit = 'cover',
  sizes,
  priority,
  radius = 'none',
  className,
  imgClassName,
  style,
  viewTransitionName,
  decorative,
  children,
}: MediaProps) {
  const objectPosition = image.focal ? `${image.focal.x}% ${image.focal.y}%` : undefined;
  const isPlaceholder = image.placeholder || !image.src;

  return (
    <div
      className={cx(styles.media, fit === 'fill' && styles.fill, radius === 'card' && styles.radiusCard, className)}
      style={{
        aspectRatio: fit === 'fill' ? undefined : ratio,
        viewTransitionName,
        ...style,
      }}
    >
      {isPlaceholder ? (
        <div
          className={styles.placeholder}
          role={decorative ? undefined : 'img'}
          aria-label={decorative ? undefined : `Placeholder: ${image.alt}`}
        >
          {!decorative && (
            <span className={styles.placeholderLabel}>
              Image placeholder
              {image.placeholderNote && <span className={styles.placeholderNote}>{image.placeholderNote}</span>}
            </span>
          )}
        </div>
      ) : (
        <img
          className={cx(styles.img, fit === 'contain' && styles.contain, imgClassName)}
          src={image.src}
          srcSet={image.srcSet}
          sizes={image.srcSet ? sizes : undefined}
          width={image.width}
          height={image.height}
          alt={decorative ? '' : image.alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          // React 19 supports fetchPriority natively.
          fetchPriority={priority ? 'high' : 'auto'}
          style={{ objectPosition }}
          draggable={false}
        />
      )}
      {children}
    </div>
  );
}
