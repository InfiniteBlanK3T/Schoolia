import React, { forwardRef, useState, useCallback } from 'react';
import {
  Card as MuiCard,
  CardHeader as MuiCardHeader,
  CardContent as MuiCardContent,
  CardActions as MuiCardActions,
  CardMedia as MuiCardMedia,
  CardActionArea as MuiCardActionArea,
  Collapse,
  Skeleton,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import type { CardProps, CardElevation, CardBorderRadius, CardPadding } from './Card.types';

const getBorderRadius = (variant: CardBorderRadius) => {
  const radiusMap = {
    none: 0,
    small: 8,
    medium: 12,
    large: 16,
  };
  return radiusMap[variant];
};

const getPadding = (variant: CardPadding) => {
  const paddingMap = {
    none: 0,
    small: 8,
    medium: 16,
    large: 24,
  };
  return paddingMap[variant];
};

interface StyledCardProps {
  cardElevation?: CardElevation;
  borderRadius?: CardBorderRadius;
  hover?: boolean;
  clickable?: boolean;
}

const StyledCard = styled(MuiCard, {
  shouldForwardProp: (prop) =>
    !['cardElevation', 'borderRadius', 'hover', 'clickable'].includes(prop as string),
})<StyledCardProps>(({ theme, cardElevation, borderRadius = 'medium', hover, clickable }) => ({
  position: 'relative',
  borderRadius: getBorderRadius(borderRadius),
  transition: theme.transitions.create(['box-shadow', 'transform'], {
    duration: theme.transitions.duration.short,
  }),
  ...(hover && {
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: theme.shadows[(cardElevation as number) + 2],
    },
  }),
  ...(clickable && {
    cursor: 'pointer',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: theme.shadows[(cardElevation as number) + 1],
    },
    '&:active': {
      transform: 'translateY(0)',
    },
  }),
}));

const ExpandMoreButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== 'expanded',
})<{ expanded?: boolean }>(({ expanded }) => ({
  transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
  transition: 'transform 0.3s',
}));

const Card = forwardRef<HTMLDivElement, CardProps>((props, ref) => {
  const {
    header,
    media,
    children,
    actions,
    elevation = 1,
    borderRadius = 'medium',
    padding = 'medium',
    loading = false,
    expandable = false,
    expanded: controlledExpanded,
    defaultExpanded = false,
    onExpandChange,
    hover = false,
    clickable = false,
    onClick,
    ...rest
  } = props;

  const [uncontrolledExpanded, setUncontrolledExpanded] = useState(defaultExpanded);
  const isExpanded = controlledExpanded !== undefined ? controlledExpanded : uncontrolledExpanded;

  const handleExpandClick = useCallback(() => {
    if (controlledExpanded === undefined) {
      setUncontrolledExpanded((prev) => !prev);
    }
    onExpandChange?.(!isExpanded);
  }, [controlledExpanded, isExpanded, onExpandChange]);

  const renderContent = () => {
    if (loading) {
      return (
        <>
          {header && (
            <MuiCardHeader
              title={<Skeleton variant='text' width='60%' />}
              subheader={<Skeleton variant='text' width='40%' />}
              avatar={header.avatar && <Skeleton variant='circular' width={40} height={40} />}
            />
          )}
          {media && (
            <Skeleton
              variant='rectangular'
              height={media.height || 200}
              sx={{ paddingTop: '56.25%' }}
            />
          )}
          <MuiCardContent sx={{ padding: getPadding(padding) }}>
            <Skeleton variant='text' width='100%' />
            <Skeleton variant='text' width='100%' />
            <Skeleton variant='text' width='60%' />
          </MuiCardContent>
        </>
      );
    }

    const content = (
      <>
        {header && (
          <MuiCardHeader
            title={header.title}
            subheader={header.subtitle}
            avatar={header.avatar}
            action={header.action}
            className={header.className}
          />
        )}
        {media && (
          <MuiCardMedia
            component={media.component || 'img'}
            height={media.height}
            image={media.image}
            alt={media.alt}
            className={media.className}
          />
        )}
        <MuiCardContent sx={{ padding: getPadding(padding) }}>
          {expandable ? (
            <>
              {children}
              <Collapse in={isExpanded} timeout='auto' unmountOnExit>
                {children}
              </Collapse>
            </>
          ) : (
            children
          )}
        </MuiCardContent>
        {(actions || expandable) && (
          <MuiCardActions
            sx={{
              justifyContent: actions?.alignRight ? 'flex-end' : 'flex-start',
              padding: getPadding(padding),
            }}
            className={actions?.className}
          >
            {actions?.children}
            {expandable && (
              <ExpandMoreButton
                expanded={isExpanded}
                onClick={handleExpandClick}
                aria-expanded={isExpanded}
                aria-label='show more'
              >
                <ExpandMoreIcon />
              </ExpandMoreButton>
            )}
          </MuiCardActions>
        )}
      </>
    );

    return clickable ? <MuiCardActionArea onClick={onClick}>{content}</MuiCardActionArea> : content;
  };

  return (
    <StyledCard
      ref={ref}
      elevation={elevation}
      cardElevation={elevation}
      borderRadius={borderRadius}
      hover={hover}
      clickable={clickable}
      onClick={!clickable ? onClick : undefined}
      {...rest}
    >
      {renderContent()}
    </StyledCard>
  );
});

Card.displayName = 'Card';

export default Card;
