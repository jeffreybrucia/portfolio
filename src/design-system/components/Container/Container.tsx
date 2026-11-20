import type { ElementType, ReactNode, ComponentPropsWithoutRef } from 'react';
import { cx } from '../../utils/cx';
import styles from './Container.module.css';

type ContainerProps<E extends ElementType> = {
  as?: E;
  /** page = full content width (1440) · prose = reading width (720) · bleed = edge to edge */
  width?: 'page' | 'prose' | 'bleed';
  className?: string;
  children?: ReactNode;
} & Omit<ComponentPropsWithoutRef<E>, 'as' | 'className' | 'children'>;

/** Horizontal layout primitive: max width + responsive page margins. */
export function Container<E extends ElementType = 'div'>({
  as,
  width = 'page',
  className,
  children,
  ...rest
}: ContainerProps<E>) {
  const Component = (as ?? 'div') as ElementType;
  return (
    <Component className={cx(styles.container, styles[width], className)} {...rest}>
      {children}
    </Component>
  );
}
