import { cx } from '../../utils/cx';
import styles from './Scrim.module.css';

interface ScrimProps {
  /** Portion of the parent's height the scrim covers, from the bottom. */
  extent?: string;
  /** soft for dark imagery, strong for light/busy imagery. */
  strength?: 'soft' | 'strong';
  className?: string;
}

/**
 * Bottom-up legibility gradient. Uses an eased multi-stop curve so there is
 * no visible edge where the gradient begins. Parent must be position: relative.
 * Its intensity rises slightly when an ancestor with
 * [data-interactive-parent] is hovered.
 */
export function Scrim({ extent = '60%', strength = 'soft', className }: ScrimProps) {
  return (
    <div
      aria-hidden="true"
      className={cx(styles.scrim, styles[strength], className)}
      style={{ height: extent }}
    />
  );
}
