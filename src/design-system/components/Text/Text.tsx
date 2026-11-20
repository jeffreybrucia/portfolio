import type { ElementType, ComponentPropsWithoutRef, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import styles from './Text.module.css';

/**
 * Typography primitive. Every piece of text in the portfolio should go
 * through <Text> so hierarchy stays consistent.
 *
 * Variants map 1:1 to the type scale in tokens.css:
 *   hero        Newsreader · homepage hero (64–88px)
 *   caseTitle   Newsreader · case study title (40–64px)
 *   section     Newsreader · section heading (32–48px)
 *   subsection  Geist · subsection heading
 *   cardTitle   Geist · project card title (20–24px)
 *   bodyLg      Geist · lead paragraph
 *   body        Geist · default copy
 *   bodySm      Geist · captions, dense copy
 *   label       Geist · metadata, eyebrow (13px)
 *   labelSm     Geist · tiny labels (11px, uppercase)
 *   stat        Geist · large numeric data point
 */
export type TextVariant =
  | 'hero'
  | 'caseTitle'
  | 'section'
  | 'subsection'
  | 'cardTitle'
  | 'bodyLg'
  | 'body'
  | 'bodySm'
  | 'label'
  | 'labelSm'
  | 'stat';

export type TextTone = 'default' | 'secondary' | 'inverse' | 'inverseSecondary' | 'inherit';

const defaultElement: Record<TextVariant, ElementType> = {
  hero: 'h1',
  caseTitle: 'h1',
  section: 'h2',
  subsection: 'h3',
  cardTitle: 'h3',
  bodyLg: 'p',
  body: 'p',
  bodySm: 'p',
  label: 'span',
  labelSm: 'span',
  stat: 'span',
};

type TextProps<E extends ElementType> = {
  as?: E;
  variant?: TextVariant;
  tone?: TextTone;
  /** Use the editorial serif at subsection/body sizes, for selected moments. */
  serif?: boolean;
  italic?: boolean;
  measure?: boolean;
  className?: string;
  children?: ReactNode;
} & Omit<ComponentPropsWithoutRef<E>, 'as' | 'className' | 'children'>;

export function Text<E extends ElementType = 'p'>({
  as,
  variant = 'body',
  tone = 'default',
  serif,
  italic,
  measure,
  className,
  children,
  ...rest
}: TextProps<E>) {
  const Component = (as ?? defaultElement[variant]) as ElementType;
  return (
    <Component
      className={cx(
        styles.text,
        styles[variant],
        styles[`tone-${tone}`],
        serif && styles.serif,
        italic && styles.italic,
        measure && styles.measure,
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}
