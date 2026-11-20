import { useSyncExternalStore } from 'react';
import { flushSync } from 'react-dom';
import { prefersReducedMotion } from '@/design-system/motion/reducedMotion';
import { getActiveSharedId, setActiveSharedId } from '@/design-system/motion/sharedElement';

/**
 * A deliberately small client-side router built on the History API and
 * native View Transitions. It exists so the portfolio can own its signature
 * card → case study transition end to end (including back/forward and
 * scroll restoration) without a routing dependency.
 *
 * - Plain <a href> elements are intercepted globally, so design-system
 *   components never need to import the router.
 * - Anchors can opt into a transition style with data attributes:
 *     data-transition="project-enter" | "project-exit" | "page"
 *     data-shared-id="<id>"     → element that should morph (see sharedElement.ts)
 *     data-history-back         → prefer history.back() when the previous entry matches href
 */

export type TransitionKind = 'page' | 'project-enter' | 'project-exit' | 'none';

export interface RouterLocation {
  pathname: string;
  hash: string;
  key: string;
}

interface HistoryState {
  key: string;
  /** Pathname of the entry we navigated from, used for "back" links. */
  from?: string;
}

type TransitionResolver = (from: string, to: string) => TransitionKind;

const listeners = new Set<() => void>();
let current: RouterLocation = readLocation();
let resolveTransition: TransitionResolver = () => 'page';

function readLocation(): RouterLocation {
  const state = history.state as HistoryState | null;
  return {
    pathname: normalize(location.pathname),
    hash: location.hash,
    key: state?.key ?? createKey(),
  };
}

function normalize(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith('/')) return pathname.slice(0, -1);
  return pathname;
}

function createKey() {
  return Math.random().toString(36).slice(2, 10);
}

function notify() {
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/* ---------------------------------------------------------------------- */
/* Scroll memory                                                           */
/* ---------------------------------------------------------------------- */

const scrollKey = (key: string) => `router:scroll:${key}`;

function saveScroll(key: string) {
  try {
    sessionStorage.setItem(scrollKey(key), String(Math.round(window.scrollY)));
  } catch {
    /* ignore */
  }
}

function readScroll(key: string): number | null {
  try {
    const v = sessionStorage.getItem(scrollKey(key));
    return v === null ? null : Number(v);
  } catch {
    return null;
  }
}

/* ---------------------------------------------------------------------- */
/* Core transition                                                         */
/* ---------------------------------------------------------------------- */

function commit(next: RouterLocation, kind: TransitionKind, afterRender: () => void) {
  const update = () => {
    flushSync(() => {
      current = next;
      notify();
    });
    afterRender();
  };

  const canAnimate =
    kind !== 'none' && typeof document.startViewTransition === 'function' && !prefersReducedMotion();

  if (!canAnimate) {
    update();
    return;
  }

  const root = document.documentElement;
  root.dataset.transition = kind;
  const transition = document.startViewTransition(update);
  transition.finished.finally(() => {
    if (root.dataset.transition === kind) delete root.dataset.transition;
  });
}

function scrollAfterPush(sharedId?: string | null) {
  const target = sharedId
    ? document.querySelector<HTMLElement>(`[data-shared-id="${CSS.escape(sharedId)}"]`)
    : null;
  if (target) {
    target.scrollIntoView({ block: 'center', behavior: 'instant' as ScrollBehavior });
  } else if (location.hash) {
    document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView();
  } else {
    window.scrollTo(0, 0);
  }
}

function focusMain() {
  const main = document.getElementById('main');
  main?.focus({ preventScroll: true });
}

/* ---------------------------------------------------------------------- */
/* Public API                                                              */
/* ---------------------------------------------------------------------- */

export interface NavigateOptions {
  transition?: TransitionKind;
  replace?: boolean;
  /** Id of the shared element that should morph (card ⇄ hero). */
  sharedId?: string | null;
}

export function navigate(to: string, options: NavigateOptions = {}) {
  const url = new URL(to, location.href);
  const pathname = normalize(url.pathname);
  if (pathname === current.pathname && url.hash === current.hash) return;

  saveScroll(current.key);

  if (options.sharedId) {
    // Must happen before the old snapshot is captured.
    flushSync(() => setActiveSharedId(options.sharedId!));
  }

  const state: HistoryState = { key: createKey(), from: current.pathname };
  if (options.replace) history.replaceState(state, '', url);
  else history.pushState(state, '', url);

  const next: RouterLocation = { pathname, hash: url.hash, key: state.key };
  const kind = options.transition ?? resolveTransition(current.pathname, pathname);

  // Collapsing back to the grid: scroll so the destination card is in view.
  const exitTarget = kind === 'project-exit' ? (options.sharedId ?? getActiveSharedId()) : null;

  commit(next, kind, () => {
    scrollAfterPush(exitTarget);
    focusMain();
  });
}

/** Go back if the previous entry is `fallback`, otherwise push `fallback`. */
export function back(fallback: string, options: NavigateOptions = {}) {
  const state = history.state as HistoryState | null;
  if (state?.from === normalize(new URL(fallback, location.href).pathname)) {
    history.back();
  } else {
    navigate(fallback, options);
  }
}

export function useLocation(): RouterLocation {
  return useSyncExternalStore(subscribe, () => current);
}

/** Lets the app decide transition styles for back/forward and unannotated links. */
export function setTransitionResolver(resolver: TransitionResolver) {
  resolveTransition = resolver;
}

/* ---------------------------------------------------------------------- */
/* Wiring                                                                  */
/* ---------------------------------------------------------------------- */

function onPopState(event: PopStateEvent) {
  saveScroll(current.key);
  const next = readLocation();
  // Safari / mobile swipe-back already animated: don't animate twice.
  const uaAnimated = (event as PopStateEvent & { hasUAVisualTransition?: boolean }).hasUAVisualTransition;
  const kind = uaAnimated ? 'none' : resolveTransition(current.pathname, next.pathname);

  commit(next, kind, () => {
    const y = readScroll(next.key);
    window.scrollTo(0, y ?? 0);
  });
}

function onClick(event: MouseEvent) {
  if (event.defaultPrevented || event.button !== 0) return;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

  const anchor = (event.target as Element | null)?.closest?.('a');
  if (!anchor || !anchor.href) return;
  if (anchor.target && anchor.target !== '_self') return;
  if (anchor.hasAttribute('download') || anchor.dataset.external !== undefined) return;

  const url = new URL(anchor.href);
  if (url.origin !== location.origin) return;
  // Same-page hash links: let the browser handle them.
  if (normalize(url.pathname) === current.pathname && url.hash) return;

  event.preventDefault();

  const options: NavigateOptions = {
    transition: (anchor.dataset.transition as TransitionKind | undefined) ?? undefined,
    sharedId: anchor.dataset.sharedId ?? null,
  };

  if (anchor.dataset.historyBack !== undefined) {
    back(url.pathname + url.hash, options);
  } else {
    navigate(url.pathname + url.search + url.hash, options);
  }
}

let started = false;

/** Call once at startup. */
export function startRouter() {
  if (started) return;
  started = true;
  history.scrollRestoration = 'manual';
  if (!(history.state as HistoryState | null)?.key) {
    history.replaceState({ key: current.key } satisfies HistoryState, '');
  }
  window.addEventListener('popstate', onPopState);
  document.addEventListener('click', onClick);
  window.addEventListener('pagehide', () => saveScroll(current.key));

  // Restore scroll after a reload.
  const y = readScroll(current.key);
  if (y) requestAnimationFrame(() => window.scrollTo(0, y));
}
