import type { CardProps as MuiCardProps } from '@mui/material';
import type { ReactNode } from 'react';

export type CardElevation = 0 | 1 | 2 | 3 | 4 | 6 | 8 | 12 | 16 | 24;
export type CardBorderRadius = 'none' | 'small' | 'medium' | 'large';
export type CardPadding = 'none' | 'small' | 'medium' | 'large';

export interface CardHeaderProps {
  /**
   * The title content
   */
  title?: ReactNode;
  /**
   * The subtitle content
   */
  subtitle?: ReactNode;
  /**
   * Avatar element
   */
  avatar?: ReactNode;
  /**
   * Action elements (e.g., IconButton)
   */
  action?: ReactNode;
  /**
   * Additional className for the header
   */
  className?: string;
}

export interface CardMediaProps {
  /**
   * The height of the media
   */
  height?: number | string;
  /**
   * The image URL
   */
  image?: string;
  /**
   * The alt text for the image
   */
  alt?: string;
  /**
   * The component to render the media with
   */
  component?: 'img' | 'video' | 'iframe';
  /**
   * Additional className for the media
   */
  className?: string;
}

export interface CardActionsProps {
  /**
   * The action elements
   */
  children?: ReactNode;
  /**
   * Whether to align actions to the right
   */
  alignRight?: boolean;
  /**
   * Additional className for actions
   */
  className?: string;
}

export interface CardProps extends Omit<MuiCardProps, 'elevation'> {
  /**
   * Card header props
   */
  header?: CardHeaderProps;
  /**
   * Card media props
   */
  media?: CardMediaProps;
  /**
   * Card content
   */
  children?: ReactNode;
  /**
   * Card actions props
   */
  actions?: CardActionsProps;
  /**
   * Card elevation (0-24)
   * @default 1
   */
  elevation?: CardElevation;
  /**
   * Border radius variant
   * @default 'medium'
   */
  borderRadius?: CardBorderRadius;
  /**
   * Padding variant
   * @default 'medium'
   */
  padding?: CardPadding;
  /**
   * Whether the card is in loading state
   * @default false
   */
  loading?: boolean;
  /**
   * Whether the card is expandable
   * @default false
   */
  expandable?: boolean;
  /**
   * Whether the card is expanded (controlled)
   */
  expanded?: boolean;
  /**
   * Default expanded state (uncontrolled)
   * @default false
   */
  defaultExpanded?: boolean;
  /**
   * Callback fired when expand state changes
   */
  onExpandChange?: (expanded: boolean) => void;
  /**
   * Whether to show hover effect
   * @default false
   */
  hover?: boolean;
  /**
   * Whether the entire card is clickable
   * @default false
   */
  clickable?: boolean;
  /**
   * Click handler for clickable card
   */
  onClick?: () => void;
}
