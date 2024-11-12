import { Group } from '@/types/user.types';

export const mockGroups: Group[] = [
  {
    id: 'group-1',
    name: 'ICT',
    description: 'Hardware and software technical support',
    supervisorIds: ['user-2', 'user-3'], // Supervisors for ICT
    isActive: true,
  },
  {
    id: 'group-2',
    name: 'Maintenance',
    description: 'Maintenance of facilities and equipment',
    supervisorIds: ['user-2', 'user-4'], // Supervisors for Maintenance
    isActive: true,
  },
  {
    id: 'group-3',
    name: 'Photocopiers',
    description: 'Management and maintenance of photocopiers',
    supervisorIds: ['user-2', 'user-5'], // Supervisors for Photocopiers
    isActive: true,
  },
  {
    id: 'group-4',
    name: 'Cleaning',
    description: 'Cleaning services for office and facilities',
    supervisorIds: ['user-2'], // Supervisors for Cleaning
    isActive: true,
  },
  {
    id: 'group-5',
    name: 'Administrative Tasks',
    description: 'All administrative and operational tasks',
    supervisorIds: ['user-2'], // Supervisors for Administrative Tasks
    isActive: true,
  },
];
