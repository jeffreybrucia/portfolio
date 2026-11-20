import { Text } from '@/design-system';
import { ContentPending } from '@/features/case-study/blocks/blocks';
import { site } from '@/content/site';
import { useDocumentTitle } from '@/app/useDocumentTitle';
import { SimplePage } from './SimplePage';

export function About() {
  useDocumentTitle(`About — ${site.name}`);
  return (
    <SimplePage eyebrow="About" title={site.name}>
      <Text variant="bodyLg" tone="secondary">
        {site.role} · {site.location}
      </Text>
      <ContentPending>Bio, portrait, experience and selected recognition.</ContentPending>
    </SimplePage>
  );
}
