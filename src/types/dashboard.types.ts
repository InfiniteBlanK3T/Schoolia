// src/types/dashboard.types.ts
import { TicketStatus, TicketPriority } from './ticket.types';
import { Ticket } from './ticket.types';
import { User } from './user.types';

export interface DashboardMetrics {
  totalTickets: number;
  openTickets: number;
  resolvedTickets: number;
  averageResponseTime: number; // in hours
  satisfactionRate: number; // out of 5
}

export interface DashboardStats {
  statusDistribution: Record<TicketStatus, number>;
  priorityDistribution: Record<TicketPriority, number>;
  categoryDistribution: Record<string, number>;
  dailyTickets: Array<{
    date: string;
    created: number;
    resolved: number;
  }>;
  agentPerformance: Array<{
    agentId: string;
    name: string;
    ticketsResolved: number;
    averageResponseTime: number;
    satisfaction: number;
  }>;
}

export interface RecentActivity {
  id: string;
  type: 'ticket_created' | 'ticket_updated' | 'ticket_resolved' | 'comment_added';
  timestamp: string;
  ticketId: string;
  userId: string;
  description: string;
}

export interface DashboardData {
  metrics: DashboardMetrics;
  stats: DashboardStats;
  recentActivities: RecentActivity[];
  topPriorityTickets: Ticket[];
  activeAgents: User[];
}
