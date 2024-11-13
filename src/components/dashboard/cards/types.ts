export interface TicketStats {
  total: number;
  open: number;
  inProgress: number;
  resolved: number;
  averageResponseTime: number;
  satisfaction: number;
}

export interface TicketSummary {
  priority: {
    high: number;
    medium: number;
    low: number;
  };
  categories: Record<string, number>;
  recentActivity: Array<{
    id: string;
    type: 'created' | 'updated' | 'resolved';
    timestamp: string;
    title: string;
  }>;
}

export interface StatCardProps {
  title: string;
  value: number | string;
  icon?: React.ReactNode;
  change?: number;
  trend?: 'up' | 'down' | 'neutral';
  loading?: boolean;
  error?: string;
  onClick?: () => void;
}

export interface SummaryCardProps {
  data: TicketSummary;
  loading?: boolean;
  error?: string;
  onCategoryClick?: (category: string) => void;
}
