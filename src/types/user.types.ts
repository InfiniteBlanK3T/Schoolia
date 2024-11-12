export enum UserRole {
  USER = 'USER',
  AGENT = 'AGENT',
  SUPERVISOR = 'SUPERVISOR',
  MANAGER = 'MANAGER',
  ADMIN = 'ADMIN',
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: UserRole[];
  groupIds?: string[];
  createdAt: Date;
  isActive: boolean;
}

export interface Group {
  id: string;
  name: string;
  description: string;
  supervisorIds?: string[];
  isActive: boolean;
}
