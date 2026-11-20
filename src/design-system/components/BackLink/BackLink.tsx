import { Button } from '../Button/Button';

interface BackLinkProps {
  href: string;
  label?: string;
  tone?: 'default' | 'inverse';
  /** Shared-element id to morph back into (e.g. the project's card). */
  sharedId?: string;
  className?: string;
}

/**
 * "Back to work" control for case studies. Uses browser history when the
 * previous page is `href` (so scroll position is restored exactly), and
 * falls back to a normal navigation for direct visits.
 */
export function BackLink({ href, label = 'Back to work', tone = 'default', sharedId, className }: BackLinkProps) {
  return (
    <Button
      href={href}
      variant="secondary"
      tone={tone}
      size="sm"
      iconStart="arrowLeft"
      className={className}
      data-transition="project-exit"
      data-shared-id={sharedId}
      data-history-back=""
    >
      {label}
    </Button>
  );
}
