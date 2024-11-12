export enum TicketStatus {
  NEW = 'NEW',
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  ON_HOLD = 'ON_HOLD',
  RESOLVED = 'RESOLVED',
  CLOSED = 'CLOSED',
}

export enum TicketPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  URGENT = 'URGENT',
}

export enum TicketType {
  INCIDENT = 'INCIDENT',
  PROBLEM = 'PROBLEM',
  FEATURE_REQUEST = 'FEATURE REQUEST',
}

export interface Comment {
  id: string;
  ticketId: string;
  userId: string;
  content: string;
  createdAt: Date;
  isInternal: boolean;
}

export interface Ticket {
  id: string;
  title: string;
  type: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  customerId: string;
  assignedAgentId?: string;
  groupId: string;
  createdAt: Date;
  updatedAt: Date;
  comments: Comment[];
  tags: string[];
}
