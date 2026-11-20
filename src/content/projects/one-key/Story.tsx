import {
  ContentPending,
  Figure,
  NumberedList,
  Prose,
  PullQuote,
  Section,
  Split,
  Stats,
} from '@/features/case-study/blocks/blocks';
import { Text } from '@/design-system';

/**
 * One Key story.
 *
 * Only facts Jeff has provided are written here. Anything not yet supplied
 * is marked with <ContentPending> — replace those with the real material
 * (the existing one-key-case-study.html draft has the Reflection copy).
 */
export default function OneKeyStory() {
  return (
    <>
      <Section eyebrow="Overview" title="Three programs, one membership">
        <Prose lead>
          <p>
            One Key brought Expedia Rewards and Hotels.com Rewards together with Vrbo — a brand with no prior loyalty
            program — into a single membership across the Expedia Group portfolio.
          </p>
        </Prose>
        <Stats
          items={[
            { value: '50.9M', label: 'Active members' },
            { value: '+28%', label: 'Silver+ members, year over year' },
            { value: '+164%', label: 'Blue → Silver+ progression, year over year' },
          ]}
        />
      </Section>

      <Section eyebrow="My role" title="Stepping in to co-lead">
        <Prose>
          <p>
            I joined the program as a Senior Designer and delivered it as a Principal. When the original design director
            departed, I stepped in as a peer co-lead alongside a Design Director — with less than six months to launch.
          </p>
        </Prose>
      </Section>

      <Figure
        image={{ placeholder: true, placeholderNote: 'Wide: One Key across the three brands', alt: 'One Key across brands' }}
        ratio="16 / 9"
        size="wide"
        caption="Placeholder — add a composition showing the membership across Expedia, Hotels.com and Vrbo."
      />

      <Section eyebrow="Insight">
        <PullQuote>
          Hotels.com value erosion was a trust-and-time problem — not a content or communication problem.
        </PullQuote>
        <Prose>
          <p>It was a risk I flagged repeatedly throughout the program.</p>
        </Prose>
        <ContentPending>Expand on the insight: evidence, how it showed up for members, and what it changed.</ContentPending>
      </Section>

      <Section eyebrow="Solution" title="Phase 1 workstreams" width="page">
        <Split
          aside={
            <Text variant="body" tone="secondary">
              Six workstreams shipped at launch.
            </Text>
          }
        >
          <NumberedList
            items={[
              {
                title: 'Onboarding V1',
                body: 'A forced-choice, full-screen onboarding across all three brands, shaped by five user personas and a context matrix I led.',
              },
              { title: 'Universal membership & account page', body: 'Redesign of the membership and account surfaces.' },
              { title: 'One Key Rewards page', body: 'An architectural overhaul of the rewards page.' },
              { title: 'Persistent membership messaging', body: 'A component system for membership messaging across surfaces.' },
              { title: 'Earn & burn touchpoints', body: 'Funnel touchpoints for earning and redeeming.' },
              { title: 'Brand & design system', body: 'The brand and design-system foundations for the program.' },
            ]}
          />
        </Split>
      </Section>

      <Section eyebrow="Phase 2">
        <ContentPending>Phase 2 solution details.</ContentPending>
      </Section>

      <Section eyebrow="Beyond the launch" title="What came next">
        <Prose>
          <p>
            Beyond the launch I defined additional One Key experiences that are live today, including a lounge access
            pass for trip disruptions.
          </p>
          <p>
            <strong>Price Drop Protection</strong> started as my concept, TRAKER: a loyalty mechanic that refunds
            ecosystem credits when flight prices drop after booking, keeping travelers in the ecosystem through trust. I
            created the initial directional concept; a design leader picked it up and the flights team built it into the
            Expedia brand.
          </p>
        </Prose>
      </Section>

      <Section eyebrow="Reflection">
        <ContentPending>Reflection — copy exists in the one-key-case-study.html draft; paste it here.</ContentPending>
      </Section>
    </>
  );
}
