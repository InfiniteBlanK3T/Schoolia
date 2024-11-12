import { Card as MuiCard, CardHeader, CardContent, CardActions } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { CardProps } from './types';

export const Card = ({
  title,
  subtitle,
  loading,
  error,
  actions,
  headerActions,
  children,
  className,
  ...props
}: CardProps) => {
  return (
    <MuiCard className={className} {...props}>
      {(title || subtitle || headerActions) && (
        <CardHeader title={title} subheader={subtitle} action={headerActions} />
      )}
      <CardContent>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: 20 }}>
            <CircularProgress />
          </div>
        ) : error ? (
          <Alert severity='error'>{error}</Alert>
        ) : (
          children
        )}
      </CardContent>
      {actions && <CardActions>{actions}</CardActions>}
    </MuiCard>
  );
};
