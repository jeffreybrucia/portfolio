import { useSyncExternalStore } from 'react';

/**
 * Shared-element registry.
 *
 * A View Transition can only morph one element per `view-transition-name`
 * on each side of the transition. Cards on the home grid therefore do NOT
 * all carry the shared name — only the card whose id is "active" does.
 * The router sets the active id synchronously before a transition starts
 * (on click), and the case study hero sets it when it mounts (so direct
 * URL visits still animate back into the right card).
 */

const STORAGE_KEY = 'ds:shared-element';
const listeners = new Set<() => void>();

let activeId: string | null = readInitial();

function readInitial(): string | null {
  try {
    return sessionStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

export function getActiveSharedId(): string | null {
  return activeId;
}

export function setActiveSharedId(id: string | null): void {
  if (id === activeId) return;
  activeId = id;
  try {
    if (id) sessionStorage.setItem(STORAGE_KEY, id);
    else sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    /* storage unavailable — in-memory only */
  }
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** The view-transition-name used by every shared project image. */
export const SHARED_MEDIA_NAME = 'project-media';

/**
 * Returns the view-transition-name for an element that may participate
 * in the shared transition, or undefined when it is not the active one.
 */
export function useSharedElementName(id: string, name: string = SHARED_MEDIA_NAME): string | undefined {
  const active = useSyncExternalStore(subscribe, getActiveSharedId, () => null);
  return active === id ? name : undefined;
}
