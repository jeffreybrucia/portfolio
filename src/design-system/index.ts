/**
 * Design system public API. Pages and content import from here:
 *   import { Text, ProjectCard } from '@/design-system';
 */

// Tokens (JS mirror — visual tokens live in tokens/tokens.css)
export * as tokens from './tokens/tokens';

// Primitives
export { Text, type TextVariant, type TextTone } from './components/Text/Text';
export { Container } from './components/Container/Container';
export { Grid } from './components/Grid/Grid';
export { Icon, type IconName } from './components/Icon/Icon';

// Controls
export { Button } from './components/Button/Button';
export { IconButton, type IconButtonProps } from './components/IconButton/IconButton';
export { BackLink } from './components/BackLink/BackLink';

// Image treatments
export { Media, type ImageAsset } from './components/Media/Media';
export { Scrim } from './components/Scrim/Scrim';
export { ProgressiveBlur } from './components/ProgressiveBlur/ProgressiveBlur';

// Composites
export { ProjectCard, type ProjectCardProps } from './components/ProjectCard/ProjectCard';
export { Nav, type NavItem } from './components/Nav/Nav';

// Motion
export { useReducedMotion, prefersReducedMotion } from './motion/reducedMotion';
export { useSharedElementName, setActiveSharedId, SHARED_MEDIA_NAME } from './motion/sharedElement';

// Utilities
export { cx } from './utils/cx';
