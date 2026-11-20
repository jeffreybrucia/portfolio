import type { ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';
import { Icon, type IconName } from '../Icon/Icon';
import { cx } from '../../utils/cx';
import styles from './IconButton.module.css';

type Tone = 'default' | 'inverse';

interface BaseProps {
  icon: IconName;
  tone?: Tone;
  /** Nudge direction on hover: matches the icon's meaning. */
  nudge?: 'up-right' | 'left' | 'right' | 'none';
  className?: string;
}

type AsButton = BaseProps & { as?: 'button'; label: string } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'>;
type AsLink = BaseProps & { as: 'a'; label: string; href: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className'>;
/**
 * Decorative: renders a <span aria-hidden>. Use inside a larger link
 * (e.g. ProjectCard) where the parent owns the accessible name. The parent
 * should carry `data-interactive-parent` so hover/focus styles follow it.
 */
type AsDecorative = BaseProps & { as: 'span'; label?: never };

export type IconButtonProps = AsButton | AsLink | AsDecorative;

/**
 * Quiet, circular icon-only control (44px hit area).
 * Always provide `label` for interactive variants — it becomes aria-label.
 */
export function IconButton(props: IconButtonProps) {
  const { icon, tone = 'default', nudge = 'none', className } = props;
  const classes = cx(styles.button, styles[tone], styles[`nudge-${nudge}`], className);
  const content = (
    <span className={styles.icon}>
      <Icon name={icon} />
    </span>
  );

  if (props.as === 'span') {
    return (
      <span className={classes} aria-hidden="true">
        {content}
      </span>
    );
  }

  if (props.as === 'a') {
    const { as: _as, icon: _i, tone: _t, nudge: _n, className: _c, label, ...rest } = props;
    return (
      <a className={classes} aria-label={label} {...rest}>
        {content}
      </a>
    );
  }

  const { as: _as, icon: _i, tone: _t, nudge: _n, className: _c, label, type = 'button', ...rest } = props;
  return (
    <button className={classes} aria-label={label} type={type} {...rest}>
      {content}
    </button>
  );
}
