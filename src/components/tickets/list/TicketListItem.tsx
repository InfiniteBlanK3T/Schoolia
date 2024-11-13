import React, { memo, useCallback } from 'react';
import { format } from 'date-fns';
import { Ticket, TicketStatus, TicketPriority } from '@/types/ticket.types';
import { Card } from '@/components/common/display/Card';
import { Badge } from '@/components/common/display/Badge';
import { Status, Priority } from '@/components/common/display/types';

interface TicketListItemProps {
  ticket: Ticket;
  onSelect: (ticketId: string) => void;
  className?: string;
}

// Map TicketStatus enum to Badge Status type
const statusBadgeMap: Record<TicketStatus, Status> = {
  [TicketStatus.OPEN]: 'open',
  [TicketStatus.PENDING]: 'pending',
  [TicketStatus.RESOLVED]: 'resolved',
  [TicketStatus.CLOSED]: 'closed',
};

// Map TicketPriority enum to Badge Priority type
const priorityBadgeMap: Record<TicketPriority, Priority> = {
  [TicketPriority.LOW]: 'low',
  [TicketPriority.MEDIUM]: 'medium',
  [TicketPriority.HIGH]: 'high',
  [TicketPriority.URGENT]: 'urgent',
};

const TicketListItem: React.FC<TicketListItemProps> = ({ ticket, onSelect, className = '' }) => {
  const handleClick = useCallback(() => {
    onSelect(ticket.id);
  }, [onSelect, ticket.id]);

  const handleKeyPress = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        onSelect(ticket.id);
      }
    },
    [onSelect, ticket.id]
  );

  const renderBadges = () => (
    <>
      <Badge
        priority={priorityBadgeMap[ticket.priority]}
        label={ticket.priority}
        className='hidden sm:inline-flex'
      />
      <Badge status={statusBadgeMap[ticket.status]} label={ticket.status} />
    </>
  );

  // Wrap Card in a clickable div to handle interactions
  return (
    <div
      onClick={handleClick}
      onKeyPress={handleKeyPress}
      tabIndex={0}
      role='button'
      aria-label={`Ticket: ${ticket.title}`}
      className='outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500'
    >
      <Card className={`w-full p-4 hover:bg-gray-50 transition-colors cursor-pointer ${className}`}>
        <div className='flex flex-col sm:flex-row sm:items-center gap-4'>
          {/* Ticket Main Info */}
          <div className='flex-grow'>
            <div className='flex items-start justify-between'>
              <h3 className='text-lg font-medium text-gray-900 truncate max-w-[80%]'>
                {ticket.title}
              </h3>
              <div className='flex items-center gap-2'>{renderBadges()}</div>
            </div>

            <div className='mt-1 text-sm text-gray-500 line-clamp-2'>{ticket.description}</div>

            {/* Mobile Priority Badge */}
            <Badge
              priority={priorityBadgeMap[ticket.priority]}
              label={ticket.priority}
              className='sm:hidden mt-2'
            />
          </div>

          {/* Metadata */}
          <div className='flex flex-col sm:items-end gap-1 text-sm text-gray-500'>
            <div className='flex items-center gap-2'>
              <span className='whitespace-nowrap'>
                {format(new Date(ticket.createdAt), 'MMM d, yyyy')}
              </span>
            </div>

            {/* Tags */}
            <div className='flex flex-wrap gap-1 mt-2'>
              {ticket.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} label={tag} variant='outlined' className='text-xs' />
              ))}
              {ticket.tags.length > 3 && (
                <Badge
                  label={`+${ticket.tags.length - 3}`}
                  variant='outlined'
                  className='text-xs'
                />
              )}
            </div>
          </div>
        </div>

        {/* Comments count and last update */}
        <div className='mt-3 flex items-center justify-between text-sm text-gray-500'>
          <div className='flex items-center gap-2'>
            <span>{ticket.comments.length} comments</span>
            <span>•</span>
            <span>Last updated {format(new Date(ticket.updatedAt), 'MMM d, HH:mm')}</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default memo(TicketListItem);
