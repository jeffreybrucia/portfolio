import type { ReactNode } from 'react';
import { cx } from '../../utils/cx';
import styles from './Grid.module.css';

interface GridProps {
  /** cards = 1 / 2 / 3 columns at mobile / tablet / desktop, 12px gap. */
  variant?: 'cards' | 'split' | 'thirds';
  as?: 'div' | 'ul';
  className?: string;
  children: ReactNode;
}

export function Grid({ variant = 'cards', as: Component = 'div', className, children }: GridProps) {
  return (
    <Component className={cx(styles.grid, styles[variant], className)} role={Component === 'ul' ? 'list' : undefined}>
      {children}
    </Component>
  );
}
