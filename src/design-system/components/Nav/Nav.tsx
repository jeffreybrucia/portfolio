import { useEffect, useState, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import styles from './Nav.module.css';

export interface NavItem {
  label: string;
  href: string;
  /** Also mark active for these path prefixes (e.g. "/work" for case studies). */
  matches?: string[];
}

interface NavProps {
  brand: ReactNode;
  brandHref?: string;
  items: NavItem[];
  currentPath: string;
  /**
   * overlay = transparent with white text, for pages that open on a dark
   * full-bleed image. It turns into the solid surface once the user scrolls
   * past `overlayUntil` px (defaults to ~one viewport).
   */
  tone?: 'default' | 'overlay';
  overlayUntil?: number;
}

function isActive(item: NavItem, path: string) {
  if (item.href === '/') return path === '/' || !!item.matches?.some((m) => path.startsWith(m));
  return path === item.href || path.startsWith(item.href + '/') || !!item.matches?.some((m) => path.startsWith(m));
}

function useScrollY() {
  const [y, setY] = useState(() => (typeof window === 'undefined' ? 0 : window.scrollY));
  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setY(window.scrollY));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);
  return y;
}

/** Minimal site navigation: brand left, links right, quiet active state. */
export function Nav({ brand, brandHref = '/', items, currentPath, tone = 'default', overlayUntil }: NavProps) {
  const y = useScrollY();
  const threshold = overlayUntil ?? (typeof window === 'undefined' ? 600 : window.innerHeight - 64);
  const isOverlay = tone === 'overlay' && y < threshold;
  const isRaised = !isOverlay && y > 4;

  return (
    <header
      className={cx(styles.nav, isOverlay && styles.overlay, isRaised && styles.raised)}
      style={{ viewTransitionName: 'site-nav' }}
    >
      <nav className={styles.inner} aria-label="Primary">
        <a href={brandHref} className={styles.brand}>
          {brand}
        </a>
        <ul className={styles.links} role="list">
          {items.map((item) => {
            const active = isActive(item, currentPath);
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={cx(styles.link, active && styles.active)}
                  aria-current={active ? 'page' : undefined}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
