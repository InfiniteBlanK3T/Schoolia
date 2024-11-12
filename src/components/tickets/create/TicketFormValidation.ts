import { TicketFormData, TicketFormErrors } from './types';
import {
  validateTitle,
  validateDescription,
  validateAttachments,
} from '@/utils/validation/ticketValidation';

export const validateForm = (data: TicketFormData): TicketFormErrors => {
  const errors: TicketFormErrors = {};

  if (!validateTitle(data.title)) {
    errors.title = 'Title must be between 5 and 100 characters';
  }

  if (!validateDescription(data.description)) {
    errors.description = 'Description must be between 20 and 1000 characters';
  }

  if (!data.type) {
    errors.type = 'Please select a ticket type';
  }

  if (!data.priority) {
    errors.priority = 'Please select a priority level';
  }

  if (!data.groupId) {
    errors.groupId = 'Please select a group';
  }

  if (!validateAttachments(data.attachments)) {
    errors.attachments = 'Invalid file(s). Max size: 5MB. Allowed types: JPG, PNG, PDF, DOC';
  }

  return errors;
};
