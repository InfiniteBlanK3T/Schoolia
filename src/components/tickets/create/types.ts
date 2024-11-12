import { TicketPriority, TicketType } from '@/types/ticket.types';

export interface TicketFormData {
  title: string;
  description: string;
  type: TicketType;
  priority: TicketPriority;
  groupId: string;
  customerId: string;
  tags: string[];
  attachments: FileList | null;
}

export interface TicketFormErrors {
  title?: string;
  description?: string;
  type?: string;
  priority?: string;
  groupId?: string;
  customerId?: string;
  attachments?: string;
}
