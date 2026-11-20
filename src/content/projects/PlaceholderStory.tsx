import { ContentPending, Section } from '@/features/case-study/blocks/blocks';

/** Shared story for placeholder projects. Delete once they're replaced. */
export default function PlaceholderStory() {
  return (
    <Section eyebrow="Placeholder">
      <ContentPending>
        This slot exists so the grid and transitions can be reviewed. Duplicate <code>_template/</code> to create a
        real case study, then remove this placeholder from <code>src/content/projects/index.ts</code>.
      </ContentPending>
    </Section>
  );
}
