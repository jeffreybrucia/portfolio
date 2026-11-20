import type { ImageAsset } from '../Media/Media';
import { Media } from '../Media/Media';
import { cx } from '../../utils/cx';
import styles from './ProgressiveBlur.module.css';

interface ProgressiveBlurProps {
  /** The same image the blur sits on top of. */
  image: ImageAsset;
  /** Portion of the image height affected, measured from the bottom (0–100). */
  extent?: number;
  /** Blur at the very bottom, in px. Keep it subtle. */
  maxBlur?: number;
  className?: string;
}

/**
 * Progressive (gradient) blur that increases toward the bottom edge.
 *
 * Render it as a child of <Media> so it moves with the image (hover scale,
 * shared-element transitions). It layers blurred copies of the same image,
 * each masked to fade in a little lower than the last. Using image copies
 * rather than backdrop-filter avoids the light halo backdrop blur picks up
 * from the page at rounded card edges, and works in every browser.
 */
export function ProgressiveBlur({ image, extent = 45, maxBlur = 16, className }: ProgressiveBlurProps) {
  const start = 100 - extent;
  const mid = 100 - extent / 2;
  const layers = [
    { blur: maxBlur * 0.35, from: start, to: mid },
    { blur: maxBlur, from: mid - extent * 0.1, to: 100 },
  ];

  return (
    <div aria-hidden="true" className={cx(styles.root, className)}>
      {layers.map((layer, i) => {
        const mask = `linear-gradient(to bottom, transparent ${layer.from}%, #000 ${layer.to}%)`;
        return (
          <div key={i} className={styles.layer} style={{ maskImage: mask, WebkitMaskImage: mask }}>
            <Media
              image={image}
              decorative
              fit="fill"
              style={{ filter: `blur(${layer.blur.toFixed(1)}px)`, background: 'transparent' }}
            />
          </div>
        );
      })}
    </div>
  );
}
