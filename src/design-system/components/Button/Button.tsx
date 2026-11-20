import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { Icon, type IconName } from '../Icon/Icon';
import { cx } from '../../utils/cx';
import styles from './Button.module.css';

interface BaseProps {
  /** primary = solid ink · secondary = outline · quiet = text only */
  variant?: 'primary' | 'secondary' | 'quiet';
  tone?: 'default' | 'inverse';
  size?: 'md' | 'sm';
  iconStart?: IconName;
  iconEnd?: IconName;
  className?: string;
  children: ReactNode;
}

type ButtonProps = BaseProps & { href?: undefined } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'>;
type LinkProps = BaseProps & { href: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'children'>;

/** Pill button with a text label. Renders <a> when `href` is set. */
export function Button(props: ButtonProps | LinkProps) {
  const { variant = 'secondary', tone = 'default', size = 'md', iconStart, iconEnd, className, children } = props;
  const classes = cx(styles.button, styles[variant], styles[tone], styles[size], className);
  const inner = (
    <>
      {iconStart && (
        <span className={cx(styles.icon, styles.iconStart)}>
          <Icon name={iconStart} />
        </span>
      )}
      <span>{children}</span>
      {iconEnd && (
        <span className={cx(styles.icon, styles.iconEnd)}>
          <Icon name={iconEnd} />
        </span>
      )}
    </>
  );

  if (props.href !== undefined) {
    const { variant: _v, tone: _t, size: _s, iconStart: _is, iconEnd: _ie, className: _c, children: _ch, ...rest } = props;
    return (
      <a className={classes} {...rest}>
        {inner}
      </a>
    );
  }
  const { variant: _v, tone: _t, size: _s, iconStart: _is, iconEnd: _ie, className: _c, children: _ch, type = 'button', ...rest } =
    props;
  return (
    <button className={classes} type={type} {...rest}>
      {inner}
    </button>
  );
}
