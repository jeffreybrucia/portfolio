import { Button, Text } from '@/design-system';
import { SimplePage } from './SimplePage';

export function NotFound() {
  return (
    <SimplePage eyebrow="404" title="This page isn’t here.">
      <Text variant="bodyLg" tone="secondary">
        It may have moved, or the link may be out of date.
      </Text>
      <div>
        <Button href="/" variant="primary" iconStart="arrowLeft">
          Back to work
        </Button>
      </div>
    </SimplePage>
  );
}
