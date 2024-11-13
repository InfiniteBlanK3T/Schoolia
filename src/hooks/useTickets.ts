import { useState, useEffect, useCallback } from 'react';
import { Ticket, TicketType } from '@/types/ticket.types';
import {
  TicketFilters,
  SortConfig,
  PaginationConfig,
  UseTicketsResult,
} from '../components/tickets/list/types';
import { mockTickets } from '@/data/mock/mockTickets';

export const useTickets = (initialFilters: TicketFilters = {}): UseTicketsResult => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [filters, setFilters] = useState<TicketFilters>(initialFilters);
  const [sort, setSort] = useState<SortConfig>({ field: 'createdAt', direction: 'desc' });
  const [pagination, setPagination] = useState<PaginationConfig>({
    page: 1,
    limit: 10,
    total: 0,
  });

  // Memoized filter function
  const filterTickets = useCallback(
    (tickets: Ticket[]): Ticket[] => {
      return tickets.filter((ticket) => {
        if (filters.status && !filters.status.includes(ticket.status)) return false;
        if (filters.priority && !filters.priority.includes(ticket.priority)) return false;
        if (filters.type && !filters.type.includes(ticket.type as TicketType)) return false;
        if (filters.assignedAgentId && ticket.assignedAgentId !== filters.assignedAgentId)
          return false;
        if (filters.groupId && ticket.groupId !== filters.groupId) return false;
        if (filters.tags && filters.tags.length > 0) {
          if (!filters.tags.some((tag) => ticket.tags.includes(tag))) return false;
        }
        if (filters.searchQuery) {
          const search = filters.searchQuery.toLowerCase();
          const matchesSearch =
            ticket.title.toLowerCase().includes(search) ||
            ticket.description.toLowerCase().includes(search) ||
            ticket.tags.some((tag) => tag.toLowerCase().includes(search));
          if (!matchesSearch) return false;
        }
        if (filters.dateRange) {
          const ticketDate = new Date(ticket.createdAt);
          if (ticketDate < filters.dateRange.start || ticketDate > filters.dateRange.end)
            return false;
        }
        return true;
      });
    },
    [filters]
  );

  // Memoized sort function
  const sortTickets = useCallback(
    (tickets: Ticket[]): Ticket[] => {
      if (sort.field === 'none') return tickets;

      return [...tickets].sort((a, b) => {
        const aValue = a[sort.field as keyof Ticket];
        const bValue = b[sort.field as keyof Ticket];

        if (aValue === undefined || bValue === undefined) return 0;
        if (aValue < bValue) return sort.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sort.direction === 'asc' ? 1 : -1;
        return 0;
      });
    },
    [sort]
  );

  // Fetch and process tickets
  const fetchTickets = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // In a real app, this would be an API call
      // Simulating API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      const filteredTickets = filterTickets(mockTickets);
      const sortedTickets = sortTickets(filteredTickets);

      const startIndex = (pagination.page - 1) * pagination.limit;
      const paginatedTickets = sortedTickets.slice(startIndex, startIndex + pagination.limit);

      setTickets(paginatedTickets);
      setPagination((prev) => ({ ...prev, total: filteredTickets.length }));
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch tickets'));
    } finally {
      setIsLoading(false);
    }
  }, [filterTickets, sortTickets, pagination.page, pagination.limit]);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  const setPage = useCallback((page: number) => {
    setPagination((prev) => ({ ...prev, page }));
  }, []);

  const setLimit = useCallback((limit: number) => {
    setPagination((prev) => ({ ...prev, limit, page: 1 }));
  }, []);

  return {
    tickets,
    isLoading,
    error,
    filters,
    sort,
    pagination,
    setFilters,
    setSort,
    setPage,
    setLimit,
    refreshTickets: fetchTickets,
  };
};

export default useTickets;
