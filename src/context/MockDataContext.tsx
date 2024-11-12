// src/context/MockDataContext.tsx
import React, { createContext, useContext, useState, useCallback } from 'react';
import {
  User,
  UserRole,
  Group,
  Ticket,
  TicketStatus,
  TicketPriority,
  TicketType,
  Comment,
} from '@/types/index';

// Define the shape of our context
interface MockDataContextType {
  // Data Access
  tickets: Ticket[];
  users: User[];
  groups: Group[];

  // Ticket Operations
  createTicket: (ticket: Omit<Ticket, 'id' | 'createdAt' | 'updatedAt' | 'comments'>) => Ticket;
  updateTicket: (ticketId: string, updates: Partial<Ticket>) => Ticket;
  deleteTicket: (ticketId: string) => void;
  getTicketById: (ticketId: string) => Ticket | undefined;

  // Ticket Queries
  getTicketsByCustomer: (customerId: string) => Ticket[];
  getTicketsByAgent: (agentId: string) => Ticket[];
  getTicketsByGroup: (groupId: string) => Ticket[];
  getTicketsByStatus: (status: TicketStatus) => Ticket[];
  getTicketsByPriority: (priority: TicketPriority) => Ticket[];
  getTicketsByType: (type: TicketType) => Ticket[];

  // Comment Operations
  addComment: (ticketId: string, comment: Omit<Comment, 'id' | 'createdAt'>) => void;
  getCommentsByTicket: (ticketId: string) => Comment[];

  // User Operations
  createUser: (user: Omit<User, 'id' | 'createdAt'>) => User;
  updateUser: (userId: string, updates: Partial<User>) => User;
  deleteUser: (userId: string) => void;
  getUserById: (userId: string) => User | undefined;

  // User Queries
  getUsersByRole: (role: UserRole) => User[];
  getUsersByGroup: (groupId: string) => User[];

  // Group Operations
  createGroup: (group: Omit<Group, 'id'>) => Group;
  updateGroup: (groupId: string, updates: Partial<Group>) => Group;
  deleteGroup: (groupId: string) => void;
  getGroupById: (groupId: string) => Group | undefined;

  // Access Control
  hasRole: (userId: string, role: UserRole) => boolean;
  canAccessTicket: (userId: string, ticketId: string) => boolean;
  canAccessGroup: (userId: string, groupId: string) => boolean;
  isGroupSupervisor: (userId: string, groupId: string) => boolean;
}

const MockDataContext = createContext<MockDataContextType | undefined>(undefined);

export const MockDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State Management
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);

  // Utility Functions
  const generateId = (prefix: string): string =>
    `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  // Access Control Functions
  const hasRole = useCallback(
    (userId: string, role: UserRole): boolean => {
      const user = users.find((u) => u.id === userId);
      return user?.roles.includes(role) || false;
    },
    [users]
  );

  const isGroupSupervisor = useCallback(
    (userId: string, groupId: string): boolean => {
      const group = groups.find((g) => g.id === groupId);
      return group?.supervisorIds?.includes(userId) || false;
    },
    [groups]
  );

  const canAccessGroup = useCallback(
    (userId: string, groupId: string): boolean => {
      const user = users.find((u) => u.id === userId);
      if (!user) return false;

      // Admins can access all groups
      if (user.roles.includes(UserRole.ADMIN)) return true;

      // Users can access groups they're members of
      if (user.groupIds?.includes(groupId)) return true;

      // Supervisors can access groups they supervise
      if (user.roles.includes(UserRole.SUPERVISOR) && isGroupSupervisor(userId, groupId))
        return true;

      return false;
    },
    [users, isGroupSupervisor]
  );

  const canAccessTicket = useCallback(
    (userId: string, ticketId: string): boolean => {
      const user = users.find((u) => u.id === userId);
      const ticket = tickets.find((t) => t.id === ticketId);
      if (!user || !ticket) return false;

      // Admins can access all tickets
      if (user.roles.includes(UserRole.ADMIN)) return true;

      // Users can access their own tickets
      if (ticket.customerId === userId) return true;

      // Agents can access tickets assigned to them
      if (ticket.assignedAgentId === userId) return true;

      // Users with group access can access group tickets
      if (canAccessGroup(userId, ticket.groupId)) return true;

      return false;
    },
    [users, tickets, canAccessGroup]
  );

  // Ticket Operations
  const createTicket = useCallback(
    (ticketData: Omit<Ticket, 'id' | 'createdAt' | 'updatedAt' | 'comments'>): Ticket => {
      const newTicket: Ticket = {
        ...ticketData,
        id: generateId('ticket'),
        createdAt: new Date(),
        updatedAt: new Date(),
        comments: [],
      };
      setTickets((prev) => [...prev, newTicket]);
      return newTicket;
    },
    []
  );

  const updateTicket = useCallback((ticketId: string, updates: Partial<Ticket>): Ticket => {
    let updatedTicket: Ticket | undefined;

    setTickets((prev) =>
      prev.map((ticket) => {
        if (ticket.id === ticketId) {
          updatedTicket = {
            ...ticket,
            ...updates,
            updatedAt: new Date(),
          };
          return updatedTicket;
        }
        return ticket;
      })
    );

    if (!updatedTicket) throw new Error(`Ticket ${ticketId} not found`);
    return updatedTicket;
  }, []);

  // Query Functions
  const getTicketsByStatus = useCallback(
    (status: TicketStatus): Ticket[] => {
      return tickets.filter((ticket) => ticket.status === status);
    },
    [tickets]
  );

  const getTicketsByPriority = useCallback(
    (priority: TicketPriority): Ticket[] => {
      return tickets.filter((ticket) => ticket.priority === priority);
    },
    [tickets]
  );

  const getTicketsByType = useCallback(
    (type: TicketType): Ticket[] => {
      return tickets.filter((ticket) => ticket.type === type);
    },
    [tickets]
  );

  const getUsersByRole = useCallback(
    (role: UserRole): User[] => {
      return users.filter((user) => user.roles.includes(role));
    },
    [users]
  );

  // Context Value
  const value: MockDataContextType = {
    // Data
    tickets,
    users,
    groups,

    // Ticket Operations
    createTicket,
    updateTicket,
    deleteTicket: (id: string) => setTickets((prev) => prev.filter((t) => t.id !== id)),
    getTicketById: (id: string) => tickets.find((t) => t.id === id),
    getTicketsByCustomer: (id: string) => tickets.filter((t) => t.customerId === id),
    getTicketsByAgent: (id: string) => tickets.filter((t) => t.assignedAgentId === id),
    getTicketsByGroup: (id: string) => tickets.filter((t) => t.groupId === id),
    getTicketsByStatus,
    getTicketsByPriority,
    getTicketsByType,

    // Comment Operations
    addComment: (ticketId, commentData) => {
      const newComment: Comment = {
        ...commentData,
        id: generateId('comment'),
        createdAt: new Date(),
      };
      setTickets((prev) =>
        prev.map((ticket) =>
          ticket.id === ticketId
            ? { ...ticket, comments: [...ticket.comments, newComment] }
            : ticket
        )
      );
    },
    getCommentsByTicket: (ticketId) => {
      const ticket = tickets.find((t) => t.id === ticketId);
      return ticket?.comments || [];
    },

    // User Operations
    createUser: (userData) => {
      const newUser: User = {
        ...userData,
        id: generateId('user'),
        createdAt: new Date(),
      };
      setUsers((prev) => [...prev, newUser]);
      return newUser;
    },
    updateUser: (userId, updates) => {
      let updatedUser: User | undefined;
      setUsers((prev) =>
        prev.map((user) => {
          if (user.id === userId) {
            updatedUser = { ...user, ...updates };
            return updatedUser;
          }
          return user;
        })
      );
      if (!updatedUser) throw new Error(`User ${userId} not found`);
      return updatedUser;
    },
    deleteUser: (id) => setUsers((prev) => prev.filter((u) => u.id !== id)),
    getUserById: (id) => users.find((u) => u.id === id),
    getUsersByRole,
    getUsersByGroup: (groupId) => users.filter((u) => u.groupIds?.includes(groupId)),

    // Group Operations
    createGroup: (groupData) => {
      const newGroup: Group = {
        ...groupData,
        id: generateId('group'),
      };
      setGroups((prev) => [...prev, newGroup]);
      return newGroup;
    },
    updateGroup: (groupId, updates) => {
      let updatedGroup: Group | undefined;
      setGroups((prev) =>
        prev.map((group) => {
          if (group.id === groupId) {
            updatedGroup = { ...group, ...updates };
            return updatedGroup;
          }
          return group;
        })
      );
      if (!updatedGroup) throw new Error(`Group ${groupId} not found`);
      return updatedGroup;
    },
    deleteGroup: (id) => setGroups((prev) => prev.filter((g) => g.id !== id)),
    getGroupById: (id) => groups.find((g) => g.id === id),

    // Access Control
    hasRole,
    canAccessTicket,
    canAccessGroup,
    isGroupSupervisor,
  };

  return <MockDataContext.Provider value={value}>{children}</MockDataContext.Provider>;
};

// Custom hook for using the context
export const useMockData = () => {
  const context = useContext(MockDataContext);
  if (!context) {
    throw new Error('useMockData must be used within a MockDataProvider');
  }
  return context;
};
