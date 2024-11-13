import { Ticket, TicketStatus, TicketPriority, TicketType } from '@/types/ticket.types';

export interface TicketFilters {
  status?: TicketStatus[];
  priority?: TicketPriority[];
  type?: TicketType[];
  assignedAgentId?: string;
  groupId?: string;
  searchQuery?: string;
  tags?: string[];
  limit?: number;
  dateRange?: {
    start: Date;
    end: Date;
  };
}

export interface SortConfig {
  field: keyof Ticket | 'none';
  direction: 'asc' | 'desc';
}

export interface PaginationConfig {
  page: number;
  limit: number;
  total: number;
}

export interface UseTicketsResult {
  tickets: Ticket[];
  isLoading: boolean;
  error: Error | null;
  filters: TicketFilters;
  sort: SortConfig;
  pagination: PaginationConfig;
  setFilters: (filters: TicketFilters) => void;
  setSort: (sort: SortConfig) => void;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  refreshTickets: () => void;
}
