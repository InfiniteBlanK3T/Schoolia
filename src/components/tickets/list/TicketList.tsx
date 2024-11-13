import React, { useCallback, useState } from 'react';
import { Virtuoso } from 'react-virtuoso';
import { LoadingSpinner } from '@/components/common/feedback/LoadingSpinner';
import { Alert } from '@/components/common/feedback/Alert';
import TicketListItem from './TicketListItem';
import { useTickets } from '@/hooks/useTickets';
import { Ticket } from '@/types/ticket.types';

interface TicketListProps {
  className?: string;
  onTicketSelect?: (ticketId: string) => void;
}

const PAGE_SIZE = 25;

const TicketList: React.FC<TicketListProps> = ({ className = '', onTicketSelect = () => {} }) => {
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const { tickets, isLoading, error, pagination, setPage } = useTickets({
    limit: PAGE_SIZE,
  });

  const handleEndReached = useCallback(async () => {
    if (isLoadingMore) return;

    const totalPages = Math.ceil(pagination.total / pagination.limit);
    if (pagination.page >= totalPages) return;

    setIsLoadingMore(true);
    await setPage(pagination.page + 1);
    setIsLoadingMore(false);
  }, [pagination, setPage, isLoadingMore]);

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-64'>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <Alert severity='error' title='Error loading tickets' content={error.message} />;
  }

  if (!tickets.length) {
    return (
      <Alert
        severity='info'
        title='No tickets found'
        content='Try adjusting your filters or create a new ticket.'
      />
    );
  }

  return (
    <div className={`h-[calc(100vh-200px)] ${className}`}>
      <Virtuoso
        data={tickets}
        totalCount={pagination.total}
        endReached={handleEndReached}
        itemContent={(index, ticket: Ticket) => (
          <TicketListItem
            key={ticket.id}
            ticket={ticket}
            onSelect={onTicketSelect}
            className={index !== tickets.length - 1 ? 'mb-4' : ''}
          />
        )}
        components={{
          Footer: () =>
            isLoadingMore ? (
              <div className='flex justify-center items-center p-4'>
                <LoadingSpinner size='small' />
              </div>
            ) : null,
        }}
      />
    </div>
  );
};

export default TicketList;
