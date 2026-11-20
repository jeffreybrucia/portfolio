import { Figure, NumberedList, Prose, PullQuote, Section, Split, Stats } from '@/features/case-study/blocks/blocks';
import { Text } from '@/design-system';

/**
 * Compose the story from blocks in whatever order serves it. Add one-off
 * layouts as local components in this folder (Story.module.css for styles,
 * using tokens) — promote them to blocks/ only once a second project needs them.
 */
export default function TemplateStory() {
  return (
    <>
      <Section eyebrow="Overview" title="The headline insight">
        <Prose lead>
          <p>Lead paragraph.</p>
        </Prose>
        <Stats items={[{ value: '0', label: 'Metric' }]} />
      </Section>

      <Figure image={{ placeholder: true, alt: '' }} size="wide" caption="Caption." />

      <Section eyebrow="Problem">
        <PullQuote>One sentence that reframes the problem.</PullQuote>
      </Section>

      <Section eyebrow="Solution" title="What shipped" width="page">
        <Split aside={<Text tone="secondary">Context for the list.</Text>}>
          <NumberedList items={[{ title: 'Workstream', body: 'Detail.' }]} />
        </Split>
      </Section>
    </>
  );
}
