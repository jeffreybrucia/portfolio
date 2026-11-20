import { ContentPending } from '@/features/case-study/blocks/blocks';
import { site } from '@/content/site';
import { useDocumentTitle } from '@/app/useDocumentTitle';
import { SimplePage } from './SimplePage';

export function Contact() {
  useDocumentTitle(`Contact — ${site.name}`);
  return (
    <SimplePage eyebrow="Contact" title="Let’s talk.">
      <ContentPending>
        Add your preferred email and LinkedIn URL. Use{' '}
        <code>{'<Button href="mailto:…" data-external variant="primary">'}</code> for the primary action.
      </ContentPending>
    </SimplePage>
  );
}
