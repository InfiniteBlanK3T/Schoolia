import { useState, useEffect } from 'react';
import { TicketStats, TicketSummary } from '../components/dashboard/cards/types';

interface DashboardData {
  stats: TicketStats;
  summary: TicketSummary;
}

interface UseDashboardResult {
  data: DashboardData | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

const MOCK_DATA: DashboardData = {
  stats: {
    total: 156,
    open: 45,
    inProgress: 28,
    resolved: 83,
    averageResponseTime: 2.5,
    satisfaction: 4.2,
  },
  summary: {
    priority: {
      high: 15,
      medium: 48,
      low: 93,
    },
    categories: {
      'Technical Issue': 45,
      'Account Access': 38,
      Billing: 25,
      'Feature Request': 28,
      'General Inquiry': 20,
    },
    recentActivity: [
      {
        id: '1',
        type: 'created',
        timestamp: '2024-03-13T10:00:00Z',
        title: 'Unable to access dashboard',
      },
      // Add more mock activity data as needed
    ],
  },
};

export const useDashboard = (refreshInterval = 30000): UseDashboardResult => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setData(MOCK_DATA);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    if (refreshInterval > 0) {
      const interval = setInterval(fetchData, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [refreshInterval]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
};
